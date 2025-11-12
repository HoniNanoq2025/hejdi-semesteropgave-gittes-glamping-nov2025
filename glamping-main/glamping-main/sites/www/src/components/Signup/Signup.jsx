import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";

/**
 * React Router skifter hele siden (inden for dit BrowserRouter-område) til en ny komponent.
 * Det betyder, at Signup-komponenten “erstatter” Login-komponenten i DOM’en, ikke lægger sig ovenpå — men da begge fylder hele viewporten, ligner det et pop-up-skift.
 * Paper får formularen til at ligne et centreret popup-kort ovenpå den mørke baggrund.
 */

export default function Signup() {
  // Opretter state-variabler til inputfelter og loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useNavigate bruges til at navigere til en anden side
  const navigate = useNavigate();

  // Funktion der kører, når brugeren sender formularen
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper side-refresh
    setLoading(true); // Viser at noget loader

    try {
      // Opretter formData objekt til at sende med fetch
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "guest"); // Nye brugere får automatisk rollen "guest"

      // Sender POST-request til backend API for at oprette bruger
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Konverterer svaret fra serveren til JSON
      const data = await response.json();

      // Hvis serveren svarer med success-besked
      if (data.message && data.message.includes("successfully")) {
        toast.success("Bruger oprettet! Du kan nu logge ind");
        navigate("/auth/signin");
      } else {
        toast.error("Noget gik galt ved brugeroprettelsen");
      }
    } catch (err) {
      console.error(err);
      toast.error("Kunne ikke oprette bruger");
    } finally {
      setLoading(false); // Slår loading fra igen
    }
  };

  return (
    // Hovedcontainer der centrerer indholdet
    <Box
      className="signup-container"
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
      {/* Formularen er inde i et hvidt Paper kort */}
      {/* Paper giver en hvid (eller lysegrå) baggrund, let hævet skygge (elevation) og afrundede hjørner, som gør indholdet visuelt adskilt fra baggrunden. */}
      <Paper
        component="form"
        className="signup-form"
        onSubmit={handleSubmit}
        sx={{
          p: { xs: 3, md: 4 }, // p = padding
          maxWidth: "500px",
          width: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
        }}
      >
        {/* Overskrift */}
        <Typography
          variant="h4"
          className="signup-header"
          sx={{
            mb: 3, // margin-bottom
            textAlign: "center",
            fontFamily: "Zen Loop",
            color: "#33626c",
          }}
        >
          Opret bruger
        </Typography>

        {/* Inputfelt til navn */}
        <TextField
          label="Navn"
          className="name-signup-inputfield"
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
          className="email-signup-inputfield"
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
          className="password-signup-inputfield"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {/* Knapper nederst i formularen */}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Submit-knap (viser tekst baseret på loading-status) */}
          <Button
            type="submit"
            variant="contained"
            className="signup-submit-button"
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

          {/* Link til login-siden */}
          <Button
            variant="text"
            className="navigate-to-login-button"
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
