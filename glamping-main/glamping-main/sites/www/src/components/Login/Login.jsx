import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/fetch";
import { toast } from "react-toastify";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useLocalStorage("token", null);
  const [, setUserEmail] = useLocalStorage("userEmail", null);
  const [, setUserName] = useLocalStorage("userName", null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);

      toast.success("Login succesfuld");
      setToken(data.data.token);

      // Decode JWT token for at få brugerdata
      const user = jwtDecode(data.data.token);

      // Gem brugerdata i localStorage
      setUserEmail(user.email);
      setUserName(user.name);

      // Navigate baseret på rolle
      if (user.role === "admin") navigate("/backoffice");
      else navigate("/mylist");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Noget gik galt ved login");
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
        height: "100dvh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
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
          <TextField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              width: { xs: "330px", md: "600px" },
              "& .MuiOutlinedInput-root": {
                height: { xs: "35px", md: "45px" },
                borderRadius: "50px",
                backgroundColor: "transparent",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#c5b496",
                  boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
                },
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

        <Box
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
          <TextField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              width: { xs: "330px", md: "600px" },
              "& .MuiOutlinedInput-root": {
                height: { xs: "35px", md: "45px" },
                borderRadius: "50px",
                backgroundColor: "transparent",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#c5b496",
                  boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
                },
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

        <Button
          type="submit"
          variant="contained"
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
              backgroundColor: "#2A4F57",
              color: "white",
              border: "1px solid white",
            },
          }}
        >
          Login
        </Button>

        <Button
          variant="text"
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
