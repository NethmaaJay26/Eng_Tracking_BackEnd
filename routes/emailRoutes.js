import express from "express"; // Use import instead of require
import { sendEmail } from "../controllers/emailControllers.js"; // Use import for your email controller

const router = express.Router();

router.post("/sendEmail", sendEmail);

export default router; // Export using ES module syntax
