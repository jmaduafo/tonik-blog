import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import CreateEdit from '../CreateEdit'
import Dashboard from '../Dashboard'
import Profile from '../Profile'
import Detail from '../Detail'
import { Link } from 'react-router-dom'
import './container.scss'
import '../Sidebar/sidebar.scss'

function Container() {
    const [ selected, setSelected ] = useState('for you')
    function renderPage() {
        let path = window.location.pathname;

        if (path === '/dashboard') {
            return <Dashboard/>
        } else if (path === '/create' || path === '/edit') {
            return <CreateEdit/>
        } else if (path.includes('/profile')) {
            return <Profile/>
        } else if (path.includes('/search')) {
            return <Dashboard path={'search'}/>
        } else if (path.includes('/post')) {
            return <Detail/>
        }
    }

  return (
    <div className='container-div'>
        <div className='sidebar'>
            <Sidebar/>
        </div>
        <div className='main-stuff'>
            <div className='post-select-button'>
                <div className='post-select'>
                    {/* Rendering out select buttons with click functionality */}
                    {['For You', 'Following'].map(select => {
                        return (
                            <div key={select} onClick={(e) => {setSelected(e.target.innerText)}} 
                            className={selected.toLowerCase() === select.toLowerCase() ? 'select active' : 'select'}>
                                <p>{select}</p>
                            </div>
                        )
                    })}
                </div>
                <Link to='/create'><div className='main-button'>
                    <i className='bx bxs-plus-circle'></i>
                    <button>Create Post</button>
                </div>
                </Link>
            </div>
            {renderPage()}
        </div>
       
    </div>
  )
}

export default Container