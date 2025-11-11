import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../api/fetch";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";

export default function ContactForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "booking",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", data.name);
      formDataToSend.append("email", data.email);
      formDataToSend.append("subject", data.subject);
      formDataToSend.append("message", data.message);

      const result = await createContact(formDataToSend);

      if (result.status === "ok") {
        toast.success(
          data.subject === "booking"
            ? "Din bookingforespørgsel er sendt!"
            : "Dit spørgsmål er sendt!"
        );
        navigate("/message-sent", {
          state: {
            name: data.name,
            subject: data.subject,
          },
        });
      } else {
        toast.error("Der skete en fejl. Prøv igen.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.error("Noget gik galt. Prøv igen");
    } finally {
      setLoading(false);
    }
  };

  // Fælles styling for alle inputs
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      fontFamily: "Zen Loop, sans-serif",
      fontSize: { xs: "1.2rem", md: "24px" },
      backgroundColor: "transparent",
      "& fieldset": {
        borderColor: "white",
        borderRadius: "50px",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c5b496",
        boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
      },
      "& input": {
        paddingLeft: "15px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontFamily: "Zen Loop, sans-serif",
      fontSize: { xs: "24px", md: "24px" },
      fontWeight: 400,
      "&.Mui-focused": {
        color: "white",
      },
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
      opacity: 1,
    },
  };

  const textareaStyles = {
    ...inputStyles,
    "& .MuiOutlinedInput-root": {
      ...inputStyles["& .MuiOutlinedInput-root"],
      "& fieldset": {
        borderColor: "white",
        borderRadius: "25px",
      },
    },
  };

  const selectStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      fontFamily: "Zen Loop, sans-serif",
      fontSize: { xs: "1.2rem", md: "24px" },
      backgroundColor: "transparent",
      borderRadius: "50px",
      "& fieldset": {
        borderColor: "white",
        borderRadius: "50px",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c5b496",
        boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
      },
      "& .MuiSelect-select": {
        borderRadius: "50px",
        paddingLeft: "15px",
        paddingY: "10px",
        display: "flex",
        alignItems: "center",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "50px",
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c5b496", // gylden hover
      boxShadow: "0 0 6px rgba(197, 180, 150, 0.4)",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c5b496",
      boxShadow: "0 0 10px rgba(197, 180, 150, 0.5)",
    },
    "& .MuiSelect-icon": {
      color: "white",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "330px", md: "600px" },
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "transparent",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          width: "100%",
        }}
      >
        {/* Navn */}
        <FormControl fullWidth error={!!errors.name}>
          <InputLabel
            htmlFor="name"
            shrink
            sx={{
              position: "relative",
              transform: "none",
              marginBottom: "0.5rem",
              textAlign: "center",
              width: "100%",
              color: "white",
              fontFamily: "Zen Loop, sans-serif",
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            Navn
          </InputLabel>
          <TextField
            id="name"
            type="text"
            placeholder="Dit navn..."
            {...register("name", {
              required: "Navn er påkrævet",
              minLength: {
                value: 2,
                message: "Navn skal være mindst 2 tegn",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              ...inputStyles,
              "& .MuiFormHelperText-root": {
                color: "#ff6b6b",
                fontFamily: "Zen Loop, sans-serif",
                textAlign: "center",
              },
            }}
          />
        </FormControl>

        {/* Email */}
        <FormControl fullWidth error={!!errors.email}>
          <InputLabel
            htmlFor="email"
            shrink
            sx={{
              position: "relative",
              transform: "none",
              marginBottom: "0.5rem",
              textAlign: "center",
              width: "100%",
              color: "white",
              fontFamily: "Zen Loop, sans-serif",
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            Email
          </InputLabel>
          <TextField
            id="email"
            type="email"
            placeholder="Din email adresse..."
            {...register("email", {
              required: "Email er påkrævet",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ugyldig email adresse",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              ...inputStyles,
              "& .MuiFormHelperText-root": {
                color: "#ff6b6b",
                fontFamily: "Zen Loop, sans-serif",
                textAlign: "center",
              },
            }}
          />
        </FormControl>

        {/* Subject */}
        <FormControl fullWidth error={!!errors.subject}>
          <InputLabel
            htmlFor="subject"
            shrink
            sx={{
              position: "relative",
              transform: "none",
              marginBottom: "0.5rem",
              textAlign: "center",
              width: "100%",
              fontFamily: "Zen Loop, sans-serif",
              fontSize: "24px",
              fontWeight: 400,
              color: "white",
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Hvad drejer henvendelsen sig om?
          </InputLabel>
          <Select
            id="subject"
            {...register("subject", {
              required: "Vælg venligst et emne",
            })}
            defaultValue="booking"
            sx={selectStyles}
            renderValue={(selected) => {
              return (
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "Zen Loop",
                    fontSize: 24,
                  }}
                >
                  {selected === "booking" ? "Booking" : "Spørgsmål"}
                </span>
              );
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#c5b496",
                  "& .MuiMenuItem-root": {
                    color: "white",
                    fontFamily: "Zen Loop, sans-serif",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="booking">Booking</MenuItem>
            <MenuItem value="question">Spørgsmål</MenuItem>
          </Select>
          {errors.subject && (
            <FormHelperText
              sx={{
                color: "#ff6b6b",
                fontFamily: "Zen Loop, sans-serif",
                textAlign: "center",
              }}
            >
              {errors.subject.message}
            </FormHelperText>
          )}
        </FormControl>

        {/* Message */}
        <FormControl fullWidth error={!!errors.message}>
          <InputLabel
            htmlFor="message"
            shrink
            sx={{
              position: "relative",
              transform: "none",
              marginBottom: "0.5rem",
              textAlign: "center",
              width: "100%",
              color: "white",
              fontFamily: "Zen Loop, sans-serif",
              fontSize: "24px",
              fontWeight: 400,
            }}
          >
            Besked (Skriv dato'er, hvis det drejer sig om en booking)
          </InputLabel>
          <TextField
            id="message"
            multiline
            rows={8}
            {...register("message", {
              required: "Besked er påkrævet",
              minLength: {
                value: 10,
                message: "Beskeden skal være mindst 10 tegn",
              },
            })}
            error={!!errors.message}
            helperText={errors.message?.message}
            sx={{
              ...textareaStyles,
              "& .MuiFormHelperText-root": {
                color: "#ff6b6b",
                fontFamily: "Zen Loop, sans-serif",
                textAlign: "center",
              },
            }}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          sx={{
            height: "103px",
            width: "265px",
            backgroundColor: "#829b97",
            color: "white",
            border: "none",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            fontFamily: "Zen Loop, cursive",
            fontSize: "48px",
            cursor: "pointer",
            transition: "all 0.3s",
            marginTop: "20px",
            textTransform: "none",
            "&:hover:not(:disabled)": {
              backgroundColor: "#2a4f57",
              border: "1px solid white",
              transform: "scale(1.02)",
            },
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
              color: "white",
            },
            "&:active:not(:disabled)": {
              transform: "scale(0.98)",
            },
          }}
        >
          {loading ? "Sender..." : "Indsend"}
        </Button>
      </Box>
    </Box>
  );
}
