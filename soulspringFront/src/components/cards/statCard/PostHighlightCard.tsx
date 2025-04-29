import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { motion } from 'framer-motion';

type PostHighlightCardProps = {
  title: string;
  count: number;
  type: 'likes' | 'comments';
  userEmail: string;
};

const PostHighlightCard = ({ title, count, type, userEmail }: PostHighlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 4 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', mr: 2 }}>
          {userEmail[0].toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {type === 'likes' ? 'Most Liked Post' : 'Most Commented Post'}
          </Typography>
          <Typography variant="h6" noWrap>
            {title || 'No title available'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Posted by: {userEmail}
          </Typography>
        </Box>
        <Chip
          icon={type === 'likes' ? <FavoriteIcon color="error" /> : <CommentIcon color="primary" />}
          label={`${count} ${type === 'likes' ? 'Likes' : 'Comments'}`}
          color={type === 'likes' ? 'error' : 'primary'}
          sx={{ fontWeight: 'bold' }}
        />
      </Card>
    </motion.div>
  );
};

export default PostHighlightCard;
