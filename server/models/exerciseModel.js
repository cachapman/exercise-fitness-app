import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SavedExerciseListSchema = new Schema({
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
    user: [{ 
      type: Schema.Types.ObjectId, ref: "User" 
    }],
  },
);

const SavedExerciseList = mongoose.model("SavedExerciseList", SavedExerciseListSchema);

export default SavedExerciseList;