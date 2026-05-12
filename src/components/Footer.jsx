import React from "react";
import { Link } from "react-router-dom";

import igLogo from "../assets/igfootlogo.png";

function Footer() {
  return (
    <footer className="footer-container">
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noreferrer"
        className="footer-social-link"
      >
        <img src={igLogo} className="footer-btn" alt="Instagram" />
      </a>

      <p>Follow us on IG!</p>

      <Link to="/contact" className="footer-link">
        Questions? Contact PB&apos;s
      </Link>
    </footer>
  );
}

export default Footer;