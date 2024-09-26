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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allowed origins for CORS
const allowedOrigins = ['https://chat-app-frontend-s2hr.vercel.app', 'https://chat-app-frontend-rkij.vercel.app'];

// CORS setup with multiple allowed origins
const corsOptions = {
  origin: (origin, callback) => {
    // If the request comes from an allowed origin or there's no origin (for non-browser requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, auth headers)
};

// Apply CORS options to your express app
app.use(cors(corsOptions));

// Preflight request handling for all routes
app.options('*', cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Start the server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
