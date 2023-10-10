import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Edit({ setTitle, title, setValue, value, setTags, tags, setImage, image }) {
    const [ module, setModule ] = useState({
        toolbar: [
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['link', 'image'],
          [{ 'align': [] }],
          ['clean']
        ],
    })

  return (
    <div className='create-edit'>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Edit