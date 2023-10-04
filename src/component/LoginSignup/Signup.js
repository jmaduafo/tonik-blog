import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Signup({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    let navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (!email.length || !password.length) {
            setErrorMessage('Email or password fields cannot be empty')
        } else {

            createUserWithEmailAndPassword(auth, email, password)
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

        console.log(userInfo)
    }   

  return (
    <div>
        <h5>Join our community today and share your thoughts</h5>
        <form onSubmit={handleSubmit}>
            { errorMessage.length ? <div className='error-message'>
                <p>{errorMessage}</p>
            </div> : ''}
            <div className='input-section'>
                <input type='text' value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder='Your username'/>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email'/>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your password'/>
            </div>
            <p>Already registered? <Link to='/login'><span>Log in</span></Link></p>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup