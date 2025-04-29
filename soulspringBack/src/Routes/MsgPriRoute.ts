import { Router } from "express";
import { sendMessage, replyToMessage, getMessages, deleteMessage } from "../Controller/MsgPriController";
import { authMiddleware } from "../Middleware/authMiddleware";

// Define the routes
const msgrouter = Router();

msgrouter.post('/send', sendMessage); // Route for sending a message
msgrouter.post('/reply',authMiddleware, replyToMessage); // Route for replying to a message
msgrouter.post('/messages',authMiddleware ,getMessages); // Route for fetching user messages
msgrouter.delete('/message/:messageId', authMiddleware, deleteMessage);

export default msgrouter;
