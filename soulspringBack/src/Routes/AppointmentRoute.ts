// routes/appointmentRoutes.ts

import express from 'express';
import { createAppointment,confirmAppointment,cancelAppointment,updateAppointmentByUser,getConfirmedAppointement,getPendingAppointment } from '../Controller/AppointmentController';
import { authMiddleware, } from "../Middleware/authMiddleware";

const Appointmentrouter = express.Router();

Appointmentrouter.post('/createAppointment', authMiddleware,createAppointment);
Appointmentrouter.put('/confirmAppointment/:appointmentId', authMiddleware,confirmAppointment);
Appointmentrouter.put('/cancelAppointment/:appointmentId', authMiddleware,cancelAppointment);
Appointmentrouter.put('/updateAppointmentByUser/:appointmentId', authMiddleware,updateAppointmentByUser);
Appointmentrouter.get('/getConfirmedAppointement', authMiddleware,getConfirmedAppointement);
Appointmentrouter.get('/getPendingAppointment', authMiddleware,getPendingAppointment);

export default Appointmentrouter;
