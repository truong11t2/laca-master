import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCE({ value, onEditorChange }) {
  const editorRef = useRef(null);
  return (
    <>
      <Editor
        apiKey="lffhtpwr6n0o1zfxxzv0dx34eyio79pamxvrqjbier4jcv8s"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          resize: "both",
          height: 800,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={onEditorChange}
      />
    </>
  );
}
