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
    }),

    // Fetch single exercise details
    getOneExerciseDetail: builder.query(
      (id) => createExerciseQuery(`/exercise/${id}`), {
        providesTags: ["exercises", "ExerciseDetail"]
      } 
    ),

    // Fetch specific bodyPart exercises
    getSpecificBodyPartExercises: builder.query(
      (bodyPart) => 
        createExerciseQuery(`bodyPart/${bodyPart}?limit=900`), {
          providesTags: ["exercises", "BodyPartExercises"]
        }
    ),

    // Fetch specific equipment exercises
    getSpecificEquipmentExercises: builder.query(
      (equipment) => 
        createExerciseQuery(`/equipment/${equipment}?limit=900`), {
          providesTags: ["exercises", "EquipmentExercises"]
        }
    ),

    // Fetch specific target muscle exercises
    getSpecificTargetMuscleExercises: builder.query(
      (target) => 
        createExerciseQuery(`/target/${target}?limit=900`), {
          providesTags: ["exercises", "TargetMuscleExercises"]
        }
    ),

    // Fetch bodyPart exercise list
    getBodyPartList: builder.query(
      createExerciseQuery("/bodyPartList"), {
        providesTags: ["exercises", "BodyPartList"]
      }
    ),

    // Fetch equipment exercise list
    getEquipmentList: builder.query(
      createExerciseQuery("/equipmentList"), {
        providesTags: ["exercises", "EquipmentList"]
      }
    ),

    // Fetch target muscle exercise list
    getTargetMuscleList: builder.query(
      createExerciseQuery("/targetList"), {
        providesTags: ["exercises", "TargetMuscleList"]
      }
    ),
  }),
});

// Destructure the action creators
export const {
  useLazyGetAllExercisesQuery,
  useLazyGetOneExerciseDetailQuery,
  useLazyGetSpecificBodyPartExercisesQuery,
  useLazyGetSpecificEquipmentExercisesQuery,
  useLazyGetSpecificTargetMuscleExercisesQuery,
  useLazyGetBodyPartListQuery,
  useLazyGetEquipmentListQuery,
  useLazyGetTargetMuscleListQuery,
} = exerciseDBsApiSlice;