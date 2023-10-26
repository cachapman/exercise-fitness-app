import express from "express";
import { saveExercise, updateSavedExercise, fetchSavedExercises, deleteSavedExercise } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, update, view, delete saved favorite exercises list
router.get("/favoriteexercisesdashboard", protectRoute, fetchSavedExercises);
router.post("/favoriteexercisesdashboard", protectRoute, saveExercise);
router.put("/favoriteexercisesdashboard/", protectRoute, updateSavedExercise);
router.delete("/favoriteexercisesdashboard/", protectRoute, deleteSavedExercise);

export default router;