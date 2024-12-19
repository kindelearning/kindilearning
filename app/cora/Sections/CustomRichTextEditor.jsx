"use client";

import React, { useState } from "react";

const CustomRichTextEditor = ({ value, onChange }) => {
  const [editorContent, setEditorContent] = useState(value || "");

  // Handle the changes in the editor content
  const handleEditorChange = (event) => {
    const newContent = event.target.innerHTML; // Get the HTML content
    setEditorContent(newContent);
    onChange({ target: { name: "content", value: newContent } });
  };

  // Basic toolbar action to format the selected text
  const handleAction = (action) => {
    document.execCommand(action, false, null);
  };

  return (
    <div>
      {/* Editor Toolbar */}
      <div>
        <button onClick={() => handleAction("bold")}>Bold</button>
        <button onClick={() => handleAction("italic")}>Italic</button>
        <button onClick={() => handleAction("underline")}>Underline</button>
        <button onClick={() => handleAction("strikeThrough")}>
          StrikeThrough
        </button>
        <button onClick={() => handleAction("justifyLeft")}>Left Align</button>
        <button onClick={() => handleAction("justifyCenter")}>
          Center Align
        </button>
        <button onClick={() => handleAction("justifyRight")}>
          Right Align
        </button>
      </div>

      {/* Content Editable Area */}
      <div
        contentEditable
        onInput={handleEditorChange}
        dangerouslySetInnerHTML={{ __html: editorContent }}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          marginTop: "10px",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default CustomRichTextEditor;
