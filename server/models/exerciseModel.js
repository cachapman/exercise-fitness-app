import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SavedFavoriteExerciseSchema = new Schema({
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
    target: {
      type: String,
      required: true,
    },
    secondaryMuscles: {
      type: Array,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    gifUrl: {
      type: String,
      required: true,
    },
    instructions: {
      type: Array,
      required: true,
    },
    user: { 
      type: Schema.Types.ObjectId, ref: "User" 
    },
  }, { timestamps: true });

const savedFavoriteExercisesList = mongoose.model("savedFavoriteExercisesList", SavedFavoriteExerciseSchema);

export default savedFavoriteExercisesList;