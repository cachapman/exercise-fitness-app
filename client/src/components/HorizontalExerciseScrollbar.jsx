import { useState } from "react";
import { ToggleButton, Typography } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import '@fontsource/roboto/700.css';
import "../index.scss";
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

const HorizontalExerciseScrollbar = ({ setBodyPart }) => {
  const bodyPartList = ["all", "cardio", "chest", "back", "shoulders", "neck", "upper arms", "lower arms", "waist", "upper legs","lower legs"];
  const [selected, setSelected] = useState("all");
  
  const handleSelected = (event, newSelect) => {
    setSelected(newSelect);
  };

  const displayBodyPartList = bodyPartList.map((oneBodyPart, index) => {
    return (
      <ToggleButton 
        className="category-btn"
        key={index}
        id={index}
        name={oneBodyPart}
        value={oneBodyPart}
        sx={{
          background: 
            oneBodyPart === "all" ? `url(${All})` :
            oneBodyPart === "cardio" ? `url(${Cardio})` : 
            oneBodyPart === "chest" ? `url(${Chest})` :
            oneBodyPart === "back" ? `url(${Back})` : 
            oneBodyPart === "shoulders" ? `url(${Shoulders})` :
            oneBodyPart === "neck" ? `url(${Neck})` :
            oneBodyPart === "upper arms" ? `url(${UpperArms})` :
            oneBodyPart === "lower arms" ? `url(${LowerArms})` :
            oneBodyPart === "waist" ? `url(${Waist})` :
            oneBodyPart === "upper legs" ? `url(${UpperLegs})` :
            oneBodyPart === "lower legs" ? `url(${LowerLegs})` : ''
        }}
  
        onClick={() => {
          setBodyPart(oneBodyPart);
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
      value={selected}
      onChange={handleSelected}
    >
      {displayBodyPartList}
    </ScrollMenu>
  )
};

export default HorizontalExerciseScrollbar;