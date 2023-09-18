import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import SavedExerciseList from "../models/exerciseModel.js";

// @description   User can save an exercise to saved exercise list
// @route         POST /api/users/saved_exercise/:id
// @access        Private - can access URL only with token after logging in
const saveExercise = asyncHandler (async (request, response) => {

  // Check for user credentials with logic in userModel
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;

    // Second security measure to check user is saving exercise to their account
    if (request.user._id == id) {
      const saveExerciseExist = await SavedExerciseList.findOne({
        user: id,
        exerciseId: request.body.exerciseId,
      });

      if (saveExerciseExist === null) {
        const newSaveExercise = new SavedExerciseList({
          exerciseId: request.body.exerciseId,
          name: request.body.name,
          bodyPart: request.body.bodyPart,
          targetMuscle: request.body.targetMuscle,
          equipmentNeeded: request.body.equipmentNeeded,
          exerciseImageGif: request.body.exerciseImageGif,
          user: id,
        });
        newSaveExercise.save().then(
          response.status(201).json({
            message: "New exercise successfully saved",
          })
        );
      } else {
        response.status(400);
        throw new Error("Exercise is already saved");
      }
    } else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

// @description   User can view saved exercise 
// @route         GET /api/users/saved_exercise/:id
// @access        Private - can access URL only with token after logging in
const getSavedExercise = asyncHandler (async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;

    if (request.user._id == id) {
      const savedExercise = await SavedExerciseList.find({ user: id });
      
      response.status(200).json({ savedExercise });
      }  else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

// @description   User can delete saved exercise 
// @route         DELETE /api/users/saved_exercise/:id
// @access        Private - can access URL only with token after logging in
const deleteSavedExercise = asyncHandler (async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;
    const list = await SavedExerciseList.findOne({ user: id })

    if (request.user._id == list.user) {
      await SavedExerciseList.findByIdAndDelete({ exerciseId });
      
      response.status(200).json({
        message: "Saved exercise successfully deleted",
      });
      }  else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

export {
  saveExercise,
  getSavedExercise,
  deleteSavedExercise,
};