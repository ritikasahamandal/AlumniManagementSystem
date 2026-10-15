import express from "express";
import {register, login, forgotPassword, resetPassword, getMe} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlware/auth.middleware.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);
router.get(
  "/me",
  verifyJWT,
  getMe
);

export default router;