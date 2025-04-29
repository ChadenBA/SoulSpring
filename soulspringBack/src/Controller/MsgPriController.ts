import { Request, Response , NextFunction} from "express";
import { Chat } from "../Models/ChatModel";
import { Server } from 'socket.io';
import { io } from "../index";
import { Types } from "mongoose"; // Import Types from mongoose to use ObjectId

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content , senderId} = req.body;
    const senderModel = req.user?.role === "professional" ? "Professional" : "User";
    const receiverModel = senderModel === "User" ? "Professional" : "User";
    console.log("req.body" , req.body)
    console.log("senderId" , senderId)

    const message = await Chat.create({
      sender: senderId,
      senderModel,
      receiver: receiverId,
      receiverModel,
      content,
    });

    // Convert receiver to string to emit in Socket.IO
    const receiver = receiverId.toString();  // Ensure receiver is a string
    io.to(receiver).emit('newMessage', {
      sender: senderId,
      content,
      timestamp: new Date(),
    });

    res.status(201).json({ message });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const replyToMessage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { originalMessageId, content, senderId } = req.body;
    console.log (senderId)

    const originalMessage = await Chat.findById(originalMessageId);
    if (!originalMessage) {
      return res.status(404).json({ error: "Original message not found" });
    }

    if (!originalMessage.sender || !originalMessage.receiver) {
      return res.status(400).json({ error: "Original message is missing sender or receiver" });
    }
    


    // Determine the sender model based on the current user
    const senderModel = req.user?.role === "professional" ? "Professional" : "User";
       console.log("req.user" , req.user?.role)
    // Determine the receiver (opposite of the original sender)
    let receiver = originalMessage.sender.toString() === senderId
      ? originalMessage.receiver.toString()  // If the current sender is the same as the original sender, set the original receiver as the reply receiver
      : originalMessage.sender.toString();   // If the current sender is the original receiver, set the original sender as the reply receiver
    
      const receiverModel = senderModel === "User" ? "Professional" : "User";
      console.log(senderModel)

    // Create the reply message
    const reply = await Chat.create({
      sender: senderId,
      senderModel,
      receiver,
      receiverModel,
      content,
      replyTo: originalMessageId,
    });

    // Emit the reply message to the correct receiver via socket
    if (receiver) {
      io.to(receiver).emit('newMessage', {
        sender: senderId,
        content,
        timestamp: new Date(),
        isReply: true,
      });
      console.log("sender",senderId)
    } else {
      console.error('No valid receiver for this reply');
    }

    res.status(201).json({ reply });
  } catch (error) {
    console.error("replyToMessage error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Import necessary libraries





export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { receiverId } = req.body; // Extract receiverId from the request body
  console.log('ReceiverId:', receiverId);

  try {
    // Convert receiverId to ObjectId if it's not already

    // Find messages where the receiver is involved, either as sender or receiver
    const messages = await Chat.find({
      $or: [
        { receiver: receiverId }, // Messages sent to the receiver
        { sender: receiverId }    // Messages sent by the receiver
      ]
    }).sort({ createdAt: 1 })
      .populate('sender', 'name lastname profilePicture')  // Populate sender details
      .populate('receiver', 'name lastname profilePicture'); // Populate receiver details

      res.status(200).json({ messages: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};


export const deleteMessage = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { messageId } = req.params;
    console.log("Hit deleteMessage route with ID:", req.params.messageId);

    const message = await Chat.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Optional: Check if the requester is the sender of the message
    if (message.sender.toString() !== req.user?.id.toString()) {
      return res.status(403).json({ error: "You are not allowed to delete this message" });
    }

    await Chat.findByIdAndDelete(messageId);

    // Notify the receiver via socket (optional)
    io.to(message.receiver.toString()).emit('messageDeleted', {
      messageId,
    });

    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("deleteMessage error:", error);
    res.status(500).json({ error: "Server error" });

  }
};











