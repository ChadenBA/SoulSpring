import { Chater } from "@config/enums/chater.enum";

 

  export interface ChatProfUserApi {
    senderModel: Chater; 
    senderId: string ;
    receiverId: string ;
    receiverModel: Chater; 
    content: string;
    replyTo?: string; 
    createdAt: Date;
    read: boolean;
  
   
    
    }
    
    export interface SingleChatProfUserResponseData {
      message: string;
      data: ChatProfUserApi;
    }
    
    export interface UpdateChatProfUserResponseApi {
      message: string;
      data: ChatProfUserApi;
    }
    
    export interface UpdateChatProfUserResponse {
      message: string;
      data: ChatProfUserApi;
    }
    