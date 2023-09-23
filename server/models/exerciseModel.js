import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    user: [{ 
      type: Schema.Types.ObjectId, ref: "User" 
    }],
  },
);

const SavedExerciseList = mongoose.model("SavedExerciseList", SavedExerciseSchema);

export default SavedExerciseList;