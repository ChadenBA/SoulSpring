// features/Appointment/AppointmentForm.tsx
import React, { useEffect } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { TextField, Avatar, Select, MenuItem, InputLabel, FormControl, Button, Stack, CircularProgress, FormHelperText, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AppointmentFormProps {
  control: UseFormReturn<FieldValues>['control'];
  handleSubmit: UseFormReturn<FieldValues>['handleSubmit'];
  onSubmit: (data: FieldValues) => void;
  isLoading: boolean;
  professionals: { id: number; name: string; lastname: string; profilePicture?: string }[];
  errors: any;
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '& .MuiListItemIcon-root': {
    marginRight: theme.spacing(1),
    minWidth: 36,
  },
}));

const AppointmentForm: React.FC<AppointmentFormProps> = ({ control, handleSubmit, onSubmit, isLoading, professionals, errors }) => {
  useEffect(() => {
    console.log('Professionals received in form:', professionals);
  }, [professionals]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Professionnel */}
        <FormControl fullWidth error={!!errors.professionalId}>
          <InputLabel id="professional-select-label">Professionnel</InputLabel>
          <Controller
            name="professionalId"
            control={control}
            defaultValue=""
            rules={{ required: 'Veuillez sélectionner un professionnel' }}
            render={({ field }) => (
              <>
                <Select
  {...field}
  labelId="professional-select-label"
  label="Professionnel"
  disabled={isLoading}
  value={field.value || ""}
  onChange={(e) => {
    const selectedId = e.target.value;
    console.log("Valeur sélectionnéeeeeeee:", selectedId);
    field.onChange(selectedId);
    
    // Recherche du professionnel par ID
    const selectedProfessional = professionals.find((pro) => pro.id === selectedId);
    if (selectedProfessional) {
      console.log('Professionnel sélectionné:', selectedProfessional);
    } else {
      console.log('Aucun professionnel avec ID:', selectedId);
      console.log('Liste des professionnels:', professionals);
    }
  }}
  renderValue={(selected) => {
    console.log("Selected in renderValue:", selected);
    console.log("Type of selected:", typeof selected);
    
    if (!selected) {
      return <em>Sélectionnez un professionnel</em>;
    }
    
    // Recherche du professionnel sélectionné dans la liste
    const selectedPro = professionals.find(pro => pro.id === selected);
    console.log("Found professional in renderValue:", selectedPro);
    
    if (!selectedPro) {
      return <em>Sélectionnez un professionnel</em>;
    }
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {selectedPro.profilePicture && (
          <Avatar 
            src={selectedPro.profilePicture} 
            alt={`${selectedPro.name} ${selectedPro.lastname}`}
            sx={{ mr: 1, width: 24, height: 24 }} 
          />
        )}
        {`${selectedPro.name} ${selectedPro.lastname}`}
      </Box>
    );
  }}
>
  <MenuItem value="" disabled>
    <em>Sélectionnez un professionnel</em>
  </MenuItem>
  {professionals.map((pro) => (
    <StyledMenuItem key={pro.id} value={pro.id}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {pro.profilePicture && (
          <Avatar 
            src={pro.profilePicture} 
            alt={`${pro.name} ${pro.lastname}`}
            sx={{ mr: 1, width: 24, height: 24 }} 
          />
        )}
        <span>{`${pro.name} ${pro.lastname}`}</span>
      </Box>
    </StyledMenuItem>
  ))}
  {professionals.length === 0 && (
    <MenuItem value="" disabled>Aucun professionnel disponible</MenuItem>
  )}
</Select>
                {errors.professionalId && (
                  <FormHelperText>{errors.professionalId.message}</FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>

        {/* Motif du rendez-vous */}
        <Controller
          name="reason"
          control={control}
          defaultValue=""
          rules={{ required: 'Veuillez indiquer le motif du rendez-vous' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Motif du rendez-vous"
              fullWidth
              error={!!errors.reason}
              helperText={errors.reason?.message}
            />
          )}
        />

        {/* Date et Heure */}
        <Controller
          name="date"
          control={control}
          defaultValue=""
          rules={{ required: 'Veuillez sélectionner une date et une heure' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date et Heure"
              type="datetime-local"
              fullWidth
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />

        {/* Bouton de soumission */}
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Prendre rendez-vous'}
        </Button>
      </Stack>
    </form>
  );
};

export default AppointmentForm;