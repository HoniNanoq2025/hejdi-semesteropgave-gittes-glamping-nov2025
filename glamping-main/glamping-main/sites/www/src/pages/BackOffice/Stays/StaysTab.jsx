import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import StayTable from "./StayTable";
import StayForm from "./StayForm";
import { fetchStays } from "../../../api/fetch";

export default function StaysTab() {
  const [stays, setStays] = useState([]);
  const [selectedStay, setSelectedStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStays();
  }, []);

  const loadStays = async () => {
    try {
      setLoading(true);
      const data = await fetchStays();
      setStays(data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load stays");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (stay) => {
    if (selectedStay) {
      setStays((prev) => prev.map((s) => (s._id === stay._id ? stay : s)));
    } else {
      setStays((prev) => [...prev, stay]);
    }
    setSelectedStay(null);
  };

  const handleDelete = (id) => {
    setStays((prev) => prev.filter((s) => s._id !== id));
    if (selectedStay?._id === id) {
      setSelectedStay(null);
    }
  };

  if (loading) {
    return <Typography>Loading stays...</Typography>;
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
        Stays Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: { md: "900px" } }}>
        <StayTable
          stays={stays}
          onSelect={setSelectedStay}
          onDelete={handleDelete}
        />
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} lg={6}>
          <StayForm
            mode="create"
            onSave={handleSave}
            disabled={!!selectedStay}
            onSuccess={loadStays}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <StayForm
            mode="update"
            stay={selectedStay}
            onSave={handleSave}
            onCancel={() => setSelectedStay(null)}
            onSuccess={loadStays}
          />
        </Grid>
      </Grid>
    </>
  );
}
