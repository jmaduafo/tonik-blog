import { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import CreateEdit from './pages/CreateEdit';
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'


function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userInfo, setUserInfo ] = useState('')
  
  function pathNav() {
    let path = window.location.pathname;

    if (path === '/' || path === '/signup' || path === '/login' || path === '/dashboard') {
      return ''
    } else {
      return <Sidebar/>
    }
  }
  
  
  return (
    <div className="App">
      { pathNav() }
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/login' element={<LoginSignup loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>}/>
        <Route path='/signup' element={<LoginSignup loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>}/>
        <Route path='/create' element={<CreateEdit/>}/>
        <Route path='/edit' element={<CreateEdit/>}/>
      </Routes>
    </div>
  );
}

export default App;
