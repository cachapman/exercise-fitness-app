import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

/**
 * SearchExercisesBar is the child component of ExercisesDashboard that should only handle the search input and call the onSearch function provided by its parent component.
 *
 * @param {Object} props - Prop containing onSearch.
 * @returns {JSX.Element} - A component for displaying the search input options.
 */

const SearchExercisesBar = ({ onSearch }) => {
  // Using local state to track 
  const [search, setSearch] = useState('');
  
  const handleSearch = () => {
    onSearch(search);
    setSearch('');
  };

  // Handle key press, triggering search on Enter key
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
    </Stack>
  );
};

export default SearchExercisesBar;