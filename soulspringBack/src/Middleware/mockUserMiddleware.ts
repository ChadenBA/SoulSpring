import { Request, Response, NextFunction } from "express";

export const mockUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userHeader = req.header('user');
  if (userHeader) {
    try {
      req.user = JSON.parse(userHeader);
    } catch (err) {
      console.error("Invalid user header", err);
    }
  }
  next();
};
