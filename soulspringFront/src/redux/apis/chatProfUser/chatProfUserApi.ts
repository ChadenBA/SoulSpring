import { ENDPOINTS } from '@config/constants/endpoints';
import { MethodsEnum } from '@config/enums/method.enum';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ChatProfUserApi } from './chatProfUserApi.type';
import { ChatProfUser } from 'types/models/ChatProUser';
import { transformProUserMsg } from './chatProfUserApi.transform';



export const  chatProfUserApi = createApi({
  reducerPath: 'chatProfUserApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['chatProfUser'],
  endpoints: (builder) => ({

    

      sendmsgprouser: builder.mutation<ChatProfUser, ChatProfUser>({
            query: (newPost) => ({
              url: ENDPOINTS.SEND_PRO_USER,
              method: MethodsEnum.POST,
              body: newPost,
            }),
            invalidatesTags: ['chatProfUser'],
          }),

          replaymsgprouser: builder.mutation<ChatProfUser, ChatProfUser>({
            query: (newPost) => ({
              url: ENDPOINTS.REPLAY_PRO_USER,
              method: MethodsEnum.POST,
              body: newPost,
            }),
            invalidatesTags: ['chatProfUser'],
          }),


          getMsgProUser: builder.mutation<ChatProfUserApi, { receiverId: string }>({
            query: ({receiverId }) => ({
              url: ENDPOINTS.GET_MSG_PRO_USER,
              method: 'POST', 
              body: {  receiverId },
            }),
            transformResponse: transformProUserMsg, 

          
          }),
           deleteMsgProUser: builder.mutation<ChatProfUserApi, number>({
                     query: (id) => ({
                       url: `${ENDPOINTS.DELETE_MSG_PRO_USER}/${id}`,
                       method: MethodsEnum.DELETE,
                     }),
                     invalidatesTags: ['chatProfUser'],
                   }),
          



  }),


  
});



export const { useGetMsgProUserMutation,
    useSendmsgprouserMutation,
    useReplaymsgprouserMutation,
    useDeleteMsgProUserMutation,

} = chatProfUserApi;
