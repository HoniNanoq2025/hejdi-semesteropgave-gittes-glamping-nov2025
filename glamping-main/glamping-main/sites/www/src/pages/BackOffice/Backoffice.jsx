import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Link, Typography, Button } from "@mui/material";
import ActivitiesTab from "./Activities/ActivitiesTab";
import StaysTab from "./Stays/StaysTab";
import ReviewsTab from "./Reviews/ReviewsTab";
import ContactsTab from "./Contacts/ContactsTab";
import UsersTab from "./Users/UsersTab";

export default function Backoffice() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

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
          mb: { xs: 2, md: 1 },
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Tab
          label="Activities"
          sx={{
            fontSize: {
              xs: "0.875rem",
              md: "1rem",
            },
            fontFamily: "Be Vietnam Pro",
          }}
        />
        <Tab
          label="Stays"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            fontFamily: "Be Vietnam Pro",
          }}
        />
        <Tab
          label="Reviews"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            fontFamily: "Be Vietnam Pro",
          }}
        />
        <Tab
          label="Contacts"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            fontFamily: "Be Vietnam Pro",
          }}
        />

        <Tab
          label="Users"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            fontFamily: "Be Vietnam Pro",
          }}
        />
      </Tabs>

      {/* Link til frontend */}
      <Box sx={{ mb: 3 }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            fontSize: "13px",
            fontFamily: "Be Vietnam Pro",
            color: "black",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            width: "180px",
          }}
        >
          Gå til frontend
        </Button>
      </Box>

      {tabIndex === 0 && <ActivitiesTab />}
      {tabIndex === 1 && <StaysTab />}
      {tabIndex === 2 && <ReviewsTab />}
      {tabIndex === 3 && <ContactsTab />}
      {tabIndex === 4 && <UsersTab />}
    </Box>
  );
}
