import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { SearchSectionProps } from './SearchSection.type'
import { useTranslation } from 'react-i18next'
import { StyledTextField } from './SearchSection.style'

function SearchSection({
  searchValue,
  handleSearchChange,
}: SearchSectionProps) {
  const { t } = useTranslation()
  return (
    <StyledTextField
      placeholder={t('common.search_placeholder')}
      value={searchValue}
      onChange={(e) => handleSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchSection
