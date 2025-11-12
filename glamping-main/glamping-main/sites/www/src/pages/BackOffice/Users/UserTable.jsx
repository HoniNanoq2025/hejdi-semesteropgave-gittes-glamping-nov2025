import { deleteUser } from "../../../api/fetch";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableContainer,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";

export default function UserTable({ users, onSelect, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const result = await deleteUser(id, token); // fra api/fetch.js

      if (result.message && result.message.includes("successfully")) {
        toast.success("User deleted successfully");
        onDelete(id); // fortæller parent-komponenten: har lige slettet brugeren med id = 123 — opdater state!
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
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
              Email
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              Role
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
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ py: 4, color: "#999" }}
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow key={u._id} hover>
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {u.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {u.email}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  <Chip
                    label={u.role}
                    color={u.role === "admin" ? "error" : "primary"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => onSelect(u)}
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
                    onClick={() => handleDelete(u._id)}
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
