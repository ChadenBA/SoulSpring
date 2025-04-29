import { Dialog, DialogContent, styled } from '@mui/material'

export const FullScreenDialogRoot = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background:theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}))

export const DialogContentRoot = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
}))
