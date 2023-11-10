import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
import { useDeleteSavedExerciseFromListMutation } from "../slices/usersApiSlice";
import { removeSavedExerciseFromList } from "../slices/authSlice";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import Loader from "./Loader";

/**
 * FaveExerciseCard is the child component of FavoriteExercisesList.
 * 
 * FaveExerciseCard is the grandchild component of FaveExercisesDashboard.
 * 
 * @param {Object} props - Props containing exercise, user, and onFilterAndSortChange.
 * @returns {JSX.Element} - A component for that sets the parameters for displaying the exercise card template.
 */

const FaveExerciseCard = ({ exercise, user, onFilterAndSortChange, onRemoveSavedExercise }) => {
  // Get logged-in user information from Redux store
  // Initialize useDispatch to dispatch the save exercise action
  const dispatch = useDispatch();
  const exerciseId = exercise.exerciseId;
  console.log("exerciseId at FaveExerciseCard.jsx: ", exercise.exerciseId);

  // Local state to track and initialize isLoading and visibility of the confirmation dialog state
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  // Use Mutation to interact with MongoDB
  const [deleteExercise] = useDeleteSavedExerciseFromListMutation();

  // Functions to display the confirmation dialog
  const handleConfirmationDialogOpen = () => {
    setIsConfirmationDialogOpen(true);
  };
  const handleConfirmationDialogClose = () => {
    setIsConfirmationDialogOpen(false);
  };

  // Define the function to handle the click event when removing the exercise
  const handleExerciseClick = async () => {
    // Only open the confirmation dialog when the check icon is clicked to remove the exercise
    handleConfirmationDialogOpen();
  };

  const removeExerciseFromSavedExerciseList = async (exerciseId) => {
    setIsLoading(true);
    // Remove the saved exercise from saved favorite exercises list
    try {
      await deleteExercise({ userId: user.id, exerciseId });
      // Dispatch the action to remove the exercise from savedExericseList
      dispatch(removeSavedExerciseFromList({ exerciseId: exerciseId }));
      // Call the callback function to remove the exercise from the local state in parent component
      onRemoveSavedExercise(exerciseId);
      toast.success("Exercise removed successfully from your saved favorite exercises list");
    } catch (err) {
      toast.error(err.error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSort = (value) => {
    onFilterAndSortChange({ target: { value } });
  };

  return (
    <Box className="exercise-card-box">
      <Dialog 
        open={isConfirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove {exercise.name} from your list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              // Close the dialog and execute the removal
              handleConfirmationDialogClose();
              removeExerciseFromSavedExerciseList(exerciseId);
            }} 
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={handleConfirmationDialogClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Typography className="exercise-card-name" sx={{ fontSize: { lg: "24px", xs: "16px" } }}>
            {exercise.name}
      </Typography>
      <Typography variant="body1">
          {exercise.instructions ? exercise.instructions.join(' ') : ''}
        </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Tooltip title={"Sort by target muscle".toUpperCase()} arrow>
          <Button 
            onClick={() => filterAndSort("target")}
            className="exercise-card-category-btn" 
            sx={{ ml: "10px", color: "#fff", background: "#ff2a2a", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}
          >
            {exercise.target}
          </Button>
        </Tooltip>
        <Tooltip title={"Sort by body part".toUpperCase()} arrow>
          <Button 
            onClick={() => filterAndSort("bodyPart")}
            className="exercise-card-category-btn" 
            sx={{ ml: "10px", color: "#fff", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}
          >
            {exercise.bodyPart}
          </Button>
        </Tooltip>
        <Tooltip title={"Sort by equipment".toUpperCase()} arrow>
          <Button 
            onClick={() => filterAndSort("equipment")}
            className="exercise-card-category-btn" 
            sx={{ ml: "10px", mr: "10px", color: "#fff", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}
          >
            {exercise.equipment}
          </Button>
        </Tooltip>
        {user && (
          <Tooltip title={"Click to REMOVE exercise from your saved favorite exercises list".toUpperCase()} arrow>
            <Button onClick={handleExerciseClick} className="exercise-card-check-btn">
              {isLoading ? (<Loader />) : <CheckIcon fontSize="large" />}
            </Button>
          </Tooltip>
        )}
      </Stack>
    </Box>
  )
};

export default FaveExerciseCard;