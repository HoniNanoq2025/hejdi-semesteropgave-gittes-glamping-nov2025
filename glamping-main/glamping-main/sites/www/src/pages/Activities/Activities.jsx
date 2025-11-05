import { useState, useEffect } from "react";
import { fetchActivities } from "../../api/fetch";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import Hero from "../../components/Hero/Hero";
import OverlappingSection from "../../components/OverlappingSection/OverlappingSection";
import ActivityList from "../../components/ActivityList/ActivityList";
import heroActivity from "../../assets/image_04.jpg";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        setActivities(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, []);

  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={heroActivity}
        title="Aktiviteter"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />
      <OverlappingSection
        header="Ingen skal kede sig hos Gitte"
        body="Glamping er mere end blot en indkvartering - det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker."
        isHome={false}
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
            Henter aktivitetspakker...
          </Typography>
        </Box>
      ) : (
        <ActivityList activities={activities} />
      )}
    </>
  );
}
