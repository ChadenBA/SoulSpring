import express from 'express';
import { get_ProcAnswers } from '../Controller/AnwserController';

const Answerrouter = express.Router();




Answerrouter.get('/ProcAnswers/:userId', get_ProcAnswers);

export default Answerrouter;

  