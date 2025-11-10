import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { fetchUsers } from "../../../api/fetch";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (user) => {
    if (selectedUser) {
      setUsers((prev) => prev.map((u) => (u._id === user._id ? user : u)));
    } else {
      setUsers((prev) => [...prev, user]);
    }
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u._id !== id));
    if (selectedUser?._id === id) {
      setSelectedUser(null);
    }
  };

  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          color: "black",
        }}
      >
        Users Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: { md: "900px" } }}>
        <UserTable
          users={users}
          onSelect={setSelectedUser}
          onDelete={handleDelete}
        />
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <UserForm
            mode="create"
            onSave={handleSave}
            disabled={!!selectedUser}
            onSuccess={loadUsers}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <UserForm
            mode="update"
            user={selectedUser}
            onSave={handleSave}
            onCancel={() => setSelectedUser(null)}
            onSuccess={loadUsers}
          />
        </Grid>
      </Grid>
    </>
  );
}
