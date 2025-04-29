import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Divider, Stack, Tooltip, IconButton, Snackbar, Alert, Box , Button} from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { ProfessionalCardProps } from './professionalCard.type';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { UserRoleEnum } from '@config/enums/role.enum';
import SendIcon from '@mui/icons-material/Send';

import {
  ProfessionalCardContainer,
  ProfessionalContent,
  ProfessionalImage,
  ProfessionalImageContainer,
  ProfessionalTitle,
} from './professionalCard.style';
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon';
import { getUserFromLocalStorage } from '@utils/localStorage/storage';
import SendMessageModal from '@pages/chatProUser/SendMessageModal';

const ProfessionalCard = ({
  id,
  profilePicture,
  name,
  lastname,
  email,
  address,
  specialite,
  width,
}: ProfessionalCardProps) => {

  const [isModalOpen, setModalOpen] = useState(false);
  console.log(id)
  // Open the message modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Close the message modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  console.log("idddddddddddddd", id);
  console.log("url image", profilePicture);
  // Vérification de l'utilisateur depuis le localStorage
  const user = getUserFromLocalStorage();

  // Navigation vers la page editprofil
  const navigateToEditProfile = (id: string) => {
    if (user?.role === UserRoleEnum.PROFESSIONAL && user.id.toString() === id.toString()) {
      navigate(`/dashboard/profile/settings/${id}`);
    } else {
      setAlert({
        type: 'error',
        title: 'Erreur !',
        message: "Vous n'êtes pas autorisé à modifier ce profil.",
      });
    }
  };

  return (
    <>
      <ProfessionalCardContainer width={width || '55vh'}>
        <ProfessionalImageContainer onClick={() => navigateToEditProfile(id.toString())}>
          <ProfessionalImage src={profilePicture} alt={`${name} ${lastname}`} />
        </ProfessionalImageContainer>

        <ProfessionalContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mr={3}>
            <LabelWithIcon label={email} icon={<MenuBookOutlinedIcon />} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Tooltip title={`${name} ${lastname}`} placement="top">
              <ProfessionalTitle variant="h3">{`${name} ${lastname}`}</ProfessionalTitle>
            </Tooltip>
            {/* Affichage du bouton d'édition uniquement pour le professionnel connecté */}
            {user?.role === UserRoleEnum.PROFESSIONAL && user.id.toString() && (
              <Tooltip title={t('pro.edit')}>
                <IconButton onClick={() => navigateToEditProfile(id.toString())}>
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}

          </Stack>


          <LabelWithIcon label={specialite} icon={<MenuBookOutlinedIcon />} />
          <LabelWithIcon label={address} icon={<MenuBookOutlinedIcon />} />
          <Divider />
        </ProfessionalContent>

        {user?.role === UserRoleEnum.USER && user.id.toString() && (

          <Tooltip title="Send Message">
            <Button onClick={handleOpenModal} endIcon={<SendIcon color="primary" />}>
              {t('pro.SEND_MESSAGE')}
            </Button>
          </Tooltip>

        )}

      </ProfessionalCardContainer>
      {/* SendMessageModal Component */}
      <SendMessageModal
        open={isModalOpen}
        onClose={handleCloseModal}
        receiverId={id.toString()} // Pass the receiver's ID
      />


      {/* ✅ Alert centrée avec fond blanc */}
      {alert && (
        <Box
          sx={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            padding: 3,
            minWidth: 300,
            zIndex: 1000,
            textAlign: 'center',
          }}
        >
          <Alert
            severity={alert.type}
            variant="standard"
            sx={{ fontSize: '1rem', fontWeight: 'bold' }}
            onClose={() => setAlert(null)}
          >
            {alert.title}: {alert.message}
          </Alert>
        </Box>
      )}
    </>
  );
};

export default ProfessionalCard;
