import express, { Application, Request, Response } from "express";
import connectDB from "./Config/DB";
import cors from "cors";
import { errorHandler, notFound } from "./Middleware/error";

import dotenv from "dotenv";
import questionRoutes from './Routes/QuestionRoute';
import userRoutes from './Routes/userRoutes'
import commentRoutes from "./Routes/CommentRoute";
import postRoutes from "./Routes/PostRoute";
import adminRoutes from "./Routes/adminRoute";
import predictionRoutes from "./Routes/predictionRoutes";  

import crypto from "crypto";
import refreshRoute from "./Routes/refreshTokenRoutes";
import adminDashRoutes from "./Routes/AdminDashRoute";
import Answerrouter from "./Routes/AnswersRoute";
import routerPredict from "./Routes/predictionRoutes";

import CardProfessionalrouter from "./Routes/cardProfessionalRoute";
import chatbotRouter from "./Routes/ChatbotRoute";
import Appointmentrouter from "./Routes/AppointmentRoute";
import routerpro from "./Routes/ProDashboardRoute"

import http from 'http';

import { Server } from 'socket.io';
import msgrouter from "./Routes/MsgPriRoute";

// Load environment variables
dotenv.config();

// Connect to the database
console.log("Connecting to database...");
connectDB();
console.log("Database connected successfully!");




// Initialize the Express app
const app: Application = express();
app.use(express.urlencoded({ extended: true }));




//socket io
const serv = http.createServer(app);
const io = new Server(serv, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});
export { io };



const xss = require('xss-clean');
app.use(xss());

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));


const helmet = require('helmet');
app.use(helmet());



// Define a test route (before error handling)
app.get("/", (req: Request, res: Response) => {
  res.send(" Server is running...");
});

app.use('/comments', commentRoutes);
app.use('/posts', postRoutes);
app.use('/', questionRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/', refreshRoute);
app.use('/admin/dashboard', adminDashRoutes);

// Use the prediction routes
app.use('/api/predict', predictionRoutes); // Mount predictionRoutes under /api/predict
app.use('/', Answerrouter);
app.use('/', routerPredict);

app.use('/prof',CardProfessionalrouter);

// Error handling middleware (should be after routes)
//app.use(notFound);
//app.use(errorHandler);

// generation de hash key
const generateHashKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

console.log("Generated VITE_HASH_KEY:", generateHashKey());
console.log("NODE_ENV =", process.env.NODE_ENV);

app.use('/api', commentRoutes);
app.use('/posts', postRoutes);
app.use('/api', questionRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);


app.use('/', chatbotRouter);
app.use('/',Appointmentrouter);
app.use('/' , msgrouter);
app.use('/', routerpro)

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (userId) => {
    socket.join(userId); // Each user has their own room
  });

  socket.on('sendMessage', ({ sender, receiver, content }) => {
    // Save to MongoDB if needed
    io.to(receiver).emit('newMessage', {
      sender,
      content,
      timestamp: new Date(),
    });
  });

  socket.on('typing', ({ sender, receiver }) => {
    io.to(receiver).emit('typing', { sender });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware (should be after routes)
// app.use(notFound);
// app.use(errorHandler);




// Start the server
const PORT: number = parseInt(process.env.PORT || "8000");
// ✅ CORRECT - Use `serv.listen()` so both Express and Socket.IO work
serv.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});


export default serv;
