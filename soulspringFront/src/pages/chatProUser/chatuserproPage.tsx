import { Box } from '@mui/material';

import { getUserFromLocalStorage } from '@utils/localStorage/storage';
import ProMessagesPage from '@pages/chatProUser/ProMessagesPage';

const ChatUserProPage = () => {
  const receiverId = getUserFromLocalStorage();   // Current user (Pro)


  return (
    <Box p={3}>
      <ProMessagesPage  />
    </Box>
  );
};

export default ChatUserProPage;
