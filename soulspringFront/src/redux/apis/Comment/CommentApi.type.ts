export interface CommentApi {
    _id: number;
    post: number;
    content: string;
    autheur: {

      _id: number;

      name: string;
      lastname: string;
      profilePicture?: {
        url: string;
        publicId: string;
    }       };    
     likes : [],
    isBlocked : boolean,

 
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SingleCommentResponseData {
    message: string;
    data: CommentApi;
  }
  
  export interface UpdateCommentResponseApi {
    message: string;
    data: CommentApi;
  }
  
  export interface UpdateCommentResponse {
    message: string;
    data: CommentApi;
  }
  