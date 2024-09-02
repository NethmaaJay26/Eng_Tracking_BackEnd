// routes/engineerRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getEngineers, addEngineer, loginEngineer, updatePassword } from '../controllers/engineerController.js';
import { authenticateUser } from '../middleware/authmiddleware.js';


const router = express.Router();

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

// Route to get all engineers
router.get('/', getEngineers);

// Route to add a new engineer
router.post('/add', upload.single('photo'), addEngineer);

router.post("/login", loginEngineer);
router.put("/updatePassword", authenticateUser, updatePassword);

export default router;
