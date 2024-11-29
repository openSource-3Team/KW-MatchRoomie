import express from "express";
import { userController } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.put("/:id/profile", userController.updateProfile);

export default router;
