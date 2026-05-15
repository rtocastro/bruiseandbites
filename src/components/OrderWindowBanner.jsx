import React from "react";
import { getOrderWindowStatus } from "../utils/orderrWindow";

import pbOpen from "../assets/pb-open-sign.png";
import pbClosed from "../assets/pb-closed-sign.png";

function OrderWindowBanner() {
  const { isOpen, message, nextWindow } = getOrderWindowStatus();

  return (
    <section
      className={`order-window-banner ${isOpen ? "open" : "closed"}`}
    >
      <img
        src={isOpen ? pbOpen : pbClosed}
        alt={isOpen ? "PB Open" : "PB Closed"}
        className="pb-window-sign"
      />

      <p className="eyebrow">
        {isOpen ? "PB is serving" : "PB is napping"}
      </p>

      <h2>
        {isOpen ? "Orders Open" : "Orders Closed"}
      </h2>

      <p>{message}</p>

      {!isOpen && (
        <p className="next-window">
          {nextWindow}
        </p>
      )}
    </section>
  );
}

export default OrderWindowBanner;