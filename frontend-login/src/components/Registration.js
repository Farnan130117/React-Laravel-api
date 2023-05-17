import React, { useState } from 'react';
import axios from 'axios';

export default function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleRegistration = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/register', {
          name,
          email,
          password,
        });
  
        const { message } = response.data;
  
        // Clear input fields
        setName('');
        setEmail('');
        setPassword('');
  
        // Display success message
        setMessage(message);
        setError(null);
      } catch (error) {
        // Handle registration error
        setMessage(null);
        setError('Registration failed. Please try again.');
      }
    };
  
    return (
      <div className="container">
        <h2>Registration</h2>
        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button onClick={handleRegistration}>Register</button>
      </div>
    );
  }
  
  
  

