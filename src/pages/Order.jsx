import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function Order() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onSubmit = (data) => {
    const orderPayload = {
      customer: data,
      cart,
      subtotal,
      createdAt: new Date().toISOString(),
    };

    console.log("ORDER SUBMITTED:", orderPayload);
    alert("Order request submitted!");

    clearCart();
    reset();
  };

  return (
    <section className="order-page">
      <div className="page-intro">
        <p className="eyebrow">Almost snack time</p>
        <h1>Place Your Order</h1>
        <p>Submit your order request and we’ll coordinate pickup/payment.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-order-card">
          <h2>Your cart is empty.</h2>
          <p>Add a brew or bite before placing an order.</p>
          <Link to="/menu" className="checkout-button">
            Back to Menu
          </Link>
        </div>
      ) : (
        <div className="order-layout">
          <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Name
              <input
                {...register("name", { required: "Name required" })}
                placeholder="Your name"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </label>

            <label>
              Instagram / Phone / Email
              <input
                {...register("contact", { required: "Contact required" })}
                placeholder="@username, phone, or email"
              />
              {errors.contact && <span>{errors.contact.message}</span>}
            </label>

            <label>
              Pickup Notes
              <textarea
                {...register("notes")}
                placeholder="Pickup time, allergies, or anything important."
                rows="5"
              />
            </label>

            <button type="submit" className="submit-order-button">
              Submit Order Request
            </button>
          </form>

          <aside className="order-summary">
            <h2>Your Order</h2>

            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="summary-total">
              <strong>Total: ${subtotal.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Order;