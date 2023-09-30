import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { exerciseOptions, fetchData } from "../slices/exerciseSlice";
import Detail from "../components/Detail";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetailPage = () => {
  const [exerciseDetailToDisplay, setExerciseDetailToDisplay] = useState({});
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [targetBodyPartExercises, setTargetBodyPartExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com/exercises";

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercise/${id}`, exerciseOptions);
      setExerciseDetailToDisplay(exerciseDetailData);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const targetBodyPartExercisesData = await fetchData(`${exerciseDbUrl}/bodyPart/${exerciseDetailData.bodyPart}`, exerciseOptions);
      setTargetBodyPartExercises(targetBodyPartExercisesData);

      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);

      // Verify correct data return in console
      console.log("exerciseDetailData from ExerciseDetailPage.jsx line 19: ", exerciseDetailData);
    }

    fetchExercisesData();
  }, [id]);

  // Filter out "id" from the arrays to not display the current exercise in the similar exercises options
  const filteredTargetMuscleExercises = targetMuscleExercises.filter(exercise => exercise.id !== id);
  const filteredTargetBodyPartExercises = targetBodyPartExercises.filter(exercise => exercise.id !== id);
  const filteredEquipmentExercises = equipmentExercises.filter(exercise => exercise.id !== id);

  // Verify correct data return in console
  // console.log("id from ExerciseDetailPage.jsx line 33: ", id);
  // console.log("id from ExerciseDetailPage.jsx line 36: ", id);

  if (!exerciseDetailToDisplay) return <div>Loading... No Exercise Data to Display, please try search again.</div>

  return (
    <Box paddingTop="50px">
      <Detail exerciseDetailToDisplay={exerciseDetailToDisplay} exercise={{ id }} />
      <SimilarExercises targetMuscleExercises={filteredTargetMuscleExercises} targetBodyPartExercises={filteredTargetBodyPartExercises} equipmentExercises={filteredEquipmentExercises} />
    </Box>
  )
};

export default ExerciseDetailPage;