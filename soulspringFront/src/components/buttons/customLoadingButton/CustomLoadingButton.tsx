import { LoadingButton } from '@mui/lab';
import { CustomLoadingButtonProps } from './CustomLoadingButton.type';
export const CustomLoadingButton = ({
  isLoading,
  children,
  onClick,
  contained = false,
}: CustomLoadingButtonProps) => {
  return (
    <LoadingButton
      loading={isLoading}
      onClick={onClick}
      variant={contained ? 'contained' : 'outlined'}
      fullWidth
    >
      {children}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
