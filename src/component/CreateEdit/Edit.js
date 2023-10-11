import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { query, doc, getDoc } from 'firebase/firestore';
import parse from 'html-react-parser';

function Edit({ setTitle, title, setValue, value, setTags, tags, setImage, image }) {
  const { userId, postId } = useParams();
  const [ editDoc, setEditDoc ] = useState();

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

    function editValue() {
      const getEditRef = doc(db, "posts", postId);

      async function getPost() {
        const docSnap = await getDoc(getEditRef);

        setEditDoc(docSnap.data())
      }

      getPost()
    }

    useEffect(function() {
      editValue();
      console.log(editDoc)
    }, [])

  return (
    <div className='create-edit'>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Edit