'use client';

import { createClient } from '@/utils/supabase/client';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/languages/ko.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import React, { useEffect, useRef, useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient();

interface FroalaEditorComponentProps {
  /** 에디터의 현재 내용 */
  value: string;

  /** 에디터 내용이 변경될 때 호출되는 함수 */
  onChange: (value: string) => void;

  /** 에디터 내용이 비어있을 때 표시되는 텍스트 */
  placeholder?: string;

  /** 에디터 높이 (픽셀 단위) */
  height?: number;

  /** 이미지 업로드 URL */
  imageUploadURL?: string | null;

  /** 이미지 업로드 시 함께 전송할 파라미터 */
  imageUploadParams?: Record<string, any>;

  /** 이미지 업로드 HTTP 메서드 */
  imageUploadMethod?: 'POST' | 'PUT';

  /** 에디터 이벤트 핸들러 */
  events?: {
    [eventName: string]: (e?: any, editor?: any, ...args: any[]) => void;
  };
}

const FroalaEditorComponent: React.FC<FroalaEditorComponentProps> = ({
  value,
  onChange,
  placeholder = '내용을 입력해주세요...',
  height = 400,
  imageUploadURL = null,
  imageUploadParams = {},
  imageUploadMethod = 'POST',
  events = {},
}) => {
  const [editorContent, setEditorContent] = useState(value || '');
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorContent(value || '');
  }, [value]);

  const handleModelChange = model => {
    // Powered by 텍스트와 Froala Editor 링크 제거

    setEditorContent(model);
    if (onChange) {
      onChange(model);
    }
  };

  // Supabase에 이미지를 업로드하는 함수
  const uploadImageToSupabase = async file => {
    try {
      // 파일 확장자 추출
      const fileExtension = file.name.split('.').pop().toLowerCase();

      // UUID를 사용하여 고유한 파일명 생성
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;

      // Supabase에 업로드
      const { data, error } = await supabase.storage.from('notification').upload(uniqueFileName, file);

      if (error) {
        console.error('Error uploading image:', error.message);
        return null;
      }

      // const publicURL = 'https://efehwvtyjlpxkpgswrfw.supabase.co/storage/v1/object/public/' + data.fullPath;
      const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (supabaseURL == null) {
        toast.error('SUPABASE_URL이 설정되지 않았습니다.');
        return;
      }

      const publicURL = `${supabaseURL}/storage/v1/object/public/` + data.fullPath;
      console.log('Image uploaded successfully. URL:', publicURL);

      return publicURL;
    } catch (error) {
      console.error('이미지 업로드 중 예외 발생:', error);
      return null;
    }
  };

  // 이미지 업로드 핸들러 설정
  useEffect(() => {
    let isImageBeingUploaded = false;

    const setupEditor = () => {
      if (editorRef.current && editorRef.current.editor) {
        const editor = editorRef.current.editor;

        // 이미지 업로드 커스텀 핸들러 등록
        editor.events.on('image.beforeUpload', async function (images) {
          // 이미 업로드 중이면 중복 방지
          if (isImageBeingUploaded) return false;

          isImageBeingUploaded = true;

          try {
            // 각 이미지를 Supabase에 업로드
            for (let i = 0; i < images.length; i++) {
              const file = images[i];
              const imageUrl = await uploadImageToSupabase(file);

              if (imageUrl) {
                // 업로드된 이미지 URL을 에디터에 삽입
                editor.image.insert(imageUrl, null, null, editor.image.get());
              }
            }
          } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
          } finally {
            isImageBeingUploaded = false;
          }

          // 기본 업로드 방식 중단
          return false;
        });

        // 이미지 삽입 방지 (중복 방지)
        editor.events.on('image.uploaded', function (response) {
          // 이미 커스텀 핸들러에서 이미지를 삽입했으므로 여기서는 아무것도 하지 않음
          return false;
        });

        // 이미지 업로드 에러 처리
        editor.events.on('image.error', function (error, response) {
          console.error('Froala 이미지 업로드 에러:', error, response);
          isImageBeingUploaded = false;
        });
      }
    };

    // 에디터가 초기화된 후에 이벤트 핸들러 설정
    setTimeout(setupEditor, 100);

    return () => {
      if (editorRef.current && editorRef.current.editor) {
        editorRef.current.editor.events.off('image.beforeUpload');
        editorRef.current.editor.events.off('image.uploaded');
        editorRef.current.editor.events.off('image.error');
      }
    };
  }, []);

  // 에디터 설정
  const config = {
    placeholderText: placeholder,
    heightMin: height,
    language: 'ko',
    toolbarSticky: true,
    toolbarStickyOffset: 50,
    toolbarButtons: [
      ['fontSize', 'textColor', 'insertImage', 'align'],
      ['undo', 'redo'],
    ],
    fontSizeSelection: true,
    fontSizeDefaultSelection: '16',
    fontSize: ['8', '10', '12', '14', '16', '18', '20', '24', '30', '36', '48', '60', '72', '96'],
    // 이미지 업로드 설정
    imageUploadURL: null, // 기본 업로드 URL 비활성화
    imageUploadToS3: false, // S3 업로드 비활성화
    imageUploadMethod: 'POST',
    imageMaxSize: 5 * 1024 * 1024, // 5MB
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
    // 이미지 업로드 파라미터 설정
    imageUploadParams: {
      ...imageUploadParams,
      // 추가 파라미터가 필요하면 여기에 설정
    },
    // 이미지 업로드 관련 추가 설정
    imageInsertButtons: ['imageUpload'], // 이미지 삽입 버튼 설정

    // 정렬 관련 설정 - 클래스 대신 인라인 스타일 사용
    useClasses: false,
    htmlUseStyle: true,

    // 이미지 정렬 시 스타일 직접 적용
    imageStyles: {
      'fr-fil': 'style="float: left; margin: 5px 20px 5px 0;"',
      'fr-fic': 'style="text-align: center; display: block; margin: 5px auto;"',
      'fr-fir': 'style="float: right; margin: 5px 0 5px 20px;"',
    },

    // 텍스트 정렬 시 스타일 직접 적용
    paragraphStyles: {
      'fr-text-left': 'text-align: left;',
      'fr-text-center': 'text-align: center;',
      'fr-text-right': 'text-align: right;',
      'fr-text-justify': 'text-align: justify;',
    },

    events: {
      initialized: function () {
        // 에디터 초기화 후 실행할 코드
        if (events.initialized) events.initialized();
      },
      focus: function () {
        // 에디터에 포커스가 갔을 때 실행할 코드
        if (events.focus) events.focus();
      },
      blur: function () {
        // 에디터에서 포커스가 빠졌을 때 실행할 코드
        if (events.blur) events.blur();
      },
      ...events,
    },
    // 모바일 환경에서의 설정
    pluginsEnabled: ['colors', 'fontSize', 'image', 'align'],
    // preview 기능 비활성화
    htmlAllowedEmptyTags: ['textarea', 'a', 'iframe', 'object', 'video', 'style', 'script'],
    htmlDoNotWrapTags: ['script', 'style'],
    htmlSimpleAmpersand: false,
    // 미리보기 버튼 제거
    quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'],
    // 테마 설정
    theme: 'royal',
    // 커스텀 스타일
    zIndex: 9999,
    attribution: true, // Froala 로고 표시 (false에서 true로 변경)
    // 미리보기 기능 비활성화
    preview: false,
    // 코드 뷰 비활성화 (HTML 미리보기 기능)
    codeView: false,
    // 라이센스 키 설정 (워터마크 제거)
    licenseKey: 'X-XXXXXXXXXXX-XXXXXXXXX',
  };

  return (
    <div className="froala-editor-container">
      <FroalaEditor ref={editorRef} tag="textarea" model={editorContent} onModelChange={handleModelChange} config={config} />
      <style jsx>{`
        :global(.fr-box) {
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }
        :global(.fr-toolbar) {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }
        :global(.fr-wrapper) {
          background-color: #ffffff;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        :global(.fr-element) {
          font-family: 'Noto Sans KR', sans-serif;
          color: #343a40;
          line-height: 1.6;
        }
        :global(.fr-btn-grp) {
          margin: 0 4px;
        }
        :global(.fr-btn) {
          color: #495057;
          transition: all 0.2s ease;
        }
        :global(.fr-btn:hover) {
          background-color: #e9ecef;
        }
        :global(.fr-active) {
          color: #228be6 !important;
          background: #e7f5ff !important;
        }
        /* 미리보기 관련 요소 숨기기 */
        :global(.fr-preview) {
          display: none !important;
        }

        /* fr-wrapper와 show-placeholder 클래스를 모두 가진 요소 하위의 a 태그 숨기기 */
        :global(.fr-wrapper a) {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default FroalaEditorComponent;
