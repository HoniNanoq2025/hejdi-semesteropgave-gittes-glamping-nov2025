import { useState, useEffect } from "react";
import { fetchReviews } from "../../api/fetch";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import bgHome from "../../assets/image_00.jpg";
import logo from "../../assets/logo.png";
import Hero from "../../components/Hero/Hero";
import OverlappingSection from "../../components/OverlappingSection/OverlappingSection";
import ReviewList from "../../components/ReviewList/ReviewList";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews();
        setReviews(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  return (
    <>
      <Hero
        variant="home"
        backgroundImage={bgHome}
        logo={logo}
        titlePart1="Gittes"
        titlePart2="Glamping"
        buttonText="Book Nu"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />
      <OverlappingSection
        header="Kom og prøv glamping hos Gitte!"
        body="Vi er stolte af at byde dig velkommen til Gitte's Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter."
        isHome={true}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
            Henter udtalelser...
          </Typography>
        </Box>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </>
  );
}
