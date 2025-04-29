import { useState , useEffect} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack, Grid, Typography, IconButton, Collapse, Paper, Box } from '@mui/material';
import { RegisterBody } from './SignupForm.type';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import { useTranslation } from 'react-i18next';
import { SIGNUP_FORM_CONFIG } from './SignupForm.constants';
import { useSignupMutation } from '@redux/apis/auth/authApi';
import CustomLink from '@components/customLink/CustomLink';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch } from 'react-redux';
import { showSuccess, showError } from '@redux/slices/snackbarSlice'; // Import success & error actions
import CustomDialog from '@components/dialogs/CustomDialog';
import waitingImage from '@assets/images/waiting.gif';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [openPictureField, setOpenPictureField] = useState(false);
  const RegisterFormMethods = useForm({ mode: 'onChange', shouldFocusError: true });
  const { watch } = RegisterFormMethods;
  const { t } = useTranslation();
  const [registerApiAction, { isLoading }] = useSignupMutation();

  const onSubmit = RegisterFormMethods.handleSubmit(async (values) => {
    try {
      console.log('Profile Picture in submit:', profilePicture);
      console.log("profilePicture type:", profilePicture?.constructor.name);  // Should log "File"
      
      const response = await registerApiAction(values as RegisterBody).unwrap();
      const formData = new FormData();
  
      // Ensure profilePicture exists and is a file
    // Create FormData here instead of in the encoder
    
    // Append ALL form values including the file
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'profilePicture' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
      
      // Log FormData to confirm the file is appended
      console.log("FormData:", formData);
      // Check if the response contains a success message
      if (response?.message) {
        dispatch(showSuccess(response.message)); // Use the success message from API
        setOpenModal(true);
        RegisterFormMethods.reset();
        console.log('values:', values);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error('Signup Error:', error);
      
      // If the error is an API response, show its message
      if (error?.data?.message) {
        dispatch(showError(error.data.message));
      } else {
        dispatch(showError(t('errors.general_error'))); // Fallback error message
      }
    }
  });
  
  const password = watch('password');

  const roleOptions = [
    { value: 'user', label: t('auth.user') },
    { value: 'professional', label: t('auth.professional') },
  ];

  const handleTogglePictureField = () => {
    setOpenPictureField((prev) => !prev);
  };

  return (
    <Grid>
      <FormProvider {...RegisterFormMethods}>
        <form noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField config={SIGNUP_FORM_CONFIG.firstName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField config={SIGNUP_FORM_CONFIG.lastName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField config={SIGNUP_FORM_CONFIG.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField config={SIGNUP_FORM_CONFIG.age} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomPasswordTextField config={SIGNUP_FORM_CONFIG.password} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomPasswordTextField
                config={{
                  ...SIGNUP_FORM_CONFIG.passwordConfirmation,
                  rules: {
                    validate: (value) => value !== password ? t('auth.password_not_match') : true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomRadioButton
                config={{
                  name: 'role',
                  label: t('auth.role'),
                  defaultValue: 'user',
                  options: roleOptions,
                  placeholder: 'role',
                }}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <IconButton onClick={handleTogglePictureField}>
                {openPictureField ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
            <Collapse in={openPictureField} sx={{ width: '100%' }}>
              <Grid item xs={12}>
              <UploadInput
  label={t('auth.profile_picture')}
  file={profilePicture}
  onChange={(e) => {
    const file = e.target.files?.[0] || null;
    console.log("Selected file:", file);  // This should log the File object.
    setProfilePicture(file);
  }}
  onDelete={() => setProfilePicture(null)}
  preview={profilePicture && profilePicture instanceof File ? URL.createObjectURL(profilePicture) : ''}
/>

              </Grid>
            </Collapse>

            {watch('role') === 'professional' && (
              <>
                <Grid item xs={12} sm={6}>
                  <CustomTextField config={SIGNUP_FORM_CONFIG.specialite} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField config={SIGNUP_FORM_CONFIG.contact} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField config={SIGNUP_FORM_CONFIG.address} />
                </Grid>
                <Grid item xs={12} sm={6}> 
                  <CustomTextField config={SIGNUP_FORM_CONFIG.description} />
                </Grid>
                 {/* Custom Dialog for Professional awaiting Admin approval */}

      <CustomDialog
        children={waitingImage}
        onButtonClick={() => setOpenModal(false)}
        title=        {t('auth.awaiting_admin_approval')}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
              </>
            )}
          </Grid>
          <Box textAlign="center" mt={3}>
            <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
              {t('auth.create_account')}
            </CustomLoadingButton>
          </Box>
          <Typography variant="body2" textAlign="center" mt={2}>
            {t('auth.already_have_account')} <CustomLink to="/auth/login" label="Login" isActive />
          </Typography>
        </form>
      </FormProvider>

 
    </Grid>
  );
}
