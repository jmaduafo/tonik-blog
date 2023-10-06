import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { onSnapshot, query, collection, where, orderBy, limit, getDocs } from 'firebase/firestore'

function SuggestedUsers({ userInfo }) {
  const [ suggestedUsers, setSuggestedUsers] = useState()

  function suggested() {
    // Check in users database, query by timestamp, arrange in descending order and get the top 5
    const users = query(collection(db, 'users'), orderBy("timestamp", "desc"), limit(5))

    onSnapshot(users, (snapshot) => {
        const suggestedUsers = []

        snapshot.forEach(doc => {
            suggestedUsers.push(doc.data())
        })
       
        setSuggestedUsers(suggestedUsers?.filter(user => user.id != auth.currentUser.uid))
    }) 

    }

    useEffect(function() {
      suggested()
    }, [])

    
  return (
    <div>
      {suggestedUsers?.map(users => {
        return (
          <div key={users.username}>
            <p>{users.username}</p>
          </div>
        )
      })}
    </div>
  )
}

export default SuggestedUsers