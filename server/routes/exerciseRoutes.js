import express from "express";
import { saveExerciseToFaveList, updateSavedFaveExercise, fetchSavedFaveExercisesList, deleteSavedExerciseFromList } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, update, view, delete saved favorite exercises list
router.get("/favoriteexercisesdashboard", protectRoute, fetchSavedFaveExercisesList);
router.post("/favoriteexercisesdashboard", protectRoute, saveExerciseToFaveList);
router.put("/favoriteexercisesdashboard", protectRoute, updateSavedFaveExercise);
router.delete("/favoriteexercisesdashboard", protectRoute, deleteSavedExerciseFromList);

export default router;