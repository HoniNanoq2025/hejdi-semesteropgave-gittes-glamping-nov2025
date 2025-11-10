import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import ReviewTable from "./ReviewTable";
import ReviewForm from "./ReviewForm";
import { fetchReviews } from "../../../api/fetch";

export default function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await fetchReviews();
      setReviews(data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (review) => {
    if (selectedReview) {
      setReviews((prev) =>
        prev.map((r) => (r._id === review._id ? review : r))
      );
    } else {
      setReviews((prev) => [...prev, review]);
    }
    setSelectedReview(null);
  };

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r._id !== id));
    if (selectedReview?._id === id) {
      setSelectedReview(null);
    }
  };

  if (loading) {
    return <Typography>Loading reviews...</Typography>;
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          color: "black",
        }}
      >
        Reviews Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: { md: "900px" } }}>
        <ReviewTable
          reviews={reviews}
          onSelect={setSelectedReview}
          onDelete={handleDelete}
        />
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} lg={6}>
          <ReviewForm
            mode="create"
            onSave={handleSave}
            disabled={!!selectedReview}
            onSuccess={loadReviews}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ReviewForm
            mode="update"
            review={selectedReview}
            onSave={handleSave}
            onCancel={() => setSelectedReview(null)}
            onSuccess={loadReviews}
          />
        </Grid>
      </Grid>
    </>
  );
}
