const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const jwtSecret = 'anything';

app.use(cors());
app.use(bodyParser.json());
const { modeluser } =require("./models/user")

mongoose.connect('mongodb+srv://ad:a1y2u3@cluster0.y0axid7.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Dummy user for demonstration purposes

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Authorization denied' });
  }

//   try {
//     const decoded = jwt.verify(token, 'secret');
//     console.log('Decoded user verg:', decoded.user);
//     req.user = decoded.user;
//     next();
try {
    // Decode the token without verification
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      return res.status(401).json({ error: 'Token is not valid' });
    }

    console.log('Decoded user:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try{
    const user =await modeluser.findOne({ username })

  // Check credentials
  if (user && bcrypt.compare(password, user.password)) {
    // Generate a token
    const token = jwt.sign({ userId: user.userId, username: user.username, role: user.role}, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
} catch(error){
  res.status(500).json({error:'server error during login'});
}
});

app.get('/api/admin-action', authenticateUser, (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ msg: 'Permission denied' });
  }

  res.json({ role: user.role, message: 'Admin action successful!' });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {

    const { userId,username, password } = req.body;
    try{
      const user = new modeluser({ userId,username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user: user });
  }catch(error){
    console.error('error ',error.message)
  }
});

  

  

  


// Protected endpoint to get user information
app.get('/api/user', authenticateUser, (req, res) => {
    try {
     console.log('Decoded user%:', req.user);
      const { userId, username, role} = req.user;
      res.json({ userId, username, role});
    } catch (error) {
      console.error('Error in /api/user endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
