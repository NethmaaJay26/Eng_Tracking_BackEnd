import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import router from "./routes/engineerRoutes.js";
import sengineerrouter from "./routes/SengineerRoutes.js";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine __filename and __dirname equivalents in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = 4000;

// Connecting middleware
app.use(express.json());
app.use(cors());

// Establishing DB connection
connectDB();

// Setting up static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setting up API endpoints
app.use("/api/user", userRouter);
app.use('/api/engineers', router);
app.use('/api/sengineers', sengineerrouter);


app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
