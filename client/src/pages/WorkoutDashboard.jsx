import { useEffect } from 'react';
import { Button, LinearProgress, Stack, Typography } from '@mui/material'
import ProfileExercise from '../components/ProfileExercise';
import { useDeleteSavedExercisesMutation } from '../slices/usersApiSlice';
import '../index.scss';
import { toast } from "react-toastify";

const WorkoutDashboard = ({ user, workout, setWorkout, progress, setProgress, percentProgress, setPercentProgress }) => {
  const [deleteSavedExercisesMutation] = useDeleteSavedExercisesMutation();

  useEffect(() => {
    let progressPercent = (progress / workout.length) * 100;
    setPercentProgress(progressPercent);
  }, [progress, workout, setPercentProgress]);

  const deleteAllExercises = async () => {
    const params = {
      userId: user.id,
    };

    try {
      // Call the mutation to delete all the saved exercises
      const response = await deleteSavedExercisesMutation(params).unwrap();
      setProgress(0);
      setWorkout(response.workout);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const userExercises = workout.map(exercise => {
    return (
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
      />
    )
  })

  return (
    <Stack className='profile' spacing={3}>
      {percentProgress === 100 ?
        <Typography
          sx={{ fontSize: { lg: '60px', md: '50px', sm: '40px', xs: '30px' }, color: '#FF9700' }}
        >
          Workout Completed
        </Typography> :
        (workout.length !== 0 &&
        <Typography sx={{ fontSize: { lg: '60px', md: '50px', sm: '40px', xs: '30px' }, color: '#FF9700' }} >
          Workout Progress
        </Typography>)
        }
      {workout.length === 0 ?
          <Typography
            sx={{ textAlign: 'center', fontSize: { lg: '60px', md: '50px', sm: '40px', xs: '30px' }, color: '#FF9700' }}
          >
            Add Exercises to Begin Workout
          </Typography>
        :
          <LinearProgress variant="determinate" value={percentProgress} sx={{width: {lg: '500px', md: '450px', sm: '400px', xs: '300px'}, height:{lg: '50px', sm: '45px', xs: '40px'}, borderRadius: '10px'}} />
      }
      {workout.length !== 0 &&
        <Button className='profile-card-delete-btn' onClick={deleteAllExercises}>Delete All</Button>
      }
      {userExercises}
    </Stack>
  )
};

export default WorkoutDashboard;