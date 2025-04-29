
import express from "express";

import  {approveProfessional , getAllPros, getAllUsers, getApprovedProfessionals, getNonApprovedProfessionals , getPorforPropage, rejectProfessional, suspendProfessional, unsuspendProfessional} from "../Controller/AdminController";


const adminRoutes = express.Router();

adminRoutes.post("/approve/:id",approveProfessional);

adminRoutes.post("/reject/:id",rejectProfessional);


adminRoutes.get("/approvedProf",getApprovedProfessionals);
adminRoutes.get("/NonapproveProf",getNonApprovedProfessionals);

adminRoutes.get("/allPro",getAllPros);
adminRoutes.get("/allUsers",getAllUsers);

adminRoutes.post('/suspend/:id' , suspendProfessional)
adminRoutes.get('/pros' , getPorforPropage)
adminRoutes.post('/unsuspend/:id' , unsuspendProfessional)




export default adminRoutes;