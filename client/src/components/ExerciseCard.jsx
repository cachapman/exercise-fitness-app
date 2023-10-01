import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "../index.scss";
import { useSaveExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ExerciseCard = ({ exercise, workout, setWorkout }) => {
  // Get logged in authorized user information
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo;

  const [clicked, setClicked] = useState(false);

  const initialExerciseCardData = {
    userId: user.userId,
    exercise: exercise,
  };
  // Verify correct data return in console
  console.log("initialExerciseCardData from ExerciseCard.jsx line 18: ", initialExerciseCardData);
  console.log("user from ExerciseCard.jsx line 13: ", userInfo);
  console.log("user from ExerciseCard.jsx line 14: ", user);
  console.log("user.userId from ExerciseCard.jsx line 19: ", user.userId);
  console.log("exercise from ExerciseCard.jsx line 20: ", exercise);

  const exerciseCardParams = {
    userId: user.userId,
    exerciseId: exercise.id,
  };
    // Verify correct data return in console
  console.log("user.userId from ExerciseCard.jsx line 30: ", user.userId);
  console.log("exercise.id from ExerciseCard.jsx line 31: ", exercise.id);

  // Use a state variable to track exerciseCardData and update it
  const [exerciseCardData, setExerciseCardData] = useState(initialExerciseCardData);

  const [saveExercise] = useSaveExercisesMutation();
  const [deleteExercise] = useDeleteSavedExercisesMutation();
  
  // Define the function to handle the click event
  const handleClick = async (exerciseCardData) => {
    if (clicked) {
      try {
        // Delete the saved exercise
        console.log("exerciseCardParams: ");
        await deleteExercise(exerciseCardParams);
        setClicked(false);
        // Verify the exerciseCardData return when clicked
        console.log("Clicked successful... exerciseCardParams deleted:");
        console.log(exerciseCardParams);
      } catch (err) {
        toast.error(err?.exerciseCardData?.message || err.error);
      }
    } else {
      try {
        // Save the exercise
        await saveExercise(exerciseCardData);
        setClicked(true);
        // Verify the exerciseCardData return when clicked
        // console.log("Clicked successful... exerciseCardData saved:");
        // console.log(exerciseCardData);
      } catch (err) {
        toast.error(err?.exerciseCardData?.message || err.error);
      }
    }
  };
  
  const inWorkout = workout?.find(element => element.exerciseid === exercise.id);

  useEffect(() => {
    // Set the initial click state based on whether the exercise is in the workout
    setClicked(!!inWorkout);

    // Update exerciseCardData whenever the user or exercise props change
    setExerciseCardData({
      userId: user.userId,
      exercise: exercise,
    });
  }, [workout, exercise, inWorkout, user]);

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