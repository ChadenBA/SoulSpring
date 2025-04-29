// src/@types/express/index.d.ts

import { IUser } from "../Models/UsersModel"; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
      
    }
  }
}
