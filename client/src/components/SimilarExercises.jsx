import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "../components/Loader";

const SimilarExercises = ({ exercise, user, targetMuscleExercises, targetBodyPartExercises, equipmentExercises }) => {
  const currentExerciseCardData = {
    userId: user?.userId,
    exercise: exercise,
  };
  // Verify correct data return in console
  console.log("exerciseCardData from SimilarExercises.jsx line 6: ", currentExerciseCardData);
  console.log("user from SimilarExercises.jsx line 5: ", user);
  console.log("user.userId from SimilarExercises.jsx line 7: ", user?.userId);
  console.log("exercise from SimilarExercises.jsx line 8: ", exercise);

  const currentExerciseCardParams = {
    userId: user?.userId,
    exerciseId: exercise,
  };
  // Verify correct data return in console
  console.log("exerciseCardParams from SimilarExercises.jsx line 16: ", currentExerciseCardParams);
  console.log("user from SimilarExercises.jsx line 10: ", user);
  console.log("user.userId from SimilarExercises.jsx line 17: ", user?.userId);
  console.log("exercise from SimilarExercises.jsx line 18: ", exercise);

  if ({ targetMuscleExercises, targetBodyPartExercises, equipmentExercises }) {
    window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
  };

  return (
    <Box paddingBottom="110px" sx={{ mt: "100px", xs: "0" }}>
      <Typography variant="h3" mt="-65px">
        Here are some similar Target Muscle exercises:
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {targetMuscleExercises?.length !==0 ? 
          <HorizontalScrollbar data={targetMuscleExercises} />
          : <Loader />}
      </Stack>
      <Typography variant="h3" mt="75px">
        Here are some similar Target Body Part exercises:
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {targetBodyPartExercises?.length !==0 ? 
          <HorizontalScrollbar data={targetBodyPartExercises} />
          : <Loader />}
      </Stack>
      <Typography variant="h3" mt="75px">
        Here are some similar Equipment exercises:
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {equipmentExercises?.length !==0 ? 
          <HorizontalScrollbar data={equipmentExercises} />
          : <Loader />}
      </Stack>
    </Box>
  )
};

export default SimilarExercises;
