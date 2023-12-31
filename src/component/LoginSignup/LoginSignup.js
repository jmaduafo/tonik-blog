import React from 'react'
import './login-signup.scss'
import Login from './Login'
import Signup from './Signup'
import { registerBackground } from '../../utils/randomBackground'

function LoginSignup({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
  
  function loginSignUp() {
    if (window.location.pathname === '/login') {
      return <Login loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>
    } else if (window.location.pathname === '/signup') {
      return <Signup loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>
    }
  }

  return (
    <div className='login-signup' style={{ backgroundImage: 'url(' + registerBackground().image + ')'}}>
      <div className='cover'></div>
      <div className='login-signup-card'>
          <div className='gif-image' style={{ backgroundImage: 'url(' + registerBackground().image + ')'}}>
          </div>
          <div className='login-signup-content'>
              { loginSignUp() }
          </div>
      </div>
        
    </div>
  )
}

export default LoginSignup