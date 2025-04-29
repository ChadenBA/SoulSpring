import { BLUE, GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Typography, styled } from '@mui/material'

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.primary.main
      : BLUE.main,
  fontWeight: 'medium',
}))
export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === ThemeModeEnum.DARK ? BLUE.light : GREY.main,
}))
