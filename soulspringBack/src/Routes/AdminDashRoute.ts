
import express from "express";
import {  getAdminStatistics } from "../Controller/AdmindashbordController";
 

const adminDashRoutes = express.Router();



adminDashRoutes.get("/" , getAdminStatistics);


export default adminDashRoutes;