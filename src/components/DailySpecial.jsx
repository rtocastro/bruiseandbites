import React from "react";

function DailySpecial({ item, onAdd, remainingStock, isSoldOut }) {
  if (!item) return null;

  return (
    <section className="daily-special">
      <div>
        <p className="eyebrow">Today&apos;s Special</p>
        <h2>{item.name}</h2>
        <p>{item.specialNote || item.description}</p>
        <p className="product-price">${item.price.toFixed(2)}</p>
        <p className="product-stock">
          {isSoldOut ? "Currently unavailable" : `${remainingStock} left today`}
        </p>

        <button
          className="order-button"
          disabled={isSoldOut}
          onClick={() => onAdd(item)}
        >
          {isSoldOut ? "Sold Out" : "Add Special to Order"}
        </button>
      </div>

      <img src={item.image} alt={item.name} />
    </section>
  );
}

export default DailySpecial;