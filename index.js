// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/database.js';
// import userRoute from './routes/userRoute.js';
// import messageRoute from './routes/messageRoute.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import http from 'http'; // Import http module
// import { Server } from 'socket.io'; // Import socket.io

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express(); // Create express app
// const PORT = process.env.PORT || 5000;

// // Middleware setup
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // CORS setup
// const allowedOrigins = ['https://chat-app-frontend-s2hr.vercel.app', 'https://chat-app-frontend-rkij.vercel.app'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// // Routes
// app.use('/api/v1/user', userRoute);
// app.use('/api/v1/message', messageRoute);

// // Default route (to handle 404 errors)
// app.get('/', (req, res) => {
//   res.send('Chat app backend is running!');
// });

// // Create HTTP server and integrate with Socket.io
// const server = http.createServer(app); // Create server with express app
// const io = new Server(server, { // Initialize Socket.io
//   cors: {
//     origin: allowedOrigins,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   },
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// // Socket.io connection handling (if needed)
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });

//   // Add more socket event handlers as needed
// });



const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database.js');
const userRoute = require('./routes/userRoute.js');
const messageRoute = require('./routes/messageRoute.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express(); // Create express app
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  'https://chat-app-frontend-s2hr.vercel.app',
  'https://chat-app-frontend-rkij.vercel.app',
  'http://localhost:3000' // For local development
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS - Origin not found in allowed list'));
    }
  },
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// Default route (to handle 404 errors)
app.get('/', (req, res) => {
  res.send('Chat app backend is running!');
});

// Create HTTP server and integrate with Socket.io
const server = http.createServer(app); // Create server with express app
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'], // Restrict to only necessary methods
    credentials: true,
  },
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Add more socket event handlers as needed
});
