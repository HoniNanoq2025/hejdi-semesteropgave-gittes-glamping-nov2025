import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Hero from "../../components/Hero/Hero";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import { fetchActivities } from "../../api/fetch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import heroMyList from "../../assets/image_05.jpg";

export default function MyList() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        setActivities(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Kunne ikke hente aktiviteter");
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, []);

  // Filtrer aktiviteter baseret på favoritter
  const favoriteActivities = activities.filter((activity) =>
    favorites.includes(activity._id)
  );

  const favoriteCount = favorites.length;

  const handleClearAll = () => {
    if (window.confirm("Er du sikker på at du vil fjerne alle favoritter?")) {
      setFavorites([]);
    }
  };

  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={heroMyList}
        title="Min liste"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />

      {/* Header Box - overlapper billede */}
      <Box
        className="myList-header-container"
        sx={{
          position: "relative",
          backgroundColor: "#33626C",
          color: "white",
          mt: { xs: -14, md: -16 },
          borderTopLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          px: { xs: 2, sm: 4 }, //px: 2 = padding-left + padding-right: 16px / 32px
          pt: 10,
          pb: 4,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Zen Loop",
              fontSize: "64px",
              fontWeight: 400,
              color: "white",
              px: { xs: 10, md: 0 },
              mb: 4,
            }}
          >
            Antal aktiviteter på listen:
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Nanum Gothic",
              fontSize: "64px",
              fontWeight: 400,
              color: "white",
              mb: 5,
            }}
          >
            {favoriteCount}
          </Typography>

          {/* Clear All button */}
          {favoriteCount > 0 && (
            <Button
              variant="outlined"
              /* startIcon={<DeleteIcon fontSize="large" />} */
              onClick={handleClearAll}
              sx={{
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
                lineHeight: 1,
                "&:hover": { backgroundColor: "#2A4F57" },
              }}
            >
              <DeleteIcon sx={{ fontSize: 48, mr: 1, mb: 0.5 }} />
              Ryd favoritter
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "transparent",
          my: 12,
        }}
      >
        {/* Loading state */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress size={60} sx={{ color: "#33626C" }} />
            <Typography
              variant="h6"
              sx={{ mt: 2, color: "text.secondary", fontFamily: "Zen Loop" }}
            >
              Henter dine favoritter...
            </Typography>
          </Box>
        )}

        {/* Tom liste */}
        {!loading && favoriteActivities.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Zen Loop",
                fontSize: "32px",
                color: "#33626C",
                mb: 2,
              }}
            >
              Du har ikke tilføjet nogen favoritter endnu
            </Typography>
            <Typography
              sx={{
                fontFamily: "Zen Loop",
                fontSize: "20px",
                color: "text.secondary",
              }}
            >
              Gå til Aktiviteter-siden og klik på hjertet for at tilføje
              aktiviteter til din liste
            </Typography>
          </Box>
        )}

        {/* Aktivitetsliste */}
        {!loading && favoriteActivities.length > 0 && (
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems={{ xs: "center", md: "stretch" }}
            gap="80px"
            sx={{ mt: 2, flexWrap: "wrap" }}
          >
            {favoriteActivities.map((activity) => (
              <ActivityCard key={activity._id} activity={activity} />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
