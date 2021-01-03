import React from "react";
import "./Payment.css";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../StateProvider";

import BasketItem from "../checkout/basketitem/BasketItem";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const address = "122, Main Streeet, Kandana, Sri Lanka";

  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <br />
            <textarea disabled rows="6" value={address}></textarea>
            <button> Update Address </button>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment_Items">
            {basket?.map((basketitem) => (
              <BasketItem key={basketitem.id} basketitem={basketitem} />
            ))}
          </div>
        </div>

        <div className="payment_section"></div>
      </div>
    </div>
  );
}

export default Payment;
