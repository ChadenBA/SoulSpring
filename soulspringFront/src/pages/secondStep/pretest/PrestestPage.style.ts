import { ThemeModeEnum } from '@config/enums/theme.enum';
import { Stack, styled } from '@mui/material';

export const StyledQuestionsContainer = styled(Stack)(({ theme }) => ({
  width: '90%',
  height: 'auto',
  backgroundColor:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? theme.palette.background.default
      : theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: '10px',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));
