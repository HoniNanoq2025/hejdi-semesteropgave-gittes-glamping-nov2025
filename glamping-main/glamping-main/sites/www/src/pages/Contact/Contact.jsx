import Hero from "../../components/Hero/Hero";
import ContactForm from "../../components/ContactForm/ContactForm";
import heroContact from "../../assets/image_03.jpg";

export default function Contact() {
  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={heroContact}
        title="Kontakt Gitte"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />

      <ContactForm />
    </>
  );
}
