import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './socket/socket.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = ['https://chat-app-frontend-s2hr.vercel.app', 'https://chat-app-frontend-rkij.vercel.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
