import { useState } from "react";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ActivityCard({
  activity,
  title,
  image,
  time,
  description,
}) {
  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: 345,
        backgroundColor: "#CED3CD",
        borderRadius: "20px",
        overflow: "visible", //Vigtig til overlapping effekt
      }}
    >
      {/* Billede */}
      <CardMedia
        component="img"
        height="280"
        image={activity.image}
        alt={activity.title}
        sx={{
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      />

      {/* Header Box - overlapper billede */}
      <Box
        sx={{
          position: "absolute",
          top: "220px", // JUSTÈR HER
          left: "50%",
          transform: "translateX(-50%)",
          width: "85%",
          backgroundColor: "#C5B496",
          borderRadius: "35px",
          py: 2,
          px: 3,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Zen Loop",
            fontSize: "40px",
            fontWeight: 400,
            color: "white",
          }}
        >
          {activity.title}
        </Typography>
      </Box>

      {/* Info Box med Accordion - overlapper også billede */}
      <Box
        sx={{
          position: "relative",
          mt: "60px",
          backgroundColor: "#33626C",
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          pt: 5,
          pb: 2,
          px: 2,
        }}
      >
        {/* Favorite Icon */}
        <IconButton
          onClick={() => setFavorite(!favorite)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
          }}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        {/* Tid info */}
        <Typography
          sx={{
            color: "white",
            fontFamily: "Zen Loop",
            fontSize: "32px",
            mb: 2,
          }}
        >
          {activity.time}
        </Typography>

        {/* Accordion */}
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:before": { display: none },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            sx={{
              border: "2px solid white",
              borderRadius: "25px",
              color: "white",
              minHeight: "56px",
              "&.Mui-expanded": {
                minHeight: "56px",
                borderBottomLeftRadius: expanded ? 0 : 0,
                borderBottomRightRadius: expanded ? 0 : "50px",
              },
              "&.MuiAccordionSummary-content": {
                margin: "12px 0",
                justifyContent: "center",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Zen Loop",
                fontSize: "24px",
              }}
            >
              Læs Mere
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: "2px solid white",
              borderTop: "none",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: "50px",
              color: "white",
              pt: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Zen Loop",
              }}
            >
              {activity.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Card>
  );
}
