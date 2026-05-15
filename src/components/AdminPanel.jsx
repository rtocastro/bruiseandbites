import React from "react";

function AdminPanel({
  products,
  onUpdateStock,
  onToggleAvailability,
  onMakeSpecial,
}) {
  return (
    <section className="admin-panel">
      <h2>Inventory Control</h2>

      <div className="admin-grid">
        {products.map((item) => (
          <article key={item.id} className="admin-card">
            <img src={item.image} alt={item.name} />

            <div className="admin-info">
              <h3>{item.name}</h3>

              <p>
                Stock: <strong>{item.stock}</strong>
              </p>

              <p>
                Status:{" "}
                <strong>{item.isAvailable ? "Available" : "Unavailable"}</strong>
              </p>

              <p>
                Special: <strong>{item.featured ? "Yes" : "No"}</strong>
              </p>

              <div className="admin-controls">
                <button onClick={() => onUpdateStock(item.id, -1)}>-1</button>
                <button onClick={() => onUpdateStock(item.id, 1)}>+1</button>

                <button
                  onClick={() =>
                    onUpdateStock(item.id, item.dailyLimit - item.stock)
                  }
                >
                  Refill
                </button>

                <button onClick={() => onToggleAvailability(item.id)}>
                  Toggle
                </button>

                <button onClick={() => onMakeSpecial(item.id)}>
                  Make Special
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminPanel;