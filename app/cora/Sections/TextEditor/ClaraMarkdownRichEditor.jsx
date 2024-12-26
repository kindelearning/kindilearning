"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Include Quill's styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Quill modules (toolbar, etc.)
const modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      { header: "3" },
    
      { align: [] },
    ],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["blockquote", "code-block"],
    ["clean"], // For clearing the content
  ],
  clipboard: {
    matchVisual: false,
  },
};

// Custom function to handle table creation
const insertTable = (editor) => {
  const tableHtml = `<table><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>`;
  const range = editor.getSelection();
  editor.clipboard.dangerouslyPasteHTML(range.index, tableHtml);
};

const ClaraMarkdownRichEditor = ({
  value,
  onChange,
  placeholder = "Enter text here...",
  readOnly = false,
}) => {
  const handleChange = (content) => {
    onChange(content); // Call parent handler to update state
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Quill) {
      const quill = ReactQuill.getEditor();
      const toolbar = quill.getModule("toolbar");

      // Ensure the table button handler is properly added
      toolbar.addHandler("table", () => insertTable(quill));
    }
  }, []);

  return (
    <div className="text-editor-container">
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full max-h-96 font-fredoka overflow-auto border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default ClaraMarkdownRichEditor;
