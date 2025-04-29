import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useSendmsgprouserMutation } from '@redux/apis/chatProfUser/chatProfUserApi';
import { getUserFromLocalStorage } from '@utils/localStorage/storage';

interface SendMessageModalProps {
  open: boolean;
  onClose: () => void;
  receiverId: string;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ open, onClose, receiverId }) => {
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendmsgprouserMutation();
  const user = getUserFromLocalStorage(); // Get current user

  const handleSend = async () => {
    if (!message.trim()) return;
    console.log(receiverId)
    try {
      await sendMessage({
        content: message,
        senderId: user.id, // Replace with actual user ID logic
        receiverId,
      }).unwrap();

      // Close the modal after sending the message
      onClose();
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Message</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary">
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendMessageModal;
