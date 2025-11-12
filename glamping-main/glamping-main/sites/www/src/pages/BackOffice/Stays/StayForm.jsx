import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createStay, updateStay } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function StayForm({
  mode,
  stay,
  onSave,
  disabled,
  onCancel,
  onSuccess,
}) {
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [price, setPrice] = useState("");
  const [includes, setIncludes] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && stay) {
      setTitle(stay.title || "");
      setHeader(stay.header || "");
      setDescription(stay.description || "");
      setNumberOfPersons(stay.numberOfPersons || "");
      setPrice(stay.price || "");
      setIncludes(Array.isArray(stay.includes) ? stay.includes.join(", ") : "");
    } else if (mode === "create") {
      clearForm();
    }
  }, [mode, stay]);

  const clearForm = () => {
    setTitle("");
    setHeader("");
    setDescription("");
    setNumberOfPersons("");
    setPrice("");
    setIncludes("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("header", header);
      formData.append("description", description);
      formData.append("numberOfPersons", numberOfPersons);
      formData.append("price", price);
      formData.append("includes", includes);

      if (image) {
        formData.append("file", image);
      }

      let result;
      if (mode === "create") {
        result = await createStay(formData, token);
      } else {
        formData.append("id", stay._id);
        result = await updateStay(formData, token);
      }

      if (result.status === "ok") {
        toast.success(
          result.message ||
            `Stay ${mode === "create" ? "created" : "updated"} successfully`
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
      console.error("Error saving stay:", error);
      toast.error("Failed to save stay");
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
        maxWidth: {
          xs: "300px",
          sm: "730px",
          md: "800px",
          lg: "470px",
          xl: "620px",
        }, // tvinger max bredde, matcher ActivityForm
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
        {mode === "create" ? "Add New Stay" : "Update Stay"}
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Header"
        fullWidth
        margin="normal"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        disabled={isDisabled}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isDisabled}
      />
      <TextField
        label="Number of Persons"
        fullWidth
        margin="normal"
        value={numberOfPersons}
        onChange={(e) => setNumberOfPersons(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Price"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Includes (comma separated)"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        value={includes}
        onChange={(e) => setIncludes(e.target.value)}
        disabled={isDisabled}
        helperText="Enter items separated by commas"
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
