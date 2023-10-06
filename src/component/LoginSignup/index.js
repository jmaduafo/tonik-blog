import React from 'react'
import LoginSignup from './LoginSignup'
import Navbar from '../Navbar'

function index({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
  return (
    <>
      <Navbar/>
      <section>
        <LoginSignup loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>
      </section>
    </>
    
  )
}

export default index