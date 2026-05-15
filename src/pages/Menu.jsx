import React, { useEffect, useState } from "react";
import { categories } from "../data/menuItems";
import { useCartStore } from "../store/useCartStore";
import AdminPanel from "../components/AdminPanel";
import DailySpecial from "../components/DailySpecial";

import {
  getInventory,
  seedInventory,
  updateInventoryItem,
} from "../services/inventoryService";

import classicPbj from "../assets/classicpbj.png";
import coldBrew from "../assets/coldbrew.png";

const starterProducts = [
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
    featured: false,
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
    featured: true,
    specialNote: "Stronger than the will of your grocery bags to hold stuff.",
  },
];

const handleMakeSpecial = async (id) => {
  const updatedProducts = products.map((item) => ({
    ...item,
    featured: item.id === id,
  }));

  setProducts(updatedProducts);

  await Promise.all(
    updatedProducts.map((item) =>
      updateInventoryItem(item.id, {
        featured: item.featured,
      })
    )
  );
};

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState(starterProducts);
  const [isLoading, setIsLoading] = useState(true);

  const isAdminMode =
    new URLSearchParams(window.location.search).get("admin") === "true";

  const [showAdmin, setShowAdmin] = useState(isAdminMode);

  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const inventory = await getInventory();

        if (inventory.length === 0) {
          await seedInventory(starterProducts);
          setProducts(starterProducts);
        } else {
          const mergedProducts = starterProducts.map((product) => {
            const savedItem = inventory.find((item) => item.id === product.id);

            return savedItem
              ? {
                ...product,
                stock: savedItem.stock,
                dailyLimit: savedItem.dailyLimit,
                isAvailable: savedItem.isAvailable,
                batchNote: savedItem.batchNote,
              }
              : product;
          });

          setProducts(mergedProducts);
        }
      } catch (error) {
        console.error("Inventory load error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInventory();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  const getCartQuantity = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleUpdateStock = async (id, amount) => {
    const itemToUpdate = products.find((item) => item.id === id);
    if (!itemToUpdate) return;

    const updatedStock = Math.max(itemToUpdate.stock + amount, 0);

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: updatedStock } : item
      )
    );

    await updateInventoryItem(id, {
      stock: updatedStock,
    });
  };

  const handleToggleAvailability = async (id) => {
    const itemToUpdate = products.find((item) => item.id === id);
    if (!itemToUpdate) return;

    const updatedAvailability = !itemToUpdate.isAvailable;

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isAvailable: updatedAvailability }
          : item
      )
    );

    await updateInventoryItem(id, {
      isAvailable: updatedAvailability,
    });
  };

  if (isLoading) {
    return (
      <section className="menu-page">
        <div className="page-intro">
          <p className="eyebrow">Loading today&apos;s batch...</p>
          <h1>Menu</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="menu-page">
      <div className="page-intro">
        <p className="eyebrow">Small batch. Early morning. PB-approved.</p>
        <h1>Menu</h1>
        <p>Simple brews and bites made for quick morning fuel.</p>
      </div>

      <DailySpecial
        item={products.find((item) => item.featured)}
        onAdd={addItem}
        remainingStock={Math.max(
          (products.find((item) => item.featured)?.stock || 0) -
          getCartQuantity(products.find((item) => item.featured)?.id),
          0
        )}
        isSoldOut={
          !products.find((item) => item.featured)?.isAvailable ||
          products.find((item) => item.featured)?.stock <= 0 ||
          Math.max(
            (products.find((item) => item.featured)?.stock || 0) -
            getCartQuantity(products.find((item) => item.featured)?.id),
            0
          ) <= 0
        }
      />

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

      {isAdminMode && (
        <div className="admin-toggle-wrap">
          <button
            className="admin-toggle-button"
            onClick={() => setShowAdmin((prev) => !prev)}
          >
            {showAdmin ? "Hide Inventory Controls" : "Owner Inventory Controls"}
          </button>
        </div>
      )}

      {showAdmin && (
        <AdminPanel
          products={products}
          onUpdateStock={handleUpdateStock}
          onToggleAvailability={handleToggleAvailability}
          onMakeSpecial={handleMakeSpecial}
        />
      )}
    </section>
  );
}

export default Menu;