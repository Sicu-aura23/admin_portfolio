// import React, {useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import EditorToolbar, { modules, formats } from "./toolbar";
// export interface EditorContentChanged {
//   html: string;
//   markdown: string;
// }

// export interface TextEditorProps {
//   value?: string;
//   onChange?: (html: string) => void;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
//   const [editorHtml, setEditorHtml] = useState(value || '');

//   const handleChange = (html: string) => {
//     setEditorHtml(html);
//     if (onChange) {
//       onChange(html);
//     }
//   };


//   return (
//   <>
//   <EditorToolbar />
//   <ReactQuill
//     theme="snow"
//     value={value}
//     onChange={handleChange}
//     placeholder={"Write something awesome..."}
//     modules={modules}
//     formats={formats}
//   />
  
//   </>
   
//   );
// };

// export default TextEditor;
import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
// @ts-ignore
import * as Emoji from "quill-emoji";
// import { markdownToHtml, htmlToMarkdown } from "./Parser";

import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";

Quill.register("modules/emoji", Emoji);
const font = Quill.import('attributors/style/font');
font.whitelist = ['Kode Mono','Inika','Arial','Asap','Kadwa'];
Quill.register(font, true);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface TextEditorProps {
  value?: string;
  onChange?: (html:string) => void;
}
const modules = {
  toolbar: {
    container: [
      [{ 'header': [1,2,3,4,5,6,] } ,{ 'font': ['Inika','Kode Mono','Arial','Asap','Kadwa'] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['emoji'],
      [{ 'align': [] }] // Add alignment options to the toolbar
    ],
  },

  'emoji-toolbar': true,
  'emoji-textarea': false,
  'emoji-shortname': true,    
};

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 
    'image', 'video',
    'emoji','style','align'
  ];
  const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
    const [editorHtml, setEditorHtml] = useState(value || '');
  
    const editorRef = useRef<ReactQuill>(null);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };
  return (
    <div className="text-editor w-[85vw]">
    <ReactQuill
    className="h-[30vh]"
    placeholder="Type job description here"

      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
    />

</div>
);
  }
  export default TextEditor;