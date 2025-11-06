import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  // States til de forskellige inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const addContact = {
      name,
      email,
      subject,
      message,
    };

    try {
      toast.success(
        subject === "Booking"
          ? "Din bookingforespørgsel er sendt!"
          : "Dit spørgsmål er sendt!"
      );
      navigate("/message-sent", {
        state: {
          name,
          subject,
        },
      });
    } catch (err) {
      console.error("Noget gik galt i ContactForm", err);
      toast.error("Noget gik galt. Prøv igen");
    } finally {
      setLoading(false);
    }
  };
}
