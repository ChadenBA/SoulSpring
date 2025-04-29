import React, { useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useGetApprovedProfessionalsQuery } from '../../redux/apis/Professional/ProfessionalApi';
import { useCreateAppointmentMutation } from '../../redux/apis/Appointement/AppointmentApi';
import AppointmentForm from '../../features/Appointment/AppointmentForm';
import { Snackbar, Alert, Typography, Box, CircularProgress, Slide } from '@mui/material';
import { getUserFromLocalStorage } from '../../utils/localStorage/storage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AppAlert from '@components/appAlert/AppAlert'



//msg coté back
const Appointment = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>();
  const user = getUserFromLocalStorage();
  const userId = user?.id;

  const {
    data: professionalsData,
    isLoading: isProfessionalsLoading,
    isError: isProfessionalsError,
  } = useGetApprovedProfessionalsQuery();

  const [professionals, setProfessionals] = useState<
    { id: number; name: string; lastname: string; profilePicture?: string }[]
  >([]);

  const [createAppointment, {
    isLoading: isCreatingAppointment,
    isError: isAppointmentError,
    isSuccess: isAppointmentSuccess,
  }] = useCreateAppointmentMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (Array.isArray(professionalsData)) {
      const mapped = professionalsData.map((pro) => ({
        id:  (pro as any)._id, // Utilisation de l'assertion de type pour accéder à _id
        name: pro.name,
        lastname: pro.lastname,
        profilePicture: pro.profilePicture?.url || "src/assest/noUser.png",
      }));
      console.log("Professionals après mappage:", mapped);
      setProfessionals(mapped);
    }
  }, [professionalsData]);

  useEffect(() => {
    console.log("Données bruttttttttes des professionnels:", professionalsData);
    if (isAppointmentSuccess) {
      setSnackbarMessage('Rendez-vous pris avec succès !');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      reset();
    }
    if (isAppointmentError) {
      setSnackbarMessage("Une erreur est survenue lors de la prise de rendez-vous.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [isAppointmentSuccess, isAppointmentError, reset]);

  const handleOnSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!userId) {
      setSnackbarMessage("Vous devez être connecté pour prendre un rendez-vous.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    // Vérification supplémentaire côté client pour les dimanches
    const appointmentDate = new Date(data.date);
    if (appointmentDate.getDay() === 0) {
      setSnackbarMessage("Nous ne prenons pas de rendez-vous le dimanche. Veuillez choisir un autre jour.");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    console.log("useriddddddddddd", userId);
    console.log("professionalIddddddddddddd", data.professionalId);
    
    // Structure de la donnée à envoyer à l'API
    const appointmentData = {
      professionalId: data.professionalId,
      userId: userId,
      date: data.date,
      reason: data.reason,
    };
    
    console.log("appointmentDataaaaaaaaaaa", appointmentData);
    
    try {
      await createAppointment(appointmentData).unwrap();
      setSnackbarMessage("Rendez-vous pris avec succès !");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      reset(); // Réinitialiser le formulaire après succès
    } catch (err: any) {
      let errorMessage = "Une erreur est survenue.";
      
      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      console.error("Erreur détaillée :", err);
      
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  if (isProfessionalsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des professionnels...</Typography>
      </Box>
    );
  }

  if (isProfessionalsError) {
    return <Typography color="error">Erreur lors du chargement des professionnels.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))`, // Subtle white gradient
            borderLeft: `4px solid ${snackbarSeverity === 'success' ? 'green' : 'red'}`, // Distinct left border
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
          }}
          icon={snackbarSeverity === 'success' ? <CheckCircleOutlineIcon sx={{ mr: 1 }} /> : <ErrorOutlineIcon sx={{ mr: 1 }} />}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h4" gutterBottom>Prendre un Rendez-vous</Typography>
      <AppointmentForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={handleOnSubmit}
        isLoading={isCreatingAppointment}
        professionals={professionals}
        errors={errors}
      />
    </Box>
  );
};

export default Appointment;