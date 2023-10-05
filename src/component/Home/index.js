import React from 'react'
import TonikPick from './TonikPick'
import { Link } from 'react-router-dom'
import './home.scss'

function index() {
  return (
    <>
    <TonikPick/>
    <section>
      <div className='break-point'>
        <div>
          <h5>Quisque accumsan quam vitae ante lobortis vulputate.</h5>
        </div>
        <div>
          <p>Curabitur quam tellus, lacinia ut ornare et, vulputate et tellus. Cras condimentum libero ac dui mollis, ac dignissim enim posuere. Morbi quis est in tortor maximus elementum sit amet eu mi. Suspendisse semper eget ex a porttitor.</p>
        </div>
        <div>
          <Link to='/login'><button>Get Started</button></Link>
        </div>
      </div>
    </section>
    </>
    
    
  )
}

export default index