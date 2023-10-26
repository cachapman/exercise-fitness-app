import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Pagination, Stack } from "@mui/material";
import ExerciseCard from "./ExerciseCard";

/**
 * FavoriteExercisesList is the child component of FaveExercisesDashboard that displays exercise list.
 * 
 * FavoriteExercisesList is the parent component of ExerciseCard that displays exercise search results list.
 * 
 * @param {Object} props - Props containing currentPage, setCurrentPage, and user.
 * @returns {JSX.Element} - A component for organizing the display of user's favorite exercises list.
 */

const FavoriteExercisesList = ({ currentPage, setCurrentPage, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Using local state to track pagination variable
  const [exercisesPerPage] = useState(12);

  // Redux setup
  const savedFavoriteExercisesList = useSelector((state) => state.auth.userInfo.savedFavoriteExercisesList);

  // Pagination 
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  // Memoize the currentFavoriteExercisesList array
  const currentFavoriteExercisesList = useMemo(() => {
    return Array.isArray(savedFavoriteExercisesList) ? savedFavoriteExercisesList.slice(indexOfFirstExercise, indexOfLastExercise) : [];
  }, [savedFavoriteExercisesList, indexOfFirstExercise, indexOfLastExercise]);

  // Handle pagination change
  const paginate = (event, value) => {
    setCurrentPage(value);
    console.log("currentPage value at FavoriteExercisesList.jsx: ", value);

    // Update the URL with the current page number
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate(`${location.pathname}?${searchParams.toString()}`);

    // Scroll to the top of the exercises container for a smooth transition
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {user && currentFavoriteExercisesList.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} user={user} currentPage={currentPage} />
        ))}
      </Stack>

      <Stack mt="100px" paddingBottom="100px" alignItems="center">
        {savedFavoriteExercisesList && savedFavoriteExercisesList.length > 12 && (
          // Render pagination controls
          <Pagination 
            color="standard" 
            shape="rounded"
            defaultPage={currentPage}
            count={Math.ceil(savedFavoriteExercisesList.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
};

export default FavoriteExercisesList;