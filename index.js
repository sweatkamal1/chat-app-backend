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
