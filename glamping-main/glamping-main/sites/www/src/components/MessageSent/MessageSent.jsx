import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function MessageSent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, subject } = location.state || {};

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#2A4F57",
        minHeight: "100dvh",
      }}
    >
      <Stack spacing={0} alignItems="center" textAlign="center">
        <Typography
          sx={{ fontFamily: "Zen Loop", fontSize: "32px", color: "white" }}
        >
          Hej {name ? `, ${name}` : ""}
        </Typography>
        <Typography
          sx={{ fontFamily: "Zen Loop", fontSize: "32px", color: "white" }}
        >
          Tak for{" "}
          {subject === "booking" ? "din bookingforespørgsel" : "dit spørgsmål"}!
        </Typography>
        <Typography
          sx={{ fontFamily: "Zen Loop", fontSize: "32px", color: "white" }}
        >
          Du hører fra os snarest.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#829B97",
            textTransform: "none",
            Height: "103px",
            width: "265px",
            fontFamily: "Zen Loop",
            fontSize: "48px",
            color: "white",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            mt: 10,
            zIndex: 3,
            "&:hover": {
              backgroundColor: "#2A4F57",
              color: "white",
              border: "1px solid white",
            },
          }}
          onClick={() => navigate("/")}
        >
          Tilbage
        </Button>
      </Stack>
    </Box>
  );
}
