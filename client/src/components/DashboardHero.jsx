import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';
// import HeroBannerImage from "../assets/icons/sport.png";
import AnatomyHeroBannerImage from "../assets/icons/anatomy.png";

const DashboardHero = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Box 
        sx={{
          mt: { lg: "150px", sx: "70px"},
          ml: { sm: "50px"},
          pt: { sx: "20px" }
        }}
        position="relative"
        p="20px"
        marginTop="50px"
      >
        <Typography color="#ff2625" fontWeight="700" fontSize="36px">
          Welcome {userInfo && userInfo.name} to your Dashboard!
        </Typography>
        <Typography fontWeight="700" sx={{ fontSize: { lg: "44px", xs: "40px"}}}>
          Plan your workout and <br /> track your progress!
        </Typography>
        <Typography fontSize="22px" lineHeight="35px">
          Select an exercise and learn how to safely perform them.
        </Typography>
        <Link to="/exercise">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            Search and save exercises for workout
          </Button> 
        </Link>
        <br />
        <Link to="/workoutdashboard">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            Start workout with the saved exercises
          </Button> 
        </Link>
        <br />
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            View previously completed workouts (Maybe?)
          </Button> 
        <br />
        {/* May switch to another hero image and adjust css positioning accordingly */}
        {/* <img src={HeroBannerImage} alt="workout-sport" className="hero-banner-img" /> */}
        <img src={AnatomyHeroBannerImage} alt="anatomy-sport" className="hero-banner-img" />
      </Box>
    </>
  )
};

export default DashboardHero;