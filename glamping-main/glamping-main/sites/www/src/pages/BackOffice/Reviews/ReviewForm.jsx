import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createReview, updateReview } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function ReviewForm({
  mode,
  review,
  onSave,
  disabled,
  onCancel,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [stay, setStay] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && review) {
      setName(review.name || "");
      setAge(review.age || "");
      setReviewText(review.review || "");
      setStay(review.stay || "");
    } else if (mode === "create") {
      clearForm();
    }
  }, [mode, review]);

  const clearForm = () => {
    setName("");
    setAge("");
    setReviewText("");
    setStay("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("age", age);
      formData.append("review", reviewText);
      formData.append("stay", stay);

      if (image) {
        formData.append("file", image);
      }

      let result;
      if (mode === "create") {
        result = await createReview(formData);
      } else {
        formData.append("id", review._id);
        result = await updateReview(formData);
      }

      if (result.status === "ok") {
        toast.success(
          result.message ||
            `Review ${mode === "create" ? "created" : "updated"} successfully`
        );
        onSave(result.data);
        if (mode === "create") {
          clearForm();
        }
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review");
    } finally {
      setLoading(false);
    }
  };

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
        maxWidth: { xs: "100%", md: "550px", lg: "650px", xl: "1100px" },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1.125rem", md: "1.25rem" },
        }}
      >
        {mode === "create" ? "Add New Review" : "Update Review"}
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Age"
        fullWidth
        margin="normal"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Stay"
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
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isDisabled}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button>
      {image && (
        <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
          Selected: {image.name}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isDisabled}
        >
          {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
        </Button>
        {mode === "update" && onCancel && (
          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
}
