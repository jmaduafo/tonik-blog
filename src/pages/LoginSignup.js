import React from 'react'
import LoginSignUp from '../component/LoginSignup'

function LoginSignup({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
  return (
    <LoginSignUp loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>
  )
}

export default LoginSignup