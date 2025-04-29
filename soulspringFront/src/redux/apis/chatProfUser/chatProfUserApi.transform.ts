import { ChatProfUserApi } from "./chatProfUserApi.type";

// export const transformProUserMsg = (response: any): ChatProfUserApi => {
//     return {
//       senderModel: response.senderModel,
//       senderId: response.sender,
//       receiverId: response.receiver,
//       receiverModel: response.receiverModel,
//       content: response.content,
//       replyTo: response.replyTo ?? null,
//       createdAt: new Date(response.createdAt),
//       read: response.read,
//     };
//   };

// chatProfUserApi.transform.ts
export const transformProUserMsg = (response: any) => {
  return response?.messages ?? []; // Safely return messages
};
