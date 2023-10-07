import React from 'react'
import SuggestedUsers from './SuggestedUsers'
import BlogsForYou from './BlogsForYou'
import Feed from './Feed'
import './dashboard.scss'

function index({ userInfo, setFollowing, following }) {
  return (
      <div className='dashboard-all'>
        <div className='feed'>
          <Feed userInfo={userInfo} setFollowing={setFollowing} following={following}/>
        </div>
        <div className='users-blogs'>
          <SuggestedUsers userInfo={userInfo} setFollowing={setFollowing} following={following}/>
          <BlogsForYou userInfo={userInfo} setFollowing={setFollowing} following={following}/>
        </div>
      </div>
  
  )
}

export default index