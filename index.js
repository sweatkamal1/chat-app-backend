import express from "express"; 
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 

app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL || "*", // Add your frontend URL or use '*' for all
    credentials: true
  }));
// app.use(cors(corsOption)); 


app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});



// import express from "express"; 
// import dotenv from "dotenv"; 
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from "./socket/socket.js";

// dotenv.config(); // .env config load 

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); 
// app.use(cookieParser());

// // CORS setup
// const corsOptions = {
//     origin: process.env.CLIENT_URL, // Make sure CLIENT_URL is set in your .env file
//     credentials: true, // Allow cookies and authentication
//     optionsSuccessStatus: 200 // Handle legacy browsers
// };
// app.use(cors(corsOptions)); // Using cors options

// // Routes
// app.use("/api/v1/user", userRoute); 
// app.use("/api/v1/message", messageRoute);

// // Start the server after connecting to the database
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//     try {
//         await connectDB(); // Ensure DB connection before starting server
//         server.listen(PORT, () => {
//             console.log(`Server listening on port ${PORT}`);
//         });
//     } catch (error) {
//         console.error(`Error connecting to the database: ${error.message}`);
//         process.exit(1); // Exit process if database connection fails
//     }
// };

// startServer(); 
