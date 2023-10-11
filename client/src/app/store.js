import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";
import { exercisesApiSlice } from "../slices/exercisesApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [exercisesApiSlice.reducerPath]: exercisesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .concat(exercisesApiSlice.middleware),
  devTools: true,
});