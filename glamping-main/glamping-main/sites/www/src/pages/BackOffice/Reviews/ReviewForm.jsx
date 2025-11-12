import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createReview, updateReview } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function ReviewForm({
  mode, // "create" eller "update"
  review, // Review til opdatering
  onSave, // Callback når review er gemt
  disabled, // Om formularen skal være låst
  onCancel, // Callback ved aflysning
  onSuccess, // Callback ved succes
}) {
  // State til formularfelter
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [stay, setStay] = useState("");
  const [image, setImage] = useState(null);

  // Loader-status
  const [loading, setLoading] = useState(false);

  // useEffect kører når mode eller review ændres
  useEffect(() => {
    if (mode === "update" && review) {
      // Hvis vi opdaterer, fyld formularen med eksisterende data
      setName(review.name || "");
      setAge(review.age || "");
      setReviewText(review.review || "");
      setStay(review.stay || "");
    } else if (mode === "create") {
      clearForm(); // Ryd formularen hvis vi opretter nyt review
    }
  }, [mode, review]);

  // Funktion til at rydde formularfelter
  const clearForm = () => {
    setName("");
    setAge("");
    setReviewText("");
    setStay("");
    setImage(null);
  };

  // Funktion til at håndtere form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper side refresh (standard form-opførsel)
    setLoading(true); // Sætter loading state

    try {
      const token = localStorage.getItem("token"); // Hent token fra localStorage
      const formData = new FormData();

      // Tilføj felter til FormData
      formData.append("name", name);
      formData.append("age", age);
      formData.append("review", reviewText);
      formData.append("stay", stay);

      if (image) {
        formData.append("file", image); // Tilføj billedfil hvis valgt
      }

      let result;
      if (mode === "create") {
        result = await createReview(formData, token); // Opret nyt review
      } else {
        formData.append("id", review._id); // Tilføj id til opdatering
        result = await updateReview(formData, token); // Opdater eksisterende review
      }

      // Håndter respons fra API
      if (result.status === "ok") {
        toast.success(
          result.message ||
            `Review ${
              mode === "create" ? "skabelse" : "opdatering"
            } var succesfuld`
        );
        onSave(result.data); // Kald callback med gemt data
        if (mode === "create") {
          clearForm(); // Ryd formular hvis nyt review
        }
        if (onSuccess) {
          onSuccess(); // Kald succes-callback
        }
      } else {
        toast.error(result.message || "Handlingen fejlede"); // Fejl notifikation
      }
    } catch (error) {
      console.error("Error saving review:", error); // Log fejl
      toast.error("Gem review-handling fejlede"); // Vis fejl notifikation
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
        {mode === "create" ? "Tilføj Nyt Review" : "Opdatér Review"}
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
        label="Alder"
        fullWidth
        margin="normal"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Ophold"
        fullWidth
        margin="normal"
        value={stay}
        onChange={(e) => setStay(e.target.value)}
        disabled={isDisabled}
      />
      <TextField
        label="Review"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
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
