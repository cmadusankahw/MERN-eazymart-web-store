import React from "react";
import "./Checkout.css";
import BasketItem from "./basketitem/BasketItem";
import Subtotal from "./subtotal/Subtotal";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../StateProvider";

function Checkout(props) {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="random banner"
        />
        <div>
          <h3 className="checkout_helloUser">
            Hello{" "}
            {user
              ? user?.displayName
                ? user?.displayName
                : user?.email
              : " Guest"}
            !
          </h3>
          <h2 className="checkout_title">Your Shopping Basket</h2>
          {basket?.map((basketitem) => (
            <BasketItem basketitem={basketitem} />
          ))}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal basket={basket} />
      </div>
    </div>
  );
}

export default Checkout;
