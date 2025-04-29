export interface UserProfile {
    _id?: string;
    id?: string;
    name: string;
    lastname: string;
    profilePicture?: string | null;
  }
  
  export interface ChatProfUser {
    _id: string;
    content: string;
    createdAt: string;
    read: boolean;
    replyTo?: string;
    sender: UserProfile;
    senderId?: string;
    senderModel: string;
    receiver: UserProfile;
    receiverModel: string;
  }
  