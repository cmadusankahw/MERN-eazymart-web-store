import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

import BasketItem from "../../checkout/basketitem/BasketItem";
import "./Order.css";

// Get basket total functionality
import { getBasketTotal } from "../../../reducer";

function Order({ order }) {
  return (
    <div className="order">
      <p>{moment.unix(order?.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <span>ORDER ID: </span>
        <small>{order?.id}</small>
      </p>
      {order?.data.basket?.map((item) => (
        <BasketItem basketitem={item} hideButton />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={getBasketTotal(order?.data.basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs. "}
      />
    </div>
  );
}

export default Order;
