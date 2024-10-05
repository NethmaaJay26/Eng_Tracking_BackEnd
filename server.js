import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import router from "./routes/engineerRoutes.js";
import sengineerrouter from "./routes/SengineerRoutes.js";
import trainingrouter from "./routes/trainingRoutes.js";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());

// Establishing DB connection
connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/user", userRouter);
app.use('/api/engineers', router);
app.use('/api/sengineers', sengineerrouter);
app.use('/api/trainings', trainingrouter);


app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
