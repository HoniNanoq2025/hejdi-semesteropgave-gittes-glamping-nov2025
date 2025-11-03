import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLinkClick = () => setMenuOpen(false);
  const location = useLocation();
  const isFrontPage = location.pathname === "/";

  return (
    <header className={styles.header}>
      {!isFrontPage && (
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={logo} alt="Gittes Glamping" />
          </NavLink>
        </div>
      )}

      <div className={styles.burgerIcon} onClick={() => setMenuOpen(true)}>
        <RxHamburgerMenu size={28} />
      </div>

      <div className={`${styles.overlay} ${menuOpen ? styles.show : ""}`}>
        <div className={styles.closeIcon} onClick={() => setMenuOpen(false)}>
          <IoClose size={28} />
        </div>
        <nav className={styles.mobileNav}>
          <NavLink
            to="/stays"
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            Ophold
          </NavLink>
          <NavLink
            to="/contact"
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            Kontakt
          </NavLink>
          <NavLink
            to="/activities"
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            Aktiviteter
          </NavLink>
          <NavLink
            to="/mylist"
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            Min liste
          </NavLink>
          <NavLink
            to="/backoffice"
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            Backoffice
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
