import React from 'react';
import {Routes, Route, Link, useNavigate } from "react-router-dom";
import  { useState,useEffect } from 'react';
import axios from 'axios';



export default function Login() {
        const [token, setToken] = useState(sessionStorage.getItem('token'));
        const [user, setUser] = useState(null);
        const [error, setError] = useState(null);
        const [message, setMessage] = useState(null);
        const navigate = useNavigate();
        //Login Credential
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
      
        useEffect(() => {
          console.log(token,message,user);
        }, [token]);
      
       
      
        const handleLogin = async () => {
          try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
              // Add your login request payload here
             // email: 'farnan3@gmail.com',
             // password: 'password',
             email, password,
            });
      
            const { message, token, user } = response.data;
      
            // Store the token in sessionStorage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('message', message);
            sessionStorage.setItem('user', user);
      
            // Update state with the token and user info
            setToken(token);
            setMessage(message);
            setUser(user);
            // Reload the page
            // window.location.reload();
             navigate("/");
             window.location.reload();
           
          } catch (error) {
            // Handle login error
            setError('Login failed. Please try again.');
          }
        };
      
        const handleLogout = () => {
          // Get the token from sessionStorage
          const token = sessionStorage.getItem('token');
      
          // Make the logout API call
          axios
            .post('http://127.0.0.1:8000/api/auth/logout', null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              // Handle successful logout
              console.log(response.data.message);
      
              // Clear session storage and reset state
              sessionStorage.removeItem('token');
              setToken(null);
              setMessage(null);
              setUser(null);
              // Reload the page
             window.location.reload();
            })
            .catch(error => {
              // Handle logout error
              console.error(error);
            });
        };
      
        const handleEmailChange = (event) => {
          setEmail(event.target.value);
        };
      
        const handlePasswordChange = (event) => {
          setPassword(event.target.value);
        };
      
        return (
          <>
          
          <div>
            {token ? (
              <div className='container'>
                <h2>You are logged in!</h2>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
              {/* <div className='container'>
                <h2>Please log in to continue.</h2>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button onClick={handleLogin}>Login</button>
              </div> */}
              <div className='container'>
                  <div className="form-group">
                    <label >Email address</label>
                    <input type="email" value={email} onChange={handleEmailChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label >Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="password" placeholder="Password"/>
                  </div>
                  
                  <button  onClick={handleLogin} className="btn btn-primary">Submit</button>
                </div>

                
              </>
            )}
          </div>
          </>
        );
      }
  

