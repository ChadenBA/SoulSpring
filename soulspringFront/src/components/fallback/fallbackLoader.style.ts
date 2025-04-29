import { styled } from '@mui/material/styles';

export const LoaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.default,
}));
