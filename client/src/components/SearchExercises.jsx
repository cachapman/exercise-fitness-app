import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../slices/exerciseSlice";
import "../index.scss";
// import HorizontalExerciseScrollbar from "./HorizontalExerciseScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  // const [bodyParts, setBodyParts] = useState([]);

  // useEffect(() => {
  //   const fetchExercisesData = async () => {
  //     const bodyPartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exerciseOptions);

  //     setBodyParts(["all", ...bodyPartsData]);
  //   };

  //   fetchExercisesData();
  // }, []);

  const handleSearch = async () => {
    //Check for non-empty search term
    if(search.trim() !== '') {
      const exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises?limit=1500", exerciseOptions);

      const searchedExercisesTerm = exercisesData.filter(
        (exercise) => exercise.name?.toLowerCase().includes(search.trim()) 
        || exercise.target?.toLowerCase().includes(search.trim())
        || exercise.equipment?.toLowerCase().includes(search.trim())
        || exercise.bodyPart?.toLowerCase().includes(search.trim())
      );

      // Check console to see the list of exercise data return
      console.log(exercisesData); 
      window.scrollTo({ top: 750, left: 100, behavior: "smooth" });
      setSearch('');
      setExercises(searchedExercisesTerm);
    }
  };

  console.log(search.trim());

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" mt="20px">
      <Box id="search-exercises" className="search-bar" mb="52px">
        <Typography fontWeight="700" sx={{ fontSize: { lg: "55px", xs: "30px"}}} lineHeight="normal" mb="50px" mt="110px" textAlign="center">
          Search our dynamic database of 1300+ Exercises!
        </Typography>
          <TextField 
            sx={{
              input: { fontWeight: "700", border: "none", borderRadius: "4px"},
              fontSize: { md: "22px", xs: "16px" },
              width: { lg: "700px", md: "500px", xs: "300px"},
              backgroundColor: "#fff",
              borderRadius: "40px",
            }}
            height="76px"
            value={search}
            onChange={(event) => setSearch(event.target.value.toLowerCase())}
            placeholder="Enter exercise name or equipment, target muscle or body part, or select category below"
            type="text"
            onKeyDown={handleKeyDown}
          />
        <Button className="search-btn"
          sx={{
            backgroundColor: "#ff2625",
            color: "#fff",
            textTransform: "uppercase",
            width: { lg: "175px", xs: "80px"},
            fontSize: { lg: "22px", xs: "16px"},
            height: "56px",
            position: "absolute",
          }}
          onClick={handleSearch}
          aria-label="Submit search"
        >
          Search
        </Button>
      </Box>
      {/* <Box sx={{ position: "relative", width: "100%", p: "20px"}}>
        <HorizontalExerciseScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts={true} />
      </Box> */}
  </Stack>
  )
};

export default SearchExercises;