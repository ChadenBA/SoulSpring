import { BLUE, GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Stack, Typography, styled } from '@mui/material'

export const RectangularCardRoot = styled(Stack)(({ theme }) => ({
  borderRadius: 10,
  background:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? theme.palette.common.white
      : BLUE.dark,
  overflow: 'hidden',
  border:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? `1px solid ${GREY.light}`
      : 'none',
  padding: 26,
  width: 'auto',
  margin: 16,

  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
export const RectangularCardTypography = styled(Typography)({
  color: GREY.main,
  lineHeight: 1.5,
})
export const RectangularCardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === ThemeModeEnum.LIGHT ? BLUE.main : GREY.light,
  fontWeight: 'bold',
  fontSize: '1.1rem',
  lineHeight: 2.5,
}))
