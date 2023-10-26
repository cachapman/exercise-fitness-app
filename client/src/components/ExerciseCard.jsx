import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';
import "../index.scss";
import { useSaveExerciseToFaveListMutation, useDeleteSavedExerciseFromListMutation } from "../slices/usersApiSlice";
import { addSavedExerciseToList, removeSavedExerciseFromList } from "../slices/authSlice";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import Loader from "./Loader";

/**
 * ExerciseCard is the child component of ExerciseResultsList and FavoriteExercisesList that sets the parameters for displaying exercise data.
 * 
 * ExerciseCard is the grandchild component of ExercisesDashboard and FaveExercisesDashboard.
 * 
 * @param {Object} props - Props containing currentPage, exercise, and user.
 * @returns {JSX.Element} - A component for displaying the exercise card parameters.
 */

const ExerciseCard = ({ currentPage, exercise, user }) => {
  // Get logged-in user information from Redux store
  // Initialize useDispatch to dispatch the save exercise action
  const dispatch = useDispatch();
  const savedFavoriteExercisesList = useSelector((state) => state.auth.userInfo.savedFavoriteExercisesList);

  // Local state to track and initialize isLoading state
  const [isLoading, setIsLoading] = useState(false);

  // Get the navigation function
  const navigate = useNavigate();

  // Handle the exercise card click to navigate with the currentPage parameter
  const handleExerciseCardCurrentPageClick = () => {
    navigate(`/exercise/${exercise.id}?page=${currentPage}`);
  };

  // Function to check if the exercise is saved in the user's saved favorite exercises list Redux state
  const isExerciseSaved = () => {
    return savedFavoriteExercisesList.some((savedFavoriteExercise) => savedFavoriteExercise.id === exercise.id);
  };

  // Parameters for saving and removing the exercise
  const exerciseToBeSavedData = {
    userId: user._id,
    exercise: exercise,
  };
  const removeExerciseParams = {
    userId: user._id,
    exerciseId: exercise.id,
  };

  // Use Mutation to interact with MongoDB
  const [saveExercise] = useSaveExerciseToFaveListMutation();
  const [deleteExercise] = useDeleteSavedExerciseFromListMutation();

  // Define the function to handle the click event when adding or removing the exercise
  const handleExerciseClick = async () => {
    // Start loading
    setIsLoading(true);

    try {
      if (isExerciseSaved()) {
        // Remove the saved exercise from saved favorite exercises list
        await removeExerciseFromSavedExerciseList(removeExerciseParams);
      } else {
        // Add the exercise to saved favorite exercises list
        await addExerciseToSavedExerciseList(exerciseToBeSavedData);
      }
    } catch (err) {
      toast.error(err?.exerciseToBeSavedData?.message || err.error);
    } finally {
      // Always stop loading after the action, whether it succeeded or failed
      setIsLoading(false);
    }
  };

  const addExerciseToSavedExerciseList = async (exerciseToBeSavedData) => {
    // Check if the exercise is already saved
    if (isExerciseSaved()) {
      toast.warning("Exercise is already in your saved favorite exercises list");
    } else {
      // Exercise is not in the saved favorite exercises list, can proceed to add it
      await saveExercise(exerciseToBeSavedData);
      // Dispatch the action to add the exercise to savedExericseList
      dispatch(addSavedExerciseToList(exercise));
      toast.success("Exercise added successfully to your saved favorite exercises list");
    }
  };

  const removeExerciseFromSavedExerciseList = async (removeExerciseParams) => {
    // Remove the saved exercise from saved favorite exercises list
    await deleteExercise(removeExerciseParams);
    // Dispatch the action to remove the exercise from savedExericseList
    dispatch(removeSavedExerciseFromList(exercise));
    toast.success("Exercise removed successfully from your saved favorite exercises list");
  };

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}?page=${currentPage}`}>
      <Box className="exercise-card">
        <Tooltip title={"Click for exercise instructions".toUpperCase()}>
          <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" onClick={handleExerciseCardCurrentPageClick}/>
        </Tooltip>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button className="exercise-card-btn" sx={{ ml: "10px", color: "#fff", background: "#ff2a2a", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.target}
        </Button>
        <Button className="exercise-card-btn" sx={{ ml: "10px", color: "#fff", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.bodyPart}
        </Button>
        <Button className="exercise-card-btn" sx={{ ml: "10px", mr: "10px", color: "#fff", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          {exercise.equipment}
        </Button>
        {user && (
          <Tooltip title={`Click to ${isExerciseSaved() ? "REMOVE" : "ADD"} exercise ${isExerciseSaved() ? "from" : "to"} your saved favorite exercises list`.toUpperCase()} arrow>
            <Button onClick={handleExerciseClick} className={`exercise-card-${isExerciseSaved() ? "check" : "add"}-btn`}>
              {isLoading ? (<Loader />) : isExerciseSaved() ? <CheckIcon fontSize="large" /> : <AddIcon fontSize="large" />}
            </Button>
          </Tooltip>
        )}
      </Stack>
        <Tooltip title={"Click for exercise instructions".toUpperCase()}>
          <Typography className="exercise-card-name" sx={{ fontSize: { lg: "24px", xs: "16px" } }}  onClick={handleExerciseCardCurrentPageClick}>
            {exercise.name}
          </Typography>
        </Tooltip>
      </Box>
    </Link>
  )
};

export default ExerciseCard;