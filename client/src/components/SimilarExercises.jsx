import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "../components/Loader";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  if ({ targetMuscleExercises, equipmentExercises }) {
    window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
  };

  return (
    <Box paddingBottom="110px" sx={{ mt: "100px", xs: "0" }}>
      <Typography variant="h3" mb="5">
        Similar Target Muscle exercises:
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {targetMuscleExercises?.length !==0 ? 
          <HorizontalScrollbar data={targetMuscleExercises} />
          : <Loader />}
      </Stack>
      <Typography variant="h3" mb="5">
        Similar equipment exercises:
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
