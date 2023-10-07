import React from 'react'
import Container from '../component/Container'

function Dashboard({ userInfo, setFollowing, following }) {
  return (
    <>
      <Container userInfo={userInfo} setFollowing={setFollowing} following={following}/>
    </>
    
  )
}

export default Dashboard