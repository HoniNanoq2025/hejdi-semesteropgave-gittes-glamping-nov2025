import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import ActivityCard from "../ActivityCard/ActivityCard";

export default function ActivityList({ activities }) {
  const navigate = useNavigate();

  return (
    <Box className="activities" display="flex" flexDirection="column">
      {activities.map((activity) => (
        <ActivityCard key={activity._id} activity={activity} />
      ))}
    </Box>
  );
}
