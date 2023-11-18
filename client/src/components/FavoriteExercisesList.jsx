import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from "@mui/material";
import { scrollToTop } from "../utilities/scrollUtils";
import FaveExerciseCard from "./FaveExerciseCard";
import Loader from "./Loader";

/**
 * FavoriteExercisesList is the child component of FaveExercisesDashboard that displays exercise list.
 * 
 * FavoriteExercisesList is the parent component of FaveExerciseCard that displays favorite exercises list.
 * 
 * @param {Object} props - Props containing currentPage, setCurrentPage, user, fetchedSavedExercisesListDataFromMongoDB, isFetching, and isLoading.
 * @returns {JSX.Element} - A component for organizing the display of user's favorite exercises list.
 */

const FavoriteExercisesList = ({ currentPage, setCurrentPage, user, fetchedSavedExercisesListDataFromMongoDB, isFetching, isLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Using local state to track pagination variable, selected sort by criteria and exercises
  const [exercisesPerPage] = useState(12);
  const [selectedSortBy, setSelectedSortBy] = useState("mostRecentToOldest"); // Current default sort by
  const [sortExercisesList, setSortExercisesList] = useState([]); // State to manage the list of saved exercises
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Use the selector to access the Redux store userApi query savedFavoriteExercisesList
  const savedFavoriteExercisesListFromMongoDB = useMemo(() => {
    return fetchedSavedExercisesListDataFromMongoDB?.savedFavoriteExercisesList || [];
  }, [fetchedSavedExercisesListDataFromMongoDB]);
  console.log("savedFavoriteExercisesListFromMongoDB at FavoriteExercisesList.jsx: ", savedFavoriteExercisesListFromMongoDB);

  // Handle the exercises sort by criteria change event
  const handleSortExercisesByDisplayChange = (event) => {
    // Update the selected sort by criteria
    setSelectedSortBy(event.target.value);
    // Reset to load on page one
    setCurrentPage(1);
    // Update the URL with the current page number
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", 1);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    console.log("Inside useEffect at FavoriteExercisesList.jsx, at the start... ready, set, go!");
    // Check if data is being fetched, if so, return
    if (isFetching || isLoading) {
      console.log("Data is being fetched or is loading at FavoriteExercisesList.jsx.");
      setIsLoadingData(true);
      return;
    }
    console.log("Just outside first if statement at FavoriteExercisesList.jsx: ");

    // Sort the exercises based on the selected criteria
    const sortExercisesBy = async () => {
      // Create a copy of the originial exercises to avoid modifying the state directly
      const copySavedFavoriteExercisesListFromMongoDB = [...savedFavoriteExercisesListFromMongoDB];
      console.log("Length during declaration start, copySavedFavoriteExercisesListFromMongoDB data at FavoriteExercisesList.jsx: ", copySavedFavoriteExercisesListFromMongoDB);

      // Sort the exercises based on the selected sort criteria
      copySavedFavoriteExercisesListFromMongoDB.sort((a, b) => {
        if (selectedSortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (selectedSortBy === "bodyPart") {
          return a.bodyPart.localeCompare(b.bodyPart);
        } else if (selectedSortBy === "target") {
          return a.target.localeCompare(b.target);
        } else if (selectedSortBy === "secondaryMuscles") {
          return a.secondaryMuscles[0].localeCompare(b.secondaryMuscles[0]);
        } else if (selectedSortBy === "equipment") {
          return a.equipment.localeCompare(b.equipment);
        } else if (selectedSortBy === "mostRecentToOldest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (selectedSortBy === "oldestToMostRecent") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        // Add a default case to return 0 when the sort criteria is not recognized
        return 0;
      });

      // Update the sorted exercises state
      setSortExercisesList(copySavedFavoriteExercisesListFromMongoDB);
      setIsLoadingData(false);
    };
    // Call the sortExercisesBy function whenever the selected sort by criteria changes
    console.log("Calling sortExercisesBy...");
    sortExercisesBy();
    console.log("Inside useEffect, component re-rendered successfully!");
  }, [dispatch, savedFavoriteExercisesListFromMongoDB, isFetching, isLoading, selectedSortBy, user]);

  console.log("just outside useEffect, sortExercisesList at FavoriteExercisesList.jsx: ", sortExercisesList);

  // Handle pagination change
  const paginate = (event, value) => {
    setCurrentPage(value);

    // Update the URL with the current page number
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate(`${location.pathname}?${searchParams.toString()}`);

    // Scroll to the top of the exercises container for a smooth transition
    scrollToTop();
  };

  return (
    <Box id="show-exercises" sx={{mt: { lg: "50px" }}} mt="25px" p="20px">
      {/* Create a dropdown menu to select the sort by criteria */}
      <FormControl variant="outlined" sx={{ marginBottom: "20px" }}>
        <InputLabel htmlFor="selectedSortBy">Sort list order by: </InputLabel>
        <Select
          id="selectedSortBy"
          value={selectedSortBy}
          onChange={handleSortExercisesByDisplayChange}
          sx={{ minWidth: "200px" }}
          label="Sort list order by: "
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="bodyPart">Body Part</MenuItem>
          <MenuItem value="target">Target Muscle</MenuItem>
          <MenuItem value="secondaryMuscles">Secondary Muscles</MenuItem>
          <MenuItem value="equipment">Equipment</MenuItem>
          <MenuItem value="mostRecentToOldest">Date Added (Newest First)</MenuItem>
          <MenuItem value="oldestToMostRecent">Date Added (Oldest First)</MenuItem>
        </Select>
      </FormControl>

      {isLoadingData || isFetching || isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Display the sorted exercises based on the selected criteria */}
          <Stack 
            direction="row" 
            sx={{ gap: { lg: "90px", xs: "50px"}}} 
            flexWrap="wrap" 
            justifyContent="center"
          >
            {/* Map and render exercise cards */}
            {user && 
              sortExercisesList
                .slice((currentPage - 1) * exercisesPerPage, currentPage * exercisesPerPage)
                .map((exercise) => (
                  <FaveExerciseCard 
                    key={exercise.exerciseId} 
                    exercise={exercise} 
                    user={user} 
                    onSortDisplayChange={handleSortExercisesByDisplayChange}
                  />
              ))}
          </Stack>

          <Stack mt="20px" paddingBottom="50px" alignItems="center">
            {sortExercisesList && sortExercisesList.length > 12 && (
              // Render pagination controls
              <Pagination 
                color="standard" 
                shape="rounded"
                defaultPage={currentPage}
                count={Math.ceil(sortExercisesList.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  )
};

export default FavoriteExercisesList;