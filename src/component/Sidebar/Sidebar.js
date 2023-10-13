import React, { useState, useEffect } from 'react'
import './sidebar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import parse from 'html-react-parser';

function Sidebar() {
    const [ searchInput, setSearchInput ] = useState('');

    const [ postInfo, setPostInfo ] = useState();
    const [ userInfo, setUserInfo ] = useState();

    const [ filterPost, setFilterPost ] = useState();
    const [ filterUser, setFilterUser ] = useState();

    const [ keyDown, setKeyDown ] = useState(false)

    let navigate = useNavigate()
    let path = window.location.pathname

    function getUserPostData() {
        const userRef = collection(db, "users");
        const postRef = collection(db, "posts");

        async function userPostSearch() {
            const userSnap = await getDocs(userRef);
            const postSnap = await getDocs(postRef);

            const user = [];
            userSnap.forEach(doc => {
                user.push(doc.data());
            })

            setUserInfo(user)

            const post = [];
            postSnap.forEach(doc => {
                post.push({...doc.data(), id: doc.id});
            })

            setPostInfo(post)

        }

        userPostSearch()
    }

    function handleSearch(e) {

        setSearchInput(e.target.value)

        if (e.target.value.length) {
            setFilterPost(postInfo?.filter(post => post.content.toLowerCase().includes(e.target.value.toLowerCase()) ||
            post.title.toLowerCase().includes(e.target.value.toLowerCase())))

            setFilterUser(userInfo?.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
            setFilterPost('')
            setFilterUser('')
        }
        
    }

    function handleKeyDown(e) {

        if (e.key === 'Enter') {
            setKeyDown(prev => !prev)
        }
    }



    function handleLogout() {
        
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    } 

    useEffect(function() {
        getUserPostData()
        console.log(userInfo)
        console.log(postInfo)
    }, [path])



  return (
    <aside>
      <nav>
          <div className='tonik-logo'>
            <h4><Link to='/dashboard'>tonik</Link></h4>
          </div>
          <div className='tonik-search'>
            <i className='bx bx-search'></i>
            <input type='text' value={searchInput} placeholder='Search' onChange={handleSearch} onKeyDown={handleKeyDown}/>
          </div>
          <div className='search-display'>
            {filterUser?.length ? 
            <div className='search search-users'>
                <h6>Users</h6>
                {filterUser?.slice(0, 5).map(user => {
                    return (
                        <Link key={user.id} to={auth?.currentUser?.uid === user.id ? 'profile/user' : `/profile/${user.id}`}>
                            <div>
                                <div className='user-image'>
                                    {user.profileUrl ? <img src='' alt=''/> : <i className='bx bxs-user' ></i>}
                                </div>
                                <p>{user.username}</p>
                            </div>
                        </Link>
                        
                    )
                })}
            </div>
            : ''
            }
            {filterPost?.length ?
            <div className='search search-posts'>
                <h6>Posts</h6>
                {filterPost?.slice(0, 5).map(post => {
                    return (
                        <Link key={post.id} to={`/post/${post.user_id}/${post.id}`}>
                        <div>
                            <p className='title'>{post.title}</p>
                            {parse(post.content.substring(0, 55) + '...')}
                        </div>
                        </Link>
                    )
                })}
            </div> 
            : ''
            }
          </div>
          <div className='aside-links'>
            <ul>
                <li>
                    <i className='bx bxs-home' ></i>
                    <Link to='/dashboard'>Home</Link>
                </li>
                <li>
                    <i className='bx bxs-user-circle' ></i>
                    <Link to={`/profile/user`}>Profile</Link>
                </li>
                <li>
                    <i className='bx bxs-message-rounded-dots' ></i>
                    Notifications
                </li>
                <li onClick={handleLogout}>
                    <i className='bx bx-log-out'></i>
                    Logout
                </li>
            </ul>
          </div>
      </nav>
      
    </aside>
  )
}

export default Sidebar