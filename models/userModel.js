import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,  // Trims extra spaces
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // Convert to lowercase to avoid case-sensitive username issues
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  // Enforces password length
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    }
}, { 
    timestamps: true  // Adds `createdAt` and `updatedAt` fields automatically
});

// Export the User model
export const User = mongoose.model("User", userSchema);
