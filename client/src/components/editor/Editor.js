import React, { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styleEditor.css";
import BlotFormatter from "quill-blot-formatter";

import { useSelector, useDispatch } from "react-redux";
import { uploadFile } from "../redux/actions/blogPostActions";
import { useEffect } from "react";

Quill.register("modules/blotFormatter", BlotFormatter);

const Editor = ({ value, onChange }) => {
  const quillRef = useRef();

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { imageUrl } = blogPostInfo;
  const dispatch = useDispatch();
  const handleImageInsert = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      let formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFile(formData));
    };
  };
  const handleVideoInsert = () => {
    console.log("Handling video inserting");
    let url = prompt("Enter Video URL: ");
    url = getVideoUrl(url);

    if (url != null) {
      const quill = quillRef.current.getEditor();
      let range = quill.getSelection();
      let position = range ? range.index : 0;
      quill.insertEmbed(position, "video", url);
      quill.setSelection(position + 1);
    }
  };

  function getVideoUrl(url) {
    let match =
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
      ) ||
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
      ) ||
      url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
    console.log(match[2]);
    if (match && match[2].length === 11) {
      return "https" + "://www.youtube.com/embed/" + match[2] + "?showinfo=0";
    }
    if ((match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))) {
      // eslint-disable-line no-cond-assign
      return (
        (match[1] || "https") + "://player.vimeo.com/video/" + match[2] + "/"
      );
    }
    return null;
  }

  useEffect(() => {
    if (imageUrl) {
      const quill = quillRef.current.getEditor();
      quill.focus();
      const range = quill.getSelection();
      let position = range ? range.index : 0;
      //quill.insertEmbed(position, 'image', { src: "http://localhost:5000/" + imageUrl.url, alt: imageUrl.fileName});
      quill.insertEmbed(position, "image", imageUrl.url);
      quill.setSelection(position + 1);
    }
  }, [imageUrl]);

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          // [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          ["link", "image", "video"],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"], // remove formatting button
        ],
        handlers: {
          image: handleImageInsert,
          video: handleVideoInsert,
        },
      },
      blotFormatter: {},
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={"Write something awesome..."}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
