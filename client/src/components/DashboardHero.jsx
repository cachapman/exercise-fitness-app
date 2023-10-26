import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';
import AnatomyHeroBannerImage from "../assets/icons/anatomy.png";

/**
 * DashboardHero component to display the dashboard's welcome message and options.
 *
 * @returns {JSX.Element} - A child component for the Dashboard's welcome message and options.
 */

const DashboardHero = () => {

  // Get logged-in user information from Redux store
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
          Plan your workout and <br /> 
          let's accomplish your fitness <br /> 
          goal to {userInfo && userInfo.fitnessGoal}!
        </Typography>
        <Typography fontSize="22px" lineHeight="35px">
          Search for any exercise and learn how to safely perform it.
        </Typography>
        <Link to="/exercise">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            Search and save exercises for workout
          </Button> 
        </Link>
        <br />
        <Link to="/savedexercisesdashboard">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            View your saved favorite exercises list
          </Button> 
        </Link>
        <br />
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            Workouts (Future Feature... stay tuned!)
          </Button> 
        <br />
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            View previously completed workouts (Future Feature... stay tuned!)
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