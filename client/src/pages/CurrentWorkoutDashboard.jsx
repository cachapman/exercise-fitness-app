import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { scrollToTop } from "../utilities/scrollUtils";
import SearchAdd from "../assets/icons/search-add.png";
import FaveList from "../assets/icons/favorites-list.png";
import CompletedWorkoutImage from "../assets/icons/workout-calendar.png";
import VerticalLine from "../assets/icons/line.png";

/**
 * Work in progress...
 * 
 * @returns {JSX.Element} - A component for displaying the user's current workout.
 */

const CurrentWorkoutDashboard = () => {
  // Get logged-in user information from Redux store
  const user = useSelector((state) => state.auth.userInfo);

  // Initialize currentPage from the URL
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const currentPageFromURL = searchParams.get("page");
  // const [currentPage, setCurrentPage] = useState(currentPageFromURL ? parseInt(currentPageFromURL) : 1);

  // use the useEffect hook to scroll to the top after rendering
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: "20px", mb: "110px"}}>
      <Box>
        <Typography fontWeight="700" sx={{ fontSize: { lg: "55px", xs: "30px"}}} lineHeight="normal" mb="50px" mt="110px" textAlign="center">
          {user && user.name}'s Favorite Exercises List
        </Typography>
      </Box>
      <Box className="button-group">
        <Link to="/exercise">
          <Tooltip title={"Exercises Dashboard".toUpperCase()} arrow>
            <Button>
              <img src={SearchAdd} alt="exercises dashboard" className="icon" />
            </Button>
          </Tooltip>
        </Link>
        <Button disabled>
            <img src={VerticalLine} alt="line" className="icon" />
        </Button> 
        <Link to="/dashboard">
          <Tooltip title={"Current Favorite Exercises Dashboard".toUpperCase()} arrow>
            <Button>
              <img src={FaveList} alt="workout list" className="icon" />
            </Button> 
          </Tooltip>
        </Link>
        <Button disabled>
          <img src={VerticalLine} alt="line" className="icon" />
        </Button> 
        <Link to="/dashboard">
          <Tooltip title={"Future Feature... stay tuned! Back to Welcome Dashboard".toUpperCase()} arrow>
            <Button>
              <img src={CompletedWorkoutImage} alt="completed workout list" className="icon" />
            </Button>
          </Tooltip>
        </Link>
      </Box>
    </Stack>
  )
};

export default CurrentWorkoutDashboard;