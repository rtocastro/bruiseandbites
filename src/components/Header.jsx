import React from "react";
import { Link, NavLink } from "react-router-dom";

import orderNow from "../assets/ordernowbutt.png";
import homeButton from "../assets/homebutt.png";
import pbMain from "../assets/pbmain.png";

function Header() {
  return (
    <header className="header-container">
      <Link to="/home" className="header-image-link" aria-label="Go home">
        <img src={homeButton} alt="Home" className="header-btn" />
      </Link>

      <Link to="/home" className="brand-link" aria-label="PB's Brews & Bites home">
        <img src={pbMain} alt="PB's Brews & Bites" className="brand-logo" />
      </Link>

      <Link to="/menu" className="header-image-link" aria-label="Order now">
        <img src={orderNow} alt="Order Now" className="header-btn" />
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/mission">Mission</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/request">Request</NavLink>
      </nav>
    </header>
  );
}

export default Header;