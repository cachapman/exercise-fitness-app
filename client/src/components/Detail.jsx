import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import BodyPartImageIcon from "../assets/icons/bodyPart-target.png";
import TargetImageIcon from "../assets/icons/body-target.png";
import EquipmentImageIcon from "../assets/icons/fitness-equipment.png";
import { useSaveExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

const Detail = ({ exerciseDetailToDisplay, exercise, workout }) => {
  const { 
    bodyPart, 
    equipment, 
    gifUrl,
    id, 
    name, 
    target, 
    secondaryMuscles, 
    instructions,
   } = exerciseDetailToDisplay;

  const extraExerciseDetailToDisplay = [
    {
      icon: BodyPartImageIcon,
      name: bodyPart,
    },
    {
      icon: TargetImageIcon,
      name: target,
    },
    {
      icon: EquipmentImageIcon,
      name: equipment,
    },
  ];

    // Get logged in authorized user information
    const { userInfo } = useSelector((state) => state.auth);
    const user = userInfo;
  
    const [clicked, setClicked] = useState(false);
  
    const initialExerciseCardData = {
      userId: user.userId,
      exercise: exercise,
    };
    // Verify correct data return in console
    console.log("initialExerciseCardData from Detail.jsx line 45: ", initialExerciseCardData);
    console.log("user from Detail.jsx line 40: ", userInfo);
    console.log("user from Detail.jsx line 40: ", user);
    console.log("user.userId from Detail.jsx line 46: ", user.userId);
    console.log("exercise.id from Detail.jsx line 47: ", exercise);
  
    // Use a state variable to track exerciseCardData and update it
    const [exerciseCardData, setExerciseCardData] = useState(initialExerciseCardData);
  
    // Use Mutation to render data to MongoDB
    const [saveExercise] = useSaveExercisesMutation();
    const [deleteExercise] = useDeleteSavedExercisesMutation();
    
    // Define the function to handle the click event
    const handleClick = async (exerciseCardData) => {
      if (clicked) {
        try {
          // Delete the saved exercise
          await deleteExercise(exerciseCardData);
          setClicked(false);
          // Verify the exerciseCardData return when clicked
          console.log("Clicked successful... exerciseCardData deleted:");
          console.log(exerciseCardData);
        } catch (err) {
          toast.error(err?.exerciseCardData?.message || err.error);
        }
      } else {
        try {
          // Save the exercise
          await saveExercise(exerciseCardData);
          setClicked(true);
          // Verify the exerciseCardData return when clicked
          console.log("Clicked successful... exerciseCardData saved:");
          console.log(exerciseCardData);
        } catch (err) {
          toast.error(err?.exerciseCardData?.message || err.error);
        }
      }
    };
    
    const inWorkout = Array.isArray(workout) ? workout.find(element => element.exerciseid === id) : null;
  
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
    <Stack gap="60px" sx={{flexDirection: { lg: "row" }, pt: "25px", alignItems: "center"}}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" }}}>
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        <Typography variant="h6">
          is a great exercise for your {bodyPart}. The {name} is an amazing exercise that builds stamina, cardiovascular endurance, muscular endurance, and even strength depending on your intensity with reps and sets performed! Some of the muscles worked include your {secondaryMuscles ? secondaryMuscles.join(', ') : ''}, and {target}.
        </Typography>
        <Typography variant="h4">
          Exercise instructions:
        </Typography>
        <Typography variant="h6">
          {instructions ? instructions.join(' ') : ''}
        </Typography>
        {extraExerciseDetailToDisplay.map((iconList) => (
          <Stack key={iconList.name} direction="row" gap="24px" alignItems="center">
            <Button disabled sx={{ background: "#fff2db", borderRadius: "50%", width: "100px", height: "100px" }}>
              <img src={iconList.icon} alt={bodyPart} style={{ width: "50px", height: "50px" }} />
            </Button>
            <Typography variant="h5" textTransform="capitalize">
              {iconList.name}
            </Typography>
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
              </Tooltip>)}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
};

export default Detail;