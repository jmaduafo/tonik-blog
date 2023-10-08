import React from 'react'
import Create from './Create'
import Edit from './Edit'
import './create-edit.scss'

function index({ setTitle, title, setValue, value, setTags, tags, setImage, image}) {

  return (
    <div>
      {window.location.pathname.includes('/create') ? <Create setTitle={setTitle} title={title} setValue={setValue} value={value} setTags={setTags} tags={tags}
      setImage={setImage} image={image}/> : 
      <Edit setTitle={setTitle} title={title} setValue={setValue} value={value} setTags={setTags} tags={tags} setImage={setImage} image={image}/>}
    </div>
  )
}

export default index