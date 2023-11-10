import { Box } from "@mui/material";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import ExerciseTemplateCard from "./ExerciseTemplateCard";

/**
 * HorizontalScrollbar is the child component of MoreExercises to display a horizontal scrollbar of exercise cards.
 * 
 * @param {Array} - An array of exercise data from MoreExercises to be displayed in the horizontal scrollbar.
 * @returns {JSX.Element} - A component displaying exercise cards in a horizontal scrollbar.
 */

const HorizontalScrollbar = ({ exerciseIds }) => {
  return (
    <ScrollMenu>
      {exerciseIds.map((exerciseId) => (
          <Box 
            key={exerciseId}
            more={exerciseId}
            title={exerciseId}
            m="0 30px"
            pt="15px"
          >
            <ExerciseTemplateCard exerciseId={exerciseId} />
          </Box>
        )
      )}
    </ScrollMenu>
  )
};

export default HorizontalScrollbar;