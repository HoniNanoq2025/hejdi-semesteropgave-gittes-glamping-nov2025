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
  mode,
  user,
  onSave,
  disabled,
  onCancel,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "guest");
      setPassword(""); // Always clear password
    } else if (mode === "create") {
      clearForm();
    }
  }, [mode, user]);

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("guest");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);

      // Only include password if it's provided
      if (password) {
        formData.append("password", password);
      }

      if (image) {
        formData.append("file", image);
      }

      let result;

      if (mode === "create") {
        result = await createUser(formData, token);
      } else {
        result = await updateUser(formData, token, user._id);
      }

      if (result.message && result.message.includes("successfully")) {
        toast.success(
          result.message ||
            `User ${mode === "create" ? "created" : "updated"} successfully`
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
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
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
        width: "100%",
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
        {mode === "create" ? "Add New User" : "Update User"}
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
        label={mode === "update" ? "New Password (optional)" : "Password"}
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

      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isDisabled}
      >
        Upload Profile Picture
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
