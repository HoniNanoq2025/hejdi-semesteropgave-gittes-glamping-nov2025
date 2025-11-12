import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { fetchContacts } from "../../../api/fetch";

export default function ContactsTab() {
  // State til at gemme kontakter, loading status og eventuelle fejl
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State til at styre sorteringsretning (nyeste først eller ældste først)
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = nyeste først, "asc" = ældste først

  // Hent kontakter når komponenten loader første gang
  useEffect(() => {
    loadContacts();
  }, []);

  // Funktion til at hente alle kontakter fra API
  const loadContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = await fetchContacts(token);
      setContacts(data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Funktion til at formatere dato og tid læsbart
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString("da-DK"); // dansk datoformat
    const timeFormatted = date.toLocaleTimeString("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dateFormatted} ${timeFormatted}`;
  };

  // Funktion til at sortere kontakter baseret på dato
  const sortContacts = (contactsList) => {
    return [...contactsList].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      // Sortér efter valgt retning
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  // Skift mellem stigende og faldende sortering
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // Filtrer kontakter i bookings (subject = "booking")
  const bookings = sortContacts(
    contacts.filter((c) => c.subject === "booking")
  );

  // Filtrer kontakter i questions (alle andre end "booking")
  const questions = sortContacts(
    contacts.filter((c) => c.subject === "question" || c.subject !== "booking")
  );

  // Funktion til at generere en tabel med kontakter
  const renderTable = (title, data) => (
    <Grid size={{ xs: 12, lg: 6 }}>
      {/* Tabel titel */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.125rem", md: "1.25rem" },
          color: "black",
        }}
      >
        {title}
      </Typography>

      {/* Tabel */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflowX: "auto",
          maxWidth: { xs: "90%", lg: "92%" },
        }}
      >
        <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {/* Kolonneoverskrift: Name */}
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Name
              </TableCell>
              {/* Kolonneoverskrift: Email (skjult på små skærme) */}
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                Email
              </TableCell>
              {/* Kolonneoverskrift: Message */}
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Message
              </TableCell>
              {/* Kolonneoverskrift: Date & Time */}
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Hvis der ingen data er, vis besked */}
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 4, color: "#999" }}
                >
                  No {title.toLowerCase()} found
                </TableCell>
              </TableRow>
            ) : (
              // Vis alle kontakter i tabellen
              data.map((row) => (
                <TableRow key={row._id} hover>
                  {/* Navn */}
                  <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                    {row.name}
                  </TableCell>
                  {/* Email (skjult på små skærme) */}
                  <TableCell
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    {row.email}
                  </TableCell>
                  {/* Besked */}
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                  >
                    {row.message}
                  </TableCell>
                  {/* Dato og tid (skjult på små skærme) */}
                  <TableCell
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      display: { xs: "none", md: "table-cell" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatDateTime(row.created)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  // Vis loading besked mens data hentes
  if (loading) {
    return <Typography>Loading contacts...</Typography>;
  }

  return (
    <>
      {/* Overskrift */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          color: "black",
        }}
      >
        Contacts Management
      </Typography>

      {/* Vis fejlbesked hvis der er en fejl */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Sorteringsknap */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          onClick={toggleSortOrder}
          sx={{
            fontSize: "13px",
            fontFamily: "Be Vietnam Pro",
            color: "black",
            borderColor: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          Sortér: {sortOrder === "desc" ? "Nyeste først" : "Ældste først"}
        </Button>
      </Box>

      {/* Tabeller med bookings og questions */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {renderTable("Bookings", bookings)}
        {renderTable("Questions", questions)}
      </Grid>
    </>
  );
}
