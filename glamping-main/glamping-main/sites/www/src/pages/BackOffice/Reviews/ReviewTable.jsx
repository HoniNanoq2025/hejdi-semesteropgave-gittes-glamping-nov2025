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
import { deleteReview } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function ReviewTable({ reviews, onSelect, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const result = await deleteReview(id, token);

      if (result.status === "ok") {
        toast.success("Review deleted successfully");
        onDelete(id);
      } else {
        toast.error(result.message || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
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
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Age
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Stay
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Review
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
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ py: 4, color: "#999" }}
              >
                No reviews found
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((r) => (
              <TableRow key={r._id} hover>
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {r.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {r.age}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  {r.stay}
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {r.review}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => onSelect(r)}
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
                    onClick={() => handleDelete(r._id)}
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
