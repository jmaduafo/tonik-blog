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
import { onSnapshot, query, collection, orderBy, where, updateDoc, addDoc, getDocs, getDoc, doc, setDoc, serverTimestamp, limit } from 'firebase/firestore'
import { storage } from '../../firebase/config'
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Container({ userInfo, setFollowing, following }) {
    const [ selected, setSelected ] = useState('for you')
    const [ title, setTitle ] = useState('')
    const [ value, setValue ] = useState('')
    const [ image, setImage ] = useState(null)
    const [ tags, setTags ] = useState([])
    const [ userPostInfo, setUserPostInfo ] = useState()

    let navigate = useNavigate()

    function renderPage() {
        let path = window.location.pathname;

        

        if (path === '/dashboard') {
            return <Dashboard userInfo={userInfo} setFollowing={setFollowing} following={following} selected={selected}/>
        } else if (path.includes('/create') || path.includes('/edit')) {
            return <CreateEdit setTitle={setTitle} title={title} setValue={setValue} value={value} setTags={setTags} tags={tags}
            setImage={setImage} image={image}/>
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
        
        } else if (image === null) {
            toast.error('Please select a thumbnail image', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            if (window.location.pathname.includes('/create')) {
                const imageRef = ref(storage, `images/${image.name + Math.random() * 100000}`)
                uploadBytes(imageRef, image).then(() => {
                    getDownloadURL(imageRef)
                    .then(url => {
                        
                        async function postContent() {
                            const postRef = collection(db, 'posts')
                            try {
                                await addDoc(postRef, {
                                    user_id: auth?.currentUser?.uid,
                                    imageUrl: url,
                                    title: title,
                                    content: value,
                                    views: 0,
                                    commentCount: 0,
                                    timestamp: serverTimestamp()
                                })
        
                                
                            } catch (err) {
                                if (err === 'The value of property "content" is longer than 1048487 bytes.') {
                                    toast.error('Media is too large. Must be less than 1.05MB', {
                                        position: toast.POSITION.BOTTOM_RIGHT
                                    });
                                }

                                toast.error('Something went wrong', {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                });
        
                                
                                console.log(err)
                            }
                            
                        }
        
                        postContent()

                        async function userPostContent() {

                            const postRef = query(collection(db, 'posts'), orderBy("timestamp", "desc"), limit(1))

                            try {
                                async function postGet() {
                                    // Get latest post
                                    const docSnap = await getDocs(postRef)
                                    
    
                                    docSnap.forEach(docRef => {
                                        console.log(docRef.data())
                                        const userRef = doc(db, 'users', docRef.data().user_id)
    
                                       // Getting the user data from collection and pushing to an empty array
                                        async function userPost() {
                                            // Getting one doc
                                            const docSnap = await getDoc(userRef)

                                            // Use doc() when referencing a doc; collection() for collection
                                            const postReference = doc(db, 'posts', docRef.id)
                                            
                                            // Setting the user object and updating/adding it to existing post
                                            await updateDoc(postReference, {
                                                user: docSnap.data()
                                            })
                                        }
                                        userPost()                                     
                                    })
                                }  
                                postGet()

                                toast.success('Post successfully created!', {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                });

                                navigate('/dashboard')



                            } catch (err) {
                                console.log(err)
                            }
                              
                        }
                        userPostContent() 

                    })
                    .catch(err => {
                        console.log(err)
                    })

                })
                .catch(err => {
                    console.log(err)
                })
                
                
    
            } else if (window.location.pathname.includes('/edit')) {
                async function postContent() {
                    const postRef = collection(db, 'posts', where('user_id', '==', auth?.currentUser?.uid))
                    
                    try {
                        await updateDoc(postRef, {
                            user_id: auth?.currentUser?.uid,
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
                    <Link to={`/create/${auth?.currentUser?.uid}`}><div className='main-button'>
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
                    <Link to={`/create/${auth?.currentUser?.uid}`}>
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