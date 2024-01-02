import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const Admin = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boxes, setBoxes] = useState([]);

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

  const addBox = () => {
    axios.post('http://localhost:3001/api/add-box', { title, content })
      .then((response) => {
        setBoxes([...boxes, response.data]);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Failed to add a box:', error);
      });
  };
  

  return (
    <div>
      <h1>hi admin 🔧</h1>
    {user && user.role === 'admin' && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={addBox}>Add Article</button>
        </div>
      )}
      <h1>YOU ARE NOT ALLOW ☠️</h1>
      </div>
      
  );
};

export default Admin;
