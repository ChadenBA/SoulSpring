import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

import background from '@assets/images/background.jpg'
import { ThemeModeEnum } from '@config/enums/theme.enum'

export const HeaderRoot = styled(Box)(({ theme }) => ({
  backgroundImage:
    theme.palette.mode === ThemeModeEnum.DARK ? 'none' : `url(${background})`,
  height: 270,
  backgroundSize: 'cover',
  textAlign: 'center',
  padding: 100,
  backgroundColor:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.background.paper
      : 'transparent',
  color:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.common.white
      : theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    padding: 50,
  },
  [theme.breakpoints.down('sm')]: {
    padding: 20,
  },
}))

export const PathStyled = styled(Stack)(({ theme }) => ({
  color:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.common.white
      : 'inherit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  padding: 10,
  margin: 10,
}))
