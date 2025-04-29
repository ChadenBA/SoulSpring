import { createApi } from '@reduxjs/toolkit/query/react';
import { MethodsEnum } from '@config/enums/method.enum';
import { ENDPOINTS } from '@config/constants/endpoints';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { Post } from 'types/models/Post';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { ApiPaginationResponse } from '../type';
import { Comment } from 'types/models/Comment';

// Comment API
export const CommentApi = createApi({
  reducerPath: 'CommentApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    // Fetch posts with pagination
  
    getCommentbypost: builder.query<Comment, number>({
          query: ( id) => ({
            url: `${ENDPOINTS.GET_COMMENT_BYPOST}/${id}`,
            method: MethodsEnum.GET,
          }),
          providesTags: ['comments'],
        }),
    

    // Create a new comment 
    createComment: builder.mutation<Comment, Comment>({
      query: (newPost) => ({
        url: ENDPOINTS.CREATE_COMMENT,
        method: MethodsEnum.POST,
        body: newPost,
      }),
      invalidatesTags: ['comments'],
    }),
     
         deletecOMMENT: builder.mutation<Comment, number>({
           query: (id) => ({
             url: `${ENDPOINTS.DELETE_COMMENT}/${id}`,
             method: MethodsEnum.DELETE,
           }),
           invalidatesTags: ['comments'],
         }),

         updateComment: builder.mutation<Comment,  { id: number; body: Partial<Comment> }>({
          query: ({ id, body }) => ({
            url: `${ENDPOINTS.UPADETE_COMMENT}/${id}`,
            method: MethodsEnum.PUT,
            body,

          }),
          invalidatesTags: ['comments'],
        }),
        likeComment: builder.mutation<Comment, number>({
          query: (id) => ({
            url: `${ENDPOINTS.LIKE_COMMENT}/${id}`,
            method: MethodsEnum.PATCH,
          }),
          invalidatesTags: ['comments'],
        }),
        unLikeComment: builder.mutation<Comment, number>({
          query: (id) => ({
            url: `${ENDPOINTS.UNLIKE_COMENT}/${id}`,
            method: MethodsEnum.PATCH,
          }),
          invalidatesTags: ['comments'],
        }),

        blockComment: builder.mutation<Comment, number>({
                  query: (id) => ({
                    url: `${ENDPOINTS.BLOCK_COMMENT}/${id}`,
                    method: MethodsEnum.PATCH,
                  }),
                  invalidatesTags: ['comments'],
                }),
                unblockComment: builder.mutation<Comment, number>({
                  query: (id) => ({
                    url: `${ENDPOINTS.UNBLOCK_COMMENT}/${id}`,
                    method: MethodsEnum.PATCH,
                  }),
                  invalidatesTags: ['comments'],
                }),
        
  }),
})

export const {
  useCreateCommentMutation,
  useGetCommentbypostQuery,
  useUpdateCommentMutation,
  useDeletecOMMENTMutation,
  useLikeCommentMutation,
  useUnLikeCommentMutation,
  useBlockCommentMutation,
useUnblockCommentMutation
} = CommentApi;
