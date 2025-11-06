import { Box, Grid } from "@mui/material";
import StaysCard from "../StaysCard/StaysCard";

export default function StaysList({ stays }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      sx={{ py: 10 }}
    >
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ xs: "center", md: "stretch" }}
        gap={10}
        sx={{ mt: 2, flexWrap: "wrap" }}
      >
        {stays.map((stay) => (
          <StaysCard key={stay._id} stay={stay} />
        ))}
      </Grid>
    </Box>
  );
}
