import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['https://chat-app-frontend-rho-swart.vercel.app', 'http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Store user socket mappings
const userSocketMap = {}; // { userId: socketId }

// Function to get receiver socket ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Handle incoming socket connections
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User connected with userId: ${userId}`);

    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    } else {
        console.error('No userId provided in connection query');
    }

    // Handle disconnection
    socket.on('disconnect', () => {
        if (userId) {
            console.log(`User disconnected with userId: ${userId}`);
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });
});

export { io, server };
