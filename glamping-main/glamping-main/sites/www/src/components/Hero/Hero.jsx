import { Box, Typography, Button, Stack } from "@mui/material";

export default function Hero({
  variant = "simple",
  backgroundImage,
  title,
  ...props
}) {
  const isHome = variant === "home";
  const isSimple = variant === "simple";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: isHome
          ? { xs: "740px", md: "80vh" }
          : { xs: "640px", md: "70vh" },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: isHome ? { xs: 8, md: 10 } : { xs: 10, md: 12 },
        pb: isHome ? { xs: 12, md: 14 } : { xs: 12, md: 14 },
      }}
    >
      {/* Overlay til Home */}
      {isHome && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#818181C7",
            zIndex: 1,
          }}
        />
      )}

      {/* Overlay til simple variant */}
      {isSimple && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#3636368F",
            zIndex: 1,
          }}
        />
      )}

      {/* Stack erstatter behov for at skrive display:flex, flexDirection og gap manuelt */}
      <Stack
        spacing={0}
        alignItems="center"
        textAlign="center"
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          px: { xs: 2, sm: 4 }, //px: 2 = padding-left + padding-right: 16px / 32px (tablet)
        }}
      >
        {isHome && props.logo && (
          <Box
            component="img"
            src={props.logo}
            alt="Logo"
            sx={{
              width: { xs: 72, sm: 82, md: 92 },
              filter: "brightness(0) invert(1)",
              mb: { xs: 2, md: 3 }, // margin-bottom: 16px på mobile / 24 px på desktop
            }}
          />
        )}

        <Typography
          component={isHome ? "h2" : "h1"}
          sx={{
            fontFamily: "Zen Loop",
            fontSize: isHome
              ? { xs: "64px", sm: "70px", md: "86px" } // Home ("Gittes")
              : { xs: "96px", sm: "100px", md: "120px" }, // Undersider + Home: Glamping
            fontWeight: isHome ? 700 : 400,
            lineHeight: 1,
            mb: isHome ? { xs: "-20px", sm: "-25px", md: "-30px" } : 0, // Ternary operator: Hvis isHome, så sæt margin-bottom på mobil, tablet og desktop, ellers er den 0,
          }}
        >
          {isHome ? props.titlePart1 : title}
          {/* Hvis isHome så brug props.titlePart1, ellers brug title */}
        </Typography>

        {isHome && (
          <Typography
            component={"h1"}
            sx={{
              fontFamily: "Zen Loop",
              fontSize: { xs: "96px", sm: "100px", md: "120px" },
              fontWeight: 700,
              lineHeight: 1,
              mb: { xs: 6, md: 8 }, // margin-bottom mobil: 48px, desktop: 64px
            }}
          >
            {props.titlePart2}
          </Typography>
        )}

        {isHome && props.buttonText && (
          <Button
            variant="outlined"
            sx={{
              width: "282px",
              color: "white",
              borderColor: "white",
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              px: { xs: 2, sm: 4 }, //px: 2 = padding-left + padding-right: 16px / 32px
              py: 1.5, // py: 1.5 = padding-top + padding-bottom: 12px
              fontFamily: "Zen Loop",
              fontSize: "48px",
              "&:hover": { backgroundColor: "#2A4F57" },
            }}
            onClick={props.onButtonClick}
          >
            {props.buttonText}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
