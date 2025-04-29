import { Typography, Box, Stack, alpha, styled } from '@mui/material';
import { BLUE, GREY } from '@config/colors/colors';
import { StyleProps } from './CourseCard.style.type';
import { ThemeModeEnum } from '@config/enums/theme.enum';
import { LoadingButton } from '@mui/lab';

export const ProfessionalCardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})(({ theme }) => ({ width }: StyleProps) => ({
  width: width || '45vh',
  margin: '10px',
  borderRadius: 16,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: theme.palette.mode === ThemeModeEnum.DARK ? BLUE.dark : theme.palette.common.white,
  border: theme.palette.mode === ThemeModeEnum.DARK ? 'none' : `1px solid ${GREY.light}`,
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    '& img': {
      transform: 'scale(1.1)',
      transition: 'transform 0.3s ease-in-out',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: '45vh',
  },
}));

export const ProfessionalImageContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: 16,
  margin: theme.spacing(2),
  lineHeight: 0,
  cursor: 'pointer',
  position: 'relative',
  objectFit: 'cover',
}));

export const ProfessionalImage = styled('img')({
  width: '100%',
  height: '200px',
  borderRadius: '12px',
  objectFit: 'cover',
});

export const ProfessionalContent = styled(Stack)(() => ({
  padding: '0px 16px',
  gap: '10px',
}));

export const ProfessionalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === ThemeModeEnum.DARK ? GREY.light : GREY.main,
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const BuyButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: BLUE.main,
  color: theme.palette.common.white,
  borderRadius: 20,
  zIndex: 999999,
  margin: '10px 0',
  '&:hover': {
    border: `1px solid ${BLUE.main}`,
    backgroundColor: alpha(BLUE.main, 0.8),
  },
}));

export const BlocBackground = styled(Stack)(({ theme }) => ({
  background:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.background.paper
      : `linear-gradient(0.25turn, ${theme.palette.primary.light},${theme.palette.primary.light}, ${theme.palette.secondary.light},${theme.palette.primary.light})`,
}));
