import express from 'express';
import { addTraining, getTrainings } from '../controllers/trainingController.js';

const trainingrouter = express.Router();

trainingrouter.post('/add', addTraining);
trainingrouter.get('/', getTrainings);

export default trainingrouter;
