import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import ReviewTable from "./ReviewTable";
import ReviewForm from "./ReviewForm";
import { fetchReviews } from "../../../api/fetch";

// Komponent til at vise og administrere reviews
export default function ReviewsTab() {
  // State til at gemme liste over reviews
  const [reviews, setReviews] = useState([]);
  // State til at gemme det valgte review (til redigering)
  const [selectedReview, setSelectedReview] = useState(null);
  // State til at vise loading-status
  const [loading, setLoading] = useState(true);
  // State til fejlbeskeder
  const [error, setError] = useState(null);

  // Hent reviews, når komponenten loades
  useEffect(() => {
    loadReviews();
  }, []);

  // Funktion til at hente reviews fra API’et
  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await fetchReviews(); // kalder API’et
      setReviews(data.data || []); // gem reviews i state
      setError(null);
    } catch (err) {
      setError("Failed to load reviews"); // vis fejl, hvis hentning fejler
      console.error(err);
    } finally {
      setLoading(false); // stop loading uanset hvad
    }
  };

  // Funktion til at gemme eller opdatere reviews
  const handleSave = (review) => {
    if (selectedReview) {
      // Opdater eksisterende reviews
      setReviews((prev) =>
        prev.map((r) => (r._id === review._id ? review : r))
      );
    } else {
      // Tilføj nyt review
      setReviews((prev) => [...prev, review]);
    }
    setSelectedReview(null); // ryd markeret/redigeret review efter gem
  };

  // Funktion til at slette review
  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r._id !== id));
    if (selectedReview?._id === id) {
      setSelectedReview(null);
    }
  };

  // Vis "loading..." tekst, mens data hentes
  if (loading) {
    return <Typography>Henter reviews...</Typography>;
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
        Reviews Håndtering
      </Typography>
      {/* Fejlbesked hvis hentning fejler */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tabel med eksisterende reviews */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <ReviewTable
          reviews={reviews}
          onSelect={setSelectedReview} // vælg review til redigering
          onDelete={handleDelete} // slet review
        />
      </Box>

      {/* To kolonner med formularer (lav ny + rediger eksisterende) */}
      <Box
        sx={{
          maxWidth: { md: "900px", lg: "1100px", xl: "1400px" }, // begræns bredde på desktop
          px: { xs: 2, md: 0 }, // lille padding på mobil
        }}
      >
        {/* Formular til at oprette nyt review */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <ReviewForm
              mode="create"
              onSave={handleSave}
              disabled={!!selectedReview} // deaktiver, hvis der redigeres
              onSuccess={loadReviews} // genindlæs ved succes
            />
          </Grid>

          {/* Formular til at redigere valgt review */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <ReviewForm
              mode="update"
              review={selectedReview}
              onSave={handleSave}
              onCancel={() => setSelectedReview(null)} // annullér redigering
              onSuccess={loadReviews}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
