import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "../index.scss";
import { toast } from "react-toastify";
import { useSaveExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import { addSavedExerciseToList, removeSavedExerciseFromList } from "../slices/authSlice";

const ExerciseCard = ({ exercise, workoutList, setWorkout }) => {
  // Get logged in authorized user information
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo;

  // State to track whether the exercise is saved
  const [isSaved, setIsSaved] = useState(false);

  // Data for the current exercise card
  const exerciseCardData = {
    userId: user.userId,
    exercise: exercise,
  };
  
  // Parameters for the exercise
  const exerciseCardParams = {
    userId: user.userId,
    exerciseId: exercise.id,
  };

  // Initialize useDispatch to dispatch the save exercise action
  const dispatch = useDispatch();

  // Use Mutation to render data to MongoDB
  const [saveExercise] = useSaveExercisesMutation();
  const [deleteExercise] = useDeleteSavedExercisesMutation();
  
  // Define the function to handle the click event
  const handleExerciseClick = async () => {
    try {
      if (isSaved) {
        await handleRemoveExercise(exerciseCardParams);
      } else {
        await handleSaveExercise(exerciseCardData);
      }
    } catch (err) {
      toast.error(err?.exerciseCardData?.message || err.error);
    }
  };

  const handleSaveExercise = async (exerciseCardData) => {
    await saveExercise(exerciseCardData);
    setIsSaved(true);
    // Dispatch the action to add the exercise to savedExericseList
    dispatch(addSavedExerciseToList(exercise));
    // Verify the exerciseCardData return when clicked
    console.log("Clicked successful... exerciseCardData saved from ExerciseCard.jsx line 54: ", exerciseCardData);
    console.log("Clicked successful... exercise saved from ExerciseCard.jsx line 57: ", exercise);
  };

  const handleRemoveExercise = async (exerciseCardParams) => {
    await deleteExercise(exerciseCardParams);
    setIsSaved(false);
    // Dispatch the action to add the exercise to savedExericseList
    dispatch(removeSavedExerciseFromList(exercise));
    // Verify the exerciseCardParams return when clicked
    console.log("Clicked successful... exerciseCardParams removed from ExerciseCard.jsx line 63: ", exerciseCardParams);
    console.log("Clicked successful... exercise saved from ExerciseCard.jsx line 66: ", exercise);
  };

  // Determine if the exercise is in the userInfo workout list
  const inWorkoutList = workoutList?.find(element => element.exerciseId === exercise.id);

  useEffect(() => {
    // Set the initial saved state based on whether the exercise is in the workoutList
    setIsSaved(!!inWorkoutList);

    // Update exerciseCardData whenever the user or exercise props change
    // setExerciseCardData({
    //   userId: user.userId,
    //   exercise: exercise,
    // });
  }, [workoutList, exercise, inWorkoutList]);

  return (
    <Box className="exercise-card">
      <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      </Link>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button className="exercise-card-btn" sx={{ ml: "21px", color: "#fff", background: "#ff2a2a", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.target}
        </Button>
        <Button className="exercise-card-btn" sx={{ ml: "21px", color: "#fff", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.bodyPart}
        </Button>
        <Button className="exercise-card-btn" sx={{ ml: "21px", color: "#fff", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          {exercise.equipment}
        </Button>
          {user && (
              <Tooltip title={`Click to ${isSaved ? "REMOVE" : "ADD"} exercise ${isSaved ? "from" : "to"} your saved exercise list`}>
                <Button onClick={handleExerciseClick}  className={`exercise-card-${isSaved ? "check" : "add"}-btn`}>
                  {isSaved ? <CheckIcon fontSize="large" /> : <AddIcon fontSize="large" />}
                </Button>
              </Tooltip>
          )}
      </Stack>
      <Link className="exercise-card-name" to={`/exercise/${exercise.id}`}>
        <Typography className="exercise-card-name" sx={{ fontSize: { lg: "24px", xs: "16px" } }} >
          {exercise.name}
        </Typography>
      </Link>
    </Box>
  )
};

export default ExerciseCard;