import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlware/auth.middleware.js"

const router = express.Router();

router.post("/send", verifyJWT, sendMessage);

export default router;