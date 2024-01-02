// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';
import Admin from './system/admin';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<Registration/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Admin />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
