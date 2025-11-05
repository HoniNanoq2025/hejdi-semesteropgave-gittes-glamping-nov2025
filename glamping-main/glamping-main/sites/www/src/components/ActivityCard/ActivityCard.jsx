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

export default function ActivityCard({ activity }) {
  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: 390,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#CED3CD",
        border: "none",
        boxShadow: "none",
        overflow: "visible", //Vigtig til overlapping effekt
      }}
    >
      {/* Header Box - overlapper billede */}
      <Box
        sx={{
          position: "relative",
          width: "85%",
          margin: "0 auto",
          backgroundColor: "#C5B496",
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          py: 2,
          px: 3,
          textAlign: "center",
          zIndex: 3,
          marginBottom: "-45px",
          maxWidth: "320px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Zen Loop",
            fontSize: "64px",
            fontWeight: 400,
            color: "white",
          }}
        >
          {activity.title}
        </Typography>
      </Box>

      {/* Billede */}
      <CardMedia
        component="img"
        width="390px"
        height="auto"
        image={activity.image}
        alt={activity.title}
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Info Box med Accordion - overlapper også billede */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#33626C",
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          pt: 3,
          pb: 3,
          px: 3,
          marginTop: "-30px",
          maxWidth: "320px",
          zIndex: 3,
        }}
      >
        {/* Box med Favorite Icon og Tid Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/* Tid info */}
          <Typography
            sx={{
              color: "white",
              fontFamily: "Zen Loop",
              fontSize: "32px",
              mb: 2,
            }}
          >
            {activity.date}
            <br />
            {activity.time}
          </Typography>

          {/* Favorite Icon */}
          <IconButton
            onClick={() => setFavorite(!favorite)} // Toggle mellem favorit/ikke-favorit
            sx={{
              color: favorite ? "white" : "#ffffff2e", // Ternary operator: Skift farve baseret på favorit-status
              width: "45px",
              height: "40px",
              backgroundColor: "#ffffff2e",
              borderTopRightRadius: 0,
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: "10px",
              padding: 0, // Fjerner default padding så ikonet flugter med teksten
              transition: "color 0.3s ease, background-color 0.3s ease", // Gør det glidende
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        {/* Accordion */}
        <Accordion
          expanded={expanded} // Styrer om accordion er åben eller lukket
          onChange={() => setExpanded(!expanded)} // Toggle accordion åben/lukket
          sx={{
            backgroundColor: "transparent", // Gennemsigtig baggrund
            boxShadow: "none", // Fjerner default MUI skygge
            "&:before": { display: "none" }, // Fjerner MUI's default border-linje over accordion
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "white", fontSize: "40px" }} /> // Pil-ikon der roterer ved åbning
            }
            sx={{
              border: "1px solid white",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              color: "white",
              minHeight: "56px",
              display: "flex",
              alignItems: "center", // Centrerer indhold vertikalt
              justifyContent: "center", // Centrerer indhold horisontalt
              // Styling når accordion er åben (expanded)
              "&.Mui-expanded": {
                minHeight: "56px",
                borderBottomLeftRadius: expanded ? 0 : 0, // Fjerner nederste venstre radius når åben
                borderBottomRightRadius: expanded ? "50px" : "50px", // Beholder nederste højre radius
              },
              // Target tekst-indholdet i accordion header
              "& .MuiAccordionSummary-content": {
                margin: "0", // Fjerner default margin
                justifyContent: "center", // Centrerer "Læs Mere" teksten
                flexGrow: 0, // Forhindrer teksten i at fylde hele bredden
              },
              // Target expand-ikonet (pilen)
              "&.MuiAccordionSummary-expandIconWrapper": {
                position: "absolute", // Absolut positionering for at placere pilen manuelt
                right: "65px", // Afstand fra højre kant
                top: "50%", // Centrerer vertikalt
                transform: "translateY(-45%)", // Justerer præcis vertikal centrering
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Zen Loop",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              Læs Mere
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: "none",
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
                fontSize: "20px",
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
