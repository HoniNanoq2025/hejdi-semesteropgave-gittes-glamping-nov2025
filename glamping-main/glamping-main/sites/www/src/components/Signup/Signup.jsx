import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "guest"); // Automatisk sat til guest

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.message && data.message.includes("successfully")) {
        toast.success("Bruger oprettet! Du kan nu logge ind");
        navigate("/auth/signin");
      } else {
        toast.error(data.message || "Noget gik galt");
      }
    } catch (err) {
      console.error(err);
      toast.error("Kunne ikke oprette bruger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#33626c",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100dvh",
        padding: "20px",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: { xs: 3, md: 4 },
          maxWidth: "500px",
          width: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: "center",
            fontFamily: "Zen Loop",
            color: "#33626c",
          }}
        >
          Opret bruger
        </Typography>

        <TextField
          label="Navn"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#829B97",
              height: "50px",
              fontFamily: "Zen Loop",
              fontSize: "20px",
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
              "&:hover": {
                backgroundColor: "#2A4F57",
              },
            }}
          >
            {loading ? "Opretter..." : "Opret bruger"}
          </Button>

          <Button
            variant="text"
            onClick={() => navigate("/auth/signin")}
            disabled={loading}
            sx={{
              color: "#33626c",
              fontFamily: "Zen Loop",
            }}
          >
            Har du allerede en bruger? Log ind
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
