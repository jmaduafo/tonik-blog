import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, where, orderBy, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './feed.scss'
import parse from 'html-react-parser';

function Feed({ userInfo, setFollowing, following, selected }) {
  const [ showFeed, setShowFeed ] = useState()
  const [ userPost, setUserPost ] = useEffect()

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
        }
        getPosts()
        // console.log(userPost)

        // showFeed?.map(feed => {
        //   const userRef = query(collection(db, 'users'), where('id', '==', feed.user_id))

        //   async function getUsers() {
        //     const docSnap = await getDocs(userRef)

        //     const users = []

        //     docSnap.forEach(doc => {
        //       users.push(doc.data())
              
        //     })
            

        //     setUserPost(users)
        //   }

        //   getUsers()

          


        // })


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

  useEffect(function() {
    displayFeed()
    console.log(selected)
  }, [selected])

  return (
    <section className='feed-section'>
      <div className='feed-container'>
        {showFeed?.map(feed => {
            return(
              <Link to={`/post/${feed.user_id}/${feed.id}`} key={feed.id} >
              <div className='display'>
                <div className='image'>
                  {feed.imageUrl && <img src={feed.imageUrl} alt={feed.id}/>}
                </div>
                <h6>{feed.title}</h6>
                <div>
                  {feed.content.length > 120 ? parse(feed.content.substring(0, 121) + '...') :  parse(feed.content)}
                </div>
            </div>
            </Link>
            )
        })}
      </div>
    </section>
  )
}

export default Feed