import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import logo from "../../assets/logo.png";

import { Box, Typography, IconButton } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2a4f57",
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Social media icons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 93,
          color: "white",
          gap: 2,
          mb: 2.5,
        }}
      >
        <IconButton
          component="a"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white",
            fontSize: "inherit",
            "&:hover": {
              color: "#c5b496",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <AiFillFacebook />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white",
            fontSize: "inherit",
            "&:hover": {
              color: "#c5b496",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <AiFillInstagram />
        </IconButton>
      </Box>

      {/* Logo + text */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2.75,
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src={logo}
            alt="Gittes Glamping"
            sx={{
              height: 52,
              width: "auto",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Link>

        <Typography
          sx={{
            fontFamily: '"Zen Loop", sans-serif',
            fontSize: 40,
            color: "white",
          }}
        >
          Gittes Glamping
        </Typography>
      </Box>
    </Box>
  );
}
