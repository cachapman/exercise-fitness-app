import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercisesReduxState",
  initialState: {
    exercises: {}, // Normalized exercises data using exercise ID as keys
    bodyPart: "all",
    previousSearchResults: {}, // Normalized search results data using exercise ID as keys
    dataFetched: false,
    dataFromApiLoading: false,
  },
  reducers: {
    // Action to set exercise to the Redux store with validation
    setReduxExercises(state, action) {
      const exercises = action.payload;

      if (Array.isArray(exercises)) {
        exercises.forEach((exercise) => {
          if (typeof exercise === "object" &&
            "id" in exercise &&
            "name" in exercise &&
            "bodyPart" in exercise &&
            "target" in exercise &&
            "equipment" in exercise) {
            // Normalize exercise data using exercise ID as keys
            state.exercises[exercise.id] = exercise;
          } else {
            console.warn("Invalid exercise data:", exercise);
          }
        });
      } else {
        console.warn("Invalid exercise data: Expected an array.");
      }
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

// Selectors - don't modify the Redux store, read-only functions
export const selectExercisesState = (state) => state.exercisesReduxState;
export const selectExercises = (state) => selectExercisesState(state).exercises;
export const selectBodyPart = (state) => selectExercisesState(state).bodyPart;
export const selectPreviousSearchResults = (state) => selectExercisesState(state).previousSearchResults;
export const selectDataFetched = (state) => selectExercisesState(state).dataFetched;
export const selectDataFromApiLoading = (state) => selectExercisesState(state).dataFromApiLoading;

// Destructure the action creators
export const {
  setReduxExercises,
  setReduxBodyPart,
  setPreviousSearchResults,
  setReduxDataFetched,
  setDataFromApiLoading,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;