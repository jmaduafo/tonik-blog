import React from 'react'
import Create from './Create'
import Edit from './Edit'
import './create-edit.scss'

function index() {

  return (
    <div>
      {window.location.pathname === '/create' ? <Create/> : <Edit/>}
    </div>
  )
}

export default index