import express from "express";
import { saveExercise, getSavedExercise, deleteSavedExercise } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, view, delete saved exercise list
router.post("/saved_exercise/:id", protectRoute, saveExercise);
router.get("saved_exercise/:id", protectRoute, getSavedExercise)
router.delete("saved_exercise/:id", protectRoute, deleteSavedExercise)

export default router;