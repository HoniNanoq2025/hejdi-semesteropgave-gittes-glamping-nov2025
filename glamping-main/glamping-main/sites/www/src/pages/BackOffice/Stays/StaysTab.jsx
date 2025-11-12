import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import StayTable from "./StayTable";
import StayForm from "./StayForm";
import { fetchStays } from "../../../api/fetch";

// Komponent til at vise og administrere ophold
export default function StaysTab() {
  // State til at gemme liste over ophold
  const [stays, setStays] = useState([]);
  // State til at gemme den valgte bruger (til redigering)
  const [selectedStay, setSelectedStay] = useState(null);
  // State til at vise loading-status
  const [loading, setLoading] = useState(true);
  // State til fejlbeskeder
  const [error, setError] = useState(null);

  // Hent ophold, når komponenten loades
  useEffect(() => {
    loadStays();
  }, []);

  // Funktion til at hente ophold fra API’et
  const loadStays = async () => {
    try {
      setLoading(true);
      const data = await fetchStays(); // kalder API’et
      setStays(data.data || []); // gem ophold i state
      setError(null);
    } catch (err) {
      setError("Failed to load stays"); // vis fejl, hvis hentning fejler
      console.error(err);
    } finally {
      setLoading(false); // stop loading uanset hvad
    }
  };

  // Funktion til at gemme eller opdatere ophold
  const handleSave = (stay) => {
    if (selectedStay) {
      // Opdater eksisterende ophold
      setStays((prev) => prev.map((s) => (s._id === stay._id ? stay : s)));
    } else {
      // Tilføj nyt ophold
      setStays((prev) => [...prev, stay]);
    }
    setSelectedStay(null); // ryd markeret/redigeret ophold efter gem
  };

  // Funktion til at slette ophold
  const handleDelete = (id) => {
    setStays((prev) => prev.filter((s) => s._id !== id));
    if (selectedStay?._id === id) {
      setSelectedStay(null);
    }
  };

  // Vis "loading..." tekst, mens data hentes
  if (loading) {
    return <Typography>Henter ophold...</Typography>;
  }

  return (
    <>
      {/* Overskrift */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          color: "black",
        }}
      >
        Opholdshåndtering
      </Typography>
      {/* Fejlbesked hvis hentning fejler */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tabel med eksisterende ophold */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <StayTable
          stays={stays}
          onSelect={setSelectedStay} // vælg ophold til redigering
          onDelete={handleDelete} // slet ophold
        />
      </Box>

      {/* To kolonner med formularer (lav ny + rediger eksisterende) */}
      <Box
        sx={{
          maxWidth: { md: "900px", lg: "1100px", xl: "1400px" }, // begræns bredde på desktop
          px: { xs: 2, md: 0 }, // lille padding på mobil
        }}
      >
        {/* Formular til at oprette nyt ophold */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <StayForm
              mode="create"
              onSave={handleSave}
              disabled={!!selectedStay} // deaktiver, hvis der redigeres
              onSuccess={loadStays} // genindlæs ved succes
            />
          </Grid>

          {/* Formular til at redigere valgt ophold */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <StayForm
              mode="update"
              stay={selectedStay}
              onSave={handleSave}
              onCancel={() => setSelectedStay(null)} // annullér redigering
              onSuccess={loadStays}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
