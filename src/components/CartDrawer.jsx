import React from "react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button onClick={onClose} className="cart-close">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty right now.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>

                    <div className="cart-qty">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        disabled={item.quantity >= item.stock}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <p>
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </p>



<Link to="/order" className="checkout-button" onClick={onClose}>
  Continue to Order
</Link>

              <button className="clear-cart" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;