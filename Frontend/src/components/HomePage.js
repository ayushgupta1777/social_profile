// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Admin from '../system/admin';
import Button from 'antd/lib/button';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
          const response = await axios.get('http://localhost:3001/api/user', {
            headers: { 'x-auth-token': token },
          });
          setUser(response.data);
          console.log('response in home page ', response.data);
        }
      } catch (error) {
        console.error('User data fetch failed:', error.response.data.error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div>
      <p>Welcome, !</p>
      <h2>Welcome to the Home Page</h2>
      {user ? (
        <div>
          <Link to="/admin">
            <Button>Admin</Button>
          </Link>
          <p>User ID: {user.userId}</p>
          <p>Username: {user.username}</p>
          <button onClick={() => navigate('/admin')}>Go to Admin</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access user information.</p>
      )}

      {/* Conditionally render the <Routes> component */}
      {user && (
        
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
      )}
    </div>
  );
};

export default HomePage;
