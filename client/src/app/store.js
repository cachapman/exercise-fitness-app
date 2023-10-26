import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import exerciseReducer from "../slices/exerciseSlice";
import { apiSlice } from "../slices/apiSlice";
import { exercisesApiSlice } from "../slices/exercisesApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercisesReduxState: exerciseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [exercisesApiSlice.reducerPath]: exercisesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat([ apiSlice.middleware, exercisesApiSlice.middleware ]),
  devTools: true,
});