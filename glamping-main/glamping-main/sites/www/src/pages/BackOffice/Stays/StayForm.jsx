import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createStay, updateStay } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function StayForm({
  mode, // "create" eller "update"
  stay, // Stay til opdatering
  onSave, // Callback når ophold er gemt
  disabled, // Om formularen skal være låst
  onCancel, // Callback ved aflysning
  onSuccess, // Callback ved succes
}) {
  // State til formularfelter
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [price, setPrice] = useState("");
  const [includes, setIncludes] = useState("");
  const [image, setImage] = useState(null);

  // Loader-status
  const [loading, setLoading] = useState(false);

  // useEffect kører når mode eller ophold ændres
  useEffect(() => {
    if (mode === "update" && stay) {
      // Hvis vi opdaterer, fyld formularen med eksisterende data
      setTitle(stay.title || "");
      setHeader(stay.header || "");
      setDescription(stay.description || "");
      setNumberOfPersons(stay.numberOfPersons || "");
      setPrice(stay.price || "");
      setIncludes(Array.isArray(stay.includes) ? stay.includes.join(", ") : "");
    } else if (mode === "create") {
      clearForm(); // Ryd formularen hvis vi opretter nyt ophold
    }
  }, [mode, stay]);

  // Funktion til at rydde formularfelter
  const clearForm = () => {
    setTitle("");
    setHeader("");
    setDescription("");
    setNumberOfPersons("");
    setPrice("");
    setIncludes("");
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
      formData.append("title", title);
      formData.append("header", header);
      formData.append("description", description);
      formData.append("numberOfPersons", numberOfPersons);
      formData.append("price", price);
      formData.append("includes", includes);

      if (image) {
        formData.append("file", image); // Tilføj billedfil hvis valgt
      }

      let result;
      if (mode === "create") {
        result = await createStay(formData, token); // Opret nyt review
      } else {
        formData.append("id", stay._id); // Tilføj id til opdatering
        result = await updateStay(formData, token);
      }

      // Håndter respons fra API
      if (result.status === "ok") {
        toast.success(
          result.message ||
            `Ophold ${
              mode === "create" ? "skabelse" : "opdatering"
            } var succesfuld`
        );
        onSave(result.data);
        if (mode === "create") {
          clearForm(); // Ryd formular hvis nyt ophold
        }
        if (onSuccess) {
          onSuccess(); // Kald succes-callback
        }
      } else {
        toast.error(result.message || "Handlingen fejlede"); // Fejl notifikation
      }
    } catch (error) {
      console.error("Error saving stay:", error); // Log fejl
      toast.error("Gem ophold-handling fejlede"); // Vis fejl
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
        {mode === "create" ? "Tilføj Nyt Ophold" : "Opdatér Ophold"}
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
        label="Overskrift"
        fullWidth
        margin="normal"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        disabled={isDisabled}
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
        label="Antal personer"
        fullWidth
        margin="normal"
        value={numberOfPersons}
        onChange={(e) => setNumberOfPersons(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Pris"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Inkluderer (komma separeret)"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        value={includes}
        onChange={(e) => setIncludes(e.target.value)}
        disabled={isDisabled}
        helperText="Enter items separated by commas"
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
