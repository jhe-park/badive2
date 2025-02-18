'use client'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { FaHeading } from "react-icons/fa";
import { BsTypeH2 } from "react-icons/bs";
import { FaBold, FaImage } from "react-icons/fa";
import { createClient } from '@/utils/supabase/client';

const ResizableImage = Image.extend({
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('div');
      dom.style.position = 'relative';
      dom.style.display = 'flex';
      dom.style.justifyContent = 'center';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.style.width = node.attrs.width || '100%';
      // img.style.maxWidth = '500px';
      img.style.display = 'block';

      const createHandle = (position) => {
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

        handle.addEventListener('mousedown', (event) => {
          event.preventDefault();
          const startX = event.clientX;
          const startWidth = img.offsetWidth;

          const onMouseMove = (moveEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            img.style.width = `${newWidth}px`;
            editor.chain().focus().setNode('image', { src: node.attrs.src, width: `${newWidth}px` }).run();
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

      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') {
            return false;
          }
          img.src = updatedNode.attrs.src;
          img.style.width = updatedNode.attrs.width || '100%';
          return true;
        },
      };
    };
  },
});

// Supabase 클라이언트 설정
const supabase = createClient();

// Supabase 버킷 비우기 함수
const emptyBucket = async (bucketName) => {
  const { data, error } = await supabase.storage.emptyBucket(bucketName);
  if (error) {
    console.error('Error emptying bucket:', error.message);
    return false;
  }
  console.log('Bucket emptied successfully:', data);
  return true;
};

// Supabase에 이미지를 업로드하고 URL을 반환하는 함수
const uploadImageToSupabase = async (file) => {
  // 버킷 비우기
  // await emptyBucket('notification');

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('notification')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error.message);
    return null;
  }
  console.log('data:', data);


  const publicURL = "https://efehwvtyjlpxkpgswrfw.supabase.co/storage/v1/object/public/"+data.fullPath;

  console.log('Image uploaded successfully. URL:', publicURL);

  return publicURL;
};

export default function Tiptap({ description, setDescription }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'mx-auto block',
        },
      }),
      ResizableImage,
    ],
    content: description || "<p>내용을 입력하세요...</p>",
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      // 상위 div에 w-full 클래스 추가
      html = html.replace(/<div/, '<div class="w-full"');
      setDescription(html);
    },
  });

  useEffect(() => {
    if (editor && description) {
      editor.commands.setContent(description);
    }
  }, [editor, description]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageToSupabase(file);
      if (imageUrl) {
        console.log('Inserting image into editor:', imageUrl);
        editor.chain().focus().insertContent(`<img src="${imageUrl}" style="width: 200px; height: auto;" />`).run();
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="mb-4 flex items-center bg-gray-50 p-2 rounded-lg">
        <label className="cursor-pointer inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <FaImage className="hover:bg-gray-200 p-2 rounded text-4xl" />
        </label>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[30vh] prose flex flex-col items-center justify-start gap-y-2"
      />
    </div>
  );
}
