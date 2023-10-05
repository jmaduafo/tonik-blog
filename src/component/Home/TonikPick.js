import React from 'react'
import './tonik-pick.scss'


function TonikPick() {
  return (
    <section>
      <div className='tonik-pick'>
        <div className='tonik-main-pic'>
          <div className='cover'></div>
          <div className='text'>
            <div>
              <p>Tonik's Pick</p>
            </div>
            <div>
              <h1>Get to Know Your Coochie</h1>
            </div>
            
          </div>
        </div>
        <div className='tonik-pick-user'>
          <div className='user'>
            <div className='user-pic'>
              <img src='' alt=''/>
            </div>
            <div className='name-date'>
              <p>yoni_scones</p>
              <p>Jun 10</p>
            </div>
          </div>
          <div className='user-button'>
            <button>Read More</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TonikPick