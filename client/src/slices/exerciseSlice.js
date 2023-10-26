import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercisesReduxState",
  initialState: {
    exercises: [],
    bodyPart: "all",
    previousSearchResults: [],
    dataFetched: false,
    dataFromApiLoading: false,
  },
  reducers: {
    // Action to set exercise to the Redux store with validation
    setReduxExercises(state, action) {
      state.exercises = action.payload.filter((exercise) => {
        // Validate the exercise data
        if (
          typeof exercise === "object" &&
          "id" in exercise &&
          "name" in exercise &&
          "bodyPart" in exercise &&
          "target" in exercise &&
          "equipment" in exercise
        ) {
          return true;
        } else {
         console.warn("Invalid exercise data:", exercise);
         return false; 
        }
      });
    },
    // Action to set BodyPart Redux state
    setReduxBodyPart(state, action) {
      state.bodyPart = action.payload;
    },
    // Action to set previous search results Redux state
    setPreviousSearchResults(state, action) {
      state.previousSearchResults = action.payload;
    },
    // Action to set dataFetched to true
    setReduxDataFetched(state) {
      state.dataFetched = true;
    },
    // Action to set dataFromApiLoading Redux state
    setDataFromApiLoading(state, action) {
      state.dataFromApiLoading = action.payload;
    },
  },
});

// Destructure the action creators
export const {
  setReduxExercises,
  setReduxBodyPart,
  setPreviousSearchResults,
  setReduxDataFetched,
  setDataFromApiLoading,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;