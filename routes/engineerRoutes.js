// routes/engineerRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getEngineers, addEngineer, loginEngineer, updatePassword, updateEngineer, deletebyId, getAssignedEngineers } from '../controllers/engineerController.js';
import { authenticateUser } from '../middleware/authmiddleware.js';
import { getEngineerById } from '../controllers/engineerController.js';


const router = express.Router();


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

router.get('/', getEngineers);

router.post('/add', upload.single('photo'), addEngineer);
router.get('/:id', getEngineerById); 

router.post("/login", loginEngineer);
router.put("/updatePassword", authenticateUser, updatePassword);
router.delete('/:id', deletebyId);

router.patch('/:id', upload.single('photo'), updateEngineer);


router.get('/engineers/:supervisorId', getAssignedEngineers);



export default router;