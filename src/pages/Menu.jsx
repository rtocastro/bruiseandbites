import React from "react";

import brewspic from "../assets/brewspic.png";
import sandwichpic from "../assets/sandwichpic.png";

function Menu() {
  return (
    <section className="menu-page">
      <div className="page-intro">
        <p className="eyebrow">Small batch. Early morning. PB-approved.</p>
        <h1>Menu</h1>
        <p>
          Simple brews and bites made for quick morning fuel: coffee, PB&amp;J,
          and cozy snack-shop energy.
        </p>
      </div>

      <div className="menu-grid">
        <article className="menu-card">
          <img src={brewspic} alt="Brews menu item" />
          <div>
            <h2>Brews</h2>
            <p>Coffee options for the early crew.</p>
          </div>
        </article>

        <article className="menu-card">
          <img src={sandwichpic} alt="PB and J sandwich menu item" />
          <div>
            <h2>Bites</h2>
            <p>PB&amp;J snacks prepared ahead and ready to go.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Menu;