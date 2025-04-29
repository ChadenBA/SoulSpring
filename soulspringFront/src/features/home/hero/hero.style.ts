import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

import { BLUE, GREY } from '@config/colors/colors';
export const HeaderContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  padding: theme.spacing(16),
  justifyContent: 'space-between',
  background: theme.palette.background.default,
  color: theme.palette.common.white,
  height: '85vh',
  zIndex: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    padding: theme.spacing(4),
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
    display: 'block',
    height: 'auto',
  },
}));

export const HeaderContent = styled(Stack)(({ theme }) => ({
  gap: '20px',
  '& > h1': {
    color: BLUE.main,
    fontSize: '3rem',
    width: '70vh',
    lineHeight: 1.4,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
      width: 'auto',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '2.5rem',
      width: 'auto',
    },
  },
  '& > h2': {
    color: GREY.main,
    fontSize: '1rem',
    width: '70vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      width: 'auto',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '0.875rem',
      width: 'auto',
    },
  },
  '& > h3': {
    color: BLUE.light,
    fontSize: '0.7rem',
    width: '70vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '0.875rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '35px',
  },
}));

export const StyledHeaderImage = styled('img')(({ theme }) => ({
  width: '700px',
  height: '700px',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
    height: 'auto',
  },
}));
