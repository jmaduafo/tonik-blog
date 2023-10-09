import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, orderBy, limit, updateDoc, doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './suggested-users.scss'

function SuggestedUsers({ userInfo, setFollowing, following }) {
  const [ suggestedUsers, setSuggestedUsers] = useState()
  
  

  function suggested() {
    // Check in users database, query by timestamp, arrange in descending order and get the top 5
    const users = query(collection(db, 'users'), orderBy("timestamp", "desc"), limit(6))

    onSnapshot(users, (snapshot) => {
        const suggestedUsers = []

        snapshot.forEach(doc => {
            suggestedUsers.push(doc.data())
        })
       
        if (auth.currentUser) {
          setSuggestedUsers(suggestedUsers?.filter(user => user.id !== auth.currentUser.uid))
        }
        
    }) 


    }

  
    async function followingUpdate(user) {
      let userFollowing = user.following;

      const userRef = doc(db, 'users', auth.currentUser.uid)


      // If user is clicked, check if user is added to the array
      // If user id is in array, then 

      if (!userFollowing.includes(user.id)) {
        let following = userFollowing.push(user.id)
        
        try {
          await updateDoc(userRef, {
            following: following,
            followingCount: userFollowing.length
          })
        } catch (err) {
          console.log(err)
        }

        console.log(userFollowing)
      } else {
        let unfollow = userFollowing.filter(filter => filter !== user.id)

        try {
          await updateDoc(userRef, {
            following: unfollow,
            followingCount: userFollowing.length
          })
        } catch (err) {
          console.log(err)
        }
        
        console.log(userFollowing)

      }

      setFollowing(userFollowing)
      console.log(following)
    }

    useEffect(function() {
      suggested()
      console.log(suggestedUsers)
    }, [])

    
  return (
    <div className='suggested-content'>
      <h5>Latest Users</h5>
      <div className='latest'>      
      {suggestedUsers?.map(user => {
        return (
          <div className='suggested-users' key={user.username}>
            <Link to={`/profile/${user.id}`}><div className='user-pics'>
              <img src='' alt=''/>
            </div>
            </Link>
            <div className='username-follow'>
              <p>{user.username}</p>
              <p onClick={() => {followingUpdate(user)}}> {following?.includes(user.id) ? <span>Following</span> : <span>Follow</span>}</p>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default SuggestedUsers