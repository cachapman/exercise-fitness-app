import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "../components/Loader";

const SimilarExercises = ({ targetMuscleExercises, targetBodyPartExercises, equipmentExercises }) => {
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
