import { createApi } from '@reduxjs/toolkit/query/react';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import {
  encodeCategory,
  transformFetchCategoryResponse,
  transformSingleCategory,
} from './categoriesApi.transform';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { MethodsEnum } from '@config/enums/method.enum';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { QueryParams } from 'types/interfaces/QueryParams';
import { Category } from 'types/models/Category';
import { ENDPOINTS } from '@config/constants/endpoints';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';
export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Categories', 'Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<PaginationResponse<Category>, QueryParams>({
      query: (params) => {
        return {
          url: injectPaginationParamsToUrl(ENDPOINTS.CATEGORIES, params),
          method: MethodsEnum.GET,
        };
      },
      transformResponse: (
        response: ApiPaginationResponse<Category>,
      ): PaginationResponse<Category> => {
        return transformFetchCategoryResponse(response);
      },
      providesTags: ['Categories'],
    }),

    getCategoryById: builder.query<ItemDetailsResponse<Category>, number | undefined>({
      query: (id) => ({
        url: `${ENDPOINTS.CATEGORIES}/${id}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ItemDetailsResponse<Category>) => {
        return transformSingleCategory(response);
      },
      providesTags: ['Category'],
    }),

    createCategory: builder.mutation<ItemDetailsResponse<Category>, FieldValues>({
      query: (category) => ({
        url: ENDPOINTS.CREATE_CATEGORY,
        method: MethodsEnum.POST,
        body: encodeCategory(category),
      }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: builder.mutation<
      void,
      { id: number; category: FieldValues; deletedChildren: number[] }
    >({
      query: ({ id, category, deletedChildren }) => ({
        url: `${ENDPOINTS.UPDATE_CATEGORY}/${id}`,
        method: MethodsEnum.POST,
        body: encodeCategory(category, deletedChildren),
      }),
      invalidatesTags: ['Categories', 'Category'],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.DELETE_CATEGORY}/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Categories'],
    }),
    getUserCategories: builder.query<PaginationResponse<Category>, QueryParams>({
      query: (params) => {
        return {
          url: injectPaginationParamsToUrl(ENDPOINTS.USER_CATEGORIES, params),
          method: MethodsEnum.GET,
        };
      },
      transformResponse: (
        response: ApiPaginationResponse<Category>,
      ): PaginationResponse<Category> => {
        return transformFetchCategoryResponse(response);
      },
      providesTags: ['Categories'],
    }),
    getUserSubcategories: builder.query<PaginationResponse<Category>, number>({
      query: (categoryId) => {
        return {
          url: `${ENDPOINTS.USER_SUBCATEGORIES}/${categoryId}`,
          method: MethodsEnum.GET,
        };
      },
      transformResponse: (
        response: ApiPaginationResponse<Category>,
      ): PaginationResponse<Category> => {
        return transformFetchCategoryResponse(response);
      },
      providesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetUserCategoriesQuery,
  useGetUserSubcategoriesQuery,
} = categoriesApi;
