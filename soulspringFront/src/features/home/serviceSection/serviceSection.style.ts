import { styled } from '@mui/material/styles';

export const ImageService = styled('img')(({ theme }) => ({
  width: '300px',
  height: '300px',
  marginLeft: '100px',
  [theme.breakpoints.down('md')]: {
    width: '50px',
    height: '50px',
    margin: '10px',
    padding: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '250px',
    height: '250px',
    margin: '10px',
    padding: '10px',
  },
}));
