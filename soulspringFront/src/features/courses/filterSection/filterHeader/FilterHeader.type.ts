import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

export interface FilterHeaderProps {
  total: number
  handleOrderChange?: (orderDirection: string, orderBy: string) => void
  hasFilter?: boolean
  queryParams: QueryParams
  isCoursePage?: boolean
  handleFiltersRangeChange: (filters: FiltersOption[]) => void
}
