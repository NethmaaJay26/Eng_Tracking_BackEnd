import express from 'express';
import { addTraining, getTrainings, getTrainingById, updateTrainingById, updateGoalSubmission, updateGoalStatus, uploadPdfFile } from '../controllers/trainingController.js';
import multer from 'multer';
import path from 'path';

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdf');  // Save PDFs to 'uploads/pdf' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Save file with unique name
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed!'), false);
    }
  }
});

// Create the router and apply the multer middleware directly in the route
const trainingrouter = express.Router();

trainingrouter.post('/add', addTraining);
trainingrouter.get('/', getTrainings);
trainingrouter.get('/:id', getTrainingById);
trainingrouter.put('/:id', updateTrainingById);
trainingrouter.put('/:id/goals', updateGoalSubmission);
trainingrouter.post('/upload-pdf', upload.single('file'), uploadPdfFile);  // Apply multer middleware here
trainingrouter.put('/:id/goals/status', updateGoalStatus);

export default trainingrouter;
