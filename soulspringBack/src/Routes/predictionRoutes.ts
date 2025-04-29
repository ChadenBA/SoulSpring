import express from "express";
import { getResult, submit } from "../Controller/PredictionControlle";

const routerPredict = express.Router();

routerPredict.post('/user/test/submit-responses', submit);
routerPredict.get('/test-result/:userId' , getResult)
export default routerPredict;
