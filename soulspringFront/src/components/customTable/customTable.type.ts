import { ReactNode } from 'react'
import { ColumnHeader } from '../../types/interfaces/ColumHeader'
import {  QueryParams } from 'types/interfaces/QueryParams'

export interface CustomTableProps {
  columns: ColumnHeader[]
  isLoading: boolean
  isFetching: boolean
  children: ReactNode
  queryParams: QueryParams
  hasSearch?: boolean
  handleSearchChange: (keyword: string) => void
}
