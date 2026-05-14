import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useCartStore } from "../store/useCartStore";
import { db } from "../firebase/firebaseConfig";

function Order() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const paymentMethod = watch("paymentMethod");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const buildOrderPayload = (data, paymentDetails = null) => ({
    customer: data,
    items: cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      lineTotal: item.price * item.quantity,
    })),
    subtotal,
    status: "new",
    source: "PBs Brews & Bites website",
    paymentMethod: data.paymentMethod,
    paymentStatus:
      data.paymentMethod === "paypal" ? "paid_paypal" : "pending_pickup",
    paymentDetails,
    createdAt: serverTimestamp(),
  });

  const saveOrder = async (orderPayload) => {
    await addDoc(collection(db, "orders"), orderPayload);
    setSuccessMessage("Order request submitted! We’ll follow up soon.");
    clearCart();
    reset();
  };

  const onPickupSubmit = async (data) => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      await saveOrder(buildOrderPayload(data));
    } catch (error) {
      console.error("ORDER SAVE ERROR:", error);
      alert("Something went wrong saving the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="order-page">
      <div className="page-intro">
        <p className="eyebrow">Almost snack time</p>
        <h1>Place Your Order</h1>
        <p>Submit your order request and we’ll coordinate pickup/payment.</p>

        {successMessage && <p className="success-message">{successMessage}</p>}
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
          <form className="order-form" onSubmit={handleSubmit(onPickupSubmit)}>
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
              Payment Method
              <select
                {...register("paymentMethod", {
                  required: "Payment method required",
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose payment method
                </option>
                <option value="paypal">PayPal</option>
                <option value="pickup">Pay at pickup</option>
              </select>
              {errors.paymentMethod && (
                <span>{errors.paymentMethod.message}</span>
              )}
            </label>

            <label>
              Pickup Notes
              <textarea
                {...register("notes")}
                placeholder="Pickup time, allergies, or anything important."
                rows="5"
              />
            </label>

            {paymentMethod === "pickup" && (
              <button
                type="submit"
                className="submit-order-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Pickup Order"}
              </button>
            )}

            {paymentMethod === "paypal" && (
              <div className="paypal-box">
                <p>Pay securely with PayPal to submit your order.</p>

                <PayPalScriptProvider
                  options={{
                    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      shape: "pill",
                      label: "paypal",
                    }}
                    onClick={async (data, actions) => {
                      const valid = await trigger([
                        "name",
                        "contact",
                        "paymentMethod",
                      ]);

                      if (!valid) return actions.reject();

                      return actions.resolve();
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            description: "PBs Brews & Bites Order",
                            amount: {
                              currency_code: "USD",
                              value: subtotal.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      setIsSubmitting(true);
                      setSuccessMessage("");

                      try {
                        const paymentDetails = await actions.order.capture();
                        const formData = getValues();

                        await saveOrder(
                          buildOrderPayload(formData, paymentDetails)
                        );
                      } catch (error) {
                        console.error("PAYPAL ORDER ERROR:", error);
                        alert(
                          "Payment went through, but saving the order failed. Please contact us."
                        );
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
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