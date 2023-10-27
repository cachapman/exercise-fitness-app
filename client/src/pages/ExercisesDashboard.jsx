import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useLazyGetAllExercisesQuery } from "../slices/exercisesDBsApiSlice";
import { setDataFromApiLoading, setPreviousSearchResults, setReduxDataFetched, setReduxExercises } from "../slices/exerciseSlice";
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

  // Function to handle the search 
  const handleSearch = async (search) => {
    //Check for non-empty search term
    if(search.trim() !== '') {
      // Start by setting loading state to true immediately
      dispatch(setDataFromApiLoading(true));
      
      // If data is not available in the Redux store, fetch it from the API
      if (exercises.length === 0) {
        // Call the fetchAndStoreExercises function and set searchedExercisesTerm
        const fetchSearchedExercises = await fetchAndStoreExercises();
        setSearchedExercisesTerm(fetchSearchedExercises);
      } 

      // Introduce a delay, only for rendering, without delaying the data fetching
      setTimeout(() => {
        // Filter and display it
        let filteredExercises = filterExercises(search.trim());
        dispatch(setPreviousSearchResults((filteredExercises)));
        // Update the UI without further delay
        window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
        setSearchedExercisesTerm(filteredExercises);
        setCurrentPage(1);
        // Set loading state to false after fetching
        dispatch(setDataFromApiLoading(false));
        // Check console to see the list of exercise data return
        console.log("search.trim from ExercisesDashboard.jsx line 68: ", search.trim()); 
        console.log("searchedExercisesTerm from ExercisesDashboard.jsx lines 68: ", filteredExercises);
        return searchedExercisesTerm;
      }, 3000); // Adjust as needed, currently set to 3 seconds
    } else {
      // If data is already available in the Redux store
      // You can skip fetching and set searchedExercisesTerm directly
      let filteredExercises = filterExercises(search.trim());
      dispatch(setPreviousSearchResults(filteredExercises));
      // Update the UI without further delay
      window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
      setSearchedExercisesTerm(filteredExercises);
      setCurrentPage(1);
      // Set the loading state to false
      dispatch(setDataFromApiLoading(false));
      // Check the console to see the list of exercise data returned
      console.log("search.trim from ExercisesDashboard.jsx line 84: ", search.trim()); 
      console.log("searchedExercisesTerm from ExercisesDashboard.jsx lines 84: ", filteredExercises);
    }
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

  // Function to handle bodyPart selection
  const handleBodyPartSelection = async (selectedBodyPart) => {
    // Start by setting loading state to true immediately
    dispatch(setDataFromApiLoading(true));
    
    // If data is not available in the Redux store, fetch it from the API
    if (exercises.length === 0) {
      const fetchExercises = await fetchAndStoreExercises();

      // Update the selectedBodyPartExercises
      let updatedSelectBodyPartExercises = fetchExercises;

      // Filter exercises based on selected bodyPart if it's not "all"
      if (selectedBodyPart !== "all") {
        updatedSelectBodyPartExercises = filterExercisesByBodyPart(selectedBodyPart, fetchExercises);
      }

      dispatch(setPreviousSearchResults(updatedSelectBodyPartExercises));
      // Update the UI without further delay
      window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
      setSelectedBodyPartExercises(updatedSelectBodyPartExercises);
      setCurrentPage(1);
      // Set loading state to false after fetching
      dispatch(setDataFromApiLoading(false));
      // Check console to see the list of exercise data return
      console.log("selectedBodyPart from ExercisesDashboard.jsx line 84: ", selectedBodyPart); 
      console.log("updatedSelectBodyPartExercises from ExercisesDashboard.jsx lines 101: ", updatedSelectBodyPartExercises);
      return updatedSelectBodyPartExercises;
    }
    
    // If data is already available in the Redux store
    // Introduce a delay, only for rendering, without delaying the data fetching
    setTimeout(() => {
      let updatedSelectBodyPartExercises = exercises;
      // If data is already available in the Redux store 
      // Filter exercises based on the selected bodyPart and set results to Redux store
      if (selectedBodyPart !== "all") {
        updatedSelectBodyPartExercises = filterExercisesByBodyPart(selectedBodyPart, exercises);
      }
  
      dispatch(setPreviousSearchResults((updatedSelectBodyPartExercises)));
      // Update the UI without further delay
      window.scrollTo({ top: 550, left: 0, behavior: "smooth" });
      setSelectedBodyPartExercises(updatedSelectBodyPartExercises);
      setCurrentPage(1);
      // Set loading state to false after fetching
      dispatch(setDataFromApiLoading(false));
      // Check console to see the list of exercise data return
      console.log("selectedBodyPart from ExercisesDashboard.jsx line 84: ", selectedBodyPart); 
      console.log("updatedSelectBodyPartExercises from ExercisesDashboard.jsx lines 101: ", updatedSelectBodyPartExercises);
      return updatedSelectBodyPartExercises;
    }, 3000); // Adjust as needed, currently set to 3 seconds
  };
  
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
        searchedExercisesResults={searchedExercisesTerm}
        selectedBodyPartExercisesResults={selectedBodyPartExercises}
        user={user}
      />}
    </Box>
  )
};

export default ExercisesDashboard;