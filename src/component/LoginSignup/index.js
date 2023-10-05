import React from 'react'
import LoginSignup from './LoginSignup'
import Navbar from '../Navbar'

function index() {
  return (
    <>
      <Navbar/>
      <section>
        <LoginSignup/>
      </section>
    </>
    
  )
}

export default index