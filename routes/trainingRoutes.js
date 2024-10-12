import express from 'express';
import { addTraining, getTrainings, getTrainingById, updateTrainingById } from '../controllers/trainingController.js';

const trainingrouter = express.Router();

trainingrouter.post('/add', addTraining);
trainingrouter.get('/', getTrainings);
trainingrouter.get('/:id', getTrainingById); // Route to get training by ID
trainingrouter.put('/:id', updateTrainingById);


export default trainingrouter;
