import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase/config'
import { doc, getDocs, setDoc, query, where, collection } from 'firebase/firestore' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Signup({ setLoggedIn, loggedIn, userInfo, setUserInfo}) {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [ userCheck, setUserCheck] = useState()
    const [ verify, setVerify ] = useState()

    const [userVerify, setUserVerify] = useState(true)

    let navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
            async function usernameCheck() {
                const usernameValidation = query(collection(db, 'users'), where('username', '==', username))

                console.log(userVerify)
                const querySnapshot = await getDocs(query(usernameValidation));
                
                console.log(querySnapshot == verify)
                querySnapshot.forEach((doc) => {
                    
                    
                });
            }

            usernameCheck()

            // else if (!userVerify) {
            //     setErrorMessage('Sorry, this username is already taken')
            // }

            

            if (!email.length || !password.length) {
                setErrorMessage('Email or password fields cannot be empty')
            } else if (password.length < 6)  {   
                setErrorMessage('Password must be 6 characters or more')
            } else {
                
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
            
                    const user = userCredential.user;

                    // Linking auth with firestore database
                    async function verify() {
                        await setDoc(doc(db, 'users', user.uid), {
                            bio: '',
                            username: username,
                            posts: [],
                            savedPosts: [],
                            savedPostsCount: 0,
                            following: [],
                            followingCount: 0,
                            followersCount: 0,
                            commentCount: 0,
                            comments: [],
                            favoriteTags: [],
                            createdAt: user.metadata.creationTime

                        })

                        setUserCheck(user)
                    }


                    verify() 

                    console.log(user)
                    navigate('/dashboard')
    
                })
                .catch((error) => {
                    console.log(error)
                    setErrorMessage('Something went wrong')
                });

                setErrorMessage('')
                
                 
        }

       

        
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