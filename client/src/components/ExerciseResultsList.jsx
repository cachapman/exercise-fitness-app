import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Box, Pagination, Stack } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * ExerciseResultsList is the child component of ExercisesDashboard that displays exercise search results list.
 * 
 * ExerciseResultsList is the parent component of ExerciseCard that displays exercise search results list.
 * 
 * @returns {JSX.Element} - A component for displaying the exercise results list.
 */

const ExerciseResultsList = ({ currentPage, setCurrentPage, searchedExercisesTerm, selectedBodyPartExercises, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Using local state to track pagination variable
  const [exercisesPerPage] = useState(12);

  // Redux setup
  const previousExercises = useSelector((state) => state.exercisesReduxState.previousSearchResults);

  // Display either previousExercises, search results, or selected bodyPart
  const exercises = previousExercises.length === 0 ? (searchedExercisesTerm || selectedBodyPartExercises) : previousExercises;

  // Pagination 
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  // Memoize the currentExercises array
  const currentExercises = useMemo(() => {
    return Array.isArray(exercises) ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : [];
  }, [exercises, indexOfFirstExercise, indexOfLastExercise]);

  // Handle pagination change
  const paginate = (event, value) => {
    setCurrentPage(value);
    console.log("currentPage value at ExerciseResultsList.jsx: ", value);

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
        {user && currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} user={user} currentPage={currentPage} />
        ))}
      </Stack>

      <Stack mt="100px" paddingBottom="100px" alignItems="center">
        {exercises && exercises.length > 12 && (
          // Render pagination controls
          <Pagination 
            color="standard" 
            shape="rounded"
            defaultPage={currentPage}
            count={Math.ceil(exercises.length / exercisesPerPage)}
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