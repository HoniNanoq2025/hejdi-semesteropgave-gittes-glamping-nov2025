import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import ActivityTable from "./ActivityTable";
import ActivityForm from "./ActivityForm";
import { fetchActivities } from "../../../api/fetch";

export default function ActivitiesTab() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchActivities();
      setActivities(data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load activities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (activity) => {
    if (selectedActivity) {
      setActivities((prev) =>
        prev.map((a) => (a._id === activity._id ? activity : a))
      );
    } else {
      setActivities((prev) => [...prev, activity]);
    }
    setSelectedActivity(null);
  };

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((a) => a._id !== id));
    if (selectedActivity?._id === id) {
      setSelectedActivity(null);
    }
  };

  if (loading) {
    return <Typography>Loading activities...</Typography>;
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
        Activities Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: { md: "900px" } }}>
        <ActivityTable
          activities={activities}
          onSelect={setSelectedActivity}
          onDelete={handleDelete}
        />
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} lg={6}>
          <ActivityForm
            mode="create"
            onSave={handleSave}
            disabled={!!selectedActivity}
            onSuccess={loadActivities}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ActivityForm
            mode="update"
            activity={selectedActivity}
            onSave={handleSave}
            onCancel={() => setSelectedActivity(null)}
            onSuccess={loadActivities}
          />
        </Grid>
      </Grid>
    </>
  );
}
