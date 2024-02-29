import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import EditorToolbar, { modules, formats } from "./toolbar";
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';

Quill.register('modules/emoji', require('quill-emoji').default);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface TextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value || '');

  const editorRef = useRef<ReactQuill>(null);

  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.getEditor().setContents(editorRef.current.getEditor().clipboard.convert(value || ''));
  //   }
  // }, [value]);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };


  return (
    
      // <ReactQuill
      
      // className='h-[30vh]'
      //   ref={editorRef}
      //   theme="snow"
      //   value={editorHtml}
      //   onChange={handleChange}
      //   modules={modules}
      //   formats={formats}
      //   placeholder="Write something amazing..."
      // />
  <>
  <EditorToolbar />
  <ReactQuill
    theme="snow"
    value={value}
    onChange={handleChange}
    placeholder={"Write something awesome..."}
    modules={modules}
    formats={formats}
  />
  
  </>
   
  );
};

export default TextEditor;
