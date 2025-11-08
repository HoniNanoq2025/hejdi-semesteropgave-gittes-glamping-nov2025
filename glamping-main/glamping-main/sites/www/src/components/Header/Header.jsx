import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.png";

// styled() bruges til genanvendte komponenter
const BurgerButton = styled(IconButton)({
  backgroundColor: "#2a4f57",
  width: "64px",
  height: "52px",
  borderTopLeftRadius: "25px",
  borderBottomRightRadius: "25px",
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  color: "white",
  padding: 0,
  "&:hover": {
    backgroundColor: "#2a4f57",
  },
});

const StyledNavLink = styled(NavLink)({
  color: "white",
  textDecoration: "none",
  fontSize: "2rem",
  fontWeight: 500,
  fontFamily: '"Zen Loop", sans-serif',
  transition: "color 0.2s ease",
  "&:hover, &.active": {
    color: "#2a4f57",
    fontSize: "2.5rem",
  },
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useLocalStorage("token", null);
  const handleLinkClick = () => setMenuOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isFrontPage = location.pathname === "/";

  const handleLogout = () => {
    setToken(null);
    toast.info("Du er nu logget ud");
    handleLinkClick();
    navigate("/");
  };

  return (
    /* MUI Application Bar - bruges typisk til headers og navbars */
    <AppBar
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        position: "fixed",
        zIndex: 10,
      }}
    >
      {/* Toolbar er en Layout-hjælper, som skal være inde i en AppBar */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          minHeight: "auto",
        }}
      >
        <Box
          sx={{
            visibility: isFrontPage ? "hidden" : "visible",
            "& img": {
              height: "52px",
              width: "52px",
            },
          }}
        >
          <NavLink to="/">
            <img src={logo} alt="Gittes Glamping" />
          </NavLink>
        </Box>

        <BurgerButton onClick={() => setMenuOpen(true)}>
          <RxHamburgerMenu size={28} />
        </BurgerButton>

        {/* Drawer (skuffe) er et slide-out panel der agerer full screen menu, som åbner, når man klikker på BurgerButton */}
        <Drawer
          anchor="top"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#829b97",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          {/* Klik på krydset for at lukke full screen menu */}
          <IconButton
            onClick={() => setMenuOpen(false)}
            sx={{
              position: "absolute",
              top: "1.2rem",
              right: "1.5rem",
              color: "white",
            }}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Liste (lidt a la <ul>), der fungerer som nav) */}
          <List
            component="nav"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <ListItem sx={{ padding: 0, justifyContent: "center" }}>
              <StyledNavLink to="/stays" onClick={handleLinkClick}>
                Ophold
              </StyledNavLink>
            </ListItem>
            <ListItem sx={{ padding: 0, justifyContent: "center" }}>
              <StyledNavLink to="/contact" onClick={handleLinkClick}>
                Kontakt
              </StyledNavLink>
            </ListItem>
            <ListItem sx={{ padding: 0, justifyContent: "center" }}>
              <StyledNavLink to="/activities" onClick={handleLinkClick}>
                Aktiviteter
              </StyledNavLink>
            </ListItem>
            <ListItem sx={{ padding: 0, justifyContent: "center" }}>
              <StyledNavLink to="/mylist" onClick={handleLinkClick}>
                Min liste
              </StyledNavLink>
            </ListItem>
            <ListItem sx={{ padding: 0, justifyContent: "center" }}>
              <StyledNavLink to="/backoffice" onClick={handleLinkClick}>
                Backoffice
              </StyledNavLink>
            </ListItem>
            {token ? (
              <ListItem sx={{ padding: 0, justifyContent: "center" }}>
                <StyledNavLink to="/" onClick={handleLogout}>
                  Logout
                </StyledNavLink>
              </ListItem>
            ) : (
              <ListItem sx={{ padding: 0, justifyContent: "center" }}>
                <StyledNavLink to="/auth/signin" onClick={handleLinkClick}>
                  Login
                </StyledNavLink>
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
