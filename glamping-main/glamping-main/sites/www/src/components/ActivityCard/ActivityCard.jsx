import { motion } from "framer-motion"; // Til animationer (fx hover-effekter)
import { useState } from "react"; // React hook til at håndtere komponentens tilstand
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Pil-ikon til accordion
import FavoriteIcon from "@mui/icons-material/Favorite"; // Hjerte-ikon
import { useLocalStorage } from "@uidotdev/usehooks"; // Hook til at gemme data i browserens localStorage

// Komponent der viser én aktivitet i et Card
export default function ActivityCard({ activity }) {
  // Gemmer favoritlisten i localStorage, så den bliver husket efter genindlæsning
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  // Styrer om "Læs Mere"-sektionen (accordion) er åben
  const [expanded, setExpanded] = useState(false);

  // Tjek om denne aktivitet allerede er blandt favoritter
  const favorite = favorites.includes(activity._id);

  // Funktion til at tilføje eller fjerne aktivitet som favorit
  const toggleFavorite = () => {
    let updated;
    if (favorite) {
      // Fjern fra favoritter
      updated = favorites.filter((id) => id !== activity._id);
    } else {
      // Tilføj til favoritter
      updated = [...favorites, activity._id];
    }
    setFavorites(updated); // Opdater gemte favoritter
  };

  return (
    // motion.div tilføjer en let hover-animation (fra framer-motion)
    <motion.div whileHover={{ scale: 1.02, y: -5 }}>
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
          overflow: "visible", // Tillader elementer at overlappe kortets kanter
        }}
      >
        {/* Header-boks med aktivitetens titel - overlapper billedet */}
        <Box
          sx={{
            position: "relative",
            width: "85%",
            margin: "0 auto",
            backgroundColor: "#C5B496",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            py: 2, // py: 2 = padding-top + padding-bottom: 16px (Lodret padding)
            px: 3, //px: 3 = padding-left + padding-right: 24px (Vandret padding)
            textAlign: "center",
            zIndex: 3, // Ligger foran billedet
            mb: "-50px", // Trækker boksen ned over billedets top
            maxWidth: "320px",
          }}
        >
          {/* Activity Title */}
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

        {/* Billede af aktiviteten */}
        <CardMedia
          component="img"
          width="390px"
          height="311px"
          image={activity.image}
          alt={activity.title}
          sx={{
            position: "relative",
            zIndex: 2, // Billedet ligger under header og infoboks
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
            marginTop: "-40px", // Overlapper billedets bund
            maxWidth: "320px",
            zIndex: 3,
          }}
        >
          {/* Topsektion i boksen med dato/tid og favoritknap */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2, // Margin-bottom: 16px
            }}
          >
            {/* Dato og tid */}
            <Typography
              sx={{
                color: "white",
                fontFamily: "Zen Loop",
                fontSize: "32px",
                mb: 2, // Margin-bottom: 16px
              }}
            >
              {activity.date}
              <br />
              {activity.time}
            </Typography>

            {/* Hjerte-ikon til at gemme som favorit */}
            <IconButton
              onClick={toggleFavorite} // Toggle mellem favorit/ikke-favorit
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
              <FavoriteIcon /> {/* Selve hjerte-ikonet */}
            </IconButton>
          </Box>

          {/* Accordion - viser beskrivelse når man klikker "Læs Mere" */}
          <Accordion
            expanded={expanded} // Styrer om accordion er åben eller lukket
            onChange={() => setExpanded(!expanded)} // Toggle accordion åben/lukket
            sx={{
              backgroundColor: "transparent", // Gennemsigtig baggrund
              boxShadow: "none", // Fjerner default MUI skygge
              "&:before": { display: "none" }, // Fjerner MUI's default border-linje over accordion
            }}
          >
            {/* Headeren man klikker på for at åbne/lukke */}
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
                  // Bevar radius, selv når den åbnes
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

            {/* Indholdet der foldes ud (beskrivelsen) */}
            <AccordionDetails
              sx={{
                border: "none",
                borderTop: "none",
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
    </motion.div>
  );
}
