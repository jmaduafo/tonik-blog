import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Create({ setTitle, title, setValue, value, setTags, tags, setImage, image}) {
    
    const [ module, setModule ] = useState({
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
    })

    function handleImageChange(e) {
      if (e.target.files[0]) {
        setImage(e.target.files[0])
      }
    }

    useEffect(function() {
        
    }, [value])

  return (
    <div className='create-edit'>
        <input id='create-input' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input id='file-input' type='file' accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleImageChange}/>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Create