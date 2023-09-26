import { Button, Stack, Typography } from "@mui/material";
import BodyPartImageIcon from "../assets/icons/bodyPart-target.png";
import TargetImageIcon from "../assets/icons/body-target.png";
import EquipmentImageIcon from "../assets/icons/fitness-equipment.png";

const Detail = ({ exerciseDetailToDisplay }) => {
  const { bodyPart, gifUrl, name, target, secondaryMuscles, equipment, instructions } = exerciseDetailToDisplay;

  const extraExerciseDetailToDisplay = [
    {
      icon: BodyPartImageIcon,
      name: bodyPart,
    },
    {
      icon: TargetImageIcon,
      name: target,
    },
    {
      icon: EquipmentImageIcon,
      name: equipment,
    },
  ];

  return (
    <Stack gap="60px" sx={{flexDirection: { lg: "row" }, p: "20px", alignItems: "center"}}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35", xs: "20px "}}}>
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        <Typography variant="h6">
          is a great exercise for your {bodyPart}. The {name} is an amazing exercise that builds stamina, cardiovascular endurance, muscular endurance, and even strength depending on your intensity with reps and sets performed! Some of the muscles worked include your {secondaryMuscles ? secondaryMuscles.join(', ') : ''} and {target}.
        </Typography>
        <Typography variant="h6">
          Exercise instructions:
          <br />
          {instructions ? instructions.join(' ') : ''}
        </Typography>
        {extraExerciseDetailToDisplay.map((iconList) => (
          <Stack key={iconList.name} direction="row" gap="24px" alignItems="center">
            <Button disabled sx={{ background: "#fff2db", borderRadius: "50%", width: "100px", height: "100px" }}>
              <img src={iconList.icon} alt={bodyPart} style={{ width: "50px", height: "50px" }} />
            </Button>
            <Typography variant="h5" textTransform="capitalize">
              {iconList.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
};

export default Detail;