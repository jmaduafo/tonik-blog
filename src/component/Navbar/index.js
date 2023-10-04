import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'

function index() {
  return (
    <header>
        <nav>
            <div className='tonik-logo'>
                <Link to='/'><h4>tonik</h4></Link>
            </div>
            <div>
                <Link to='/login'><p>Sign In</p></Link>
            </div>
        </nav>
    </header>
  )
}

export default index