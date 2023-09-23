import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "../index.scss";
import { useSaveExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ExerciseCard = ({ exercise, user, workout, setWorkout }) => {

  const [clicked, setClicked] = useState(false);

  const exerciseCardData = {
    userId: user.userId,
    exercise: exercise,
  };
  // Verify correct data return in console
  console.log(exerciseCardData);
  console.log(user);
  console.log(user.userId);
  console.log(exercise);

  const exerciseCardParams = {
    userId: user.userId,
    exerciseId: exercise.id,
  };
  // Verify correct data return in console
  console.log(exerciseCardParams);

  const { mutate: saveExerciseMutation } = useSaveExercisesMutation();
  const { mutate: deleteExerciseMutation } = useDeleteSavedExercisesMutation();
  
  const handleClick = async (exerciseCardData) => {
    if (clicked) {
      // Call the delete mutation to remove the exercise from the user's saved exercises
      await deleteExerciseMutation(exerciseCardParams, {
        onSuccess: (response) => {
          setWorkout(response.workout);
          setClicked(false);
        },
        onError: (err) => {
          toast.error(err?.exerciseCardParams?.message || err.error);
        },
      });
      // Verify the exerciseCardData return when clicked is false
        console.log("Clicked successful... exerciseCardData deleted:");
        console.log(exerciseCardData);
      } else {
        // Call the save mutation to add the exercise to the user's saved exercises
        await saveExerciseMutation(exerciseCardData, {
          onSuccess: (response) => {
            setWorkout(response.workout);
            setClicked(true);
          },
          onError: (err) => {
            toast.error(err?.exerciseCardData?.message || err.error);
          },
        });
        // Verify the exerciseCardData return when clicked is true
        console.log("Clicked successful... exerciseCardData saved:");
        console.log(exerciseCardData);
      }
    };
  
    const inWorkout = workout?.find(element => element.exerciseid === exercise.id);

    useEffect(() => {
      // Set the initial click state based on whether the exercise is in the workout
      setClicked(!!inWorkout);
    }, [workout, exercise, inWorkout]);

  return (
    <Box className="exercise-card">
      <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      </Link>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button disabled sx={{ ml: "21px", color: "#fff", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.bodyPart}
        </Button>
        <Button disabled sx={{ ml: "21px", color: "#fff", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          {exercise.equipment}
        </Button>
          {user &&
            (clicked ?
              <Button onClick={() => {handleClick(exerciseCardData); }}  className="exercise-card-check-btn" >
                <CheckIcon fontSize="large" />
              </Button> :

              <Button onClick={() => {handleClick(exerciseCardData); }} className="exercise-card-add-btn" >
                <AddIcon fontSize="large" />
              </Button>)
          }
      </Stack>
      <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <Typography className="exercise-card-name" sx={{ fontSize: { lg: "24px", xs: "16px" } }} >
          {exercise.name}
        </Typography>
      </Link>
    </Box>
  )
};

export default ExerciseCard;