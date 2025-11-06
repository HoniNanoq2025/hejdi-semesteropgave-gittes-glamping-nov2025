import { Box, Grid } from "@mui/material";
import ActivityCard from "../ActivityCard/ActivityCard";

export default function ActivityList({ activities }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      sx={{ py: "80px" }}
    >
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ xs: "center", md: "stretch" }}
        gap="80px"
        sx={{ mt: 2, flexWrap: "wrap" }}
      >
        {activities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </Grid>
    </Box>
  );
}
