import { DARK_COLORS, GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Stack, Typography, styled } from '@mui/material'

export const StatisticsCardRoot = styled(Stack)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? DARK_COLORS.background.paper
      : theme.palette.common.white,
  borderRadius: 8,
  border:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? `1px solid ${GREY.light}`
      : 'none',
  padding: theme.spacing(2),
  maxWidth: 400,
  height: 170,
  '& svg': {
    fontSize: 25,
    color: GREY.main,
  },
}))

export const IconWrapper = styled('div')(() => ({
  fontSize: 25,
  alignSelf: 'flex-end',
}))

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.palette.text.primary,
}))

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
}))

export const Value = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 600,
  marginTop: 24,
  color: theme.palette.text.primary,
}))
