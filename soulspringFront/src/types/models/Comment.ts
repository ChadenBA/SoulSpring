export interface Comment {
    _id: number;
    content: string;
    autheur: {
        _id: number;

                name: string;
                lastname: string;
                profilePicture?: {
                    url: string;
                    publicId: string;
                }    };   
       
    likes:[],
    post:number;
    isBlocked : boolean,
    createdAt: string; // Timestamp for when the post was created
    updatedAt: string; // Timestamp for when the post was last updated
  }
  