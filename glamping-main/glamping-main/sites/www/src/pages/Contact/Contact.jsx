import Hero from "../../components/Hero/Hero";
import ContactForm from "../../components/ContactForm/ContactForm";
import heroContact from "../../assets/image_03.jpg";
import { Box, Typography, Stack } from "@mui/material";

export default function Contact() {
  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={heroContact}
        title="Kontakt Gitte"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />

      <Box
        className="contact-container"
        sx={{
          position: "relative",
          backgroundColor: "#33626C",
          color: "white",
          mt: { xs: -14, md: -16 },
          borderTopLeftRadius: "50px",
          px: { xs: 2, sm: 4 }, //px: 2 = padding-left + padding-right: 16px / 32px
          pt: 10,
          pb: 4,
          zIndex: 2,
        }}
      >
        <Stack
          className="contact-stack"
          spacing={0}
          alignItems="center"
          textAlign="center"
        >
          {/* Header */}
          <Typography
            variant="h2"
            className="contact-h2-header-pt1"
            sx={{
              fontFamily: "Zen Loop",
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: "100%",
              px: 3,
              mx: 3,
            }}
          >
            Vil du booke et ophold?
          </Typography>
          <Typography
            variant="h2"
            className="contact-h2-header-pt2"
            sx={{
              fontFamily: "Zen Loop",
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: "100%",
              px: 1,
              mx: 1,
              mb: 3,
            }}
          >
            Eller har du blot et spørgsmål?
          </Typography>

          {/* Brødtekst */}
          <Typography
            variant="body3"
            className="contact-text"
            sx={{
              fontFamily: "Nanum Gothic",
              fontSize: "16px",
              width: { xs: "351px", md: "600px" },
              mb: 6,
            }}
          >
            Så tøv ikke med at tage kontakt til os herunder. <br />
            Vi bestræber os på at svare på henvendelser indenfor 24 timer, men
            op til ferier kan der være travlt, og svartiden kan derfor være op
            til 48 timer.
          </Typography>
        </Stack>
      </Box>
      <Box
        className="form-container"
        sx={{
          backgroundColor: "#33626C",
          color: "white",
          pb: 8,
          zIndex: 2,
        }}
      >
        <ContactForm />
      </Box>
    </>
  );
}
