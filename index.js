// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from "./socket/socket.js";

// dotenv.config();

// connectDB();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin: "*",
//     credentials: true
// }));

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });


// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from "./socket/socket.js";

// dotenv.config();

// connectDB();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin: "*", // Allow all origins
//     methods: "*", // Allow all HTTP methods
//     allowedHeaders: "*", // Allow all headers
//     credentials: true // Allow cookies and credentials
// }));

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });




import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL, // Specify the exact origin of your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly list allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // List allowed headers
    credentials: true // Allow cookies and credentials
}));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
