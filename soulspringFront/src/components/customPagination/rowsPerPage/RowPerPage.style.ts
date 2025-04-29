import { styled, Stack } from '@mui/material'

export const StyledStack = styled(Stack)(({ theme }) => ({
  margin: '2px',
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  '& .MuiSelect-root': {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
  },
  '& .MuiSelect-select': {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
  },
}))
