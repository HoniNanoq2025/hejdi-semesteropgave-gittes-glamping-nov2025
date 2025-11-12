import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Button } from "@mui/material";
import ActivitiesTab from "./Activities/ActivitiesTab";
import StaysTab from "./Stays/StaysTab";
import ReviewsTab from "./Reviews/ReviewsTab";
import ContactsTab from "./Contacts/ContactsTab";
import UsersTab from "./Users/UsersTab";

export default function Backoffice() {
  const [tabIndex, setTabIndex] = useState(0); // State til at tracke hvilken tab der er valgt
  const navigate = useNavigate(); // Hook til at navigere til en anden side

  return (
    <Box
      className="backoffice-container"
      sx={{
        width: "100%",
        p: { xs: 2, md: 4 }, // Padding: mindre på mobil, større på desktop
        backgroundColor: "#f5f5f5", // Lys baggrund
        minHeight: "100vh", // Min højde = hele skærmen
      }}
    >
      <Tabs
        value={tabIndex} // Viser hvilken tab der er aktiv
        onChange={(e, newIndex) => setTabIndex(newIndex)} // Opdaterer valgt tab
        /* newIndex fortæller os, hvilken tab der blev valgt, og gør det muligt at vise det korrekte indhold dynamisk.  */
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable" // Tabs kan scrolles hvis der er mange
        scrollButtons="auto"
        sx={{
          mb: { xs: 2, md: 1 },
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          maxWidth: "95%", // begræns bredde på desktop
          mx: "auto", // centrerer Tabs
          px: { xs: 1, md: 0 }, // lille padding på mobil, fjern på desktop
        }}
      >
        {/* Tab-knapper */}
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

      {/* Knap til at gå til frontend */}
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

      {/* Render indhold afhængig af valgt tab */}
      {tabIndex === 0 && <ActivitiesTab />}
      {tabIndex === 1 && <StaysTab />}
      {tabIndex === 2 && <ReviewsTab />}
      {tabIndex === 3 && <ContactsTab />}
      {tabIndex === 4 && <UsersTab />}
    </Box>
  );
}
