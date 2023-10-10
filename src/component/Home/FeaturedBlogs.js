import React from 'react'
import './featured-blogs.scss'

function FeaturedBlogs() {
  return (
    <section>
      <div className='featured-blogs'>
        <p className='featured-header'>Feature Blogs</p>
        <div className='featured-container'>
        {[1, 2, 3].map((blogs, index) => {
          return(
            <div className='featured' key={blogs}>
              <div className='featured-image'>
                <img src='https://res.cloudinary.com/dyxxn831a/image/upload/v1696955672/tonik/Red-Neon-Aesthetic-Wallpaper-Desktop_cd2wye.jpg' alt={`feature${index + 1}`}/>
              </div>
              <div className='title'>
                <h5>Trigger Points for Lying</h5>
              </div>
              <div className='content'>
                <p>I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now...</p>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedBlogs