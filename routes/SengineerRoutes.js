// routes/SengineerRoutes.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSupervisingEngineers, addSupervisingEngineer, loginSengineer } from '../controllers/SengineerController.js'; // Update to match controller

const sengineerrouter = express.Router();

// Determine __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to get all supervising engineers
sengineerrouter.get('/', getSupervisingEngineers); 

// Route to add a new supervising engineer
sengineerrouter.post('/add', upload.single('photo'), addSupervisingEngineer); 

sengineerrouter.post("/login", loginSengineer);

export default sengineerrouter;
