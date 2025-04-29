import { BLUE, GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Stack, Typography, styled } from '@mui/material'

export const StyledBodyCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: theme.palette.mode === ThemeModeEnum.DARK ? BLUE.light : BLUE.main,
  padding: '20px',
}))
export const StyledBodyCardContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: GREY.main,
  marginBottom: '20px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))
export const StyledBodyCardRoot = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  height: 'auto',
  background:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.background.paper
      : theme.palette.common.white,
  border:
    theme.palette.mode === ThemeModeEnum.DARK
      ? 'none'
      : `1px solid ${GREY.light}`,
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    position: 'relative',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
