import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allowed origins for CORS
const allowedOrigins = ['https://chat-app-frontend-s2hr.vercel.app', 'https://chat-app-frontend-rkij.vercel.app'];

// CORS setup with multiple allowed origins
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Apply CORS options to your express app
app.use(cors(corsOptions));

// Preflight request handling for all routes
app.options('*', cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Start the server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
