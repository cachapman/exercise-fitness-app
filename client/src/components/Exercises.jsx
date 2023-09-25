import { useEffect, useState } from "react";
import { Box, Pagination, Stack } from "@mui/material";
import { exerciseOptions, fetchData } from "../slices/exerciseSlice";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ bodyPart, currentPage, setCurrentPage, exercises, setExercises, user, workout, setWorkout }) => {
  
  const [exercisesPerPage] = useState(12);
  
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      
      if(bodyPart === "all") {
        exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercise?limit=1500", exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1500`, exerciseOptions);
      }
      
      setExercises(exercisesData);
      console.log("exercisesData from Exercises.jsx line 20: ", exercisesData);
    }
    
    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Pagination 
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = Array.isArray(exercises) ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : [];

  console.log("currentExercises from Exercises.jsx line 30: ", currentExercises);
  const paginate = (event, value) => {
    setCurrentPage(value);

    // Scroll to the top of the exercises container
    window.scrollTo({ top: document.getElementById("show-exercises").offsetTop, behavior: "smooth" });
  };

  return (
    <Box id="show-exercises" 
      sx={{mt: { lg: "50px" }}}
      mt="25px"
      p="20px"
    >
      <Stack direction="row" sx={{ gap: { lg: "110px", xs: "50px"}}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} user={user} workout={workout} setWorkout={setWorkout} />
        ))}
      </Stack>
      <Stack mt="100px" paddingBottom="100px" alignItems="center">
        {exercises.length > 12 && (
          <Pagination 
            color="standard" 
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            currentpage={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
};

export default Exercises;