import { exercisesApiSlice } from "./exercisesApiSlice";

const ExerciseDB_API_URL = "/exercises";

// Helper function to generate query objects
const createExerciseQuery = (urlSuffix, method = "GET") => ({
  query: () => ({
    url: `${ExerciseDB_API_URL}${urlSuffix}`,
    method,
  }),
});

export const exerciseDBsApiSlice = exercisesApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all the exercises
    getAllExercises: builder.query(createExerciseQuery("?limit=1500"), {
      providesTags: ["exercises"],
      transformResponse: (response) => {
        // Normalize the data
        const normalizedExercises = response.exercises.reduce((accumulator, exercise) => {
          // Normalize and store by exercise.id
          accumulator[exercise.id] = exercise;
          return accumulator;
        }, {});

        return normalizedExercises;
      },
    }),
  }),
});

// Destructure the action creators
export const {
  useLazyGetAllExercisesQuery,
} = exerciseDBsApiSlice;