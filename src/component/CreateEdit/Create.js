import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Create({ setTitle, title, setValue, value, setTags, tags}) {
    
    const [ module, setModule ] = useState({
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
    })

    useEffect(function() {
        
    }, [value])

  return (
    <div className='create-edit'>
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Create