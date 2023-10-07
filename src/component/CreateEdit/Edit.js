import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Edit() {
    const [value, setValue] = useState('');
  return (
    <div className='create-edit'>
        <input type='text' />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Edit