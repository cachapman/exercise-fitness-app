import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SearchExercisesBar from "../components/SearchExercisesBar";
import HorizontalBodyPartScrollbar from "../components/HorizontalBodyPartScrollbar";
import ExerciseResultsList from "../components/ExerciseResultsList";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllExercisesQuery } from "../slices/exercisesDBsApiSlice";
import { setDataFromApiLoading, setPreviousSearchResults, setReduxDataFetched, setReduxExercises } from "../slices/exerciseSlice";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

/**
 * ExercisesDashboard is the parent component that displays input search bar, horizontal bodyPart scroll bar, and exercises.
 *
 * @returns {JSX.Element} - A component for displaying the search options and exercise results.
 */

const ExercisesDashboard = () => {
  // Using local state to track
  const [searchedExercisesTerm, setSearchedExercisesTerm] = useState([]);
  const [selectedBodyPartExercises, setSelectedBodyPartExercises] = useState([]);
  
  // Initialize currentPage from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPageFromURL = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(currentPageFromURL ? parseInt(currentPageFromURL) : 1);

  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const exercises = useSelector((state) => state.exercisesReduxState.exercises);
  const dataFetched = useSelector((state) => state.exercisesReduxState.dataFetched);

  // Fetch all exercises from the API based on conditional statments
  const [getAllExercises, { isFetching: fetchingAllExercises }] = useLazyGetAllExercisesQuery();

  // Function to fetch exercises from the API and stores them in the Redux store.
  // Return an array of exercises
  const fetchAndStoreExercises = async () => {
    // Set loading state to true
    dispatch(setDataFromApiLoading(true));

    const { data: exercises } = await getAllExercises();
    dispatch(setReduxExercises(exercises));
    dispatch(setReduxDataFetched(true));
    dispatch(setDataFromApiLoading(false));
    return exercises;
  };

  // Function to handle the search 
  const handleSearch = async (search) => {
    //Check for non-empty search term
    if(search.trim() !== '') {
      // Start by setting loading state to true immediately
      dispatch(setDataFromApiLoading(true));
      
      // If data is not available in the Redux store, fetch it from the API
      if (exercises.length === 0) {
        await fetchAndStoreExercises();
      } 

      // Introduce a delay, only for rendering, without delaying the data fetching
      setTimeout(() => {
        let searchedExercisesTerm = exercises;
        // Check if data is already available in the Redux store, filter and display it
        searchedExercisesTerm = filterExercises(search.trim());
        dispatch(setPreviousSearchResults((searchedExercisesTerm)));
        // Update the UI without further delay
        window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
        setSearchedExercisesTerm(searchedExercisesTerm);
        setCurrentPage(1);
        // Set loading state to false after fetching
        dispatch(setDataFromApiLoading(false));
        // Check console to see the list of exercise data return
        console.log("search.trim from ExercisesDashboard.jsx line 57: ", search.trim()); 
        console.log("searchedExercisesTerm from ExercisesDashboard.jsx lines 60: ", searchedExercisesTerm);
        return searchedExercisesTerm;
      }, 2000); // Adjust as needed, currently set to 2 seconds
    }
  };

  // Function to filter the list of exercises based on the search term.
  // Return an array of exercises matching the filtering criteria.
  const filterExercises = (term) => {
    return exercises.filter((exercise) => {
      // Perform a case-insensitive search in exercise properties
      return (
        exercise.name?.toLowerCase().includes(term) || 
        exercise.target?.toLowerCase().includes(term) || 
        exercise.equipment?.toLowerCase().includes(term) || 
        exercise.bodyPart?.toLowerCase().includes(term)
      );
    });
  };

  // Function to handle bodyPart selection
  const handleBodyPartSelection = async (selectedBodyPart) => {
    // Start by setting loading state to true immediately
    dispatch(setDataFromApiLoading(true));
    
    // If data is not available in the Redux store, fetch it from the API
    if (exercises.length === 0) {
      await fetchAndStoreExercises();
    }
    
    // Introduce a delay, only for rendering, without delaying the data fetching
    setTimeout(() => {
      let selectedBodyPartExercises = exercises;
      // If data is already available in the Redux store 
      // Filter exercises based on the selected bodyPart and set results to Redux store
      if (selectedBodyPart !== "all") {
        selectedBodyPartExercises = filterExercisesByBodyPart(selectedBodyPart);
      }
  
      dispatch(setPreviousSearchResults((selectedBodyPartExercises)));
      // Update the UI without further delay
      window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
      setSelectedBodyPartExercises(selectedBodyPartExercises);
      setCurrentPage(1);
      // Set loading state to false after fetching
      dispatch(setDataFromApiLoading(false));
      // Check console to see the list of exercise data return
      console.log("selectedBodyPart from ExercisesDashboard.jsx line 84: ", selectedBodyPart); 
      console.log("selectedBodyPartExercises from ExercisesDashboard.jsx lines 101: ", selectedBodyPartExercises);
      return selectedBodyPartExercises;
    }, 2000); // Adjust as needed, currently set to 2 seconds
  };

  // Function to filter the list of exercises based on the selected BodyPart.
  // Return an array of exercises matching the filtering criteria.
  const filterExercisesByBodyPart = (selectedBodyPart) => {
    return exercises.filter((exercise) => {
      // Perform a case-insensitive search in exercise properties
      return (
        exercise.bodyPart?.toLowerCase().includes(selectedBodyPart)
      );
    });
  };
  
  return (
    <Box>
      <SearchExercisesBar onSearch={handleSearch} />
      <HorizontalBodyPartScrollbar setCurrentPage={setCurrentPage} onSelectBodyPart={handleBodyPartSelection} />
      {exercises.length === 0 && !fetchingAllExercises ? (
        <Stack 
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography fontWeight="700" sx={{ fontSize: { lg: "33px", xs: "22px"}}} paddingTop="20px">Start a search</Typography>
          <Typography fontWeight="700" sx={{ fontSize: { lg: "33px", xs: "22px"}}}>or</Typography>
          <Typography fontWeight="700" sx={{ fontSize: { lg: "33px", xs: "22px"}}}>Select a body part to explore the database</Typography>
          <Typography fontWeight="700" sx={{ fontSize: { lg: "33px", xs: "22px"}}}>Results will load below...</Typography>
        </Stack>
      ) : null}
      {fetchingAllExercises ? (<Loader />
      ) : null}
      {dataFetched && <ExerciseResultsList 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        searchedExercisesResults={searchedExercisesTerm}
        selectedBodyPartExercisesResults={selectedBodyPartExercises}
        user={user}
      />}
    </Box>
  )
};

export default ExercisesDashboard;