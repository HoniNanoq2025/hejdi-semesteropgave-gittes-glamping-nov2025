import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../../assets/logo.png";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.soMe}>
          <AiFillFacebook />
          <AiFillInstagram />
        </div>
        <div className={styles.siteOwner}>
          <Link to="/">
            <img src={logo} alt="Gittes Glamping" height="52" />
          </Link>
          <p>Gittes Glamping</p>
        </div>
      </div>
    </footer>
  );
}
