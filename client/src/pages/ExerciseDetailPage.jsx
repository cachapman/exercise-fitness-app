import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectExercises } from "../slices/exerciseSlice";
import { scrollToTop } from "../utilities/scrollUtils";
import { Box, Button } from "@mui/material";
import Detail from "../components/Detail";
import MoreExercises from "../components/MoreExercises";
/**
 * ExerciseDetailPage is the parent component of Detail and MoreExercises.
 *
 * @returns {JSX.Element} - A component for displaying exercise details and instructions.
 */

const ExerciseDetailPage = () => {
  // Extract exercise ID from the URL
  const { id } = useParams();
  // Initialize currentPage from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page, 10) : 1;
  const navigate = useNavigate();

  // Select exercise details directly from the Redux store data
  const user = useSelector((state) => state.auth.userInfo);
  const exercises = useSelector(selectExercises);

  // Find the exercise to display based on the 'id' params
  const exerciseDetailToDisplay = exercises[id];

  // Use navigate to go back to the previous page (ExercisesDashboard.jsx)
  const goBackToResults = () => {
    navigate(`/exercise?page=${currentPage}`);
  };
  
  // use the useEffect hook to scroll to the top after rendering
  useEffect(() => {
    scrollToTop();
  }, []);

  if (!exerciseDetailToDisplay) return <div>Loading... No Exercise Data to Display, please try search again.</div>

  return (
    <Box paddingTop="50px">
      {/* Children components */}
      {user && <Detail exerciseDetailToDisplay={exerciseDetailToDisplay} user={user} />}
      <MoreExercises />
      <Box 
        sx={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          paddingTop: "20px",
          paddingBottom: "110px",
        }}
      >
        <Button variant="contained" color="error" sx={{ mt: "10px", padding: "15px"}} onClick={goBackToResults}>
          Back to Previous Search Results 
        </Button>
      </Box>
    </Box>
  )
};

export default ExerciseDetailPage;