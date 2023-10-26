import { apiSlice } from "./apiSlice";

const API_URL = "/api/users";

// Mutation means it is NOT going to make a GET request
// This is for the backend server stuff
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login User
    login: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    // Logout User
    logout: builder.mutation({
      query: () => ({
        url: `${API_URL}/logout`,
        method: "POST",
      }),
    }),
    // Register User
    register: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    // Update User Profile
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    // Save exercise to Login User Saved Favorite Exercises List
    saveExercises: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/savedexercisesdashboard`,
        method: "POST",
        body: data,
      }),
    }),
    // Update saved exercise from Login User Saved Favorite Exercises List
    updateSavedExercises: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/savedexercisesdashboard`,
        method: "PUT",
        body: data,
      }),
    }),
    // Fetch saved exercise from Login User Saved Favorite Exercises List
    fetchSavedExercises: builder.query({
      query: (data) => ({
        url: `${API_URL}/savedexercisesdashboard`,
        method: "GET",
        body: data,
      }),
    }),
    // Delete saved exercise from Login User Saved Favorite Exercises List
    deleteSavedExercises: builder.mutation({
      query: (exerciseId) => ({
        url: `${API_URL}/savedexercisesdashboard`,
        method: "DELETE",
        body: exerciseId,
      }),
    }),
  }),
});

// Destructure the action creators
export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRegisterMutation, 
  useUpdateUserProfileMutation,
  useSaveExercisesMutation,
  useUpdateSavedExercisesMutation,
  useFetchSavedExercisesQuery,
  useDeleteSavedExercisesMutation,
} = usersApiSlice;