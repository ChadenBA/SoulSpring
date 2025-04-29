import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CustomRadioButtonProps } from './CustomRadioButton.type';
import { CustomLabel, StyledErrorIcon } from './CustomRadioButton.style';
import { useTranslation } from 'react-i18next';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

function CustomRadioButton({ config }: CustomRadioButtonProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { name, label, defaultValue, options, disabled, rules } = config;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // (['ABSTRACT', 'CONCRETE'].includes(
  //   (field?.value as string).toUpperCase(),
  // ) && {
  //   checked: undefined,
  // })}

  return (
    <FormControl component="fieldset">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <Stack direction="row" spacing={1} alignItems="center">
              <CustomLabel variant="h6">{t(label)}</CustomLabel>
              {fieldState.error && (
                <Tooltip
                  title={t(fieldState.error?.message || GLOBAL_VARIABLES.EMPTY_STRING)}
                  placement="right"
                >
                  <IconButton>
                    <StyledErrorIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            <RadioGroup value={field?.value?.toString()} onChange={field.onChange} row={!isMobile}>
              {options?.map((option, index) => {
                const stringValue = option?.value?.toString();

                return (
                  <FormControlLabel
                    key={index}
                    value={stringValue}
                    control={
                      <Radio
                        disabled={disabled}
                        {...(['ABSTRACT', 'CONCRETE'].includes(stringValue.toUpperCase()) && {
                          checked:
                            option?.value.toString().toUpperCase() === field.value.toUpperCase(),
                        })}
                      />
                    }
                    label={t(option.label)}
                  />
                );
              })}
            </RadioGroup>
          </>
        )}
      />
    </FormControl>
  );
}

export default CustomRadioButton;
