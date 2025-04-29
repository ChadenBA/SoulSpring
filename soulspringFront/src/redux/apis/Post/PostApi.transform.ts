import { transformPaginationResponse } from '@redux/apis/transform';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import { PostApi, SinglePostResponseData } from './PostApi.type';
import { Post } from 'types/models/Post';
import { toSnakeCase } from '@utils/helpers/string.helpers';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FieldValues } from 'react-hook-form';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';

// Transform API response to handle paginated results

export const transformFetchPostResponse = (
  response: ApiPaginationResponse<PostApi>
): PaginationResponse<Post> => {
  console.log("Raw API Response:", response); // Log the raw response
  
  // Ensure response.data is an array
  const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
  
  return {
    message: response.message || "No message provided", // Provide a default message
    data: transformPosts(data), // Transform the data
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: data.length, // Set total based on the length of the data array
      count: data.length, // Set count based on the length of the data array
    },
  };
};

// Transform a single post response
export const transformPostResponse = (
  response: SinglePostResponseData,
): ItemDetailsResponse<Post> => {
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
    data: transformSinglePost(response.data), // Corrected reference
  };
};

// Handle cases where the response data might be null or undefined
const transformPosts = (data: PostApi[]): Post[] => {
  if (!Array.isArray(data)) {
    console.error("Error: Data is not an array", data);
    return []; // Return an empty array if data is invalid
  }

  return data.map((post) => transformSinglePost(post));
};

// Transform a single post object
export const transformSinglePost = (data: PostApi): Post => {
  return {
    _id: data._id,
    title: data.title,
    content: data.content,
    autheur: {
      name: data.autheur?.name ,
      lastname: data.autheur?.lastname ,
      profilePicture: data.autheur?.profilePicture,
    },
    commentCount: data.commentCount,
    comments:data.comments,
    isBlocked: data.isBlocked,
    likes:data.likes,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// Encode post form data to FormData
export const encodePost = (values: FieldValues): FormData => {
  const formData = new FormData();

  // Convert all fields to snake_case and append to FormData
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      formData.append(toSnakeCase(key), values[key]);
    }
  });

  return formData;
};
