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
    }

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetailToDisplay) return <div>No Exercise Data to Display, please try search again.</div>

  return (
    <Box paddingTop="50px">
      <Detail exerciseDetailToDisplay={exerciseDetailToDisplay} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} targetBodyPartExercises={targetBodyPartExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
};

export default ExerciseDetailPage;