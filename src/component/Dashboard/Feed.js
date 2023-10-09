import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, doc, where, orderBy, getDocs, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './feed.scss'
import parse from 'html-react-parser';
import { timestamp } from '../../utils/timestampConverter'

function Feed({ userInfo, setFollowing, following, selected }) {
  const [ showFeed, setShowFeed ] = useState()
  const [ toggle, setToggle ] = useState(false)

  function displayFeed() {
    if (selected === 'for you') {
      const feedRef = query(collection(db, "posts"), orderBy("timestamp", "desc"))


        async function getPosts() {
          const docSnap = await getDocs(feedRef)

          const posts = []

          docSnap.forEach(doc => {
            posts.push({...doc.data(), id: doc.id})
            
          })

          setShowFeed(posts)
          console.log(showFeed)
        }
        getPosts()
        // console.log(userPost)

        // showFeed?.forEach(feed => {
        //   console.log(feed)
        //   const userRef = query(collection(db, 'users'), where('id', '==', feed.user_id))

        //   async function getUsers() {
        //     const docSnap = await getDocs(userRef)

        //     const users = []

        //     docSnap.forEach(doc => {
        //       users.push({...doc.data(), })
              
        //     })
            

        //     setUserPost(users)
        //   }

        //   getUsers()

        // })
        // console.log(userPost)


    } else {
        // const followRef = query(collection(db, 'posts'), where("user_id", "in", following))

      
      //   onSnapshot(followRef, (snapshot) => {
      //     const posts = []
  
      //     snapshot.forEach(doc => {
      //         posts.push({...doc.data(), id: doc.id})
      //     })

      //     setShowFeed(posts)
      //     console.log(showFeed)
        
          
      // })

      
    }
  }

  function handleView(document) {
    const feedRef = doc(db, "posts", document.id)

    if (document.view) {
      async function getViews() {
        await updateDoc(feedRef, {
          view: document.view++
      })
      }

      getViews()
    } else {
      return
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
    displayFeed()
    console.log(selected)
  }, [selected])

  return (
    <section className='feed-section'>
      <div className='feed-container'>
        {showFeed?.map(feed => {
            return(
              <div className='feed-blog' key={feed.id}>
                <div className='feed-top'>
                  <div className='profile-pic-name'>
                    <Link to={`/profile/${feed.user_id}`}>
                    <div className='profile-pic'>
                    {feed.profileUrl ? <img src={feed.profileUrl} alt={feed.id}/> : <i class='bx bxs-user'></i>}
                    </div>
                    </Link>
                    <div className='username-date'>
                      <Link to={`/profile/${feed.user_id}`}><p>{feed.user && feed.user.username}</p></Link>
                      <p>{timestamp(feed.timestamp.seconds)}</p>
                    </div> 
                  </div>
                  <div className='following'>
                    {followingRender(feed)}
                  </div>
                </div>
                <Link to={`/post/${feed.user_id}/${feed.id}`} >
                  <div className='display' onClick={handleView(feed)}>
                    <div className='image'>
                      {feed.imageUrl && <img src={feed.imageUrl} alt={feed.id}/>}
                    </div>
                    <div className='header-text'>
                      <h6>{feed.title}</h6>
                    </div>
                    <div>
                      {feed.content.length > 120 ? parse(feed.content.substring(0, 121) + '...') :  parse(feed.content)}
                    </div>
                  </div>
                </Link>
                <div className='feed-bottom'>
                  <div className='comment-save-view'>
                    <div className='comment-save'>
                      <div>
                        <i className='bx bxs-message-rounded-dots' ></i>
                        <p>0 comments</p>
                      </div>
                      <div>
                        <i className='bx bxs-bookmark'></i>
                        <p>0 saves</p>
                      </div>
                    </div>
                    <div className='view'>
                      <p>0 views</p>
                    </div>
                  </div>
                </div>
              </div>
            )
        })}
      </div>
    </section>
  )
}

export default Feed