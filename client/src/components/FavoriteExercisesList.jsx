import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectSavedFavoriteExercisesList, useFetchSavedFaveExercisesListQuery, useUpdateSavedFaveExercisesListMutation } from "../slices/usersApiSlice";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from "@mui/material";
import { scrollToTop } from "../utilities/scrollUtils";
import FaveExerciseCard from "./FaveExerciseCard";
import Loader from "./Loader";

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
  const dispatch = useDispatch();

  // Using local state to track pagination variable, selected filter and exercises
  const [exercisesPerPage] = useState(12);
  const [selectedFilter, setSelectedFilter] = useState("mostRecentToOldest"); // Default filter currently set by name
  const [filterExercises, setFilterExercises] = useState([]); // State to manage the list of saved exercises
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Trigger the query to fetch the saved exercises data
  const { data: fetchedSavedExercisesDataFromMongoDB, isFetching, isLoading } = useFetchSavedFaveExercisesListQuery();
  
  // Use the selector to access the Redux store userApi query savedFavoriteExercisesList
  const savedFavoriteExercisesListFromMongoDB = useSelector(selectSavedFavoriteExercisesList);
  console.log("savedFavoriteExercisesListFromMongoDB at FavoriteExercisesList.jsx: ", savedFavoriteExercisesListFromMongoDB);

  // Handle the filter change event
  const handleFilterChange = (event) => {
    // Update the selected filter
    setSelectedFilter(event.target.value);
  };

  // Use the mutation hook for updating the saved exercises list
  const [updateSavedExercisesList] = useUpdateSavedFaveExercisesListMutation();

  useEffect(() => {
    // Check if data is being fetched, if so, return
    if (isFetching || isLoading || !fetchedSavedExercisesDataFromMongoDB) {
      console.log("Data is being fetched or is loading. Skipping update at FavoriteExercisesList.jsx.");
      setIsLoadingData(true);
      return;
    }
    console.log("fetchedSavedExercisesDataFromMongoDB data at FavoriteExercisesList.jsx: ", fetchedSavedExercisesDataFromMongoDB);

    // Sort and filter the exercises based on the selected criteria
    const filterAndSortExercises = () => {
      // Create a copy of the originial exercises to avoid modifying the state directly
      const copySavedFavoriteExercisesListFromMongoDB = [...savedFavoriteExercisesListFromMongoDB];

      // Sort the exercises based on the selected filter
      copySavedFavoriteExercisesListFromMongoDB.sort((a, b) => {
        if (selectedFilter === "name") {
          return a.name.localeCompare(b.name);
        } else if (selectedFilter === "bodyPart") {
          return a.bodyPart.localeCompare(b.bodyPart);
        } else if (selectedFilter === "target") {
          return a.target.localeCompare(b.target);
        } else if (selectedFilter === "secondaryMuscles") {
          return a.secondaryMuscles[0].localeCompare(b.secondaryMuscles[0]);
        } else if (selectedFilter === "equipment") {
          return a.equipment.localeCompare(b.equipment);
        } else if (selectedFilter === "mostRecentToOldest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (selectedFilter === "oldestToMostRecent") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        // Add a default case to return 0 when the filter is not recognized
        return 0;
      });

      // Update the filtered exercises state
      setFilterExercises(copySavedFavoriteExercisesListFromMongoDB);
      setIsLoadingData(false);
      // Update Redux store with the filtered and sorted list
      updateSavedExercisesList({
        userId: user.id,
        savedFavoriteExercisesList: copySavedFavoriteExercisesListFromMongoDB,
      });
    };
    // Call the filter and sort function whenever the selected filter or exercises change
    console.log("Calling filterAndSortExercises...");
    filterAndSortExercises();
  }, [dispatch, savedFavoriteExercisesListFromMongoDB, selectedFilter, fetchedSavedExercisesDataFromMongoDB, isFetching, isLoading, user.id, updateSavedExercisesList]);

  console.log("filterExercises at FavoriteExercisesList.jsx: ", filterExercises);

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
      {/* Create a dropdown menu to select the filter criteria */}
      <FormControl variant="outlined" sx={{ marginBottom: "20px" }}>
        <InputLabel htmlFor="filterSelect">Filter and sort by:</InputLabel>
        <Select
          id="filterSelect"
          value={selectedFilter}
          onChange={handleFilterChange}
          sx={{ minWidth: "200px" }}
          label="Filter and sort by"
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

      {isLoadingData ? (
        <Loader />
      ) : (
        <>
          {/* Display the filtered exercises based on the selected criteria */}
          <Stack 
            direction="row" 
            sx={{ gap: { lg: "90px", xs: "50px"}}} 
            flexWrap="wrap" 
            justifyContent="center"
          >
            {/* Map and render exercise cards */}
            {user && 
              filterExercises
                .slice((currentPage - 1) * exercisesPerPage, currentPage * exercisesPerPage)
                .map((exercise) => (
                  <FaveExerciseCard 
                    key={exercise.exerciseId} 
                    exercise={exercise} 
                    user={user} 
                    onFilterAndSortChange={handleFilterChange}
                    onRemoveSavedExercise={updateSavedExercisesList}
                  />
              ))}
          </Stack>

          <Stack mt="20px" paddingBottom="50px" alignItems="center">
            {filterExercises && filterExercises.length > 12 && (
              // Render pagination controls
              <Pagination 
                color="standard" 
                shape="rounded"
                defaultPage={currentPage}
                count={Math.ceil(filterExercises.length / exercisesPerPage)}
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