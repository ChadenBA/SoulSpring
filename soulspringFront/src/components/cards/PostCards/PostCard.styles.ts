import { styled, keyframes } from '@mui/material/styles';
import {
  Stack,
  Typography,
  Avatar,
  Card,
  Paper,
  Box,
} from '@mui/material';

// Fade-in animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Wrapper to center the cards with reduced gap
export const CenteredWrapper = styled(Stack)(({ theme }) => ({
  minHeight: '60vh',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  animation: `${fadeInUp} 0.6s ease-out`,
}));

// Card container
export const StyledPostCardRoot = styled(Card)(({ theme }) => ({
  padding: '2rem',
  marginBottom: '2rem',
  borderRadius: '20px',
  width: '800px',
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.35s ease',
  animation: `${fadeInUp} 0.5s ease-out`,
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.1)',
  },
}));


// Title
export const StyledPostCardTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
`;

// Content
export const StyledPostCardContent = styled(Typography)`
  font-size: 1.05rem;
  color: #444;
  margin-top: 1rem;
  line-height: 1.7;
`;

// Footer container
export const StyledPostCardFooter = styled(Stack)`
  margin-top: 1.75rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

// Meta text
export const MetaText = styled(Typography)`
  font-size: 0.9rem;
  color: #999;
`;

// Author avatar
export const AuthorAvatar = styled(Avatar)`
  width: 52px;
  height: 52px;
  border: 3px solid #eee;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(5deg) scale(1.05);
  }
`;

// Author name
export const AuthorName = styled(Typography)`
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
`;



// Comment card
export const CommentCard = styled(Paper)`
  padding: 1rem;
  border-radius: 16px;
  background: rgba(249, 249, 249, 0.75);
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: background 0.3s ease, transform 0.3s ease;
  animation: ${fadeInUp} 0.4s ease;

  &:hover {
    background: rgba(240, 240, 240, 0.9);
    transform: scale(1.01);
  }
`;

// Comment text
export const CommentText = styled(Typography)`
  font-size: 1rem;
  color: #444;
`;

// Comment author
export const CommentAuthor = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
`;

// Comment actions
// Footer action buttons
export const FooterActions = styled(Stack)(({ theme }) => ({
  gap: '0.75rem',

  button: {
    textTransform: 'none',
    borderRadius: '12px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      transform: 'translateY(-2px)',
    },
  },
}));

// Comment actions (e.g., reply, like)
export const CommentActions = styled(Stack)(({ theme }) => ({
  marginTop: '0.5rem',
  gap: '0.5rem',

  button: {
    textTransform: 'none',
    fontSize: '0.85rem',
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '8px',
    padding: '4px 8px',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',

    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      transform: 'scale(1.05)',
    },
  },
}));

