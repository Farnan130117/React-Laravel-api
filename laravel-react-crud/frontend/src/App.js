import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import View from './pages/View';
//import View from './pages/view'
import React,  { useEffect, useState }  from 'react';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    console.log(token);
  }, [token]);

  const handleLogin = () => {
    // Simulating a login action
    const fakeToken = 'your_fake_token_here';
    sessionStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    
  };

  const handleLogout = () => {
    // Simulating a logout action
    sessionStorage.removeItem('token');
    setToken(null);
  };
  return (
    
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">CRUD</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create">Create</Link>
        </li>
        
        
      </ul>
      
    </div>
  </nav>
  <div className='container my-2'>
      {token ? (
        <div>
          <h2>You are logged in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Please log in to continue.</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
    <div className="container my-2">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/view/:id' element={<View />} />
      </Routes>
    </div>
    </>
    
  );
}

export default App;
