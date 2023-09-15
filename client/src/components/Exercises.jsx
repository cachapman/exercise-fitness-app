import React from "react";
import { useEffect, useState } from "react";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../slices/exerciseSlice";
import ExerciseCard from "./ExerciseCard";
import Loader from "../components/Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  // console.log(exercises); check data return from search bar

  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(10);
  
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      
      if(bodyPart === "all") {
        exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }
      
      setExercises(exercisesData);
    }
    
    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Pagination 
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = Array.isArray(exercises) ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : [];

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 750, left: 100, behavior: "smooth" });
  };
  
  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" 
      sx={{mt: { lg: "50px" }}}
      mt="25px"
      p="20px"
    >
      <Typography variant="h3" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
        Your Search Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: "110px", xs: "50px"}}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" paddingBottom="100px" alignItems="center">
        {exercises.length > 10 && (
          <Pagination 
            color="standard" 
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
};

export default Exercises;