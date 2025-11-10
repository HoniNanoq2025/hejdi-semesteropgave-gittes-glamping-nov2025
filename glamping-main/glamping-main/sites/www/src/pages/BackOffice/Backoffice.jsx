import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import ActivitiesTab from "./Activities/ActivitiesTab";
import StaysTab from "./Stays/StaysTab";
import ReviewsTab from "./Reviews/ReviewsTab";
import ContactsTab from "./Contacts/ContactsTab";

export default function Backoffice() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: { xs: 2, md: 4 },
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Tab
          label="Activities"
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        />
        <Tab label="Stays" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} />
        <Tab
          label="Reviews"
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        />
        <Tab
          label="Contacts"
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        />
      </Tabs>

      {tabIndex === 0 && <ActivitiesTab />}
      {tabIndex === 1 && <StaysTab />}
      {tabIndex === 2 && <ReviewsTab />}
      {tabIndex === 3 && <ContactsTab />}
    </Box>
  );
}
