// routes/userRouter.js
import express from "express";
import { loginUnified } from "../controllers/unifiedLoginController.js";

const uniRouter = express.Router();

uniRouter.post("/login", loginUnified);

export default uniRouter;
