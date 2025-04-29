import { useEffect, useState } from 'react';
import {
  useGetMsgProUserMutation,
  useReplaymsgprouserMutation,
} from '@redux/apis/chatProfUser/chatProfUserApi';
import { getUserFromLocalStorage } from '@utils/localStorage/storage';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import {
  connectSocket,
  sendMessage,
  onNewMessage,
  disconnectSocket,
} from '@utils/helpers/socket.helpers';
import { ChatProfUser } from '../../types/models/ChatProUser';
import { UserRoleEnum } from '@config/enums/role.enum';
import CheckIcon from '@mui/icons-material/Check';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useDeleteMsgProUserMutation } from '@redux/apis/chatProfUser/chatProfUserApi';
import { useTranslation } from 'react-i18next';

const ProMessagesPage = () => {
  const [messages, setMessages] = useState<ChatProfUser[]>([]);
  const [reply, setReply] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ChatProfUser | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const pro = getUserFromLocalStorage();
  const proId = pro?.id;

  const { t } = useTranslation();

  const [getMessages, { data }] = useGetMsgProUserMutation();
  const [sendReply] = useReplaymsgprouserMutation();
  const [deleteMsg] = useDeleteMsgProUserMutation();

  useEffect(() => {
    if (proId) {
      connectSocket(proId);
      onNewMessage((newMsg: ChatProfUser) => {
        setMessages((prev) => [...prev, newMsg]);
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [proId]);

  useEffect(() => {
    if (proId) {
      getMessages({ receiverId: proId });
    }
  }, [proId, getMessages]);

  useEffect(() => {
    if (data && data.length > 0) {
      setMessages(data);
    }
  }, [data]);

  const uniqueUsers = Array.from(
    new Map(
      messages
        .filter((msg) => {
          if (pro?.role === UserRoleEnum.PROFESSIONAL) {
            return msg.senderModel === 'User';
          } else {
            return msg.senderModel === 'Professional';
          }
        })
        .map((msg) => [
          msg.sender?._id || msg.sender?.id,
          {
            id: msg.sender?._id || msg.sender?.id,
            name: msg.sender?.name,
            lastname: msg.sender?.lastname,
            profilepicture: msg.sender?.profilePicture,
          },
        ])
    )
  ).map(([_, user]) => user);

  const filteredMessages = selectedUserId
    ? messages.filter(
        (msg) =>
          (msg.sender?._id === selectedUserId || msg.sender?.id === selectedUserId) ||
          (msg.receiver?._id === selectedUserId || msg.receiver?.id === selectedUserId)
      )
    : [];

  const handleReply = async () => {
    if (!selectedMessage || !reply.trim()) return;

    const senderId =
      selectedMessage?.sender?._id ||
      selectedMessage?.sender?.id ||
      (typeof selectedMessage?.sender === 'string' ? selectedMessage.sender : null);

    if (!senderId) {
      console.error('No sender found for this message', selectedMessage);
      return;
    }

    const newMessage = {
      senderId: proId,
      originalMessageId: selectedMessage._id,
      content: reply,
    };

    await sendReply(newMessage).unwrap();

    const localMsg: ChatProfUser = {
      _id: `${Math.random()}`, // temporary ID
      senderId: proId,
      receiverId: senderId,
      content: reply,
      createdAt: new Date().toISOString(),
      sender: pro,
      receiver: selectedMessage.sender,
      isReply: true,
      read: false,
    };

    sendMessage(localMsg);
    setMessages((prev) => [...prev, localMsg]);
    setReply('');
    setSelectedMessage(null);
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setReply((prev) => prev + emojiData.emoji);
  };
  
  
  

  const handleSelectMessage = (msg: ChatProfUser) => {
    const updatedMessages = messages.map((message) =>
      message._id === msg._id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
    setSelectedMessage(msg);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMsg(id).unwrap();
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '80vh', backgroundColor: '#f4f7fa' }}>
      <Box
        sx={{
          width: '30%',
          borderRight: '1px solid #ddd',
          padding: 1,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflowY: 'auto',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>
          {t('chat.conversations')}
        </Typography>
        <List sx={{ padding: 0 }}>
          {uniqueUsers.map((user) => (
            <ListItem
              button
              key={user.id}
              selected={selectedUserId === user.id}
              onClick={() => {
                setSelectedUserId(user.id);
                setSelectedMessage(null);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '6px',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <Avatar
                src={user?.profilepicture?.url}
                alt={`${user.name} ${user.lastname}`}
                sx={{ marginRight: 1, width: 32, height: 32 }}
              />
              <ListItemText
                primary={`${user.name} ${user.lastname}`}
                primaryTypographyProps={{
                  style: { fontWeight: '500', fontSize: '0.9rem', color: '#333' },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      >
        {selectedUserId ? (
          <>
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: 1,
                padding: '8px',
                backgroundColor: '#fafafa',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              {filteredMessages.map((msg) => {
                const isSentByPro =
                  msg.senderId === proId || msg.sender?._id === proId || msg.sender?.id === proId;

                return (
                  <Box
                    key={msg._id}
                    sx={{
                      display: 'flex',
                      justifyContent: isSentByPro ? 'flex-end' : 'flex-start',
                      mb: 1,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleSelectMessage(msg)}
                  >
                    <Box
                      sx={{
                        maxWidth: '65%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: isSentByPro ? '#daf1ff' : '#f0f0f0',
                        color: '#333',
                        boxShadow: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ wordWrap: 'break-word', flex: 1, fontSize: '13px' }}
                      >
                        {msg.content}
                      </Typography>

                      <Box sx={{ ml: 1, display: 'flex', gap: '3px', alignItems: 'center' }}>
                        <CheckIcon fontSize="small" color="action" />
                        {msg.read && <CheckIcon fontSize="small" color="action" />}
                      </Box>

                      {isSentByPro && (
                        <Button
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg._id);
                          }}
                          sx={{
                            ml: 1,
                            minWidth: 'auto',
                            padding: '3px 6px',
                            fontSize: '13px',
                            '&:hover': { backgroundColor: 'primary' },
                          }}
                        >
                          🗑
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ marginBottom: 1 }} />

            {selectedMessage ? (
              <>
                <Box
                  sx={{
                    mb: 1,
                    padding: 1,
                    borderLeft: '4px solid #1976d2',
                    background: '#f1f1f1',
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {t('chat.replyToMessage')}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                    {selectedMessage.content}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    padding: 1,
                    backgroundColor: '#fafafa',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                 <TextField
  variant="outlined"
  fullWidth
  multiline
  rows={4}
  placeholder={t('chat.typeYourReply')}
  value={reply}
  onChange={(e) => setReply(e.target.value)}
  sx={{
    '& .MuiInputBase-root': {
      fontSize: '14px',
      paddingRight: '35px',
    },
  }}
/>



                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmojiEmotionsIcon
                      fontSize="large"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                   
   {showEmojiPicker && (
                    <Box sx={{ position: 'absolute', zIndex: 100, top: '100%', right: 300 }}>
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}  // Update logic to append emoji to the message
                      />
                    </Box>
                  )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleReply}
                      sx={{ marginLeft: 1 }}
                    >
                      {t('chat.reply')}
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ paddingTop: 2 }}>
                {t('chat.selectMessageToReply')}
              </Typography>
            )}
          </>
        ) : (
          <Typography variant="h6" sx={{ padding: 2 }}>
            {t('chat.selectUserToStart')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProMessagesPage;
