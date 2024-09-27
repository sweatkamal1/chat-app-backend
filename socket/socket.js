// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ['http://localhost:3000'],
//         methods: ['GET', 'POST'],
//     },
// });

// const userSocketMap = {}; // {userId->socketId}

// // Function to get the socket ID of a receiver
// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
// }

// io.on('connection', (socket) => {
//     const userId = socket.handshake.query.userId;
//     if (userId !== undefined) {
//         userSocketMap[userId] = socket.id;
//     }

//     io.emit('getOnlineUsers', Object.keys(userSocketMap));

//     socket.on('disconnect', () => {
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers', Object.keys(userSocketMap));
//     });
// });

// export { app, io, server };


import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv';

dotenv.config(); // .env से पर्यावरण चर लोड करें

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL], // फ्रंटएंड URL को पर्यावरण चर से लाएं
        methods: ['GET', 'POST'],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true, // Socket.IO version mismatch को हैंडल करने के लिए
});

const userSocketMap = {}; // {userId->socketId}

// Function to get the socket ID of a receiver
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// Helper function to validate userId
const isValidUserId = (userId) => {
    return typeof userId === 'string' && userId.trim() !== '';
}

io.on('connection', (socket) => {
    console.log('A user connected'); // Log when a user connects
    try {
        const userId = socket.handshake.query.userId;
        if (isValidUserId(userId)) {
            userSocketMap[userId] = socket.id;
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
            console.log(`User connected: ${userId}`); // Log the userId
        } else {
            console.error("Invalid userId received.");
        }

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${userId}`); // Log when user disconnects
            if (isValidUserId(userId)) {
                delete userSocketMap[userId];
                io.emit('getOnlineUsers', Object.keys(userSocketMap));
            }
        });

    } catch (error) {
        console.error("Error in socket connection:", error);
    }
});

export { app, io, server };
