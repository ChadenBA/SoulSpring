import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    border: `1px solid ${theme.palette.grey[400]}`,
    background: theme.palette.background.default,

    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
