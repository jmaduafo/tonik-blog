import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate} from 'react-router-dom'

function Login({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage] = useState('')

    const [ userCred, setUserCred ] = useState('')

    let navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (!email.length || !password.length) {
            setErrorMessage('Email or password fields cannot be empty')
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage('Something went wrong')
                
            });

            
            
        }


    } 
  return (
    <div>
        <h5>Enter your login<br/> credentials below</h5>
        <form onSubmit={handleSubmit}>
            { errorMessage.length ? <div className='error-message'>
                <p>{errorMessage}</p>
            </div> : ''}
            <div className='input-section'>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email'/>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your password'/>
            </div>
            <p>Don't have an account? <Link to='/signup'><span>Create an account</span></Link></p>
            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default Login