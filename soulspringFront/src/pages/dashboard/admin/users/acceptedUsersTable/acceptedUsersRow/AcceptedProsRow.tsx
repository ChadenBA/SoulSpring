import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { ToggleOff, ToggleOn } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AcceptedProRowProps } from './AcceptedProfRow.type'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { useSuspendProfMutation, useUnsuspendProfMutation } from '@redux/apis/Professional/ProfessionalApi'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import { GREY } from '@config/colors/colors'
import suspend from '@assets/logo/suspend.png'
import { InstructorAvatar } from '@features/home/userAvatar/UserAvatar.style'

function AcceptedProsRow({ professional }: AcceptedProRowProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [suspendProf] = useSuspendProfMutation()
  const [unsuspendProf] = useUnsuspendProfMutation()

  // Track suspended state
  const [isSuspended, setIsSuspended] = useState(professional.isSuspended)

  const handleSuspendProf = async (id: number) => {
    try {
      await suspendProf(id).unwrap()
      dispatch(showSuccess(t('users.suspend_user_success')))
      setIsSuspended(true) // Move chip to the right
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }

  const handleUnSuspendProf = async (id: number) => {
    try {
      await unsuspendProf(id).unwrap()
      dispatch(showSuccess(t('users.unsuspend_user_success')))
      setIsSuspended(false) // Move chip to the left
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }

  return (
    <TableRow key={professional.id}>
      <TableCell>
        <InstructorAvatar src={professional?.profilePicture} alt={professional.name} />
      </TableCell>
      <TableCell>{professional.name}</TableCell>
      <TableCell>{professional.lastname}</TableCell>
      <TableCell>{professional.email}</TableCell>
      <TableCell>{professional.specialite}</TableCell>
      <TableCell>
        <Tooltip title={isSuspended ? t('users.unsuspend') : t('users.suspend')}>
          <div 
            style={{
              display: 'flex',
              justifyContent: isSuspended ? 'flex-end' : 'flex-start',
              width: '60px', // Adjust width to make animation visible
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {isSuspended ? (
              <ToggleOn
                color="secondary"
                cursor="pointer"
                onClick={() => setOpen(true)}
                fontSize="large"
              />
            ) : (
              <ToggleOff
                color="secondary"
                cursor="pointer"
                onClick={() => setOpen(true)}
                fontSize="large"
              />
            )}
          </div>
        </Tooltip>
      </TableCell>

      {/* Suspend Dialog */}
      <CustomDialogActions
        open={open}
        onAccept={() => (isSuspended ? handleUnSuspendProf(professional.id) : handleSuspendProf(professional.id))}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={suspend} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {isSuspended ? t('users.unsuspend_user_confirm') : t('users.suspend_user_confirm')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {isSuspended ? t('users.unsuspend_user') : t('users.suspend_user')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </TableRow>
  )
}

export default AcceptedProsRow
