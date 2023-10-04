import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import CreateEdit from './pages/CreateEdit';


function App() {
  const [ userInfo, setUserInfo ] = useState()

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={Home}/>
        <Route path='/dashboard' element={Dashboard}/>
        <Route path='/profile/:userId' element={Profile}/>
        <Route path='/login' element={LoginSignup}/>
        <Route path='/signup' element={LoginSignup}/>
        <Route path='/create' element={CreateEdit}/>
        <Route path='/edit' element={CreateEdit}/>
      </Routes>
      App
    </div>
  );
}

export default App;
