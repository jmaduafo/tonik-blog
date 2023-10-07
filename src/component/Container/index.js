import React from 'react'
import Container from './Container';

function index({ userInfo, setFollowing, following }) {
  return (
    <Container userInfo={userInfo} setFollowing={setFollowing} following={following}/>
  )
}

export default index