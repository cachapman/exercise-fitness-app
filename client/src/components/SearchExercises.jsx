import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../slices/exerciseSlice";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  // console.log(bodyPart);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exerciseOptions);

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if(search) {
      const exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);

      // console.log(exercisesData); see the list of exercise data return
      const searchedExercisesTerm = exercisesData.filter(
        (exercise) => exercise.name?.toLowerCase().includes(search) 
        || exercise.target?.toLowerCase().includes(search)
        || exercise.equipment?.toLowerCase().includes(search)
        || exercise.bodyPart?.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 750, left: 100, behavior: "smooth" });
      setSearch('');
      setExercises(searchedExercisesTerm);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight="700" sx={{ fontSize: { lg: "44px", xs: "30px"}}} mb="50px" mt="100px" textAlign="center">
        Search our exercise database
      </Typography>
      <Box id="searchexercises" position="relative" mb="72px">
        <TextField 
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px"},
            width: { lg: "800px", xs: "350px"},
            backgroundColor: "#fff",
            borderRadius: "40px"
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Enter name of exercise, equipment, target body part, or select category below"
          type="text"
        />
        <Button className="search-btn"
          sx={{
            backgroundColor: "#c71711",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px"},
            fontSize: { lg: "20px", xs: "14px"},
            height: "56px",
            position: "absolute",
            right: "0"
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px"}}>
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts={true} />
      </Box>
    </Stack>
  )
};

export default SearchExercises;