import { useState, useEffect } from "react";
import { Typography, Alert, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ActivityTable from "./ActivityTable";
import ActivityForm from "./ActivityForm";
import { fetchActivities } from "../../../api/fetch";

// Komponent til at vise og administrere aktiviteter
export default function ActivitiesTab() {
  // State til at gemme liste over aktiviteter
  const [activities, setActivities] = useState([]);
  // State til at gemme den valgte aktivitet (til redigering)
  const [selectedActivity, setSelectedActivity] = useState(null);
  // State til at vise loading-status
  const [loading, setLoading] = useState(true);
  // State til fejlbeskeder
  const [error, setError] = useState(null);

  // Hent aktiviteter, når komponenten loades
  useEffect(() => {
    loadActivities();
  }, []);

  // Funktion til at hente aktiviteter fra API’et
  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchActivities(); // kalder API’et
      setActivities(data.data || []); // gem aktiviteter i state
      setError(null);
    } catch (err) {
      setError("Failed to load activities"); // vis fejl, hvis hentning fejler
      console.error(err);
    } finally {
      setLoading(false); // stop loading uanset hvad
    }
  };

  // Funktion til at gemme eller opdatere aktivitet
  const handleSave = (activity) => {
    if (selectedActivity) {
      // Opdater eksisterende aktivitet
      setActivities((prev) =>
        prev.map((a) => (a._id === activity._id ? activity : a))
      );
      /**
       * prev er den tidligere state (dvs. det gamle activities-array).
       * For hver aktivitet a i det gamle array:
       * Tjekker vi: a._id === activity._id
       * Hvis ja → vi erstatter den gamle aktivitet med den nye activity.
       * Hvis nej → vi beholder den gamle aktivitet (a).
       */
    } else {
      // Tilføj ny aktivitet
      setActivities((prev) => [...prev, activity]);
      /**
       * [...prev, activity]
       * ...prev = spread operator:
       * Den “kopierer” alle elementerne fra det gamle array ind i et nyt array.
       * activity = den nye aktivitet, vi vil tilføje.
       * Resultatet: et nyt array, hvor den nye aktivitet er tilføjet til slutningen.  */
    }
    setSelectedActivity(null); // ryd markeret/redigeret aktivitet efter gem
  };

  // Funktion til at slette aktivitet
  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((a) => a._id !== id));
    if (selectedActivity?._id === id) {
      setSelectedActivity(null);
    }
    /**
     * prev = den nuværende liste af aktiviteter.
     * .filter() = laver et nyt array med alle elementer, der opfylder en betingelse.
     * (a) => a._id !== id → vi beholder kun aktiviteter, hvor _id ikke matcher det id, vi vil slette.
     * Resultat: den aktivitet med det valgte _id bliver fjernet, og React opdaterer state korrekt.   */
  };

  // Vis "loading..." tekst, mens data hentes
  if (loading) {
    return <Typography>Loading activities...</Typography>;
  }

  return (
    <>
      {/* Overskrift */}
      <Typography
        variant="h5"
        className="activity-tab-header"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          color: "black",
        }}
      >
        Activities Management
      </Typography>
      {/* Fejlbesked hvis hentning fejler */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tabel med eksisterende aktiviteter */}
      <Box maxWidth="900px" sx={{ mb: { xs: 3, md: 4 } }}>
        <ActivityTable
          activities={activities}
          onSelect={setSelectedActivity} // vælg aktivitet til redigering
          onDelete={handleDelete} // slet aktivitet
        />
      </Box>

      {/* To kolonner med formularer (lav ny + rediger eksisterende) */}
      <Box
        className="activity-grid-container"
        sx={{
          maxWidth: { md: "900px", lg: "1100px", xl: "1400px" }, // begræns bredde på desktop
          px: { xs: 2, md: 0 }, // lille padding på mobil
        }}
      >
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Formular til at oprette ny aktivitet */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <ActivityForm
              mode="create"
              onSave={handleSave}
              disabled={!!selectedActivity} // deaktiver, hvis der redigeres
              onSuccess={loadActivities} // genindlæs ved succes
            />
          </Grid>

          {/* Formular til at redigere valgt aktivitet */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <ActivityForm
              mode="update"
              activity={selectedActivity}
              onSave={handleSave}
              onCancel={() => setSelectedActivity(null)} // annullér redigering
              onSuccess={loadActivities}
            />
          </Grid>
        </Grid>
      </Box>

      {/**
       * Kort fortalt:
       * useEffect henter aktiviteter fra serveren ved start.
       * ActivityTable viser dem i en tabel.
       * ActivityForm bruges til at oprette eller redigere aktiviteter.
       * handleSave, handleDelete, og loadActivities styrer datahåndteringen.
       */}
    </>
  );
}
