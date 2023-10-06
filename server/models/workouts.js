import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: String,
    required: true,
  },
  reps: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  user: { 
    type: Schema.Types.ObjectId, ref: "User" 
  },
}, { timestamps: true });

const workoutList = mongoose.model("workoutList", WorkoutSchema);

export default workoutList;