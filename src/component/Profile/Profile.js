import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser';
import { auth, db } from '../../firebase/config'
import { query, collection, where, updateDocs, getDocs } from 'firebase/firestore'
import { timestamp } from '../../utils/timestampConverter';
import ContentLoader from "react-content-loader"
import './profile.scss'

function Profile() {
    const [ profileInfo, setProfileInfo ] = useState() 
    const [ userInfo, setUserInfo ] = useState()
    const { userId } = useParams()

    function getUserPosts() {
        if (window.location.pathname.includes('/user')) {
            const postRef = query(collection(db, "posts"), where("user_id", "==", auth?.currentUser?.uid));
            const userRef = query(collection(db, "users"), where("id", "==", auth?.currentUser?.uid));
            
            try {
                async function getProfile() {
                    const postSnap = await getDocs(postRef);
                    const userSnap = await getDocs(userRef);
    
                    const profile = [];
                    postSnap.forEach(doc => {
                        profile.push({...doc.data(), id: doc.id})
                    })

                    setProfileInfo(profile)

                    const user = [];
                    userSnap.forEach(doc => {
                        user.push(doc.data())
                    })
    
                    setUserInfo(user)
                }
                getProfile()
            } catch (err) {
                console.log(err)
            }
        } else {
            const postRef = query(collection(db, "posts"), where("user_id", "==", userId));
            const userRef = query(collection(db, "users"), where("id", "==", userId));

            try {
                async function getUserProf() {
                    const postSnap = await getDocs(postRef);
                    const userSnap = await getDocs(userRef);
    
                    const profile = [];
                    postSnap.forEach(doc => {
                        profile.push({...doc.data(), id: doc.id})
                    })

                    setProfileInfo(profile)

                    const user = [];
                    userSnap.forEach(doc => {
                        user.push(doc.data())
                    })
    
                    setUserInfo(user)
                }
                getUserProf()
            } catch (err) {
                console.log(err)
            }
        }  
    }

    function followingRender(document) {
        if (document.user_id === auth?.currentUser?.uid) {
          return <Link to={`/edit/${document.user_id}/${document.id}`}><i title='Edit' className='bx bx-message-square-edit' ></i></Link>
        } else {
          return <p>Follow</p>
        }
      }

    useEffect(function() {
        getUserPosts()
    }, [userId])

  return (
    <section>
        <div className='profile-section'>
            <div className='top-banner'>
                {!userInfo ? <ContentLoader 
                                speed={2}
                                width={800}
                                height={124}
                                viewBox="0 0 800 124"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="9" y="85" rx="3" ry="3" width="108" height="9" /> 
                                <rect x="414" y="7" rx="3" ry="3" width="180" height="14" /> 
                                <rect x="9" y="100" rx="3" ry="3" width="158" height="7" /> 
                                <circle cx="40" cy="43" r="36" />
                            </ContentLoader> : 
                    userInfo?.map(user => {
                    return (
                        <>
                        <div className='profile-user' key={user.id}>
                            <div className='user-photo'>
                                
                            </div>
                            <div className='user-joined'>
                                <p>{user.username}</p>
                                <p>&#183;</p>
                                <p>Joined on {timestamp(user.timestamp?.seconds) !== 'Invalid Date' && timestamp(user.timestamp?.seconds) }</p>
                            </div>
                            <div className='user-following'>
                                <p>26 followers</p>
                                <p>1 following</p>
                            </div>
                        </div>
                        <div className='follow-edit'>
                            <p>{window.location.pathname.includes('/user') ? <Link><i className='bx bxs-edit-alt' ></i></Link> : 'Follow'}</p>
                        </div>
                        </>
                    )
                })}
                
            </div>
            <div className='profile-container'>
                {!profileInfo ? [1, 2, 3, 4].map(placeholder => {
                    return (
                        <ContentLoader 
                            speed={2}
                            width={800}
                            height={960}
                            viewBox="0 0 800 960"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            key={placeholder}
                        >
                            <circle cx="57" cy="33" r="32" /> 
                            <rect x="321" y="15" rx="2" ry="2" width="247" height="15" /> 
                            <rect x="376" y="39" rx="2" ry="2" width="193" height="10" /> 
                            <rect x="28" y="83" rx="2" ry="2" width="552" height="668" /> 
                            <rect x="29" y="780" rx="0" ry="0" width="548" height="26" /> 
                            <rect x="30" y="813" rx="0" ry="0" width="545" height="12" /> 
                            <rect x="30" y="831" rx="0" ry="0" width="548" height="11" /> 
                            <rect x="31" y="859" rx="0" ry="0" width="189" height="13" /> 
                            <rect x="508" y="859" rx="0" ry="0" width="64" height="11" />
                        </ContentLoader>
                    )
                }) : profileInfo?.length ? profileInfo?.map(profile => {
                    return (
                    <div className='feed-blog' key={profile.id}>
                    <div className='feed-top'>
                      <div className='profile-pic-name'>
                        <Link to={`/profile/${profile.user_id}`}>
                            <div className='profile-pic'>
                            {profile.user?.profileUrl ? <img src={profile.user?.profileUrl} alt={profile.id}/> : <i className='bx bxs-user'></i>}
                            </div>
                        </Link>
                        <div className='username-date'>
                          <Link to={`/profile/${profile.user_id}`}><p>{profile.user && profile.user?.username}</p></Link>
                          {timestamp(profile.timestamp?.seconds) === 'Invalid Date' ? <p></p> : <p>{timestamp(profile.timestamp?.seconds)}</p>}
                        </div> 
                      </div>
                      <div className='following'>
                        {followingRender(profile)}
                      </div>
                    </div>
                    <Link to={`/post/${profile.user_id}/${profile.id}`}>
                      <div className='display'>
                        <div className='image'>
                          {profile.imageUrl && <img src={profile.imageUrl} alt={profile.id}/>}
                        </div>
                        <div className='header-text'>
                          <h6>{profile.title}</h6>
                        </div>
                        <div>
                          {profile.content?.length > 120 ? parse(profile.content?.substring(0, 121) + '...') :  parse(profile.content)}
                        </div>
                      </div>
                    </Link>
                    <div className='feed-bottom'>
                      <div className='comment-save-view'>
                        <div className='comment-save'>
                          <div>
                            <i className='bx bxs-message-rounded-dots' ></i>
                            <p>{profile.commentCount ? profile.commentCount : '0'} comment{profile.commentCount && profile.commentCount === 1 ? '' : 's'}</p>
                          </div>
                          <div>
                            <i className='bx bxs-bookmark'></i>
                            <p>0 saves</p>
                          </div>
                        </div>
                        <div className='view'>
                          <p>{profile.views ? profile.views + ' views' : '0 views'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                    )
                }) 
                : <div className='no-posts'>No posts created</div>}
            </div>
        </div>
    </section>
  )
}

export default Profile