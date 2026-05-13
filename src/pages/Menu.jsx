import React, { useState } from "react";
import { categories } from "../data/menuItems";
import { useCartStore } from "../store/useCartStore";
import AdminPanel from "../components/AdminPanel";

import classicPbj from "../assets/classicpbj.png";
import coldBrew from "../assets/coldbrew.png";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAdmin, setShowAdmin] = useState(false);

  const [products, setProducts] = useState([
    {
      id: "classic-pbj-strawberry",
      name: "Classic PB&J (Strawberry)",
      category: "Bite",
      price: 2.22,
      image: classicPbj,
      description: "Strawberry PB&J on soft white bread.",
      stock: 12,
      dailyLimit: 12,
      isAvailable: true,
      ingredients: ["Peanut butter", "Strawberry jam", "White bread"],
      batchNote: "Fresh batch prepared overnight.",
    },
    {
      id: "cold-brew-black",
      name: "Cold Brew (Black)",
      category: "Brew",
      price: 5.55,
      image: coldBrew,
      description: "Iced cold brew coffee.",
      stock: 8,
      dailyLimit: 8,
      isAvailable: true,
      ingredients: ["Organic dark roast coffee"],
      batchNote: "Cold brew steeped overnight.",
    },
  ]);

  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);

  const filteredItems =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  const getCartQuantity = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleUpdateStock = (id, amount) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedStock = Math.max(item.stock + amount, 0);

        return {
          ...item,
          stock: updatedStock,
        };
      })
    );
  };

  const handleToggleAvailability = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
  };

  return (
    <section className="menu-page">
      <div className="page-intro">
        <p className="eyebrow">Small batch. Early morning. PB-approved.</p>
        <h1>Menu</h1>
        <p>Simple brews and bites made for quick morning fuel.</p>
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
          const cartQuantity = getCartQuantity(item.id);
          const remainingStock = Math.max(item.stock - cartQuantity, 0);
          const isSoldOut = item.stock <= 0 || !item.isAvailable;
          const isMaxedOut = remainingStock <= 0;

          return (
            <article className="product-card" key={item.id}>
              <div className="product-image-wrap">
                <img src={item.image} alt={item.name} />

                {(isSoldOut || isMaxedOut) && (
                  <span className="sold-out-badge">
                    {isSoldOut ? "Sold Out" : "Max Added"}
                  </span>
                )}
              </div>

              <div className="product-info">
                <p className="product-category">{item.category}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p className="product-price">${item.price.toFixed(2)}</p>

                <p className="product-stock">
                  {isSoldOut
                    ? "Currently unavailable"
                    : `${remainingStock} left today`}
                </p>

                <p className="batch-note">{item.batchNote}</p>

                {cartQuantity > 0 && (
                  <p className="in-cart-note">
                    {cartQuantity} currently in your cart
                  </p>
                )}

                <details>
                  <summary>Ingredients</summary>
                  <p>{item.ingredients.join(", ")}</p>
                </details>

                <button
                  className="order-button"
                  disabled={isSoldOut || isMaxedOut}
                  onClick={() => addItem(item)}
                >
                  {isSoldOut
                    ? "Sold Out"
                    : isMaxedOut
                    ? "All Available Added"
                    : "Add to Order"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="admin-toggle-wrap">
        <button
          className="admin-toggle-button"
          onClick={() => setShowAdmin((prev) => !prev)}
        >
          {showAdmin ? "Hide Inventory Controls" : "Owner Inventory Controls"}
        </button>
      </div>

      {showAdmin && (
        <AdminPanel
          products={products}
          onUpdateStock={handleUpdateStock}
          onToggleAvailability={handleToggleAvailability}
        />
      )}
    </section>
  );
}

export default Menu;