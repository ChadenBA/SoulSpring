export interface PostApi {
    _id: number;
    title: string;
    content: string;
    autheur: {

      _id: number;

      name: string;
      lastname: string;
      profilePicture?: {
        url: string;
        publicId: string;
    }       };    
     likes : number,
    commentCount: number;
    isBlocked : boolean,

    comments:[], 
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SinglePostResponseData {
    message: string;
    data: PostApi;
  }
  
  export interface UpdatePostResponseApi {
    message: string;
    data: PostApi;
  }
  
  export interface UpdatePostResponse {
    message: string;
    data: PostApi;
  }
  