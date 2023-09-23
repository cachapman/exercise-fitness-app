import express from "express";
import { saveExercises, updateSavedExercises, fetchSavedExercises, deleteSavedExercises } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, update, view, delete saved exercise list
router.post("/workoutdashboard", protectRoute, saveExercises);
router.put("/workoutdashboard", protectRoute, updateSavedExercises);
router.get("/workoutdashboard", protectRoute, fetchSavedExercises);
router.delete("/workoutdashboard", protectRoute, deleteSavedExercises);

export default router;