import React from 'react'
import './sidebar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

function Sidebar() {
    let navigate = useNavigate()

  function handleLogout() {
    
    signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/')
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
  } 

  return (
    <aside>
      <nav>
          <div className='tonik-logo'>
                <Link to='/'><h4>tonik</h4></Link>
          </div>
          <div className='tonik-search'>
            <i className='bx bx-search'></i>
            <input type='text' />
          </div>
          <div className='search-display'>
            
          </div>
          <div className='aside-links'>
            <ul>
              <li><Link to='/dashboard'>Home</Link></li>
              <li><Link to={`/profile/user`}>Profile</Link></li>
              <li>Notifcations</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
      </nav>
      
    </aside>
  )
}

export default Sidebar