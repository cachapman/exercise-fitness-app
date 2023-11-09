import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Pagination, Stack } from "@mui/material";
import { selectPreviousSearchResults } from "../slices/exerciseSlice";
import ExerciseTemplateCard from "./ExerciseTemplateCard";

/**
 * ExerciseResultsList is the child component of ExercisesDashboard that displays exercise search results list.
 * 
 * ExerciseResultsList is the parent component of ExerciseTemplateCard that displays exercise search results list.
 * 
 * @param {Object} props - Props containing currentPage, setCurrentPage, and user.
 * @returns {JSX.Element} - A component for organizing the display of the exercise results list.
 */

const ExerciseResultsList = ({ currentPage, setCurrentPage, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Using local state to track pagination variable
  const [exercisesPerPage] = useState(12);

  // Redux setup
  const exercises = useSelector(selectPreviousSearchResults);

  // Pagination 
  const exerciseResultsIds = Object.keys(exercises); // Get an array of exercise IDs
  const totalExercisesToDisplay = exerciseResultsIds.length;

  // Memoize the current display exercises array
  const currentExerciseResultsIds = useMemo(() => {
    // Calculate the range of exercises to display on the current page
    const startIndex = (currentPage - 1) * exercisesPerPage;
    const endIndex = Math.min(startIndex + exercisesPerPage, totalExercisesToDisplay);

    // Get the exercise IDs to display on the current page
    return exerciseResultsIds.slice(startIndex, endIndex);
  }, [exerciseResultsIds, currentPage, exercisesPerPage, totalExercisesToDisplay]);

  // Handle pagination change
  const paginate = (event, value) => {
    setCurrentPage(value);

    // Update the URL with the current page number
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate(`${location.pathname}?${searchParams.toString()}`);

    // Scroll to the top of the exercises container for a smooth transition
    window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
  };

  return (
    <Box 
      id="show-exercises" 
      sx={{mt: { lg: "50px" }}}
      mt="25px"
      p="20px"
    >
      <Stack 
        direction="row" 
        sx={{ gap: { lg: "90px", xs: "50px"}}} 
        flexWrap="wrap" 
        justifyContent="center"
      >
        {/* Map and render exercise cards */}
        {user && currentExerciseResultsIds.map((exerciseId) => (
          <ExerciseTemplateCard key={exerciseId} exerciseId={exerciseId} user={user} currentPage={currentPage} />
        ))}
      </Stack>

      <Stack mt="20px" paddingBottom="100px" alignItems="center">
        {totalExercisesToDisplay > exercisesPerPage && (
          // Render pagination controls
          <Pagination 
            color="standard" 
            shape="rounded"
            defaultPage={currentPage}
            count={Math.ceil(totalExercisesToDisplay / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
};

export default ExerciseResultsList;