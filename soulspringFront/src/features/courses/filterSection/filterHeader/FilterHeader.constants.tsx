import { OrderDirectionEnum } from '@config/enums/orderDirection.enum'

export const filterOptions = [
  {
    id: 1,
    label: 'pagination.newest',
    orderBy: 'created_at',
    direction: 'desc',
  },
  {
    id: 2,
    label: 'pagination.oldest',
    orderBy: 'created_at',
    direction: OrderDirectionEnum.ASC,
  },

  {
    id: 3,
    label: 'pagination.title_asc',
    orderBy: 'title',
    direction: OrderDirectionEnum.ASC,
  },
  {
    id: 4,
    label: 'pagination.title_desc',
    orderBy: 'title',
    direction: OrderDirectionEnum.DESC,
  },
]
