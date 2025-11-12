import { useState, useEffect } from "react";
import { createUser, updateUser } from "../../../api/fetch";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";

export default function UserForm({
  mode, // "create" eller "update"
  user, // User til opdatering
  onSave, // Callback når bruger er gemt
  disabled, // Om formularen skal være låst
  onCancel, // Callback ved aflysning
  onSuccess, // Callback ved succes
}) {
  // State til formularfelter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [image, setImage] = useState(null);

  // Loader-status
  const [loading, setLoading] = useState(false);

  // useEffect kører når mode eller bruger ændres
  useEffect(() => {
    if (mode === "update" && user) {
      // Hvis vi opdaterer, fyld formularen med eksisterende data
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "guest");
      setPassword(""); // Altid ryd password !!
    } else if (mode === "create") {
      clearForm(); // Ryd formularen hvis vi opretter ny Bruger
    }
  }, [mode, user]);

  // Funktion til at rydde formularfelter
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("guest");
    setImage(null);
  };

  // Funktion til at håndtere form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper side refresh (standard form-opførsel)
    setLoading(true); // Sætter loading state

    try {
      // Hent token fra localStorage
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Tilføj felter til FormData
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);

      // Inkludér kun password hvis det er tilføjet
      if (password) {
        formData.append("password", password);
      }

      if (image) {
        formData.append("file", image); // Tilføj billedfil hvis valgt
      }

      let result;

      if (mode === "create") {
        result = await createUser(formData, token); // Opret ny Bruger
      } else {
        result = await updateUser(formData, token, user._id); // Opdater eksisterende Bruger
      }

      // Håndter respons fra API
      if (result.message && result.message.includes("successfully")) {
        toast.success(
          result.message ||
            `Bruger ${
              mode === "create" ? "skabelse" : "opdatering"
            } var succesfuld`
        );
        onSave(result.data);
        if (mode === "create") {
          clearForm(); // Ryd formular hvis ny bruger
        }
        if (onSuccess) {
          onSuccess(); // Kald succes-callback
        }
      } else {
        toast.error(result.message || "Handlingen fejlede"); // Fejl notifikation
      }
    } catch (error) {
      console.error("Error saving user:", error); // Log fejl
      toast.error("Gem Bruger-handling fejlede"); // Vis fejl
    } finally {
      setLoading(false);
    }
  };

  // Disable knapper hvis loading eller disabled i create-mode
  const isDisabled = (mode === "create" && disabled) || loading;

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: { xs: 2, md: 3 },
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        width: "100%", // fylder hele Grid item
        maxWidth: {
          xs: "300px",
          sm: "730px",
          md: "800px",
          lg: "470px",
          xl: "620px",
        }, // tvinger max bredde, matcher ActivityForm
      }}
    >
      {/* Header baseret på form mode */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.125rem", md: "1.25rem" },
        }}
      >
        {mode === "create" ? "Tilføj Ny Bruger" : "Opdatér Bruger"}
      </Typography>

      {/* Formularfelter */}
      <TextField
        label="Navn"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label={mode === "update" ? "Nyt Password (valgfrit)" : "Password"}
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isDisabled}
        required={mode === "create"}
        helperText={
          mode === "update" ? "Leave empty to keep current password" : undefined
        }
      />

      <FormControl fullWidth margin="normal" disabled={isDisabled}>
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
          <MenuItem value="guest">Guest</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      {/* Upload billede */}
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isDisabled}
      >
        Upload Profilbillede
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button>
      {image && (
        <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
          Valgt: {image.name}
        </Typography>
      )}

      {/* Submit og cancel knapper */}
      <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isDisabled}
        >
          {loading ? "Saving..." : mode === "create" ? "Skab" : "Opdatér"}
        </Button>
        {mode === "update" && onCancel && (
          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            disabled={loading}
          >
            Annullér
          </Button>
        )}
      </Box>
    </Paper>
  );
}
