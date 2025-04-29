import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import { BLUE } from '@config/colors/colors';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useUpdateProfileMutation } from '@redux/apis/user/usersApi';
import { useTranslation } from 'react-i18next';
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants';
import { useEffect } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import useUploadFile from 'src/hooks/useUploadFile';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { showSuccess } from '@redux/slices/snackbarSlice';
import { IError } from 'types/interfaces/Error';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField';
import useError from 'src/hooks/useError';
import { StyledSubTitle } from '../userProfile/UserProfile.style';
import { UserRoleEnum } from '@config/enums/role.enum';
import { professionalApi } from '@redux/apis/Professional/ProfessionalApi';
import { Image, Password } from '@mui/icons-material';
import { Controller } from 'react-hook-form';

function EditProfile() {
 // Utilisation de la traduction pour les textes multilingues
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

//Récupération des données utilisateur
  const user = useAppSelector((state) => state.auth.user); // user est extrait du store Redux et contient les informations du profil actuel
  console.log(user); // Ensure the user object is correctly logged
  console.log("Role utilisateur:", user?.role); // Vérifier la valeur du rôle
 
  console.log(user?.id); // Ensure the user object is correctly logged
 // const media = useAppSelector((state) => state.auth.media);

  //Initialisation du formulaire avec react-hook-form
  const UserFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  });
  //const { reset } = UserFormMethods;
  

//affichage du photo actuel
  const profilePicture = user?.profilePicture; 
  if (profilePicture)
  console.log("urlllllllllll",profilePicture.url); 



  
  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods: UserFormMethods,
    fieldName: 'profilePicture', //n5ali champs hadha kima haka sinon tsir errerr)
    initPreview: profilePicture?.url ||"src/assets/images/noUser.png",
    id: profilePicture?.publicId,
    index: 0,
  });

  
  // Optionally pass form methods for file upload handling if needed
 // const { preview, handleOnChange, handleResetPreview } = useUploadFile();

  
  // Utilisation d'un hook personnalisé pour gérer les erreurs de formulaire
  const { getError } = useError({
    formMethods: UserFormMethods,
  });
  //API pour mettre à jour le profil
  const [updateProfileApiAction, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const onSubmit = UserFormMethods.handleSubmit(async (values) => {
    console.log("ID utilisateur dans le store Redux : ", user?.id);  // Afficher ici pour vérifier
    if (!user?.id) {
      console.error("ID utilisateur manquant");
      return;  // Ne pas soumettre si l'ID est manquant
    }
    console.log("Données envoyées à l'api pour faire la mise à jourrrrrrrrrrrr :", values); // Vérifier les données envoyées
    try {
      console.log("idddddddddddddddddddd",user?.id);
      // Préparation des données pour la mise à jour
      console.log("➡️ Valeur de values.profilePicture :", values?.profilePicture);
     // console.log("➡️ URL :", values?.profilePicture[0]|| "⛔ Aucune URL trouvée");

      const updatedValues = {
        id:user?.id,
      //profilePicture: values.profilePicture, , si on met ça une erreur est apparut 
        ...values,
     
        ...(user?.role === UserRoleEnum.PROFESSIONAL && {
          specialite: values.specialite,
          contact: values.contact,
          description: values.description,
          address: values.address,
        }),
      };
console.log("updatedValues",updatedValues);
      // Envoi des données mises à jour
      await updateProfileApiAction(updatedValues).unwrap();
      console.log("appelllllllllllll api updateProfil");
      //ajouter ça pour mettre à jour le profil dans le store
      dispatch({ type: 'auth/updateUser', payload: updatedValues });
      dispatch(showSuccess(t('users.profile_updated_successfully'))); 
      UserFormMethods.setValue('deletedFilesId', null); 
       
    } catch (error) {
      getError(error as IError); 
    }
  });
  
  return (
    <>
      <Stack mb={2} spacing={2}>
        <StyledSubTitle variant="h3">{t('users.personal_information')}</StyledSubTitle>
        <Typography variant="body2">{t('users.personal_information_description')}</Typography>
        <Divider />
      </Stack>
      <FormProvider {...UserFormMethods}>
        <Grid container p={2} gap={4}>
          <Grid item xs={12} display="flex" gap={2}>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.firstName,
                    defaultValue: user?.firstName || GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.lastName,
                    defaultValue: user?.lastName || GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" gap={2}>
          <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.age,
                    defaultValue: user?.age !== undefined ? user?.age : GLOBAL_VARIABLES.EMPTY_STRING, // Check if user?.age is undefined or 0
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.email,
                    defaultValue: user?.email || GLOBAL_VARIABLES.EMPTY_STRING,
                    disabled: true, // Make sure email cannot be updated
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2, borderColor: 'gery', borderWidth: 0.5, width: '100%' }} />
          <Typography variant="h3" fontWeight="medium" color={BLUE.main} marginTop={-5}>
  {t('users.update_profile_picture')}
  
</Typography>
<Stack width="400px">
  <UploadInput onChange={handleOnChange} onDelete={handleResetPreview} preview={preview}  />
</Stack>
        
        <Divider sx={{ marginY: 2, borderColor: 'gery', borderWidth: 1, width: '100%' }} />
        <Typography variant="h3" fontWeight="medium" color={BLUE.main}  marginTop={-5}>
          {t('users.update_password')}
        </Typography>
        <Stack spacing={2}>
          <CustomPasswordTextField
            config={{
              ...SIGNUP_FORM_CONFIG.password,
              rules: {
                required: false,
              },
            }}
          />
          <CustomPasswordTextField config={{ ...SIGNUP_FORM_CONFIG.passwordConfirmation }} />
        </Stack>



        <Divider sx={{ marginY: 2, borderColor: 'gery', borderWidth: 0.5, width: '100%' }} />
        {user?.role === UserRoleEnum.PROFESSIONAL && (
            <>
              <Grid item xs={12} display="flex" gap={2}>
                <Grid item xs={12} sm={6}>
                  <Stack mb={2}>
                    <CustomTextField
                      config={{
                        ...SIGNUP_FORM_CONFIG.contact,
                        
                        defaultValue: user?.contact || GLOBAL_VARIABLES.EMPTY_STRING, // Use user data here
                      }}
                    />
                  </Stack>

                  

                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack mb={2}>
                    <CustomTextField
                      config={{
                        ...SIGNUP_FORM_CONFIG.specialite,
                        label: t('users.specialite'),
                        name: 'specialite',
                        placeholder: "",
                        defaultValue: user?.specialite || GLOBAL_VARIABLES.EMPTY_STRING, // Use user data here
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack mb={2}>
                  <CustomTextField
                    config={{
                      ...SIGNUP_FORM_CONFIG.address,
                      label: t('address'),
                      name: 'address',
                      placeholder: "",
                    
                      defaultValue: user?.address || GLOBAL_VARIABLES.EMPTY_STRING, // Use user data here
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack mb={2}>
                  <CustomTextField
                    config={{
                      ...SIGNUP_FORM_CONFIG.description,
                      label: t('users.description'),
                      name: 'description',
                      placeholder: "",
                    //  rows: 3,
                      defaultValue: user?.description || GLOBAL_VARIABLES.EMPTY_STRING, // Use user data here
                    }}
                  />
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
        <CustomLoadingButton 
              isLoading={isUpdating} 
              onClick={() => {
              console.log("Bouton cliqué !"); // Vérifier si cette ligne s'affiche dans la console
              onSubmit();
                             }}
>
  {t('users.update_profile')}
</CustomLoadingButton>
      </FormProvider>
    </>
  );
}

export default EditProfile;


