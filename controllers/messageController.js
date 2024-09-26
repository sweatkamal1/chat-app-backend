import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const { message } = req.body;

        // Check if conversation exists between the two participants
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // Create a new conversation if none exists
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []  // Initialize empty messages array
            });
        }

        // Create new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Add new message to conversation
        gotConversation.messages.push(newMessage._id);
        await gotConversation.save(); // Save conversation

        // Emit new message to the receiver's socket if they are online
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.log(`User ${receiverId} is not online.`);
        }

        return res.status(201).json({
            message: "Message sent successfully",
            newMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.userId;

        // Find conversation between the two participants and populate messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]); // Return empty array if no conversation
        }

        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
