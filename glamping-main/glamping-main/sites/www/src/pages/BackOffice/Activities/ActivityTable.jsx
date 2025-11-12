import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableContainer,
} from "@mui/material";
import { deleteActivity } from "../../../api/fetch"; // Funktion til at slette aktivitet via API
import { toast } from "react-toastify";

// Komponent der viser en tabel med aktiviteter
export default function ActivityTable({ activities, onSelect, onDelete }) {
  // Funktion til at slette en aktivitet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return; // Stop funktionen, hvis brugeren trykker "Annuller"
    }

    try {
      const token = localStorage.getItem("token"); // Hent token fra localStorage
      const result = await deleteActivity(id, token); // Kald API’et for at slette aktiviteten

      if (result.status === "ok") {
        toast.success("Activity deleted successfully"); // Vis succes-besked
        onDelete(id); // Fjern aktiviteten fra listen i parent-komponenten
      } else {
        toast.error(result.message || "Failed to delete activity"); // Fejlbesked
      }
    } catch (err) {
      console.error("Error deleting activity:", err); // Log eventuel fejl
      toast.error("Failed to delete activity"); // Vis fejlbesked til brugeren
    }
  };

  return (
    // Wrapper der giver skygge og rullefunktion til tabellen
    <TableContainer
      component={Paper} // Gør baggrunden hvid og løftet (som et kort)
      sx={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflowX: "auto", // Gør tabellen scroll-bar venlig på små skærme
        maxWidth: { xs: "90%", md: "95%" }, // Tilpas bredde efter skærmstørrelse
      }}
    >
      {/* Selve tabellen */}
      <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
        {/* Tabelhoved med kolonnenavne */}
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 600, fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              Title
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: { xs: "none", md: "table-cell" }, // Skjul på små skærme
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Time
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: { xs: "0.875rem", md: "1rem" } }}
              align="right" // Højrestil handlingerne
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Tabelindhold */}
        <TableBody>
          {/* Hvis der ingen aktiviteter er, vis en besked */}
          {activities.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ py: 4, color: "#999" }}
              >
                No activities found
              </TableCell>
            </TableRow>
          ) : (
            // Ellers vis hver aktivitet som en række i tabellen
            activities.map((a) => (
              <TableRow key={a._id} hover>
                {/* Titelkolonne */}
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {a.title}
                </TableCell>

                {/* Dato - skjules på små skærme */}
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  {a.date}
                </TableCell>

                {/* Tid - skjules på små skærme */}
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  {a.time}
                </TableCell>

                {/* Knapper til handlinger (rediger/slet) */}
                <TableCell align="right">
                  {/* Rediger-knap */}
                  <Button
                    onClick={() => onSelect(a)} // Kalder funktionen med valgt aktivitet
                    variant="outlined"
                    size="small"
                    sx={{
                      mr: { xs: 0.5, sm: 1 },
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    Edit
                  </Button>

                  {/* Slet-knap */}
                  <Button
                    onClick={() => handleDelete(a._id)} // Kalder delete-funktion
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
