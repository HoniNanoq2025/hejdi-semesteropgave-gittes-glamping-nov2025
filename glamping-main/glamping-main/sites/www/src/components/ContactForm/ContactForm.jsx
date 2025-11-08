import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../api/fetch";
import { toast } from "react-toastify";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State til de forskellige inputs
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      // Opret FormData objekt
      const formDataToSend = new FormData();
      formDataToSend.append("name", data.name);
      formDataToSend.append("email", data.email);
      formDataToSend.append("subject", data.subject);
      formDataToSend.append("message", data.message);

      // Send data til backend
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

  return (
    <div className="styles.container">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Navn</label>
          <input
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
            className={`${styles.input} ${
              errors.name ? styles.inputError : ""
            }`}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
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
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject">Hvad drejer henvendelsen sig om?</label>
          <select
            id="subject"
            {...register("subject", {
              required: "Vælg venligst et emne",
            })}
            className={`${styles.input} ${
              errors.subject ? styles.inputError : ""
            }`}
            aria-invalid={errors.subject ? "true" : "false"}
          >
            <option value="booking">Booking</option>
            <option value="question">Spørgsmål</option>
          </select>
          {errors.subject && (
            <span className={styles.error}>{errors.subject.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">
            Besked (Skriv dato’er, hvis det drejer sig om en booking)
          </label>
          <textarea
            id="message"
            rows={8}
            {...register("message", {
              required: "Besked er påkrævet",
              minLength: {
                value: 10,
                message: "Beskeden skal være mindst 10 tegn",
              },
            })}
            className={`${styles.input} ${
              errors.subject ? styles.inputError : ""
            }`}
            aria-invalid={errors.subject ? "true" : "false"}
          />
          {errors.message && (
            <span className={styles.error}>{errors.message.message}</span>
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Sender..." : "Indsend"}
        </button>
      </form>
    </div>
  );
}
