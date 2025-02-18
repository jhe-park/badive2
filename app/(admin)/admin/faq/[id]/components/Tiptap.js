import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { FaHeading } from "react-icons/fa";
import { BsTypeH2 } from "react-icons/bs";
import { FaBold, FaImage } from "react-icons/fa";

export default function Tiptap({description, setDescription }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'mx-auto block',
        },
      }),
    ],
    content: description,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(description);
      editor.on('update', () => {
        const html = editor.getHTML();
        setDescription(html);
      });
    }
    }, [editor, setDescription, description]);

  useEffect(() => {
    if (editor && description) {
      editor.commands.setContent(description);
    }
  }, [editor, description]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        editor.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      {/* <div className="mb-4 flex items-center bg-gray-50 p-2 rounded-lg">
        <label className="cursor-pointer inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <FaImage className="hover:bg-gray-200 p-2 rounded text-4xl" />
        </label>
      </div> */}
      <EditorContent
        editor={editor}
        className="min-h-[30vh] prose max-w-none"
      />
    </div>
  );
}
