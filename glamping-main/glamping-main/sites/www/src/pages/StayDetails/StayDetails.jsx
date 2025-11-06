import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchStayById } from "../../api/fetch";
import { Box, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Hero from "../../components/Hero/Hero";

export default function StayDetails() {
  const { id } = useParams();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStayById = async () => {
      try {
        setLoading(true);
        const data = await fetchStayById(id);
        /* console.log("API response:", data); */
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
        <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
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
    </>
  );
}
