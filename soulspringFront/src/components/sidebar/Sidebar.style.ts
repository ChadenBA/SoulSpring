import { GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Stack, Typography, styled } from '@mui/material'

export const StyledSidebarCard = styled(Stack)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  flexDirection: 'column',
  width: '300px',
  borderRadius: '20px',
  background:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.background.paper
      : theme.palette.common.white,
  border:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? `1px solid ${GREY.light}`
      : 'none',
  alignItems: 'flex-start',
  padding: '20px',
  gap: 30,
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: theme.palette.mode === ThemeModeEnum.DARK ? GREY.light : GREY.main,
}))

export const StyledSidebarMenu = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  color: theme.palette.mode === ThemeModeEnum.DARK ? GREY.light : GREY.main,
}))
