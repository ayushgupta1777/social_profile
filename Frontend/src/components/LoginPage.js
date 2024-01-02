// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });

      if (response && response.data) {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        console.log('Received token:', response.data.token);
        navigate('/admin');
        // Proceed with handling the response data
      } else {
        console.error('Response or response data is undefined');
      }

      // localStorage.setItem('token', response.data.token);
      // navigate('/'); // Use navigate instead of history.push
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Login failed:', error.response.data.error);
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
