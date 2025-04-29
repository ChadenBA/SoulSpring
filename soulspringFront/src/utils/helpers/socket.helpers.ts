import { io, Socket } from 'socket.io-client';
let socket: Socket;
// You can store your backend URL in an `.env` file
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000';
// Initialize the socket connection
export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        userId,
      },
    });
    // Join personal room for receiving messages
    socket.emit('join', userId);
  }
};
// Listen for new messages
export const onNewMessage = (callback: (msg: any) => void) => {
  if (!socket) return;
  socket.on('newMessage', callback);
};
// Emit a message
export const sendMessage = (message: {
  senderId: string;
  receiverId: string;
  content: string;
}) => {
  if (socket) {
    socket.emit('sendMessage', message);
  }
};
// Disconnect the socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = undefined!;
  }
};
