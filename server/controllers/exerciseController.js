import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import savedFavoriteExercisesList from "../models/exerciseModel.js";

// @description   User can save an exercise to favorite exercises list
// @route         POST /api/users/savedexercisesdashboard/
// @access        Private - can access URL only with token after logging in
const saveExercise = asyncHandler (async (request, response) => {
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
// @route         PUT /api/users/savedexercisesdashboard/
// @access        Private - can access URL only with token after logging in
const updateSavedExercise = asyncHandler (async (request, response) => {
  try {
    const userId = request.user._id;
    // const updateExercise = request.savedFavoriteExercisesList;
    const exerciseId = savedFavoriteExercisesList.findById(request.params.id);

    // console.log("exerciseID from exerciseController.js ", exerciseId);

    // Find the user with authorized credentials
    const user = await User.findById(userId);
    if (!user) {
      response.status(401);
      throw new Error("Unauthorized Access: User not found.");
    }

    // Make sure the logged in user matches the savedExercises user
    // if (savedFavoriteExercisesList.user.toString() !== user._id) {
    //   response.status(401);
    //   throw new Error("Unauthorized Access: invalid credentials.");
    // }
    
    // Extract exercise details to update... CODE NEEDS TO BE UPDATED AND VERIFY. Currently undefined.
    const { totalSets, totalReps } = exerciseId;

    const filter = { user: userId };
    const update = {};

    if (totalSets !== undefined) {
      update.totalSets = totalSets;
    }

    if (totalReps !== undefined) {
      update.totalReps = totalReps;
    }

    await savedFavoriteExercisesList.findByIdAndUpdate(filter, { $set: update });

    // Fetch the user's updated saved favorite exercises list
    const savedExercise = await savedFavoriteExercisesList.find({ user: userId });

    response.status(200).json({ savedExercise });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// @description   User can fetch saved favorite exercise 
// @route         GET /api/users/savedexercisesdashboard
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

    // Fetch the user's saved favorite exercises list
    if (request.user._id == userId) {
      const savedExercises = await savedFavoriteExercisesList.find({ user: userId });

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
// @route         DELETE /api/users/savedexercisesdashboard/
// @access        Private - can access URL only with token after logging in
const deleteSavedExercise = asyncHandler (async (request, response) => {
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

    // Find the saved favorite exercise to delete
    const savedExercise = await savedFavoriteExercisesList.findOneAndDelete({ 
      exerciseId: exerciseId,
      user: userId,
    });    

    if (!savedExercise) {
      response.status(404);
      throw new Error("Saved favorite exercise not found");
    }

    // Remove the exercise ID from the user's SavedExerciseLisr
    user.savedFavoriteExercisesList.pull(savedExercise._id);
    await user.save();
    
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
  saveExercise,
  updateSavedExercise,
  fetchSavedExercises,
  deleteSavedExercise,
};