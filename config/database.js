import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
