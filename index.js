const express = require('express');
const cors = require('cors');
const connectDB = require('./dbconnect/dbconfig');



const app = express();
connectDB();

// Use environment variables for configuration
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// CORS configuration
app.use(cors({
  origin: CLIENT_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
  
// Middleware to parse JSON
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, req.body);
  next();
});



// Handle undefined routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error.' });
});

// Sample Route
app.get("/", (req, res) => {
  res.send("HSBC Backend is running");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));