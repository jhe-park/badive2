'use client';

import { createClient } from '@/utils/supabase/client';
// import { Document, Paragraph, Text } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Heading1, Heading2, Heading3 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { FaImage } from 'react-icons/fa';
import { MdFormatAlignCenter, MdFormatAlignLeft } from 'react-icons/md';
import './styles.scss';

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '100%',
      },
      textAlign: {
        default: 'left',
      },
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          return {
            style: attributes.style,
          };
        },
      },
    };
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('div');
      dom.style.position = 'relative';
      dom.style.display = 'inline-block';
      dom.style.width = 'fit-content';

      if (node.attrs.textAlign === 'center') {
        dom.style.margin = '0 auto';
      }

      const wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = node.attrs.textAlign === 'center' ? 'center' : 'flex-start';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.style.width = node.attrs.width;
      img.style.display = 'block';
      img.style.margin = node.attrs.textAlign === 'center' ? '0 auto' : '0';
      img.style.textAlign = node.attrs.textAlign;

      const createHandle = position => {
        const handle = document.createElement('div');
        handle.style.width = '10px';
        handle.style.height = '10px';
        handle.style.background = 'black';
        handle.style.position = 'absolute';
        handle.style.cursor = 'nwse-resize';
        handle.style.zIndex = '10';

        switch (position) {
          case 'top-left':
            handle.style.top = '-5px';
            handle.style.left = '-5px';
            break;
          case 'top-right':
            handle.style.top = '-5px';
            handle.style.right = '-5px';
            break;
          case 'bottom-left':
            handle.style.bottom = '-5px';
            handle.style.left = '-5px';
            break;
          case 'bottom-right':
            handle.style.bottom = '-5px';
            handle.style.right = '-5px';
            break;
        }

        handle.addEventListener('mousedown', event => {
          event.preventDefault();
          const startX = event.clientX;
          const startWidth = img.offsetWidth;

          const onMouseMove = moveEvent => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            img.style.width = `${newWidth}px`;
            if (typeof getPos === 'function') {
              editor.commands.updateAttributes('image', {
                width: `${newWidth}px`,
                height: 'auto',
              });
            }
          };

          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });

        return handle;
      };

      dom.appendChild(img);
      dom.appendChild(createHandle('top-left'));
      dom.appendChild(createHandle('top-right'));
      dom.appendChild(createHandle('bottom-left'));
      dom.appendChild(createHandle('bottom-right'));

      wrapper.appendChild(dom);

      return {
        dom: wrapper,
        update: updatedNode => {
          if (updatedNode.type.name !== 'image') {
            return false;
          }
          img.src = updatedNode.attrs.src;
          img.style.width = updatedNode.attrs.width;
          if (updatedNode.attrs.textAlign === 'center') {
            dom.style.margin = '0 auto';
          } else {
            dom.style.margin = '0';
          }
          wrapper.style.justifyContent = updatedNode.attrs.textAlign === 'center' ? 'center' : 'flex-start';
          img.style.textAlign = updatedNode.attrs.textAlign;
          return true;
        },
      };
    };
  },
});

// Supabase 클라이언트 설정
const supabase = createClient();

// Supabase 버킷 비우기 함수
const emptyBucket = async bucketName => {
  const { data, error } = await supabase.storage.emptyBucket(bucketName);
  if (error) {
    console.error('Error emptying bucket:', error.message);
    return false;
  }
  console.log('Bucket emptied successfully:', data);
  return true;
};

// Supabase에 이미지를 업로드하고 URL을 반환하는 함수
const uploadImageToSupabase = async file => {
  // 버킷 비우기

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from('notification').upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error.message);
    return null;
  }
  console.log('data:', data);

  const publicURL = 'https://efehwvtyjlpxkpgswrfw.supabase.co/storage/v1/object/public/' + data.fullPath;

  console.log('Image uploaded successfully. URL:', publicURL);

  return publicURL;
};

// 글자 크기를 설정하는 함수
const setFontSize = (editor, size) => {
  editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
};

export default function Tiptap({ description, setDescription }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center'],
      }),
      TextStyle,
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: description ? description : '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== description && !hasUpdated.current) {
        setDescription(html);
        hasUpdated.current = true;
      }
    },
  });

  const hasUpdated = useRef(false);
  const hasSetContent = useRef(false);

  useEffect(() => {
    if (editor && description && !hasSetContent.current) {
      editor.commands.setContent(description);
      hasSetContent.current = true;
    }
  }, [editor, description]);

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageToSupabase(file);
      if (imageUrl) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'image',
            attrs: {
              src: imageUrl,
              width: '200px',
              textAlign: 'left',
              style: 'display: block;margin: 0 auto;',
            },
          })
          .run();
      }
    }
  };

  if (!editor) {
    return null;
  }
  console.log('description: ', description);

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="mb-4 flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
        <label className="cursor-pointer inline-block">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <FaImage className="hover:bg-gray-200 p-2 rounded text-4xl" />
        </label>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="hover:bg-gray-200 p-2 rounded">
          <MdFormatAlignLeft className="text-2xl" />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="hover:bg-gray-200 p-2 rounded">
          <MdFormatAlignCenter className="text-2xl" />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
            setFontSize(editor, '2em');
          }}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <Heading1 size={20} />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            setFontSize(editor, '1.5em');
          }}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <Heading2 size={20} />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
            setFontSize(editor, '1.17em');
          }}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <Heading3 size={20} />
        </button>
      </div>
      <EditorContent editor={editor} className="min-h-[30vh] prose w-full max-w-none" />
    </div>
  );
}
