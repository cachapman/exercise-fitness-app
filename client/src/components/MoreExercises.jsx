import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { selectExercises } from "../slices/exerciseSlice";

/**
 * MoreExercises is the child component of ExerciseDetailPage that displays more random exercise suggestions.
 *
 * @returns {JSX.Element} - A component for displaying more random exercise suggestions.
 */

const MoreExercises = () => {
  // Fetch exercise IDs from the Redux store
  const exercises = useSelector(selectExercises);
  const exerciseIds = Object.keys(exercises);

  // Function to get a random subset of exercise IDs
  const getRandomExerciseIds = (allExerciseIds, count) => {
    // Shuffle the array
    const shuffled = allExerciseIds.sort(() => 0.5 - Math.random());
    // Get the first 'count' elements
    return shuffled.slice(0, count);
  };

  // Generate a random list of 12 exercise IDs
  const randomExerciseIds = getRandomExerciseIds(exerciseIds, 12);

  return (
    <Box paddingBottom="55px" sx={{ mt: "50px", xs: "0" }}>
      <Typography variant="h3" mt="-35px">
        Here are some more great exercises:
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {exerciseIds.length > 0 ? (
          <HorizontalScrollbar exerciseIds={randomExerciseIds} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  )
};

export default MoreExercises;