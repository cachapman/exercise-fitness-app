import { Button, Stack, Typography } from "@mui/material";
import BodyPartImageIcon from "../assets/icons/anatomy.png";
import TargetImageIcon from "../assets/icons/body-target2.png";
import EquipmentImageIcon from "../assets/icons/fitness-equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraExerciseDetail = [
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
          is a great exercise using the {equipment} to strengthen your {bodyPart}! Some of the muscles worked include your {target}. The {name} is an amazing exercise that builds stamina, cardiovascular endurance, muscular endurance, and even strength depending on your intensity with reps and sets performed!
        </Typography>
        {extraExerciseDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button disabled sx={{ background: "#fff2db", borderRadius: "50%", width: "100px", height: "100px" }}>
              <img src={item.icon} alt={bodyPart} style={{ width: "50px", height: "50px" }} />
            </Button>
            <Typography variant="h5" textTransform="capitalize">
              {item.name}
            </Typography>
          </Stack>
        ))}
        <Button sx={{ ml: "21px", color: "#000000", background: "#ffc3c3", fontSize: "20px", borderRadius: "20px", textTransform: "capitalize"}}>
          Add to Favorites
        </Button>
      </Stack>
    </Stack>
  )
};

export default Detail;