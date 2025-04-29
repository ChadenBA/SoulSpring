import { GREY } from '@config/colors/colors';
import { Grid, Stack, styled, Typography } from '@mui/material';
import userHeaderImage from '@assets/images/userHeader.jpg';
import { ThemeModeEnum } from '@config/enums/theme.enum';

export const StyledHeader = styled(Stack)(({ theme }) => ({
  height: '400px',
  width: '100%',
  alignItems: 'center',
  backgroundImage: theme.palette.mode === ThemeModeEnum.LIGHT ? `url(${userHeaderImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor:
    theme.palette.mode === ThemeModeEnum.DARK ? theme.palette.background.paper : 'transparent',
}));

export const StyledImage = styled('img')(({ theme }) => ({
  width: '600px',
  height: '300px',
  marginLeft: '150px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '50px',
    width: '240px',
    height: '240px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: '180px',
    height: '180px',
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: '#6397a1',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginLeft: '150px',
  lineHeight: '2.5rem',
  maxWidth: '600px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '60px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    fontSize: '1.5rem',
  },
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  color: GREY.main,
  fontSize: '1rem',
  lineHeight: '1.5rem',
  marginLeft: '150px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '60px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    fontSize: '0.875rem',
  },
}));

export const StyledGrid = styled(Grid)({
  width: '100%',
  height: '100%',
  marginTop: '70px',
  alignItems: 'center',
});
