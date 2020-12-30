import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../../StateProvider";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  // test
  const getBasketTotal = (basket) => {
    let baskettotal = 0;
    basket.map((item) => (baskettotal += item.price));
    return baskettotal;
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{` ${value}`}</strong>
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
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
