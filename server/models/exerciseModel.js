import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Save exercise information from API
const SavedExerciseSchema = new Schema({
    exerciseId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bodyPart: {
      type: String,
      required: true,
    },
    targetMuscle: {
      type: String,
      required: true,
    },
    equipmentNeeded: {
      type: String,
      required: true,
    },
    exerciseImageGif: {
      type: String,
      required: true,
    },
  },
);

const SavedExercise = mongoose.model("SavedExercise", SavedExerciseSchema);

export default SavedExercise;