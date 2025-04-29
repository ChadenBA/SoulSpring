import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { AllProfsRowProps } from './AllUsersRow.type';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions';
import { PATHS } from '@config/constants/paths';
import { GREY } from '@config/colors/colors';
import trash from '@assets/logo/icon-trash.svg';
import { InstructorAvatar } from '@features/home/userAvatar/UserAvatar.style';
import ProfStatusChip from '../userStatusChip/userStatusChip';
import { useDeleteProfMutation } from '@redux/apis/Professional/ProfessionalApi';

function AllProfsRow({ professional }: AllProfsRowProps) {
  const [deleteProf] = useDeleteProfMutation();

  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDeleteProf = async (id: number) => {
    try {
      deleteProf(id).unwrap();
      dispatch(showSuccess(t('users.delete_user_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    } finally {
      setOpen(false);
    }
  };

  const navigateToUserDetailPage = (id: number) => {
    return navigate(`${PATHS.DASHBOARD.ADMIN.USERS.ROOT}/${id}`);
  };
  return (

    <>
      <TableRow key={professional.id}>
        <TableCell>
        <InstructorAvatar
  src={professional?.profilePicture || "/default-avatar.png"}
/>        </TableCell>
        <TableCell>{professional.name}</TableCell>
        <TableCell>{professional.lastname}</TableCell>
        <TableCell>{professional.email}</TableCell>
        <TableCell>{professional.age}</TableCell>
        <TableCell>
        <TableCell>{professional.isApproved ? 'Approved' : 'Not Approved'}</TableCell>
          
        </TableCell>
        <TableCell>
          <Stack direction={'row'} spacing={2}>
            {/* <Tooltip title={t('common.edit')}>
              <Edit
                color="info"
                cursor="pointer"
                onClick={() => navigateToUserDetailPage(professional.id)}
              />
            </Tooltip> */}
            <Tooltip title={t('common.delete')}>
              <Delete color="error" cursor="pointer" onClick={() => setOpen(true)} />
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <CustomDialogActions
        open={open}
        onAccept={() => handleDeleteProf(professional.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={trash} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {t('users.delete_user_confirm')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {t('users.delete_user')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </>
  );
}

export default AllProfsRow;
