import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import ActivityCard from "../ActivityCard/ActivityCard";

// Animation variants - containerVariants styrer hele listen
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Forsinkelse på 150ms mellem hvert kort
      delayChildren: 0.1, // Forsinkelse før første kort - starter efter 100ms
    },
  },
};

// Styrer hvert enkelt kort
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30, // Start 30px nede
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
        component={motion.div} // Gør Grid til en motion component
        variants={containerVariants}
        initial="hidden" // Startstate
        animate="show" // Slutstate
        container
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ xs: "center", md: "stretch" }}
        gap="80px"
        sx={{ mt: 2, flexWrap: "wrap" }}
      >
        {activities.map((activity) => (
          <motion.div key={activity._id} variants={itemVariants}>
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </Grid>
    </Box>
  );
}
