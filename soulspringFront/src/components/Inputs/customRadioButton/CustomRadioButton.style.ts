import { Typography, styled } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { ThemeModeEnum } from '@config/enums/theme.enum';
import { BLUE } from '@config/colors/colors';
export const StyledErrorIcon = styled(ErrorOutline)(({ theme }) => ({
  color: theme.palette.error.main,
  height: 18,
  width: 18,
}));

export const CustomLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === ThemeModeEnum.DARK ? BLUE.light : BLUE.main,
}));
