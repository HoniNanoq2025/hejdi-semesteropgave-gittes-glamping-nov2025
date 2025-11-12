import { useState, useEffect } from "react";
import { Grid, Typography, Alert, Box } from "@mui/material";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { fetchUsers } from "../../../api/fetch";

// Komponent til at vise og administrere brugere
export default function UsersTab() {
  // State til at gemme liste over brugere
  const [users, setUsers] = useState([]);
  // State til at gemme det valgte ophold (til redigering)
  const [selectedUser, setSelectedUser] = useState(null);
  // State til at vise loading-status
  const [loading, setLoading] = useState(true);
  // State til fejlbeskeder
  const [error, setError] = useState(null);

  // Hent users, når komponenten loades
  useEffect(() => {
    loadUsers();
  }, []);

  // Funktion til at hente brugere fra API’et
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers(); // kalder API’et
      setUsers(data.data || []); // gem brugere i state
      setError(null);
    } catch (err) {
      setError("Failed to load users"); // vis fejl, hvis hentning fejler
      console.error(err);
    } finally {
      setLoading(false); // stop loading uanset hvad
    }
  };

  // Funktion til at gemme eller opdatere brugere
  const handleSave = (user) => {
    if (selectedUser) {
      // Opdater eksisterende brugere
      setUsers((prev) => prev.map((u) => (u._id === user._id ? user : u)));
    } else {
      // Tilføj ny bruger
      setUsers((prev) => [...prev, user]);
    }
    setSelectedUser(null); // ryd markeret/redigeret bruger efter gem
  };

  // Funktion til at slette bruger
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u._id !== id));
    if (selectedUser?._id === id) {
      setSelectedUser(null);
    }
  };

  // Vis "loading..." tekst, mens data hentes
  if (loading) {
    return <Typography>Henter brugere...</Typography>;
  }

  return (
    <>
      {/* Overskrift */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          color: "black",
        }}
      >
        Brugerhåndtering
      </Typography>
      {/* Fejlbesked hvis hentning fejler */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tabel med eksisterende brugere */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <UserTable
          users={users}
          onSelect={setSelectedUser} // vælg bruger til redigering
          onDelete={handleDelete} // slet bruger
        />
      </Box>

      {/* To kolonner med formularer (lav ny + rediger eksisterende) */}
      <Box
        sx={{
          maxWidth: { md: "900px", lg: "1100px", xl: "1400px" }, // begræns bredde på desktop
          px: { xs: 2, md: 0 }, // lille padding på mobil
        }}
      >
        {/* Formular til at oprette ny bruger */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <UserForm
              mode="create"
              onSave={handleSave}
              disabled={!!selectedUser} // deaktiver, hvis der redigeres
              onSuccess={loadUsers} // genindlæs ved succes
            />
          </Grid>

          {/* Formular til at redigere valgt bruger */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <UserForm
              mode="update"
              user={selectedUser}
              onSave={handleSave}
              onCancel={() => setSelectedUser(null)} // annullér redigering
              onSuccess={loadUsers}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
