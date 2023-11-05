import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useLazyGetAllExercisesQuery } from "../slices/exercisesDBsApiSlice";
import { selectDataFetched, selectExercises, setDataFromApiLoading, setPreviousSearchResults, setReduxDataFetched, setReduxExercises } from "../slices/exerciseSlice";
import SearchExercisesBar from "../components/SearchExercisesBar";
import HorizontalBodyPartScrollbar from "../components/HorizontalBodyPartScrollbar";
import ExerciseResultsList from "../components/ExerciseResultsList";
import Loader from "../components/Loader";

/**
 * ExercisesDashboard is the parent component that displays input search bar, horizontal bodyPart scroll bar, and exercises.
 *
 * @returns {JSX.Element} - A component for displaying the search options and exercise results.
 */

const ExercisesDashboard = () => {
  // Initialize currentPage from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPageFromURL = searchParams.get("page");
  const parsedPage = parseInt(currentPageFromURL, 10);
  const [currentPage, setCurrentPage] = useState(isNaN(parsedPage) ? 1 : parsedPage);

  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const exercises = useSelector(selectExercises);
  const dataFetched = useSelector(selectDataFetched);

  // Fetch all exercises from the API based on conditional statments
  const [getAllExercises, { isFetching: fetchingAllExercises }] = useLazyGetAllExercisesQuery();

  // Function to fetch exercises from the API and stores them in the Redux store.
  // Return an array of exercises
  const fetchAndStoreExercises = useCallback( async () => {
    // Set loading state to true
    dispatch(setDataFromApiLoading(true));

    try {
      const { data: exercises } = await getAllExercises();
      // Store the fetched data in the normalized format
      dispatch(setReduxExercises(exercises));
      // Set dataFetched to true to indicate that data has been fetched
      dispatch(setReduxDataFetched(true));
    } catch (error) {
      console.error("Failed to fetch and store exercises to the Redux store: ", error);
    } finally {
      dispatch(setDataFromApiLoading(false));
    }
  }, [dispatch, getAllExercises]);

  // Function to handle the search 
  const handleSearch = async (search) => {
    // Start by setting loading state to true immediately
    dispatch(setDataFromApiLoading(true));

    //Check for non-empty search term
    if(search.trim() !== '') {
      let filteredExercises;
      
      // If data is not available in the Redux store, fetch it from the API
      if (Object.keys(exercises).length === 0) {
        // Call the fetchAndStoreExercises function 
        await fetchAndStoreExercises();
    } else {
      // If data is already available in the Redux store
      filteredExercises = filterExercises(search.trim(), exercises);
    }
      // Store the search results in the normalized format
      dispatch(setPreviousSearchResults(filteredExercises));
      setCurrentPage(1);
      // Set the loading state to false
      dispatch(setDataFromApiLoading(false));
      window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
    }
  };

  // Function to handle bodyPart selection
  const handleBodyPartSelection = async (selectedBodyPart) => {
    // Start by setting loading state to true immediately
    dispatch(setDataFromApiLoading(true));

    let updatedSelectBodyPartExercises;
    
    // If data is not available in the Redux store, fetch it from the API
    if (exercises.length === 0) {
      const fetchExercises = await fetchAndStoreExercises();

      // Filter exercises based on selected bodyPart if it's not "all"
      if (selectedBodyPart !== "all") {
        updatedSelectBodyPartExercises = filterExercisesByBodyPart(selectedBodyPart, fetchExercises);
      }
    } else {
      // If selected body part is "all", return the entire list of exercises store in the Redux store
      // Filter exercises based on selected bodyPart if it's not "all"
      updatedSelectBodyPartExercises = selectedBodyPart === "all"
        ? exercises
        : filterExercisesByBodyPart(selectedBodyPart, exercises);
    }
    // Store the search results in the normalized format
    dispatch(setPreviousSearchResults((updatedSelectBodyPartExercises)));
    setCurrentPage(1);
    // Set loading state to false after fetching
    dispatch(setDataFromApiLoading(false));
    window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
  };

  // Function to filter the list of exercises based on the search term using for...in loop.
  const filterExercises = (term, exercises) => {
    // Initialize an object to hold the filtered exercises
    const filteredExercisesBySearchTerm = {};

    // Iterate through the keys (exercise IDs) in the exercises object
    for (const exerciseId in exercises) {
      const exercise = exercises[exerciseId];

      // Perform a case-insensitive search in exercise properties
      if (
        exercise.name?.toLowerCase().includes(term) || 
        exercise.target?.toLowerCase().includes(term) || 
        exercise.equipment?.toLowerCase().includes(term) || 
        exercise.bodyPart?.toLowerCase().includes(term)
      ) {
        // If the exercise matches the search criteria, add it to the filtered exercises object
        filteredExercisesBySearchTerm[exerciseId] = exercise;
      }
    }

    return filteredExercisesBySearchTerm; // In the same normalized data structure format
  };

  // Function to filter the list of exercises based on the selected BodyPart using for...in loop.
  const filterExercisesByBodyPart = (selectedBodyPart, exercises) => {
    const filterExercisesByBodyPartSelection = {};

    for (const exerciseId in exercises) {
      const exercise = exercises[exerciseId];

      if (exercise.bodyPart?.toLowerCase().includes(selectedBodyPart)) {
        filterExercisesByBodyPartSelection[exerciseId] = exercise;
      }
    }

    return filterExercisesByBodyPartSelection;
  };
  
  // Fetch data from API when the component initially mounts if there is no data in the Redux store.
  useEffect(() => {
    if (!dataFetched && Object.keys(exercises).length === 0) {
      fetchAndStoreExercises();
    }
  }, [dataFetched, exercises, fetchAndStoreExercises]);
  
  return (
    <Box>
      <SearchExercisesBar onSearch={handleSearch} />
      <HorizontalBodyPartScrollbar setCurrentPage={setCurrentPage} onSelectBodyPart={handleBodyPartSelection} />
      {exercises.length === 0 && !fetchingAllExercises ? (
        <Typography 
          fontWeight="700" 
          sx={{ 
            fontSize: { lg: "33px", xs: "22px"},
            paddingTop: "20px",
            textAlign: "center",
          }}
        > 
          Start a search or select a body part to explore the database...
        </Typography>
      ) : null}
      {fetchingAllExercises ? (<Loader />
      ) : null}
      {dataFetched && <ExerciseResultsList 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user}
      />}
    </Box>
  );
};

export default ExercisesDashboard;