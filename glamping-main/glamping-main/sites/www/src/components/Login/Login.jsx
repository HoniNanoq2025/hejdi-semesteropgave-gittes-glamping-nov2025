import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/fetch";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import styles from "./Login.module.css";

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
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="password"
            required
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#829B97",
            textTransform: "none",
            Height: "103px",
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
      </form>
    </div>
  );
}
