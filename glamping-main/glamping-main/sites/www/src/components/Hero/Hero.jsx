import { Box, Typography, Button, Stack } from "@mui/material";

export default function Hero({
  variant = "simple",
  backgroundImage,
  title,
  ...props
}) {
  const isHome = variant === "home";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: isHome
          ? { xs: "844px", md: "80vh" }
          : { xs: "694px", md: "70vh" },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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

      {/* Stack erstatter behov for at skrive display:flex, flexDirection og gap manuelt */}
      <Stack
        spacing={{ xs: 2, md: 3 }}
        alignItems="center"
        textAlign="center"
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          px: { xs: 2, sm: 4 },
        }}
      >
        {isHome && props.logo && (
          <Box
            component="img"
            src={props.logo}
            alt="Logo"
            sx={{
              width: { xs: 72, sm: 112, md: 152 },
              filter: "brightness(0) invert(1)",
            }}
          />
        )}

        <Typography
          component={isHome ? "h2" : "h1"}
          sx={{
            fontFamily: "Zen Loop",
            fontSize: isHome
              ? { xs: "64px", sm: "80px", md: "96px" } // Home ("Gittes")
              : { xs: "96px", sm: "120px", md: "144px" }, // Undersider + Home: Glamping
            fontWeight: isHome ? 400 : 700,
            lineHeight: 1,
          }}
        >
          {isHome ? props.titlePart1 : title}
        </Typography>

        {isHome && (
          <Typography
            component={"h1"}
            sx={{
              fontFamily: "Zen Loop",
              fontSize: { xs: "96px", sm: "120px", md: "144px" },
              fontWeight: 700,
              lineHeight: 1,
              mt: "-10px",
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
              px: { xs: 2, sm: 4 },
              py: 1.5,
              fontFamily: "Zen Loop",
              fontSize: "48px",
              "&:hover": { backgroundColor: "#829B97" },
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
