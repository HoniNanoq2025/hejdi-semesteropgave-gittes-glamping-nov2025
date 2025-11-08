import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate;

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login succesfuld");
        setToken(data.token);

        const user = jwtDecode(data.token);
        if (user.role === "admin") navigate("/backoffice");
        else navigate("/mylist");
      } else toast.error(data.message || "Ugyldigt login");
    } catch (err) {
      console.error(err);
      toast.error("Noget gik galt ved login");
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
