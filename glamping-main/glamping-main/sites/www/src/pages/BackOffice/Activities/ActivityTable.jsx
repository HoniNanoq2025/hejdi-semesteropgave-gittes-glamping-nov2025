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
import { deleteActivity } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function ActivityTable({ activities, onSelect, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const result = await deleteActivity(id, token);

      if (result.status === "ok") {
        toast.success("Activity deleted successfully");
        onDelete(id);
      } else {
        toast.error(result.message || "Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  return (
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
              Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Time
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
            activities.map((a) => (
              <TableRow key={a._id} hover>
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {a.title}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {a.date}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {a.time}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => onSelect(a)}
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
                  <Button
                    onClick={() => handleDelete(a._id)}
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
