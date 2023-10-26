import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set userInfo to local storage when logged in
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // Action to remove userInfo from local storage when logged out
    clearCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    // Action to add an exercise to the userInfo savedFavoriteExericsesList array
    addSavedExerciseToList: (state, action) => {
      // Check if the exercise is already in the savedFavoriteExercisesList
      if (
        !state.userInfo.savedFavoriteExercisesList.some(
          (exercise) => exercise.id === action.payload.id
        )
      ) {
        state.userInfo.savedFavoriteExercisesList.push(action.payload);
        // Update the saved data in local storage
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    // Action to remove an exercise from the userInfo savedFavoriteExericsesList array
    removeSavedExerciseFromList: (state, action) => {
      state.userInfo.savedFavoriteExercisesList = state.userInfo.savedFavoriteExercisesList.filter(
        (exercise) => exercise.id !== action.payload.id);
      // Update the saved data in local storage
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    }
  },
});

// Destructure the action creators
export const { 
  setCredentials, 
  clearCredentials,
  addSavedExerciseToList,
  removeSavedExerciseFromList,
 } = authSlice.actions;

export default authSlice.reducer;