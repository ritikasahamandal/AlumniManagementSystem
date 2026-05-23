import express from "express";
import {
    getAllUsers,
    approveUser,
    changeRole,
    deleteUser,
    updateUserRole
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlware/auth.middleware.js";
import { isAdmin } from "../middlware/admin.middleware.js";

const router = express.Router();

router.get("/users", verifyJWT, isAdmin, getAllUsers);
router.put("/approve/:id", verifyJWT, isAdmin, approveUser);
router.put("/role/:id", verifyJWT, isAdmin, changeRole);
router.delete("/user/:id", verifyJWT, isAdmin, deleteUser);
router.put(
  "/role/:id",
  verifyJWT,
  isAdmin,
  updateUserRole
);

export default router;