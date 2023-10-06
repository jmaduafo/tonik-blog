import React from 'react'
import SuggestedUsers from './SuggestedUsers'
import BlogsForYou from './BlogsForYou'
import Feed from './Feed'
import './dashboard.scss'

function index({ userInfo }) {
  return (
      <div className='dashboard-all'>
        <div className='feed'>
          <Feed userInfo={userInfo}/>
        </div>
        <div className='users-blogs'>
          <SuggestedUsers userInfo={userInfo}/>
          <BlogsForYou userInfo={userInfo}/>
        </div>
      </div>
  
  )
}

export default index