export interface Post {
    _id: number;
    title: string;
    content: string;
    autheur: {


                name: string;
                lastname: string;
                profilePicture?: {
                    url: string;
                    publicId: string;
                }    };   
       
    commentCount: number; // Number of comments on the post
    comments: [],
    likes:number,
    isBlocked : boolean,
    createdAt: string; // Timestamp for when the post was created
    updatedAt: string; // Timestamp for when the post was last updated
  }
  