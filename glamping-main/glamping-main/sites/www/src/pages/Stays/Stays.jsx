import { useState, useEffect } from "react";
import { fetchStays } from "../../api/fetch";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import StaysList from "../../components/StaysList/StaysList";
import Hero from "../../components/Hero/Hero";
import OverlappingSection from "../../components/OverlappingSection/OverlappingSection";
import heroStays from "../../assets/image_01.jpg";

export default function Stays() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStays = async () => {
      try {
        setLoading(true);
        const data = await fetchStays();
        setStays(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStays();
  }, []);

  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={heroStays}
        title="Vores Ophold"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />
      <OverlappingSection
        header="Vi har ophold til enhver smag"
        body="Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning. Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade batterierne i en naturskøn indstilling.
        Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri. Vi ser frem tid at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed."
        isHome={false}
      />

      {loading ? (
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
      ) : (
        <StaysList stays={stays} />
      )}
    </>
  );
}
