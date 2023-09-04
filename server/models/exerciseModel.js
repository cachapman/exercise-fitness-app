import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ExercisePlannerSchema = new Schema({
    name: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  }, 
  { 
    timestamps: true,
  }
);

const ExercisePlanner = mongoose.model("ExercisePlanner", ExercisePlannerSchema);

export default ExercisePlanner;