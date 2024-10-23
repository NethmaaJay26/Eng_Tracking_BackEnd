// routes/SengineerRoutes.js

import express from 'express';
import Sengineer from '../models/SengineerModel.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  getSupervisingEngineers, 
  addSupervisingEngineer, 
  loginSengineer, 
  getSupervisingEngineerById, 
  updateSupervisingEngineer, 
  deleteSupervisingEngineer 
} from '../controllers/SengineerController.js';
// import { authenticateUse2 }  from '../middleware/authmiddleware.js'; 

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

// Route to get a single supervising engineer by ID
sengineerrouter.get('/:id', getSupervisingEngineerById);

// Route to add a new supervising engineer
sengineerrouter.post('/add', upload.single('photo'), addSupervisingEngineer); 

// Route to update a supervising engineer
sengineerrouter.put('/:id', upload.single('photo'), updateSupervisingEngineer);

// Route to delete a supervising engineer
sengineerrouter.delete('/:id', deleteSupervisingEngineer);

// Route to login a supervising engineer
sengineerrouter.post("/login", loginSengineer);

// sengineerrouter.get('/me', authenticateUse2, async (req, res) => {
//   try {
//     const sengineer = await Sengineer.findById(req.user.id).select('name photo');
//     if (!sengineer) {
//       return res.status(404).json({ message: 'Supervising Engineer not found' });
//     }
//     res.status(200).json(sengineer);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


export default sengineerrouter;
