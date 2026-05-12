import React, { useState } from "react";
import { menuItems, categories } from "../data/menuItems";
import { useCartStore } from "../store/useCartStore";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const addItem = useCartStore((state) => state.addItem);
  const cart = useCartStore((state) => state.cart);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="menu-page">
      <div className="page-intro">
        <p className="eyebrow">Small batch. Early morning. PB-approved.</p>
        <h1>Menu</h1>
        <p>
          Simple brews and bites made for quick morning fuel: coffee, PB&amp;J,
          and cozy snack-shop energy.
        </p>

        <p className="cart-count">Current cart: {cartCount} item(s)</p>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredItems.map((item) => {
          const isSoldOut = item.stock <= 0;

          return (
            <article className="product-card" key={item.id}>
              <div className="product-image-wrap">
                <img src={item.image} alt={item.name} />
                {isSoldOut && <span className="sold-out-badge">Sold Out</span>}
              </div>

              <div className="product-info">
                <p className="product-category">{item.category}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>

                <p className="product-price">${item.price.toFixed(2)}</p>

                <p className="product-stock">
                  {isSoldOut ? "Currently unavailable" : `${item.stock} available`}
                </p>

                <details>
                  <summary>Ingredients</summary>
                  <p>{item.ingredients.join(", ")}</p>
                </details>

                <button
                  className="order-button"
                  disabled={isSoldOut}
                  onClick={() => addItem(item)}
                >
                  {isSoldOut ? "Sold Out" : "Add to Order"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Menu;