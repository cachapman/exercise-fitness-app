import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import HeroBannerImage from "../assets/icons/sport.png";

const DashboardHero = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Box 
        sx={{
          mt: { lg: "212px", sx: "70px"},
          ml: { sm: "50px"},
        }}
        position="relative"
        px="20px"
        marginTop="90px"
      >
        <Typography color="#ff2625" fontWeight="600" fontSize="26px">
          Welcome {userInfo && userInfo.name} to your Dashboard!
        </Typography>
        <Typography fontWeight="700" sx={{ fontSize: { lg: "44px", xs: "40px"}}}>
          Plan your workouts and <br /> track your daily progress!
        </Typography>
        <Typography fontSize="22px" lineHeight="35px">
          Research and learn how to safely perform the exercises.
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}} href="#workoutplanner">Plan and Track your workouts</Button> 
        <br />
        <Link to="/exercise">
          <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}}>
            Search and Learn New Exercises
          </Button> 
        </Link>
        <br />
        <img src={HeroBannerImage} alt="workout-sport" className="hero-banner-img" />
      </Box>
    </>
  )
};

export default DashboardHero;