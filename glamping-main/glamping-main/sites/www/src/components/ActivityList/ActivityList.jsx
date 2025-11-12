import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import ActivityCard from "../ActivityCard/ActivityCard";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Forsinkelse mellem hvert kort
      delayChildren: 0.1, // Forsinkelse før første kort
    },
  },
};

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
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="show"
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
