import { createApi } from '@reduxjs/toolkit/query/react';
import { MethodsEnum } from '@config/enums/method.enum';
import { ENDPOINTS } from '@config/constants/endpoints';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { Post } from 'types/models/Post';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { ApiPaginationResponse } from '../type';

// Post API
export const postApi = createApi({
  reducerPath: 'PostApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    // Fetch posts with pagination
    getPosts: builder.query<PaginationResponse<Post>, { page: number; limit: number; keyword?: string }>({
      query: ({ page, limit, keyword }) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.GET_POSTS, { page, perPage: limit, keyword }), 
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<Post>) => ({
        message: response.message || 'No posts available',
        data: response.data || [],
        meta: response.meta,
      }),
      providesTags: ['Posts'],
    }),
    

    // Create a new post
    createPost: builder.mutation<Post, Post>({
      query: (newPost) => ({
        url: ENDPOINTS.CREATE_POST,
        method: MethodsEnum.POST,
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
     
         deletePost: builder.mutation<Post, number>({
           query: (id) => ({
             url: `${ENDPOINTS.DELETE_POST}/${id}`,
             method: MethodsEnum.DELETE,
           }),
           invalidatesTags: ['Posts'],
         }),

         updatePost: builder.mutation<Post, { id: number; body: Partial<Post> }>({
          query: ({ id, body }) => ({
            url: `${ENDPOINTS.UPDATE_POST}/${id}`,
            method: MethodsEnum.PUT,
            body,
          }),
          invalidatesTags: ['Posts'],
        }),
        
        
        likePost: builder.mutation<Post, number>({
          query: (id) => ({
            url: `${ENDPOINTS.LIKE_POST}/${id}`,
            method: MethodsEnum.PATCH,
          }),
          invalidatesTags: ['Posts'],
        }),
        unLikePost: builder.mutation<Post, number>({
          query: (id) => ({
            url: `${ENDPOINTS.UNLIKE_POST}/${id}`,
            method: MethodsEnum.PATCH,
          }),
          invalidatesTags: ['Posts'],
        }),

        blockPost: builder.mutation<Post, number>({
          query: (id) => ({
            url: `${ENDPOINTS.BLOCK_POST}/${id}`,
            method: MethodsEnum.PATCH,
          }),
          invalidatesTags: ['Posts'],
        }),
        unblockPost: builder.mutation<Post, number>({
          query: (id) => ({
            url: `${ENDPOINTS.UNBLOCK_POST}/${id}`,
            method: MethodsEnum.PATCH,
          }),
          invalidatesTags: ['Posts'],
        }),




  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnLikePostMutation,
  useBlockPostMutation,
  useUnblockPostMutation,

} = postApi;
