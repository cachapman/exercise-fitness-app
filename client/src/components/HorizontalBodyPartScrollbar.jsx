import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { selectBodyPart, setReduxBodyPart } from "../slices/exerciseSlice";

// Import the body part GIF images
import All from "../assets/gifs/all-workout.gif";
import Cardio from "../assets/gifs/cardio.gif";
import Chest from "../assets/gifs/chestpress.gif";
import Back from "../assets/gifs/pullup.gif";
import Shoulders from "../assets/gifs/shoulderpress.gif";
import Neck from "../assets/gifs/neck.gif";
import UpperArms from "../assets/gifs/curl.gif";
import LowerArms from "../assets/gifs/doubleDB.gif";
import Waist from "../assets/gifs/crunch.gif";
import UpperLegs from "../assets/gifs/deadlift.gif";
import LowerLegs from "../assets/gifs/jumprope.gif";

/**
 * HorizontalExerciseScrollbar is the child component of ExercisesDashboard that displays horizontal bodyPart scroll bar.
 *
 * @param {Object} props - Props containing setCurrentPage and onSelectBodyPart.
 *    - setCurrentPage: Function to set the current page.
 *    - onSelectBodyPart: Function to handle the body part selection change.
 * @returns {JSX.Element} - A component for displaying the input for bodyPart search options.
 */

const HorizontalBodyPartScrollbar = ({ setCurrentPage, onSelectBodyPart }) => {
  // Redux setup
  const dispatch =  useDispatch();
  const bodyPart = useSelector(selectBodyPart);

  // List of body parts to display in the scroll menu.
  const bodyPartListImages = {
    "all": `url(${All})`,
    "cardio": `url(${Cardio})`, 
    "chest": `url(${Chest})`,
    "back": `url(${Back})`, 
    "shoulders": `url(${Shoulders})`,
    "neck": `url(${Neck})`,
    "upper arms": `url(${UpperArms})`,
    "lower arms": `url(${LowerArms})`,
    "waist": `url(${Waist})`,
    "upper legs": `url(${UpperLegs})`,
    "lower legs": `url(${LowerLegs})`,
  };
  
  // Function to handle selection of a body part.
  const handleSelected = (event, newSelect) => {
    // Dispatch an action to update the bodyPart in the Redux store.
    dispatch(setReduxBodyPart(newSelect));
    // Callback to notify parent component ExercisesDashboard
    onSelectBodyPart(newSelect);
    // Reset the current page.
    setCurrentPage(1);
  };

  // Generate and render GIF image buttons for each body part.
  const displayBodyPartList = Object.keys(bodyPartListImages).map((oneBodyPart, index) => {
    return (
      <ToggleButton 
        className="category-btn"
        key={index}
        id={index}
        name={oneBodyPart}
        value={oneBodyPart}
        sx={{
          background: bodyPartListImages[oneBodyPart] || '',
          // Add active styling for the selected body part
          "&.Mui-selected": {
            borderColor: "#ff2625",
            borderWidth: "4px",
          },
        }}
  
        onClick={() => {
          // Set the selected body part and reset the current page.
          handleSelected(null, oneBodyPart);
          setCurrentPage(1);
        }}
      >
        <Typography fontSize="26px" fontWeight="700" color="#FFF" textTransform="uppercase" align="center">
          {oneBodyPart}
        </Typography>
      </ToggleButton>
    )
  });

  return (
    <ScrollMenu 
      value={bodyPart}
    >
      {displayBodyPartList}
    </ScrollMenu>
  )
};

export default HorizontalBodyPartScrollbar;