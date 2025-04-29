import { useState } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { Check, Close } from '@mui/icons-material';
import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { PendingAppointmentRowProps } from './pendingAppointmentRow.type';
import { useTranslation } from 'react-i18next';
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import {
  useRejectProfMutation,
  useValidateProfMutation,
} from '@redux/apis/Professional/ProfessionalApi';
import validate from '@assets/logo/validate.png';
import reject from '@assets/logo/reject.webp';
import { GREY } from '@config/colors/colors';
import { AppointmentStatus } from '@config/enums/AppointmentEnum';
import {
  useCancealAppointmentMutation,
  useConfirmerAppointmentMutation,
} from '@redux/apis/Appointement/AppointmentApi';

function PendingAppointmentRow({ Appointment }: PendingAppointmentRowProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<AppointmentStatus | null>(null);

  const [validateUser] = useConfirmerAppointmentMutation();
  const [rejectUser] = useCancealAppointmentMutation();

  const handleUserAction = async (id: number) => {
    try {
      if (actionType === AppointmentStatus.CONFIRMED) {
        const result = await validateUser(id).unwrap();
        console.log('Validation Success:', result);
        dispatch(showSuccess(t('users.validate_user_success')));
      } else if (actionType === AppointmentStatus.CANCELLED) {
        const result = await rejectUser(id).unwrap();
        console.log('Cancellation Success:', result);
        dispatch(showSuccess(t('users.reject_user_success')));
      }
      setActionType(null);
    } catch (error: unknown) {
      console.error('User Action Error:', error);
      dispatch(showError(t('errors.general_error')));
    } finally {
      setOpen(false);
    }
  };

  console.log('Rendering PendingAppointmentRow with Appointment:', Appointment);

  return (
    <TableRow key={Appointment.id}> {/* Added a key prop here */}
      <TableCell>{Appointment.date?.toISOString().split('T')[0]}</TableCell> {/* Added optional chaining */}
      <TableCell>{Appointment.reason}</TableCell>
      <TableCell>{Appointment.status}</TableCell>
      <TableCell>
        {/* Informations complémentaires à afficher ici ? */}
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2}>
          <Tooltip title={t('common.accept')}>
            <Check
              color="success"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(true);
                setActionType(AppointmentStatus.CONFIRMED);
              }}
            />
          </Tooltip>
          <Tooltip title={t('common.reject')}>
            <Close
              color="error"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(true);
                setActionType(AppointmentStatus.CANCELLED);
              }}
            />
          </Tooltip>
        </Stack>
      </TableCell>

      <CustomDialogActions
        open={open}
        onAccept={() => handleUserAction(Appointment.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Stack direction="column" spacing={1} alignItems="center">
          <img
            src={actionType === AppointmentStatus.CONFIRMED ? validate : reject}
            width={100}
            alt={actionType === AppointmentStatus.CONFIRMED ? 'Validate Icon' : 'Reject Icon'}
          />
          <Typography color={GREY.main} variant="h1" fontWeight="medium">
            {actionType === AppointmentStatus.CONFIRMED
              ? t('users.validate_user')
              : t('users.reject_user')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {actionType === AppointmentStatus.CONFIRMED
              ? t('users.confirm_validate_user')
              : t('users.confirm_reject_user')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </TableRow>
  );
}

export default PendingAppointmentRow;