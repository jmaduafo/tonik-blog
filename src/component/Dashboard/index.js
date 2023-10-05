import React from 'react'
import SuggestedUsers from './SuggestedUsers'
import BlogsForYou from './BlogsForYou'
import Feed from './Feed'
import './dashboard.scss'

function index() {
  return (
      <div className='dashboard-all'>
        <div className='feed'>
          <Feed/>
        </div>
        <div className='users-blogs'>
          <SuggestedUsers/>
          <BlogsForYou/>
        </div>
      </div>
  
  )
}

export default index