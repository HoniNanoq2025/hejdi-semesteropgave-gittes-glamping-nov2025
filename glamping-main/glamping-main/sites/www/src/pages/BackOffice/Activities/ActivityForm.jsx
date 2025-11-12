import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createActivity, updateActivity } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function ActivityForm({
  mode, // "create" eller "update"
  activity, // Aktivitet til opdatering
  onSave, // Callback når aktivitet er gemt
  disabled, // Om formularen skal være låst
  onCancel, // Callback ved aflysning
  onSuccess, // Callback ved succes
}) {
  // State til formularfelter
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);

  // Loader-status
  const [loading, setLoading] = useState(false);

  // useEffect kører når mode eller activity ændres
  useEffect(() => {
    if (mode === "update" && activity) {
      // Hvis vi opdaterer, fyld formularen med eksisterende data
      setTitle(activity.title || "");
      setDescription(activity.description || "");
      setDate(activity.date || "");
      setTime(activity.time || "");
    } else if (mode === "create") {
      clearForm(); // Ryd formularen hvis vi opretter ny aktivitet
    }
  }, [mode, activity]);

  // Funktion til at rydde formularfelter
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setImage(null);
  };

  // Funktion til at håndtere form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper side refresh (standard form-opførsel)
    setLoading(true); // Sætter loading state

    try {
      const token = localStorage.getItem("token"); // Hent token fra localStorage
      const formData = new FormData(); // Opret FormData til filupload

      // Tilføj felter til FormData
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("time", time);

      if (image) {
        formData.append("file", image); // Tilføj billedfil hvis valgt
      }

      let result;
      if (mode === "create") {
        result = await createActivity(formData, token); // Opret ny aktivitet
      } else {
        formData.append("id", activity._id); // Tilføj id til opdatering
        result = await updateActivity(formData, token); // Opdater eksisterende aktivitet
      }

      // Håndter respons fra API
      if (result.status === "ok") {
        toast.success(
          result.message ||
            `Activity ${
              mode === "create" ? "skabelse" : "opdatering"
            } var succesfuld`
        );
        onSave(result.data); // Kald callback med gemt data
        if (mode === "create") {
          clearForm(); // Ryd formular hvis ny aktivitet
        }
        if (onSuccess) {
          onSuccess(); // Kald succes-callback
        }
      } else {
        toast.error(result.message || "Handlingen fejlede"); // Fejl notifikation
      }
    } catch (err) {
      console.error("Error saving activity:", err); // Log fejl
      toast.error("Gem aktivitet-handling fejlede"); // Vis fejl notifikation
    } finally {
      setLoading(false); // Stop loader
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
        }, // tvinger max bredde, matcher de andre Forms
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
        {mode === "create" ? "Tilføj Ny Aktivitet" : "Opdatér Aktivitet"}
      </Typography>

      {/* Formularfelter */}
      <TextField
        label="Titel"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Beskrivelse"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isDisabled}
      />
      <TextField
        label="Dato"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Tid"
        fullWidth
        margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={isDisabled}
        required
      />
      {/* Upload billede */}
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isDisabled}
      >
        Upload Billede
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
          {loading ? "Gemmer..." : mode === "create" ? "Skab" : "Opdatér"}
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
