import { Request, Response, NextFunction } from "express";
import { Professional } from "../Models/professionalModel";

export const checkApprovalStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professional = await Professional.findById(req.user?.id); 

    if (!professional) {
      return res.status(404).send("Professional not found");
    }

    if (!professional.isApproved) {
      return res.status(403).send("Your account is pending approval");
    }

    next();
  } catch (error) {
    res.status(500).send("Server error");
  }
};
