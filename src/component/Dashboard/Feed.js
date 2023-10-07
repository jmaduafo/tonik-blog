import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, where, orderBy, getDocs } from 'firebase/firestore'
import './feed.scss'

function Feed({ userInfo, setFollowing, following, selected }) {
  const [ showFeed, setShowFeed ] = useState()

  // function displayFeed() {
  //   if (selected === 'following') {
  //     const followRef = query(collection(db, 'posts'), where('user-id', 'in', following))

  //     async function getFeed() {
  //       const querySnapshot = await getDocs(followRef);

  //       let getPosts = []
  //       querySnapshot?.forEach((doc) => {
  //         getPosts.push(doc.data())
  //       });

  //       setShowFeed(getPosts)
  //     }
  //     getFeed() 
  //   } else {
  //     const feedRef = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))

  //     async function getFeed() {
  //       const querySnapshot = await getDocs(feedRef);
        
  //       let getPosts = []
  //       querySnapshot?.forEach((doc) => {
  //         getPosts.push(doc.data())
  //       });

  //       setShowFeed(getPosts)
  //     }
  //     getFeed() 
  //   }
  // }

  // useEffect(function() {
  //   displayFeed()
  // }, [])

  return (
    <section className='feed-section'>
      <div className='feed-container'>
        <div>
          
        </div>
      </div>
    </section>
  )
}

export default Feed