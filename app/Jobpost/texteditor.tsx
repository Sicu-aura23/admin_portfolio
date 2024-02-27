"use client"
// import { useRef, useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import * as Emoji from "quill-emoji";
// // import { markdownToHtml, htmlToMarkdown } from "./Parser";

// import "react-quill/dist/quill.snow.css";
// import "quill-emoji/dist/quill-emoji.css";

// Quill.register("modules/emoji", Emoji);

// export interface EditorContentChanged {
//   html: string;
//   markdown: string;
// }

// export interface EditorProps {
//   value?: string;
//   onChange?: (changes: EditorContentChanged) => void;
// }
// const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1,2,3,4,5,6,] } ,{ 'font': [] }],
//         [{ 'size': [] }],
//         ['bold', 'italic', 'underline'],
//         [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//         ['link', 'image', 'video'],
//         ['clean'],
//         ['emoji']
//       ],
//     },

//     'emoji-toolbar': true,
//     'emoji-textarea': false,
//     'emoji-shortname': true
//   };
  
//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image', 'video',
//     'emoji'
//   ];
// export default function Editor(props: EditorProps) {
//   const [value, setValue] = useState<string>("");
//   const reactQuillRef = useRef<ReactQuill>(null);

//   const handleChange = (html: string) => {
//     setValue(html);
//   };

//   return (
//     <div className="text-editor">

  
    
//             <ReactQuill
//               ref={reactQuillRef}
//               theme="snow"
//               modules={modules}
//               formats={formats}
//               value={value}
//               onChange={handleChange}
//             />
      
//     </div>
//   );
// }
import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};

export default MyEditor;


