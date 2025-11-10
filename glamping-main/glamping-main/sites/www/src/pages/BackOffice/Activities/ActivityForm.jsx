import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createActivity, updateActivity } from "../../../api/fetch";
import { toast } from "react-toastify";

export default function ActivityForm({
  mode,
  activity,
  onSave,
  disabled,
  onCancel,
  onSuccess,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && activity) {
      setTitle(activity.title || "");
      setDescription(activity.description || "");
      setDate(activity.date || "");
      setTime(activity.time || "");
    } else if (mode === "create") {
      clearForm();
    }
  }, [mode, activity]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("time", time);

      if (image) {
        formData.append("file", image);
      }

      let result;
      if (mode === "create") {
        result = await createActivity(formData, token);
      } else {
        formData.append("id", activity._id);
        result = await updateActivity(formData, token);
      }

      if (result.status === "ok") {
        toast.success(
          result.message ||
            `Activity ${mode === "create" ? "created" : "updated"} successfully`
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
      console.error("Error saving activity:", error);
      toast.error("Failed to save activity");
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
        {mode === "create" ? "Add New Activity" : "Update Activity"}
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
        label="Date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled={isDisabled}
        required
      />
      <TextField
        label="Time"
        fullWidth
        margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
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
