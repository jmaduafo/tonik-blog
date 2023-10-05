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
            <h4><Link to='/dashboard'>tonik</Link></h4>
          </div>
          <div className='tonik-search'>
            <i className='bx bx-search'></i>
            <input type='text' placeholder='Search'/>
          </div>
          <div className='search-display'>
            <div className='search search-users'>
                <h6>Users</h6>
                <div>
                    <div className='user-image'>
                        <img src='' alt=''/>
                    </div>
                    <p>porter-house</p>
                </div>
                <div>
                    <div className='user-image'>
                        <img src='' alt=''/>
                    </div>
                    <p>porter-house</p>
                </div>
                <div>
                    <div className='user-image'>
                        <img src='' alt=''/>
                    </div>
                    <p>porter-house</p>
                </div>
            </div>
            <div className='search search-posts'>
                <h6>Posts</h6>
                <div>
                    <p>Etiam cursus arcu eget fringilla varius. Pellentesque ac maximus orci...</p>
                    <p>by porter-house</p>
                </div>
                <div>
                    <p>Etiam cursus arcu eget fringilla varius. Pellentesque ac maximus orci...</p>
                    <p>by porter-house</p>
                </div>
                <div>
                    <p>Etiam cursus arcu eget fringilla varius. Pellentesque ac maximus orci...</p>
                    <p>by porter-house</p>
                </div>
            </div>
            <div className='search search-tags'>
                <h6>Tags</h6>
                <div>
                    <p>Relationship</p>
                </div>
                <div>
                    <p>Philosphy</p>
                </div>
                <div>
                    <p>Family</p>
                </div>
            </div>
          </div>
          <div className='aside-links'>
            <ul>
                <li>
                    <i className='bx bxs-home' ></i>
                    <Link to='/dashboard'>Home</Link>
                </li>
                <li>
                    <i className='bx bxs-user-circle' ></i>
                    <Link to={`/profile/user`}>Profile</Link>
                </li>
                <li>
                    <i className='bx bxs-message-rounded-dots' ></i>
                    Notifications
                </li>
                <li onClick={handleLogout}>
                    <i className='bx bx-log-out'></i>
                    Logout
                </li>
            </ul>
          </div>
      </nav>
      
    </aside>
  )
}

export default Sidebar