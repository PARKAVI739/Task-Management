const express = require('express');
const connectDb = require('./config/db')
const taskRoutes = require('./routes/taskRoutes'); // Assuming your file is named taskRoutes.js
require('dotenv').config(); // Load environment variables from .env

const app = express();
const cors = require('cors');
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());


// Routes
app.use('/api', taskRoutes); // Use your task routes

// Start Server on Specified Port
const PORT = 5000; // Default to port 5000 if no PORT is specified in .env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDb();