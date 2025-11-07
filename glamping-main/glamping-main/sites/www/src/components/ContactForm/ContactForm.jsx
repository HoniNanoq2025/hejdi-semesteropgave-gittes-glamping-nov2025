import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../api/fetch";
import { toast } from "react-toastify";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const navigate = useNavigate();

  // State til de forskellige inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "booking",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // Vi henter name attributten (f.eks. "email", "message") samt value værdien (hvad brugeren har skrevet)
    const { name, value } = e.target;
    // prev er den nuværende state (formData)
    setFormData((prev) => ({
      ...prev, // Kopierer alle eksisterende værdier
      [name]: value, // Opdaterer kun det specifikke felt
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Opret FormData objekt
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      // Send data til backend
      const result = await createContact(formDataToSend);

      if (result.status === "ok") {
        toast.success(
          subject === "booking"
            ? "Din bookingforespørgsel er sendt!"
            : "Dit spørgsmål er sendt!"
        );
        navigate("/message-sent", {
          state: {
            name: formData.name,
            subject: formData.subject,
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Navn</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Dit navn..."
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Din email adresse..."
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject">Hvad drejer henvendelsen sig om?</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="booking">Booking</option>
            <option value="question">Spørgsmål</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">
            Besked (Skriv dato’er, hvis det drejer sig om en booking)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={8}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Sender..." : "Indsend"}
        </button>
      </form>
    </div>
  );
}
