import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

export default function ReviewList({ reviews }) {
  return (
    <Box
      className="reviews"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      sx={{ py: "50px" }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#C5B496",
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          maxWidth: { xs: "300px", md: "370px" },
          px: 3, //px: 3 = padding-left + padding-right: 24px
          py: 2, // py: 2 = padding-top + padding-bottom: 16px
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Zen Loop",
            /* fontSize: { xs: "64px", sm: "80px", md: "96px" }, */
            fontWeight: 400,
            color: "white",
            textAlign: "center",
          }}
        >
          Vores gæster udtaler
        </Typography>
      </Box>

      {/* REVIEW CARDS */}
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ xs: "center", md: "stretch" }} // stretch få flugter kort i toppen
        gap="28px"
        sx={{ mt: 2, flexWrap: "wrap" }}
      >
        {reviews.map((review) => (
          <Card
            key={review._id}
            sx={{
              backgroundColor: "#829B97",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              width: "300px",
              px: "17px", //px = padding-left + padding-right
              py: "43px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: { md: "100%" },
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Zen Loop",
                  fontSize: { xs: "32px" },
                  color: "white",
                }}
              >
                {review.name}, {review.age}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Zen Loop",
                  fontSize: { xs: "32px" },
                  color: "white",
                }}
              >
                Har været på {review.stay}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Nanum Gothic",
                  fontSize: { xs: "15px" },
                  fontWeight: 400,
                  color: "white",
                  mt: 2,
                }}
              >
                {review.review}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
