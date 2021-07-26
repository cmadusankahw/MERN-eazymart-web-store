import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import BasketItem from "../checkout/basketitem/BasketItem";
import db from "../../firebase";
import "./Payment.css";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../StateProvider";

// Get basket total functionality
import { getBasketTotal } from "../../reducer";

function Payment() {
  const history = useHistory();

  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [clientSecret, setClientSecret] = useState(true);

  // generate the special stripe secret wchich allows charging
  // whenever the basket is changing, need to change the secret for new amount
  useEffect(() => {
    // this is how to implement and run an async func inside useEffect()
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  // test
  console.log("clientSecret >>> ", clientSecret);

  // stripe payment processing
  const handleSubmit = async (event) => {
    if (user) {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

          setSucceeded(true);
          setError(null);
          setProcessing(false);

          dispatch({
            type: "EMPTY_BASKET",
          });

          history.replace("/orders");
        });
    } else {
      alert("Please Sign-in to complete Purchase...");
    }
  };

  // Listen changes in card element
  // display if any errors regarding card details
  const handleChange = (event) => {
    setDisabled(event.emplty);
    setError(event.error ? event.error.message : "");
  };

  const address = "122, Main Streeet, Kandana, Sri Lanka";

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <div className="payment_addressDetails">
              {user ? <p>Signed-in as: {user?.email}</p> : ""}
              <br />
              <textarea disabled rows="4" value={address}></textarea>
            </div>
            <button> Update Address </button>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket?.map((basketitem) => (
              <BasketItem key={basketitem.id} basketitem={basketitem} />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Paymenth Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3 className="payment_total">{value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs. "}
                />
                <button className="button_buy" disabled={processing || disabled || succeeded || error}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div className="card_error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
