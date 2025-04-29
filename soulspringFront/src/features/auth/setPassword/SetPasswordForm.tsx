import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField';
import { PATHS } from '@config/constants/paths';
import { HttpStatusEnum } from '@config/enums/httpStatus.enum';
import { Stack, Button } from '@mui/material';
import { useSetPasswordMutation,useVerifyTokenMutation } from '@redux/apis/auth/authApi';
import { useAppDispatch } from '@redux/hooks';
import { showSuccess, showError } from '@redux/slices/snackbarSlice';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams,useParams, useNavigate } from 'react-router-dom';
import { IError } from 'types/interfaces/Error';
import { SIGNUP_FORM_CONFIG } from '../signup/SignupForm.constants';
import { SetPasswordBody } from './SetPasswordForm.type';

function SetPasswordForm() {
  // Initialisation de React Hook Form avec validation instantanée
  const SetPasswordFormMethods = useForm({
    mode: 'onChange', // Vérifie la validation à chaque changement
    shouldFocusError: true, // Met le focus sur le premier champ avec erreur
  });
  const { watch } = SetPasswordFormMethods;

  // Récupération des paramètres de l'URL pour extraire le token
  //const [useParams] = useParams();
  //const {token} = useParams.get('token'); // Récupère le token de l'URL
  const { token } = useParams<{ token: string }>(); 
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // Récupération en temps réel du mot de passe tapé par l'utilisateur
  const password = watch('password');

  // Initialisation de la mutation pour définir un nouveau mot de passe
  const [setPasswordMutation] = useSetPasswordMutation();
  const[ setVerifyToken]= useVerifyTokenMutation();

  // Gérer l'appui sur la touche "Entrée" pour soumettre le formulaire
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  };
  
  const onSubmit = SetPasswordFormMethods.handleSubmit(async (values) => {
    console.log("🔹 Tentative de définition du mot de passe avec :", values);
    console.log("🔹 Token récupéré :", token);
  
    if (!token) {
      dispatch(showError(t('auth.invalid_token 22'))); // Bloque si pas de token
      return;
    }
  
    try {

      //Envoi de la requête pour définir un nouveau mot de passe
      const passwordResponse = await setPasswordMutation({
        token,
       // password: values.password,
        //password_confirmation: values.passwordConfirmation,

       data: values as SetPasswordBody,
      }).unwrap();
  
      console.log(" Mot de passe mis à jour avec succès :", passwordResponse);
  
      //Affichage du message de succès et redirection
      dispatch(showSuccess(t('auth.password_set_success')));
      navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`);
  
    } catch (error) {
      console.error(" Erreur :", error);
  
      // Gestion des erreurs
      if ((error as IError).status === HttpStatusEnum.BAD_REQUEST) {
        dispatch(showError(t('auth.invalid_token'))); // Token invalide
      } else {
        dispatch(showError(t('errors.general_error'))); // Erreur serveur
      }
    }
  });
  
  return (
    <FormProvider {...SetPasswordFormMethods}>
      {/* Formulaire de définition de mot de passe */}
      <form onKeyPress={handleKeyPress} noValidate>
        <Stack spacing={3} width={'100%'} mt={2}>
          {/* Champ de mot de passe */}
          <CustomPasswordTextField
            config={{ ...SIGNUP_FORM_CONFIG.password, defaultValue: password }}
          />
          {/* Champ de confirmation de mot de passe avec validation */}
          <CustomPasswordTextField
            config={{
              ...SIGNUP_FORM_CONFIG.passwordConfirmation,
              rules: {
                validate: (value) => {
                  if (value !== password) return `${t('auth.password_not_match')}`;
                },
              },
            }}
          />
          {/* Bouton de soumission */}
          <Button onClick={onSubmit} variant="outlined">
            {t('auth.set_password')}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export default SetPasswordForm;
