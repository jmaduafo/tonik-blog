import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import CreateEdit from '../CreateEdit'
import Dashboard from '../Dashboard'
import Profile from '../Profile'
import Detail from '../Detail'
import { Link } from 'react-router-dom'
import './container.scss'
import '../Sidebar/sidebar.scss'
import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, orderBy, where, updateDoc, addDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Container({ userInfo, setFollowing, following }) {
    const [ selected, setSelected ] = useState('for you')
    const [ title, setTitle ] = useState('')
    const [ value, setValue ] = useState('')
    const [ tags, setTags ] = useState([])

    let navigate = useNavigate()

    function renderPage() {
        let path = window.location.pathname;

        if (path === '/dashboard') {
            return <Dashboard userInfo={userInfo} setFollowing={setFollowing} following={following} selected={selected}/>
        } else if (path.includes('/create') || path.includes('/edit')) {
            return <CreateEdit setTitle={setTitle} title={title} setValue={setValue} value={value} setTags={setTags} tags={tags}/>
        } else if (path.includes('/profile')) {
            return <Profile/>
        } else if (path.includes('/search')) {
            return <Dashboard userInfo={userInfo} setFollowing={setFollowing} following={following} path={'search'}/>
        } else if (path.includes('/post')) {
            return <Detail/>
        }
    }

    function handlePost(e) {
        e.preventDefault(); 

        if (!title.length || !value.length || value === '<p><br></p>' ) {
            toast.error('Entries must not be empty!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });

        } else {
            if (window.location.pathname.includes('/create')) {
                async function postContent() {
                    const postRef = collection(db, 'posts')
                    
                    try {
                        await addDoc(postRef, {
                            user_id: auth.currentUser.uid,
                            title: title,
                            content: value,
                        })

                        toast.success('Post successfully created!', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        navigate('/dashboard')

                        
                    } catch (err) {
                        toast.error('Something went wrong', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        console.log(err)
                    }
                    
                }

                postContent()
                
    
            } else if (window.location.pathname.includes('/edit')) {
                async function postContent() {
                    const postRef = collection(db, 'posts', where('user_id', '==', auth.currentUser.uid))
                    
                    try {
                        await updateDoc(postRef, {
                            user_id: auth.currentUser.uid,
                            title: title,
                            content: value,
                        })

                        toast.success('Post successfully created!', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        navigate('/dashboard')
                    } catch (err) {
                        toast.error('Something went wrong', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        console.log(err)
                    }
                    
                }

                postContent()
            }
            
        }
    }

  return (
    <div className='container-div'>
        <div className='sidebar'>
            <Sidebar/>
        </div>
        <div className='main-stuff'>
            <div className='post-select-button'>
                {window.location.pathname === '/dashboard' ? 
                < div className='display-select'>
                    <div className='post-select'>
                        {/* Rendering out select buttons with click functionality */}
                        {['For You', 'Following'].map(select => {
                            return (
                                <div key={select} onClick={(e) => {setSelected(e.target.innerText)}} 
                                className={selected.toLowerCase() === select.toLowerCase() ? 'select active' : 'select'}>
                                    <p>{select}</p>
                                </div>
                            )
                        })}
                    </div>
                    <Link to={`/create/${auth.currentUser.uid}`}><div className='main-button'>
                        <i className='bx bxs-plus-circle'></i>
                        <button>Create Post</button>
                    </div>
                    </Link>
                </div>
                : 
                <div className='post-button'>
                   <div className='main-button right'>
                    { window.location.pathname.includes('/create') || window.location.pathname.includes('/edit') ? 
                    <>
                        <i className='bx bxs-send'></i>
                        <button onClick={handlePost}>Send</button>
                    </> :
                    <Link to={`/create/${auth.currentUser.uid}`}>
                    <>
                        <i className='bx bxs-plus-circle'></i>
                        <button>Create Post</button>
                    </>
                    </Link> 
                    }
                    </div>
                    
                </div>}
            </div>
            <div className='main-content'>
                {renderPage()} 
                <ToastContainer/> 
            </div>
            
        </div>
       
    </div>
  )
}

export default Container