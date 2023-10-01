import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import SavedExerciseList from "../models/exerciseModel.js";

// @description   User can save an exercise to saved exercise list
// @route         POST /api/users/workoutdashboard/
// @access        Private - can access URL only with token after logging in
const saveExercises = asyncHandler (async (request, response) => {
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

    // Verify correct data return in console
    console.log("request.body from exerciseController.js ", request.body);
    console.log("userID from exerciseController.js ", request.user._id);

    // Check if the exercise is already saved by the user
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }

    const exercise = await SavedExerciseList.findOne({
      user: userId,
      exerciseId: exerciseId,
    });

    if (exercise) {
      response.status(400);
      throw new Error("Exercise is already saved");      
    }

    // Create a new saved exercise
    const newSaveExercise = new SavedExerciseList({
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
    user.SavedExerciseList.push(newSaveExercise._id);
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

// @description   User can update saved exercise 
// @route         PUT /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const updateSavedExercises = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;

    // Find the user with authorized credentials
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }
    
    // Extract exercise details to update... CODE NEEDS TO BE UPDATED AND VERIFY. Currently undefined.
    const { totalSets, totalReps } = request.body.exercise;

    const filter = { user: userId };
    const update = {};

    if (totalSets !== undefined) {
      update.totalSets = totalSets;
    }

    if (totalReps !== undefined) {
      update.totalReps = totalReps;
    }

    await SavedExerciseList.updateOne(filter, { $set: update });

    // Fetch the user's updated saved exercise list
    const savedExercise = await SavedExerciseList.find({ user: userId });

    response.status(200).json({ savedExercise });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// @description   User can fetch saved exercise 
// @route         GET /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const fetchSavedExercises = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;

    // Find the user with authorized credentials
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }

    // Fetch the user's saved exercise list
    if (request.user._id == userId) {
      const savedExercises = await SavedExerciseList.find({ user: userId });

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

// @description   User can delete saved exercise 
// @route         DELETE /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const deleteSavedExercises = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;
    const exerciseId = (request.body.exerciseId).toString(); // Use request.body toString() get the execiseId
    // console.log("userID at Delete from exerciseController.js ", request.user._id);

    // Find the user 
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found or invalid credentials.");
    }

    // Find the saved exercise to delete
    const savedExercise = await SavedExerciseList.findOneAndDelete({ 
      exerciseId: exerciseId,
      user: userId,
    });    

    if (!savedExercise) {
      response.status(404);
      throw new Error("Saved exercise not found");
    }

    // Remove the exercise ID from the user's SavedExerciseLisr
    user.SavedExerciseList.pull(savedExercise._id);
    await user.save();
    
    response.status(200).json({
      message: "Saved exercise successfully deleted",
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
  saveExercises,
  updateSavedExercises,
  fetchSavedExercises,
  deleteSavedExercises,
};