import express from "express";
import { getProfessionalDashboardStats }  from "../Controller/ProDashboard";
import { authMiddleware } from "../Middleware/authMiddleware";

const routerpro = express.Router();

routerpro.get('/pro/stats', authMiddleware,getProfessionalDashboardStats);

export default  routerpro;



