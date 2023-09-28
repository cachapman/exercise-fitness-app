import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ToggleButton from "@mui/material/ToggleButton";
import { useUpdateSavedExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ProfileExercise = ({ setProgress, workout, setWorkout, exerciseId, bodyPart, equipment, exerciseName, gifUrl, userId, totalReps, totalSets }) => {
  const [counter, setCounter] = useState(totalSets);
  const [counterRep, setCounterRep] = useState(totalReps);
  const [selected, setSelected] = useState(false);
  const [showSetSaveButton, setShowSetSaveButton] = useState(false);
  const [showRepSaveButton, setShowRepSaveButton] = useState(false);

  const changeProgress = () => {
    if(selected) {
      setProgress(previous => previous - 1);
    } else {
      setProgress(previous => previous + 1);

    }
    setSelected(!selected) 
  };

  useEffect(() => {
    if (totalSets !== counter) {
      setShowSetSaveButton(true)
    } else {
      setShowSetSaveButton(false)
    }
  }, [counter, totalSets, totalReps, workout]);

  useEffect(() => {
    if (totalReps !== counterRep) {
      setShowRepSaveButton(true)
    } else {
      setShowRepSaveButton(false)
    }
  }, [counter, counterRep, totalSets, totalReps, workout]);

  const [updateSavedExerciseMutation] = useUpdateSavedExercisesMutation();
  const [deleteSavedExerciseMutation] = useDeleteSavedExercisesMutation();

  const updateExercise = async () => {
    const workoutData = {
      userId: userId,
      exerciseId: exerciseId,
      totalSets: counter,
      totalReps: counterRep,
    };
    // Verify correct data return in console
    // console.log("workoutData from ProfileExercise.jsx line 48: ", workoutData);

    try { 
      // Call the mutation to update the saved exercise
      const response = await updateSavedExerciseMutation(workoutData).unwrap();
      setWorkout(response.workout);
    } catch (err) {
      toast.error(err?.workoutData?.message || err.error);
    }
  };

  const deleteExercise = async () => {
    const workoutParams = {
      userId: userId,
      exerciseId: exerciseId,
    };
    // Verify correct data return in console
    // console.log("workoutParams from ProfileExercise.jsx line 67: ", workoutParams);

    try {
      // Call the mutation to delete the saved exercise
      const response = await deleteSavedExerciseMutation(workoutParams).unwrap();
      setProgress(previous => previous - 1);
      setWorkout(response.workout);
    } catch (err) {
      toast.error(err?.workoutParams?.message || err.error);
    }
  };

  return (
    <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }} >

      <Stack className="profile-card" m="20px"
        sx={{ "&:hover": { boxShadow: "0 0 3px 5px #FF9700" } }}
      >
        <Typography className="profile-card-name"
          sx={{ fontSize: { lg: "26px", xs: "22px" } }} >
          {exerciseName}
        </Typography>

        <img src={gifUrl} alt="exercise-demo" margin="inherit"  />

        <Stack direction="row">

          <Box className="profile-card-btn" >
            {bodyPart}
          </Box>

          <Box className="profile-card-btn">
            {equipment}
          </Box>

          <Button className="profile-card-delete-btn"
            onClick={deleteExercise}
          >
            <DeleteIcon fontSize="large" />
          </Button>

        </Stack>

      </Stack>
      <Stack className="quantity-stack" >
        <Box >
          <Typography className="quantity-name" >Sets</Typography>
          <ButtonGroup size="large" aria-label="outlined button group" >

            {<Button className="quantity-btn" disabled={counter <= 0} onClick={() => {
              setCounter(counter - 1)
            }}><RemoveIcon /></Button>}

            {<Box className="quantity-counter" >{counter}</Box>}

            <Button className="quantity-btn" onClick={() => { setCounter(counter + 1) }}><AddIcon /></Button>

            {showSetSaveButton && <Button className="quantity-btn-save" onClick={updateExercise}>Save</Button>}
          </ButtonGroup>
        </Box>

        <Box style={{ alignItems: "center" }}>
          <Typography className="quantity-name" mt="10px">Reps</Typography>
          <ButtonGroup size="large" aria-label="small outlined button group">

            {<Button className="quantity-btn" disabled={counterRep <= 0} onClick={() => {
              setCounterRep(counterRep - 1)
            }}><RemoveIcon /></Button>}

            {<Box className="quantity-counter" >{counterRep}</Box>}

            <Button className="quantity-btn" onClick={() => { setCounterRep(counterRep + 1) }}><AddIcon /></Button>

            {showRepSaveButton && <Button className="quantity-btn-save" onClick={updateExercise}>Save</Button>}

          </ButtonGroup>
        </Box>

        <ToggleButton
          sx={{
            "&.Mui:hover, &.Mui-selected, &.Mui-selected:hover": {
              color: "white",
              backgroundColor: "#00A5B8"
            }, width: "150px", mt: "20px"
          }}
          className="toggle"
          value="check"
          selected={selected}
          onChange={changeProgress}
        >
          <CheckIcon fontSize="large" />
        </ToggleButton>

      </Stack>
    </Stack>
  )
};

export default ProfileExercise;