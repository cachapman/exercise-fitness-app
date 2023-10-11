// fetchBaseQuery is the function that will allow requests to the backend api
// This is basically the parent to other Api slices
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// production: 
// dev: http://localhost:3000
// baseUrl is an empty string because of using a proxy
const baseQuery = fetchBaseQuery({ 
  baseUrl: '' 
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({})
});