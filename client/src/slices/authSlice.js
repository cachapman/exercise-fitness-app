import { createSlice } from "@reduxjs/toolkit";

// Set user credentials to local storage and remove them when logout

const initialState = {
  userInfo: localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : {
      userId: "",
      name: "",
      email: "",
      savedExerciseList: [], // Initialize the state for saved exercises
      workoutList: [], // Initialize the state for saved workouts
      completedWorkoutList: [], // Initialize the state for saved completed workouts
      savingExercise: false, // Flag to indicate if a save operation is in progress
      deletingExercise: false, // Flag to indicate if a delete operation is in progress
    },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    // Action to save an exercise
    saveExerciseToList: (state, action) => {
      state.userInfo.savedExerciseList.push(action.payload);
      console.log("saveExerciseToList: ", action.payload);
    },
    // Action to delete an exercise
    deleteExerciseToList: (state, action) => {
      const exerciseIdToDelete = action.payload;
      state.userInfo.savedExerciseList = state.userInfo.savedExerciseList.filter((exercise) => exercise.id !== exerciseIdToDelete);
    },
    // Action to indicate that saving an exercise has started
    savingExerciseToListStarted: (state) => {
      state.userInfo.savingExercise = true;
    },
    // Action to indicate that saving an exercise has completed
    savingExerciseToListCompleted: (state) => {
      state.userInfo.savingExercise = false;
    },
    // Action to indicate that deleting an exercise has started
    deletingExerciseToListStarted: (state) => {
      state.userInfo.deletingExercise = true;
    },
    // Action to indicate that deleting an exercise has completed
    deletingExerciseToListCompleted: (state) => {
      state.userInfo.deletingExercise = false;
    },
  },
});

export const { 
  setCredentials, 
  clearCredentials,
  saveExerciseToList,
  deleteExerciseToList,
  savingExerciseToListStarted,
  savingExerciseToListCompleted,
  deletingExerciseToListStarted,
  deletingExerciseToListCompleted,
 } = authSlice.actions;

export default authSlice.reducer;