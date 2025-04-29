import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { Check, Close } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { PendingProfRowProps } from './PendingUsersRow.type'
import { useTranslation } from 'react-i18next'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'


import { useRejectProfMutation, useValidateProfMutation } from '@redux/apis/Professional/ProfessionalApi'
import validate from '@assets/logo/validate.png'
import reject from '@assets/logo/reject.webp'
import { GREY } from '@config/colors/colors'
import { UserActionsEnum } from '@config/enums/userActions.enum'
import { InstructorAvatar } from '@features/home/userAvatar/UserAvatar.style'

function PendingProfRow({ professional }: PendingProfRowProps) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState<'validate' | 'reject' | null>(
    null,
  )

  const dispatch = useAppDispatch()

  const [validateUser] = useValidateProfMutation()
  const [rejectUser] = useRejectProfMutation()

  const handleUserAction = async (id: number) => {
    try {
      if (actionType === UserActionsEnum.VALIDATE) {
        await validateUser(id).unwrap()
        dispatch(showSuccess(t('users.validate_user_success')))
      } else if (actionType === UserActionsEnum.REJECT) {
        await rejectUser(id).unwrap()
        dispatch(showSuccess(t('users.reject_user_success')))
      }
      setActionType(null)
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }

  return (
    <TableRow key={professional.id}>
      <TableCell>
        <InstructorAvatar  src={professional?.profilePicture || "/default-avatar.png"}
  />
      </TableCell>
      <TableCell>{professional.name}</TableCell>
      <TableCell>{professional.lastname}</TableCell>
      <TableCell>{professional.email}</TableCell>
      <TableCell>
        {/* <UserRoleChip roleId={professional.role} /> */}
        <TableCell>{professional.specialite}</TableCell>

      </TableCell>
      <TableCell>
        <Stack direction={'row'} spacing={2}>
          <Tooltip title={t('common.accept')}>
            <Check
              color="success"
              cursor="pointer"
              onClick={() => {
                setOpen(true)
                setActionType('validate')
              }}
            />
          </Tooltip>
          <Tooltip title={t('common.reject')}>
            <Close
              color="error"
              cursor="pointer"
              onClick={() => {
                setOpen(true)
                setActionType('reject')
              }}
            />
          </Tooltip>
        </Stack>
      </TableCell>
      <CustomDialogActions
        open={open}
        onAccept={() => handleUserAction(professional.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        {actionType === 'validate' ? (
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={validate} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('users.validate_user')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('users.confirm_validate_user')}
            </Typography>
          </Stack>
        ) : (
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={reject} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('users.reject_user')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('users.confirm_reject_user')}
            </Typography>
          </Stack>
        )}
      </CustomDialogActions>
    </TableRow>
  )
}

export default PendingProfRow
