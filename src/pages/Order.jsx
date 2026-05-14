import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
        formState: { errors },
    } = useForm();

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const onSubmit = async (data) => {
        if (cart.length === 0) return;

        setIsSubmitting(true);
        setSuccessMessage("");

        const orderPayload = {
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
            createdAt: serverTimestamp(),
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentMethod === "pickup" ? "pending_pickup" : "pending_payment",
        };

        try {
            await addDoc(collection(db, "orders"), orderPayload);

            setSuccessMessage("Order request submitted! We’ll follow up soon.");
            clearCart();
            reset();
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
                                {errors.paymentMethod && <span>{errors.paymentMethod.message}</span>}
                            </label>
                        </label>

                        <label>
                            Pickup Notes
                            <textarea
                                {...register("notes")}
                                placeholder="Pickup time, allergies, or anything important."
                                rows="5"
                            />
                        </label>

                        <button
                            type="submit"
                            className="submit-order-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Order Request"}
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