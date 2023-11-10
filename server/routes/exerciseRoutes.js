import express from "express";
import { saveExerciseToFaveList, updateSavedFaveExercisesListAfterRemoval, fetchSavedFaveExercisesList, deleteSavedExerciseFromList } from "../controllers/exerciseController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in users can add, update, view, delete saved favorite exercises list
router.get("/favoriteexercisesdashboard", protectRoute, fetchSavedFaveExercisesList);
router.post("/favoriteexercisesdashboard", protectRoute, saveExerciseToFaveList);
router.put("/favoriteexercisesdashboard", protectRoute, updateSavedFaveExercisesListAfterRemoval);
router.delete("/favoriteexercisesdashboard", protectRoute, deleteSavedExerciseFromList);

export default router;