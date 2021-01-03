import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

// Get basket total functionality
import { getBasketTotal, getBasketCount } from "../../../reducer";

function Subtotal({ basket }) {
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getBasketCount(basket)} items):{" "}
              <strong>{` ${value}`}</strong>
            </p>
            <small className="subtotal_gift">
              {" "}
              <input type="checkbox" /> This order contains a gift{" "}
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs. "}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
