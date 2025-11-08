import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function Unauthorized() {
  const navigate = useNavigate();

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
          variant="h2"
          sx={{
            fontFamily: "Zen Loop",
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: 1,
            color: "white",
            mb: 2,
          }}
        >
          Adgang nægtet!
        </Typography>
        <Typography
          variant="body3"
          className="contact-text"
          sx={{
            fontFamily: "Nanum Gothic",
            fontSize: "16px",
            color: "white",
            mb: 4,
          }}
        >
          Du har ikke tilladelse til at se denne side
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
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
            "&:hover": {
              backgroundColor: "#2A4F57",
              color: "white",
              border: "1px solid white",
            },
          }}
        >
          Tilbage
        </Button>
      </Stack>
    </Box>
  );
}
