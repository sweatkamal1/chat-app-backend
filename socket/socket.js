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

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['https://chat-app-frontend-s2hr.vercel.app'], 
        methods: ['GET', 'POST'],
        credentials: true, // Cookies, auth headers allow करने के लिए
        transports: ['websocket', 'polling'] // WebSocket और polling दोनों allow करो
    },
    allowEIO3: true, // अगर Socket.IO version mismatch हो तो इसे enable करो
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
    try {
        const userId = socket.handshake.query.userId;
        if (isValidUserId(userId)) {
            userSocketMap[userId] = socket.id;
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        } else {
            console.error("Invalid userId received.");
        }

        socket.on('disconnect', () => {
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
