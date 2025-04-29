import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/UsersModel";
import { Professional } from "../Models/professionalModel";

dotenv.config();

// Extend the Request type to include the user
interface AuthRequest extends Request {
  user?: any;
}

// Type guard to check if the error is an instance of Error
const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
}

// Authentication Middleware
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Get the token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1]; // Token after "Bearer"
    
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    console.log("Token received:", token);  // Log the token for debugging purposes

    // Decode and verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string, exp: number };
      
      // Log decoded information for debugging purposes
      console.log("Decoded JWT:", decoded);

      // Check if token has expired
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decoded.exp < currentTime) {
        return res.status(401).json({ message: "Token has expired." });
      }

      // Attach user info to the request object
      req.user = decoded;
      next();  // Continue to the next middleware or route handler
    } catch (error) {
      if (isError(error)) {
        // Handle JWT-specific errors
        if (error.name === "TokenExpiredError") {
          console.error("JWT Expired:", error);
          return res.status(401).json({ message: "Token expired." });
        }
        console.error("JWT Verification Error:", error);
        return res.status(400).json({ message: "Invalid token22.", error: error.message });
      }
      // Fallback for non-Error objects (in case TypeScript's `unknown` is used)
      console.error("Unknown Error:", error);
      return res.status(400).json({ message: "Invalid token11." });
    }
  } catch (error) {
    if (isError(error)) {
      console.error("Error in authMiddleware:", error);
      res.status(400).json({ message: "Invalid token444.", error: error.message });
    } else {
      console.error("Unknown Error:", error);
      res.status(400).json({ message: "Invalid token333." });
    }
  }
};
