
import express from "express";
import  {refreshToken} from "../Controller/refreshToken";
 

const refreshRoute = express.Router();

refreshRoute.post("/refresh-token",refreshToken);





export default refreshRoute;