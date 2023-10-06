import express from "express";
import { saveExercise, updateSavedExercise, fetchSavedExercises, deleteSavedExercise } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, update, view, delete saved exercise list
router.get("/workoutdashboard", protectRoute, fetchSavedExercises);
router.post("/workoutdashboard", protectRoute, saveExercise);
router.put("/workoutdashboard/:id", protectRoute, updateSavedExercise);
router.delete("/workoutdashboard/:id", protectRoute, deleteSavedExercise);

export default router;