import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import { RowsPerPageProps } from './rowPerPage.type'
import { useTranslation } from 'react-i18next'
import { StyledStack } from './RowPerPage.style'

const RowsPerPage = ({
  rowsPerPage,
  isLoading,
  onRowsPerPageChange,
}: RowsPerPageProps) => {
  const handleRowsPerPageChange = (event: SelectChangeEvent) => {
    onRowsPerPageChange?.(Number(event.target.value))
  }
  const { t } = useTranslation()

  return (
    <StyledStack>
      <Stack alignItems="end">
        <FormControl variant="outlined" size="small" sx={{ width: '150px' }}>
          <InputLabel id="rows-per-page-label">
            {t('pagination.rows_per_page')}
          </InputLabel>
          <Select
            labelId="rows-per-page-label"
            label={t('pagination.rows_per_page')}
            value={rowsPerPage.toString()}
            onChange={handleRowsPerPageChange}
            disabled={isLoading}>
            {[9, 18, 27, 36].map((rowsOption) => (
              <MenuItem key={rowsOption} value={rowsOption} aria-checked>
                {rowsOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </StyledStack>
  )
}

export default RowsPerPage
