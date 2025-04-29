import { ApiPaginationResponse } from '../type';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { Category, Children } from 'types/models/Category';
import { transformPaginationResponse } from '@redux/apis/transform';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';

export const transformFetchCategoryResponse = (
  response: ApiPaginationResponse<Category>,
): PaginationResponse<Category> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformCategories(response.data),
    };
  }
  return {
    message: response.message,
    data: transformCategories(response.data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  };
};

const transformCategories = (data: Category[]): Category[] => {
  return data.map((category) => ({
    id: category.id,
    title: category.title,
    children: category.children,
  }));
};

const transformCategory = (data: Category): Category => {
  return {
    id: data.id,
    title: data.title,
    children: data.children,
  };
};
export const transformSingleCategory = (
  response: ItemDetailsResponse<Category>,
): ItemDetailsResponse<Category> => {
  return {
    data: transformCategory(response.data),
    message: response.message,
  };
};
export const encodeCategory = (values: FieldValues, deletedChildren?: number[]): FormData => {
  const formData = new FormData();

  if (values.title) {
    formData.append('title', values.title);
  }

  values.children?.forEach((child: Children, index: number) => {
    if (child.title.length > 0) {
      formData.append(`subCategories[${index}][title]`, child.title);
      formData.append(`subCategories[${index}][id]`, child.index ? child.index.toString() : '0');
    }
  });

  deletedChildren?.forEach((childId: number, index: number) => {
    formData.append(`deletedSubCategories[${index}]`, childId.toString());
  });

  return formData;
};
