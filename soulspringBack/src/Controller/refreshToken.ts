import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not provided" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as any;

    // Generate new access token using the decoded data
    const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Access token refreshed",
      accessToken,
    });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
