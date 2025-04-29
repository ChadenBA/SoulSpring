import { Button, styled } from '@mui/material';

export const StyledCategoriesButton = styled(Button)(({ theme }) => ({
  width: 'auto',
  borderRadius: '5px',
  color: theme.palette.primary.main,
  padding: 10,
  marginBottom: 2,
  
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
