import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { useSaveExerciseToFaveListMutation, useDeleteSavedExerciseFromListMutation } from "../slices/usersApiSlice";
import { addSavedExerciseToList, removeSavedExerciseFromList } from "../slices/authSlice";
import { selectExercises } from "../slices/exerciseSlice";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import Loader from "./Loader";

/**
 * ExerciseTemplateCard is the child component of ExerciseResultsList.
 * 
 * ExerciseTemplateCard is the grandchild component of ExercisesDashboard.
 * 
 * @param {Object} props - Props containing currentPage, exerciseId, and user.
 *    - currentPage: The current page number.
 *    - exerciseId: The ID of the exercise to be displayed.
 *    - user: Object representing the logged-in user information.
 * @returns {JSX.Element} - A component for that sets the parameters for displaying the exercise card template.
 */

const ExerciseTemplateCard = ({ currentPage, exerciseId, user }) => {
  // Get logged-in user information from Redux store
  // Initialize useDispatch to dispatch the save exercise action
  const dispatch = useDispatch();
  const savedFavoriteExercisesList = useSelector((state) => state.auth.userInfo.savedFavoriteExercisesList);
  const exercises = useSelector(selectExercises);
  const exercise = exercises[exerciseId];

  // Local state to track and initialize isLoading state
  const [isLoading, setIsLoading] = useState(false);

  // Get the navigation function
  const navigate = useNavigate();

  // Handle the exercise card click to navigate with the currentPage parameter
  const handleExerciseTemplateCardCurrentPageClick = () => {
    navigate(`/exercise/${exercise.id}?page=${currentPage}`);
  };

  // Function to check if the exercise is saved in the user's saved favorite exercises list Redux state
  const isExerciseSaved = () => {
    if (!exercise || typeof exercise.id === 'undefined' || !savedFavoriteExercisesList) {
      return false;
    }
  
    const isSaved = savedFavoriteExercisesList.some((item) => item.exercise && item.exercise.id === exercise.id.toString());
  
    return isSaved;
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
        await removeExerciseFromSavedExerciseList(exerciseId);
      } else {
        // Add the exercise to saved favorite exercises list
        await addExerciseToSavedExerciseList(exerciseId, exercise);
      }
    } catch (err) {
      toast.error(err?.exerciseToBeSavedData?.message || err.error);
    } finally {
      // Always stop loading after the action, whether it succeeded or failed
      setIsLoading(false);
    }
  };

  const addExerciseToSavedExerciseList = async (exerciseId, exercise) => {
    // Check if the exercise is already saved
    if (isExerciseSaved()) {
      toast.warning("Exercise is already in your saved favorite exercises list");
    } else {
      // Exercise is not in the saved favorite exercises list, can proceed to add it
      await saveExercise({ 
        userId: user.id, 
        exerciseId: exerciseId.toString(), 
        exercise: exercise,
      });
      // Dispatch the action to add the exercise to savedExericseList
      dispatch(addSavedExerciseToList({exerciseId: exerciseId, exercise: exercise }));
      toast.success("Exercise added successfully to your saved favorite exercises list");
    }
  };

  const removeExerciseFromSavedExerciseList = async (exerciseId) => {
    // Remove the saved exercise from saved favorite exercises list
    await deleteExercise({ userId: user.id, exerciseId });
    // Dispatch the action to remove the exercise from savedExericseList
    dispatch(removeSavedExerciseFromList({ exerciseId: exerciseId }));
    toast.success("Exercise removed successfully from your saved favorite exercises list");
  };

  return (
    <Box className="exercise-card-box">
      <Link className="exercise-card" to={`/exercise/${exercise.id}?page=${currentPage}`}>
        <Tooltip title={"Click for exercise instructions".toUpperCase()}>
          <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" onClick={handleExerciseTemplateCardCurrentPageClick}/>
        </Tooltip>
      </Link>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button className="exercise-card-template-category-btn" sx={{ ml: "10px", color: "#fff", background: "#ff2a2a", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.target}
        </Button>
        <Button className="exercise-card-template-category-btn" sx={{ ml: "10px", color: "#fff", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.bodyPart}
        </Button>
        <Button className="exercise-card-template-category-btn" sx={{ ml: "10px", mr: "10px", color: "#fff", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
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
      <Link className="exercise-card" to={`/exercise/${exercise.id}?page=${currentPage}`}>
        <Tooltip title={"Click for exercise instructions".toUpperCase()}>
          <Typography className="exercise-card-name" sx={{ fontSize: { lg: "24px", xs: "16px" } }}  onClick={handleExerciseTemplateCardCurrentPageClick}>
            {exercise.name}
          </Typography>
        </Tooltip>
      </Link>
    </Box>
  )
};

export default ExerciseTemplateCard;