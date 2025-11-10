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
} from "@mui/material";
import { fetchContacts } from "../../../api/fetch";

export default function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

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

  const bookings = contacts.filter((c) => c.subject === "booking");
  const questions = contacts.filter(
    (c) => c.subject === "question" || c.subject !== "booking"
  );

  const renderTable = (title, data) => (
    <Grid item xs={12} lg={6}>
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
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Message
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ py: 4, color: "#999" }}
                >
                  No {title.toLowerCase()} found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "wrap",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                  >
                    {row.message}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  if (loading) {
    return <Typography>Loading contacts...</Typography>;
  }

  return (
    <>
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {renderTable("Bookings", bookings)}
        {renderTable("Questions", questions)}
      </Grid>
    </>
  );
}
