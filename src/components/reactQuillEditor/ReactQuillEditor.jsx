'use client'
import React from 'react'
import hljs from 'highlight.js';
import "highlight.js/styles/atom-one-dark.css";
import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
    syntax: { highlight: text => hljs.highlightAuto(text).value },
    toolbar:[
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
];


const ReactQuillEditor = ({ value, onChange }) => {

    return (
        <ReactQuill 
            theme="snow" 
            modules={modules} 
            formats={formats} 
            value={value}
            onChange={onChange}
        />
    );
};

export default ReactQuillEditor