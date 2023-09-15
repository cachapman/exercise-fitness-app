import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button sx={{ ml: "21px", color: "#000000", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ ml: "21px", color: "#000000", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          {exercise.target}
        </Button>
        <Button sx={{ ml: "21px", color: "#000000", background: "#ffc3c3", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          Add to Favorites
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" pb="10px" textTransform= "capitalize" fontSize="22px">
        {exercise.name}
      </Typography>
    </Link>
  )
};

export default ExerciseCard;