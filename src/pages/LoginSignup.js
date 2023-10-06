import React from 'react'
import LoginSignUpComp from '../component/LoginSignup'

function LoginSignup({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
  
  return (
    <LoginSignUpComp loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>
  )
}

export default LoginSignup