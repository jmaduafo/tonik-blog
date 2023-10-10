import React from 'react'
import './by-tags.scss'

function ByTags() {
  return (
    <section>
      <div className='discovery-section'>
        <p className='discovery-header'>Discover More</p>
        <div className='discovery'>
           <div className='info'>
              <h4>Breakfast at Tiffany’s: How it’s Caused Controversy...</h4>
              <p className='content'>In fermentum ligula id arcu tempor vulputate. Nam pulvinar odio ipsum, quis aliquet ligula dignissim at. Sed convallis ligula vel felis molestie...</p>
              <p>by <span style={{ fontWeight: '600'}}>Caribou</span></p>
              <button className='discovery-btn'>Read More</button>
           </div>
           <div className='image'>
              <img src='https://res.cloudinary.com/dyxxn831a/image/upload/v1696955364/tonik/womanizer-toys-gmFZ0qxd_cg-unsplash_ghm6n2.jpg' alt='discover more'/>
           </div>
        </div>
      </div>
    </section>
  )
}

export default ByTags