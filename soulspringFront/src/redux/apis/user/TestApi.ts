// redux/TestApi.ts

import { createApi } from '@reduxjs/toolkit/query/react';
import { TestQuestion } from 'types/interfaces/TestQuestion'; // Import the updated interface
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig'; // Assume this is your base query setup
import { ENDPOINTS } from '@config/constants/endpoints'; // Define your endpoints in this file
import { ApiResponse } from 'types/interfaces/TestResultData'; // Assuming you have a response type for this
import { MethodsEnum } from '@config/enums/method.enum'; // Enum for GET, POST, etc.

export const TestApi = createApi({
  reducerPath: 'TestApi', // The name of the reducer in your store
  baseQuery: baseQueryConfigWithRefresh, // The base query for the API calls
  endpoints: (builder) => ({
    getQuestions: builder.query<TestQuestion[], void>({
      query: (language) => ({
        url: `${ENDPOINTS.TEST_QUESTIONS}?language=${language}`, // Include language in the query string
        method: MethodsEnum.GET, // The HTTP method for this request
      }),
    }),
    submitResponses: builder.mutation<ApiResponse, { responses: string[]; user_id: number }>({
      query: (payload) => ({
        url: ENDPOINTS.SILVERMAN_SUBMIT_RESPONSES, // Endpoint for submitting responses
        method: MethodsEnum.POST, // POST request to submit responses
        body: { responses: payload.responses, user_id: payload.user_id },
      }),
    }),
    getResult: builder.query<ApiResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `${ENDPOINTS.SILVERMAN_RESULT.replace(':userId', userId)}`, // Replace ':userId' with the actual userId
        method: MethodsEnum.GET,
      }),
    }),
    
  }),
});

export const { 
  useGetQuestionsQuery, 
  useSubmitResponsesMutation, 
  useGetResultQuery 
} = TestApi;
