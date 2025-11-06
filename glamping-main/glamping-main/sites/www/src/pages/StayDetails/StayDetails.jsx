import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStayById } from "../../api/fetch";
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import Hero from "../../components/Hero/Hero";

export default function StayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStayById = async () => {
      try {
        setLoading(true);
        const data = await fetchStayById(id);
        console.log("API response:", data);
        setStay(data.data[0]); // henter første element i arrayet
      } catch (err) {
        console.error("Fejl ved hentning af opholdsdetaljer", err);
        toast.error("Fejl ved hentning af opholdsdetaljer");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getStayById();
    }
  }, [id]);

  // Vis loading mens data hentes
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8, // py: 8 = padding-top + padding-bottom: 64px
        }}
      >
        <CircularProgress size={60} />
        <Typography
          variant="h6"
          sx={{ mt: 2, fontFamily: "Zen Loop", color: "text.secondary" }}
        >
          Henter ophold...
        </Typography>
      </Box>
    );
  }

  // Vis fejlmeddelelse hvis data ikke findes
  if (!stay) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ fontFamily: "Zen Loop" }}>
          Ophold ikke fundet
        </Typography>
      </Box>
    );
  }

  // Vis Hero når data er loaded
  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={stay.image}
        title={stay.title}
        minHeight={{ xs: "80vh", md: "100vh" }}
      />

      <Box
        sx={{
          position: "relative",
          backgroundColor: "#33626C",
          color: "white",
          mt: { xs: -14, md: -16 },
          borderTopLeftRadius: "50px",
          px: { xs: 2, sm: 4 }, //px: 2 = padding-left + padding-right: 16px / 32px
          pt: 10,
          pb: 4,
          zIndex: 2,
        }}
      >
        <Stack
          spacing={0}
          alignItems="center"
          textAlign="center"
          className="stay-stack-one"
        >
          {/* Header */}
          <Typography
            variant="h2"
            className="stay-h2-header"
            sx={{
              fontFamily: "Zen Loop",
              fontSize: "64px",
              fontWeight: 400,
              px: 2,
              mb: 3,
            }}
          >
            {stay.header}
          </Typography>

          {/* Produktbeskrivelse */}
          <Typography
            variant="body3"
            className="stay-description"
            sx={{
              fontFamily: "Nanum Gothic",
              fontSize: "16px",
              maxWidth: 600,
              px: 2,
              mb: 6,
            }}
          >
            {stay.description}
          </Typography>
          <Stack
            spacing={0.5}
            alignItems="center"
            my={6}
            className="stay-stack-two"
          >
            {stay.includes?.map((item, index) => (
              <Typography
                key={index}
                className="stay-includes"
                sx={{
                  fontFamily: "Nanum Gothic",
                  fontSize: "16px",
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>

          {/* Price */}
          <Typography
            className="stay-price"
            variant="h4"
            sx={{
              fontFamily: "Zen Loop",
              fontSize: "32px",
              color: "white",
            }}
          >
            Pris {stay.price},-
          </Typography>

          {/* Book nu Button */}
          <Button
            className="book-button"
            variant="contained"
            onClick={() => navigate("/contact")}
            sx={{
              backgroundColor: "#829B97",
              fontFamily: "Zen Loop",
              fontSize: "48px",
              width: "265px",
              height: "103px",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              textTransform: "none",
              mt: 8,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#2A4F57",
                color: "white",
                border: "1px solid white",
              },
            }}
          >
            Book nu
          </Button>
        </Stack>
      </Box>
    </>
  );
}
