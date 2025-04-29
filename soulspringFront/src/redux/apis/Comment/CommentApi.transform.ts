import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import { toSnakeCase } from '@utils/helpers/string.helpers';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FieldValues } from 'react-hook-form';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { CommentApi, SingleCommentResponseData } from './CommentApi.type';
import { Comment } from 'types/models/Comment';

// Transform API response to handle paginated results

export const transformFetchCommentResponse = (
  response: ApiPaginationResponse<CommentApi>
): PaginationResponse<Comment> => {
  console.log("Raw API Response:", response); // Log the raw response
  
  // Ensure response.data is an array
  const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
  
  return {
    message: response.message || "No message provided", // Provide a default message
    data: transformComment(data), // Transform the data
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: data.length, // Set total based on the length of the data array
      count: data.length, // Set count based on the length of the data array
    },
  };
};

// Transform a single post response
export const transformCommentResponse = (
  response: SingleCommentResponseData,
): ItemDetailsResponse<Comment> => {
  console.log("API Response:", response); // Debugging
  console.log("Post Data:", response.data); // Corrected reference

  // Ensure response.data exists before processing
  if (!response.data) {
    console.error("Error: Post data is undefined", response);
    return {
      message: response.message || "No data received",
      data: null,
    };
  }

  return {
    message: response.message,
    data: transformSingleComment(response.data), // Corrected reference
  };
};

// Handle cases where the response data might be null or undefined
const transformComment = (data: CommentApi[]): Comment[] => {
  if (!Array.isArray(data)) {
    console.error("Error: Data is not an array", data);
    return []; // Return an empty array if data is invalid
  }

  return data.map((comment) => transformSingleComment(comment));
};

// Transform a single post object
export const transformSingleComment = (data: CommentApi): Comment => {
  return {
    _id: data._id,
    content: data.content,
    post: data.post,
    autheur: {
     _id:data.autheur._id,
      name: data.autheur?.name ,
      lastname: data.autheur?.lastname ,
      profilePicture: data.autheur?.profilePicture,
    },
    
    isBlocked: data.isBlocked,
    likes:data.likes,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// Encode post form data to FormData
export const encodeComment = (values: FieldValues): FormData => {
  const formData = new FormData();

  // Convert all fields to snake_case and append to FormData
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      formData.append(toSnakeCase(key), values[key]);
    }
  });

  return formData;
};
