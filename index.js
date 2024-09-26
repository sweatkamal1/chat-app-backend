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
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: 'https://chat-app-frontend-s2hr.vercel.app',  // Without trailing slash
    credentials: true
};

// Handle CORS for all routes and preflight requests
app.use(cors(corsOption));
app.options('*', cors(corsOption));  // Handle preflight requests

// routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// Start the server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening on port ${PORT}`);
});
