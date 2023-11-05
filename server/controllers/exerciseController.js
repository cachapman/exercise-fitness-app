import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import savedFavoriteExercisesList from "../models/exerciseModel.js";

// @description   User can save an exercise to favorite exercises list
// @route         POST /api/users/favoriteexercisesdashboard/
// @access        Private - can access URL only with token after logging in
const saveExerciseToFaveList = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;
    const exerciseId = request.body.exercise.id;
    const {
      name,
      target,
      gifUrl,
      bodyPart,
      equipment,
      instructions,
      secondaryMuscles,
    } = request.body.exercise; // Extract exercise details

    // Check if the exercise is already saved by the user
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }

    const exercise = await savedFavoriteExercisesList.findOne({
      user: userId,
      exerciseId: exerciseId,
    });

    if (exercise) {
      response.status(400);
      throw new Error("Exercise is already saved");      
    }

    // Create a new saved exercise
    const newSaveExercise = new savedFavoriteExercisesList({
      exerciseId: exerciseId,
      name: name,
      bodyPart: bodyPart,
      target: target,
      secondaryMuscles: secondaryMuscles,
      equipment: equipment,
      gifUrl: gifUrl,
      instructions: instructions,
      user: userId, // Set the user field to the ObjectId of the user
    });

    await newSaveExercise.save();

    // Update the user's document to include the saved exercise
    user.savedFavoriteExercisesList.push(newSaveExercise);
    await user.save();

    response.status(201).json({
      message: "New exercise successfully saved",
    });
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// @description   User can update saved favorite exercise 
// @route         PUT /api/users/favoriteexercisesdashboard/
// @access        Private - can access URL only with token after logging in
const updateSavedFaveExercise = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;
    const exerciseId = request.body.id; // Exercise ID to update

    // Find the user with authorized credentials
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found.");
    }

    // Check if the exercise exists in the user's savedFavoriteExercisesList
    if (!user.savedFavoriteExercisesList[exerciseId]) {
      response.status(404);
      throw new Error("Saved favorite exercise not found");
    }

    const exerciseData = request.body; // Exercise data to update

    if (exerciseData.totalSets !== undefined) {
      user.savedFavoriteExercisesList[exerciseId].totalSets = exerciseData.totalSets;
    }

    if (exerciseData.totalReps !== undefined) {
      user.savedFavoriteExercisesList[exerciseId].totalReps = exerciseData.totalReps;
    }

    await user.save();

    response.status(200).json({
      message: "Saved favorite exercise successfully updated",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// @description   User can fetch saved favorite exercise 
// @route         GET /api/users/favoriteexercisesdashboard
// @access        Private - can access URL only with token after logging in
const fetchSavedFaveExercisesList = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;

    // Find the user with authorized credentials
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }

    // Fetch the user's saved favorite exercises list
    if (request.user._id == userId) {
      const savedExercises = user.savedFavoriteExercisesList;

      response.status(200).json({ savedExercises });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// @description   User can delete saved favorite exercise 
// @route         DELETE /api/users/favoriteexercisesdashboard/
// @access        Private - can access URL only with token after logging in
const deleteSavedExerciseFromList = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;
    const exerciseId = request.body.exerciseId.toString(); // Use request.body toString() get the exerciseId

    // Find the user 
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }

    
    // Filter to remove the exercise from the user's savedFavoriteExercisesList
    user.savedFavoriteExercisesList = user.savedFavoriteExercisesList.filter(
      (item) => item.exerciseId !== exerciseId
    );
    
    // Save the updated user object to the database
    await user.save();

    // Remove the exercise from the savedFavoriteExercisesList database
    await savedFavoriteExercisesList.deleteOne({ exerciseId: exerciseId });
    
    response.status(200).json({
      message: "Saved favorite exercise successfully deleted",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export {
  saveExerciseToFaveList,
  updateSavedFaveExercise,
  fetchSavedFaveExercisesList,
  deleteSavedExerciseFromList,
};