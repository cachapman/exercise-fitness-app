import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://exercisedb.p.rapidapi.com",
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_EXERCISE_KEY,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  },
});

export const exercisesApiSlice = createApi({
  baseQuery,
  tagTypes: ["Exercise"],
  endpoints: (builder) => ({})
});