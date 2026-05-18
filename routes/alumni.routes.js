import express from "express";
import { upsertAlumniProfile, getAllAlumni, searchAlumni,getMyProfile } from "../controllers/alumni.controller.js";
import { verifyJWT } from "../middlware/auth.middleware.js";

const router = express.Router();

router.post("/profile", verifyJWT, upsertAlumniProfile);
router.get("/", getAllAlumni);
router.get("/search", searchAlumni);
router.get("/me", verifyJWT, getMyProfile);

export default router;