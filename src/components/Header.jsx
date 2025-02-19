import React from 'react';
import { Link } from 'react-router-dom';
import ordernow from '../assets/ordernowbutt.png';
import homebutt from '../assets/homebutt.png';

function Header() {
  return (
    <header className="header-container">
      <div className="header-left">
        <Link to="/">
          <img src={homebutt} alt="Home" className="header-btn" />
        </Link>
      </div>
      -center
      <div className="header-right">
        <Link to="/">
          <img src={ordernow} alt="Order Now" className="header-btn" />
        </Link>
      </div>

    </header>
  );
}

export default Header;