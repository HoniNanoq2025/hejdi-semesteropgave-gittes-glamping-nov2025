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
import { deleteStay } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function StayTable({ stays, onSelect, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this stay?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const result = await deleteStay(id, token);

      if (result.status === "ok") {
        toast.success("Stay deleted successfully");
        onDelete(id);
      } else {
        toast.error(result.message || "Failed to delete stay");
      }
    } catch (error) {
      console.error("Error deleting stay:", error);
      toast.error("Failed to delete stay");
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflowX: "auto",
        maxWidth: { xs: "90%", md: "95%" },
      }}
    >
      <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
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
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Persons
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: { xs: "0.875rem", md: "1rem" } }}
              align="right"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stays.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ py: 4, color: "#999" }}
              >
                No stays found
              </TableCell>
            </TableRow>
          ) : (
            stays.map((s) => (
              <TableRow key={s._id} hover>
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {s.title}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {s.numberOfPersons}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {s.price} kr
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => onSelect(s)}
                    variant="outlined"
                    size="small"
                    sx={{
                      mr: { xs: 0, sm: 1 },
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                      mb: { xs: 1, sm: 0 },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(s._id)}
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
