import { Stack, Table, TableContainer, Typography } from '@mui/material'
import { CustomTableProps } from './customTable.type'
import CustomTableHeaders from './customTableHeaders/CustomTableHeaders'
import CustomTableBody from './customTableBody/CustomTableBody'
import { CustomTableRoot } from './CustomTable.style'
import CustomTableSkeleton from './customTableSkeleton/CustomTableSkeleton'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useTranslation } from 'react-i18next'
import { Children } from 'react'
import SearchSection from '@components/searchSection/SearchSection'

const CustomTable = ({
  columns,
  children,
  isFetching,
  isLoading,
  queryParams,
  hasSearch,
  handleSearchChange,
}: CustomTableProps) => {
  const { t } = useTranslation()

  const hasData = Children.toArray(children).length > 0

  return (
    <CustomTableRoot>
      <Stack spacing={2} padding={2}>
        {hasSearch && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <SearchSection
              handleSearchChange={handleSearchChange}
              searchValue={queryParams.keyword}
            />
          </Stack>
        )}
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CustomTableHeaders columns={columns} />
            <CustomTableBody>
              {isLoading || isFetching ? (
                <CustomTableSkeleton
                  columnCount={columns.length}
                  rowCount={GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE}
                />
              ) : hasData ? (
                children
              ) : (
                <Stack spacing={4} m={2}>
                  <Typography variant="subtitle1">
                    {t('common.no_data_found')}
                  </Typography>
                </Stack>
              )}
            </CustomTableBody>
          </Table>
        </TableContainer>
      </Stack>
    </CustomTableRoot>
  )
}
export default CustomTable
