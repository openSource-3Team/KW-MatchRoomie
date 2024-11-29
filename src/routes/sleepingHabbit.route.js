import express from "express";
import { sleepingHabitController } from "../controllers/sleepingHabit.controller.js";

const router = express.Router();

router.post("/:userId", sleepingHabitController.addHabit);

export default router;
