import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/fetch";
import { toast } from "react-toastify";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Login() {
  // State til email og password inputfelter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks til at gemme data i localStorage
  const [, setToken] = useLocalStorage("token", null);
  const [, setUserEmail] = useLocalStorage("userEmail", null);
  const [, setUserName] = useLocalStorage("userName", null);

  const navigate = useNavigate(); // til navigation mellem sider

  // Funktion der kører når man trykker "Login"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper side-refresh (standard form-opførsel)
    try {
      const data = await signIn(email, password); // // Kalder API’et for at logge ind (fra fetch.js)

      toast.success("Login succesfuld");
      setToken(data.data.token); // Gemmer token i localStorage

      // Dekoder token for at få brugerinfo
      const user = jwtDecode(data.data.token);

      // Gem brugerdata i localStorage
      setUserEmail(user.email);
      setUserName(user.name);

      // Navigate baseret på rolle
      if (user.role === "admin") navigate("/backoffice");
      else navigate("/mylist");
    } catch (err) {
      console.error(err);
      toast.error("Noget gik galt ved login");
    }
  };

  return (
    // Yderste container der centrerer indhold
    <Box
      className="login-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#33626c",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100dvh",
      }}
    >
      {/* Login-formular */}
      <Box
        component="form"
        className="login-form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* E-mail felt */}
        <Box
          className="email-input-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            maxWidth: "600px",
          }}
        >
          <Typography
            component="label"
            className="email-label"
            htmlFor="email"
            sx={{
              textAlign: "center",
              fontFamily: "Zen Loop",
              fontSize: "24px",
              fontWeight: 400,
              color: "white",
            }}
          >
            Email
          </Typography>

          {/* Email inputfelt */}
          <TextField
            className="email-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              width: { xs: "330px", md: "600px" },
              //styler selve input-boksen
              "& .MuiOutlinedInput-root": {
                height: { xs: "35px", md: "45px" },
                borderRadius: "50px",
                backgroundColor: "transparent",
                // border-styling
                "& fieldset": {
                  borderColor: "white",
                },
                // hover på border er gylden
                "&:hover fieldset": {
                  borderColor: "#c5b496",
                },
                // Gylden glow når man har klikket på felt
                "&.Mui-focused fieldset": {
                  borderColor: "#c5b496",
                  boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
                },
                // Input tekt-styling
                "& input": {
                  color: "white",
                  fontSize: { xs: "1.2rem", md: "24px" },
                  fontFamily: "Zen Loop",
                  paddingLeft: "15px",
                },
              },
            }}
          />
        </Box>

        {/* Password felt */}
        <Box
          className="password-input-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            maxWidth: "600px",
          }}
        >
          <Typography
            component="label"
            className="password-label"
            htmlFor="password"
            sx={{
              textAlign: "center",
              fontFamily: "Zen Loop",
              fontSize: "24px",
              fontWeight: 400,
              color: "white",
            }}
          >
            Password
          </Typography>

          {/* Password inputfelt */}
          <TextField
            id="password"
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              width: { xs: "330px", md: "600px" },
              //styler selve input-boksen
              "& .MuiOutlinedInput-root": {
                height: { xs: "35px", md: "45px" },
                borderRadius: "50px",
                backgroundColor: "transparent",
                // border-styling
                "& fieldset": {
                  borderColor: "white",
                },
                // hover på border er gylden
                "&:hover fieldset": {
                  borderColor: "#c5b496",
                },
                // Gylden glow når man har klikket på felt
                "&.Mui-focused fieldset": {
                  borderColor: "#c5b496",
                  boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
                },
                // Input tekt-styling
                "& input": {
                  color: "white",
                  fontSize: { xs: "1.2rem", md: "24px" },
                  fontFamily: "Zen Loop",
                  paddingLeft: "15px",
                },
              },
            }}
          />
        </Box>

        {/* LOGIN knap */}
        <Button
          type="submit"
          variant="contained"
          className="login-button"
          sx={{
            backgroundColor: "#829B97",
            textTransform: "none",
            height: "103px",
            width: "265px",
            fontFamily: "Zen Loop",
            fontSize: "48px",
            color: "white",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            mt: 6,
            "&:hover": {
              backgroundColor: "#2A4F57", // Mørkere farve ved hover
              color: "white",
              border: "1px solid white", // Tilføjer hvid kant
            },
          }}
        >
          Login
        </Button>

        <Button
          variant="text"
          className="create-user-button"
          onClick={() => navigate("/signup")}
          sx={{
            color: "white",
            fontFamily: "Zen Loop",
            fontSize: "18px",
            mt: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Har du ikke en bruger? Opret en her
        </Button>
      </Box>
    </Box>
  );
}
