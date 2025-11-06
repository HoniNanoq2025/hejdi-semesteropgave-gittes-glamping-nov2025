import { useNavigate } from "react-router-dom";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";

export default function StaysCard({ stay }) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/stay/${stay._id}`);
  };

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: 390,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      {/* Header Box - overlap med billede */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "80%",
          margin: "0 auto",
          backgroundColor: "#C5B496",
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          py: 2,
          px: 3,
          textAlign: "center",
          zIndex: 3,
          mb: "-80px",
          maxWidth: { xs: "320px", md: "390px" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Zen Loop",
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: 1,
            color: "white",
            width: "320px",
          }}
        >
          {stay.title}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Zen Loop",
            fontSize: "36px",
            fontWeight: 400,
            lineHeight: 1,
            color: "white",
          }}
        >
          {stay.numberOfPersons} personer
          <br />
          fra {stay.price},-
        </Typography>
      </Box>

      {/* Billede */}
      <CardMedia
        component="img"
        width="390px"
        height="311px"
        image={stay.image}
        alt={stay.title}
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      />

      <Button
        variant="contained"
        onClick={handleReadMore}
        sx={{
          backgroundColor: "#829B97",
          Height: "103px",
          width: "265px",
          fontFamily: "Zen Loop",
          fontSize: "48px",
          color: "white",
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          marginTop: "-45px",
          zIndex: 3,
        }}
      >
        Læs mere
      </Button>
    </Card>
  );
}
