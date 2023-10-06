import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "../index.scss";
import { toast } from "react-toastify";
import { useSaveExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import {
  savingExerciseToListStarted,
  savingExerciseToListCompleted,
  deletingExerciseToListStarted,
  deletingExerciseToListCompleted,
  saveExerciseToList,
  deleteExerciseToList,
} from "../slices/authSlice";

const ExerciseCard = ({ exercise, workoutList, setWorkout }) => {
  // Get logged in authorized user information
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo;
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);
  // Use a state variable to track exerciseCardData and update it
  const [exerciseCardData, setExerciseCardData] = useState({
    userId: user.userId,
    exercise: exercise,
  });
  
  const exerciseCardParams = {
    userId: user.userId,
    exerciseId: exercise.id,
  };

  // Verify correct data return in console
  console.log("userInfo from ExerciseCard.jsx line 21: ", userInfo);
  console.log("user from ExerciseCard.jsx line 22: ", user);
  console.log("user.userId from ExerciseCard.jsx line 28: ", user.userId);
  console.log("exercise from ExerciseCard.jsx line 29: ", exercise);
  console.log("exerciseCardParams from ExerciseCard.jsx line 32: ", exerciseCardParams);
  console.log("user.userId from ExerciseCard.jsx line 33: ", user.userId);
  console.log("exercise.id from ExerciseCard.jsx line 34: ", exercise.id);

  // Use Mutation to render data to MongoDB
  const [saveExercise] = useSaveExercisesMutation();
  const [deleteExercise] = useDeleteSavedExercisesMutation();
  
  // Define the function to handle the click event
  const handleClick = async (exerciseCardData) => {
    if (clicked) {
      try {
        // Dispatch action: deleting exercise started
        dispatch(deletingExerciseToListStarted());

        // Delete the saved exercise
        console.log("exerciseCardParams: ");
        console.log(exerciseCardParams)

        const response = await deleteExercise(exerciseCardParams);

        if (response.data) {
          // The API call was successful, and valid data received. 
          console.log("before clicked? line 69 ", response.data);
          // Update Redux state with new savedExerciseList
          dispatch(deleteExerciseToList(exerciseCardParams.exerciseId));
          setClicked(false);
          toast.success("Exercise removed successfully!");
          // Verify the exerciseCardData return when clicked
          console.log("Clicked successful... exerciseCardParams deleted:");
          console.log(exerciseCardParams);
          console.log(exerciseCardParams.exerciseId);
          console.log("Clicked successful... response.data deleted:");
          console.log(response.data);
        }

        // Dispatch action: deleting exercise completed
        dispatch(deletingExerciseToListCompleted());
      } catch (err) {
        toast.error(err?.exerciseCardData?.message || err.error);
        // Handle error and dispatch action: show current savedExerciseList
        dispatch(deleteExerciseToList());
      }
    } else {
      try {
        // Dispatch action: saving exercise started
        dispatch(savingExerciseToListStarted());

        // Save the exercise
        const response = await saveExercise(exerciseCardData);

        if (response.data) {
          // Update Redux state with new savedExerciseList
          dispatch(saveExerciseToList(exerciseCardData.exercise));
          setClicked(true);
          toast.success("New exercise saved successfully!");
          // Verify the exerciseCardData return when clicked
          console.log("Clicked successful... exerciseCardData saved:");
          console.log(exerciseCardData);
          console.log("Clicked successful... response.data saved:");
          console.log(response.data);
          console.log("current user state info: ", user);
        }

        // Dispatch action: saving exercise completed
        dispatch(savingExerciseToListCompleted());
      } catch (err) {
        toast.error(err?.exerciseCardData?.message || err.error);
        // Handle error and dispatch action: show current savedExerciseList
        dispatch(saveExerciseToList());
      }
    }
  };
  
  const inWorkoutList = workoutList?.find(element => element.exerciseId === exercise.id);

  useEffect(() => {
    // Set the initial click state based on whether the exercise is in the workoutList
    setClicked(!!inWorkoutList);

    // Update exerciseCardData whenever the user or exercise props change
    setExerciseCardData({
      userId: user.userId,
      exercise: exercise,
    });
  }, [workoutList, exercise, inWorkoutList, user]);

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
          {user &&
            (clicked ?
              <Tooltip title="Click to REMOVE exercise from workout list">
                <Button onClick={() => {handleClick(exerciseCardData); }}  className="exercise-card-check-btn" >
                  <CheckIcon fontSize="large" />
                </Button>
              </Tooltip> :

              <Tooltip title="Click to ADD exercise to workout list">
                <Button onClick={() => {handleClick(exerciseCardData); }} className="exercise-card-add-btn" >
                  <AddIcon fontSize="large" />
                </Button>
              </Tooltip>)
          }
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