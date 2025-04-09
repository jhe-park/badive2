'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default function ToastEditor() {
  return <Editor initialValue="Hello, React 19!" previewStyle="tab" height="600px" initialEditType="markdown" useCommandShortcut={true} />;
}
