import { useEffect } from "react";
import { Button, LinearProgress, Stack, Typography } from "@mui/material"
import ProfileExercise from "../components/ProfileExercise";
import { useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import "../index.scss";
import { toast } from "react-toastify";

const WorkoutDashboard = ({ 
  user, 
  workout, 
  setWorkout, 
  progress, 
  setProgress, 
  percentProgress, 
  setPercentProgress, 
}) => {
  const [deleteSavedExercisesMutation] = useDeleteSavedExercisesMutation();

  useEffect(() => {
    const progressPercent = (progress / workout.length) * 100;
    setPercentProgress(progressPercent);
  }, [progress, workout, setPercentProgress]);

  const deleteAllExercises = async () => {
    const params = {
      userId: user?.userId,
    };
    // Verify correct data return in console
    console.log("deleteAllExercises from Workout9shboard.jsx line 14: ", deleteAllExercises);
    console.log("user from WorkoutDashboard.jsx line 9: ", user);
    console.log("params from WorkoutDashboard.jsx line 25: ", params);
    console.log("user?.userId from WorkoutDashboard.jsx line 26: ", user?.userId);

    try {
      // Call the mutation to delete all the saved exercises
      const response = await deleteSavedExercisesMutation(params).unwrap();
      // Verify correct response data return in console
      console.log("params from WorkoutDashboard.jsx line 25: ", response);
      setProgress(0);
      setWorkout(response.workout);
      // Verify correct response data return in console
      console.log("params from WorkoutDashboard.jsx line 25: ", response.workout);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const renderProgressMessage = () => {
    if (percentProgress === 100) {
      return (
        <Typography
          sx={{ fontSize: { lg: "60px", md: "50px", sm: "40px", xs: "30px" }, color: "#FF9700" }}
        >
          Workout Completed!
        </Typography>
      );
    } else if (workout.length !== 0) {
      return (
        <Typography sx={{ fontSize: { lg: "60px", md: "50px", sm: "40px", xs: "30px" }, color: "#FF9700" }} >
          Your Workout Progress
        </Typography>
      );
    } else {
      return (
        <Typography
            sx={{ textAlign: "center", fontSize: { lg: "60px", md: "50px", sm: "40px", xs: "30px" }, color: "#FF9700" }}
          >
            Add Exercises to Begin Workout
        </Typography>
      );
    }
  };

  return (
    <Stack className='profile' spacing={3}>
      {renderProgressMessage()}
      {workout.length === 0 ? (
        <Typography
          sx={{ textAlign: 'center', fontSize: { lg: '60px', md: '50px', sm: '40px', xs: '30px' }, color: '#FF9700' }}
        >
          Add Exercises to Begin Workout
        </Typography>
      ) : (
        <LinearProgress 
          variant="determinate" 
          value={percentProgress} 
          sx={{ width: {lg: '500px', md: '450px', sm: '400px', xs: '300px' }, height:{lg: '50px', sm: '45px', xs: '40px'}, borderRadius: '10px'}} 
        />
      )}
      {workout.length !== 0 && (
        <Button className='profile-card-delete-btn' onClick={deleteAllExercises}>
          Delete All
        </Button>
      )}

      {workout.map(exercise => (
        <ProfileExercise
          key={exercise.id}
          exerciseId={exercise.exerciseid}
          bodyPart={exercise.bodypart}
          equipment={exercise.equipment}
          exerciseName={exercise.exercisename}
          gifUrl={exercise.gifurl}
          targetGroup={exercise.targetgroup}
          totalReps={exercise.totalreps}
          totalSets={exercise.totalsets}
          userId={exercise.user_id}
          setWorkout={setWorkout}
          workout={workout}
          setProgress={setProgress}
        />))}
    </Stack>
  )
};

export default WorkoutDashboard;