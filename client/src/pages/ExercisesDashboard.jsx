import { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import SearchExercises from "../components/SearchExercises";
import HorizontalExerciseScrollbar from "../components/HorizontalExerciseScrollbar";
import Exercises from "../components/Exercises";

const ExercisesDashboard = ({ workout, setWorkout }) => {
  const [bodyPart, setBodyPart] = useState(["all"]);
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  return (
    <>
      <Box>
        <SearchExercises 
          setExercises={setExercises} 
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart}
        />
        <HorizontalExerciseScrollbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          setExercises={setExercises}
        />
        <Exercises
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          exercises={exercises} 
          setExercises={setExercises} 
          bodyPart={bodyPart} 
          user={userInfo}
          workout={workout}
          setWorkout={setWorkout}
        />
      </Box>
    </>
  )
};

export default ExercisesDashboard;