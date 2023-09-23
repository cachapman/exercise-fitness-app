//fetchBaseQuery is the function that will allow us to make requests to our backend api
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// production: 
// dev: http://localhost:3000
const baseQuery = fetchBaseQuery({ 
  baseUrl: '' 
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({})
});