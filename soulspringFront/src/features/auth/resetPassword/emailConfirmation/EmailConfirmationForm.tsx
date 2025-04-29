import { FormProvider, useForm } from 'react-hook-form'
import { Snackbar, Alert, AlertTitle, Stack, Box } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useSendResetPasswordEmailMutation } from '@redux/apis/auth/authApi'
import useError from 'src/hooks/useError'
import { IError } from 'types/interfaces/Error'
import { HttpStatusEnum } from '@config/enums/httpStatus.enum'
import { showError } from '@redux/slices/snackbarSlice'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants'

function EmailConfirmationForm() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null)

  const ResetPasswordFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  const [sendEmail, { isLoading }] = useSendResetPasswordEmailMutation()
  const { getError } = useError({ formMethods: ResetPasswordFormMethods })

  const onSubmit = ResetPasswordFormMethods.handleSubmit(async (data) => {
    const { email } = data
    try {
      const response = await sendEmail({ email }).unwrap()
      
      console.log(' Email envoyé avec succès ! Réponse API :', response)

      // Afficher une alerte de succès avec un titre
      setAlert({
        type: 'success',
        title: 'Succès !',
        message: 'Vérifiez votre boîte email pour modifier votre mot de passe.',
      })
    } catch (error) {
      console.error(' Erreur lors de l\'envoi de l\'email :', error)

      // Afficher une alerte d'erreur avec un titre
      setAlert({
        type: 'error',
        title: 'Erreur !',
        message: 'Échec de l\'envoi de l\'email. Veuillez réessayer.',
      })

      if ((error as IError).status === HttpStatusEnum.UNAUTHORIZED) {
        getError(error as IError)
      } else if ((error as IError).status === HttpStatusEnum.NOT_FOUND) {
        getError(error as IError)
      } else {
        dispatch(showError(t('errors.general_error')))
      }
    }
  })

  return (
    <Stack spacing={4} m={2} alignItems="center">
      <FormProvider {...ResetPasswordFormMethods}>
        <CustomTextField config={SIGNUP_FORM_CONFIG.email} />
        <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
          {t('auth.send_email')}
        </CustomLoadingButton>
      </FormProvider>

      {/* ✅ Alert centrée avec fond blanc */}
      {alert && (
        <Box
          sx={{
            position: 'fixed',
            top: '20%',
            left: '70%',
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
            <AlertTitle>{alert.title}</AlertTitle>
            {alert.message}
          </Alert>
        </Box>
      )}
    </Stack>
  )
}

export default EmailConfirmationForm
