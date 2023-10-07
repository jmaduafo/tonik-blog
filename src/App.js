import { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import CreateEdit from './pages/CreateEdit';
import WrongPage from './component/WrongPage'
import Search from './pages/Search';
import Detail from './pages/Detail';


function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userInfo, setUserInfo ] = useState('')
  const [ following, setFollowing] = useState()
  
  
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard userInfo={userInfo} setFollowing={setFollowing} following={following}/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/login' element={<LoginSignup loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>}/>
        <Route path='/signup' element={<LoginSignup loggedIn={loggedIn} setLoggedIn={ setLoggedIn } userInfo={ userInfo } setUserInfo={setUserInfo}/>}/>
        <Route path='/create' element={<CreateEdit/>}/>
        <Route path='/edit' element={<CreateEdit/>}/>
        <Route path='/search/:searchParams' element={<Search/>}/>
        <Route path='/post/:postId' element={<Detail/>}/>
        <Route path='*' element={<WrongPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
