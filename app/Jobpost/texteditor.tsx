"use client"
import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
// @ts-ignore
import * as Emoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";

Quill.register("modules/emoji", Emoji);
const font = Quill.import("attributors/style/font");
font.whitelist = ["Kode Mono", "Inika", "Arial", "Asap", "Kadwa"];
Quill.register(font, true);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface TextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
}

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6] }, { font: ["Inika", "Kode Mono", "Arial", "Asap", "Kadwa"] }],
      [{ size: [] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "upper-alpha" }],
      ["link"],
      ["emoji"],
      [{ align: [] }],
    ],
  },
  "emoji-toolbar": true,
  "emoji-textarea": false,
  "emoji-shortname": true,
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "upper-alpha",
  "indent",
  "link",
  "image",
  "video",
  "emoji",
  "style",
  "align",
];
const customCSS = `
  .ql-indent-1 {
    padding-left: 3em;
    list-style-type: upper-alpha;
  }
  .ql-indent-1 li::before {
    content: counter(list-0, upper-alpha) '. ';
  }
`;
const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(value || "");

  useEffect(() => {
    setEditorHtml(value || "");
  }, [value]);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };

  return (
    <div className="text-editor w-[100%]">
       <style>{customCSS}</style>
      <ReactQuill
        className=" max-w-screen h-[25vh]"
        placeholder="Type job description here"
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorHtml}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextEditor;
