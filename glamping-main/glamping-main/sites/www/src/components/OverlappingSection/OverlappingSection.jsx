import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gitteImg from "../../assets/gitte.jpg";

export default function OverlappingSection({
  header = "Standard Header",
  body = "Standard brødtekst",
  isHome = false, // Billede + Button vises kun hvis true
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#33626C",
        color: "white",
        mt: isHome
          ? { xs: -8, md: -10 } // overlap på Home
          : { xs: -14, md: -16 }, // Overlap med Hero
        borderTopLeftRadius: "50px",
        borderBottomRightRadius: "50px",
        px: { xs: 2, sm: 4 },
        py: 10,
        zIndex: 2,
      }}
    >
      <Stack spacing={0} alignItems="center" textAlign="center">
        {/* Header */}
        <Typography
          variant="h2"
          sx={{ fontFamily: "Zen Loop", fontWeight: 700, mb: 3, px: 2 }}
        >
          {header}
        </Typography>

        {/* Brødtekst */}
        <Typography
          variant="body1"
          sx={{ fontFamily: "Nanum Gothic", maxWidth: 600, mb: isHome ? 6 : 0 }}
        >
          {body}
        </Typography>

        {/* Kun render billede og knap, hvis isHome */}
        {isHome && (
          <>
            <Box
              component="img"
              src={gitteImg}
              alt="Billede af Gitte"
              sx={{
                width: 176,
                height: 176,
                borderRadius: "100px",
                objectFit: "cover",
                mt: 2,
                mb: 4,
              }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#829B97",
                color: "white",
                border: "1px solid transparent",
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                px: 4,
                py: 1.5,
                fontFamily: "Zen Loop",
                fontSize: "40px",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "transparent", // fjern fyld
                  color: "white", // tekst forbliver hvid
                  border: "1px solid white",
                },
              }}
              onClick={() => navigate("/activities")}
            >
              SE VORES OPHOLD
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
