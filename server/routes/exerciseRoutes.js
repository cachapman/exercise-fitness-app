import express from "express";
import { saveExercise, updateSavedExercise, fetchSavedExercises, deleteSavedExercise } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, update, view, delete saved favorite exercises list
router.get("/savedexercisesdashboard", protectRoute, fetchSavedExercises);
router.post("/savedexercisesdashboard", protectRoute, saveExercise);
router.put("/savedexercisesdashboard/", protectRoute, updateSavedExercise);
router.delete("/savedexercisesdashboard/", protectRoute, deleteSavedExercise);

export default router;