import React, { useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../../StateProvider";

function Product({ id, title, image, price, rating }) {
  // basket is the 'state' now
  const [{ basket }, dispatch] = useStateValue();

  const [counter, setCounter] = useState(false);

  const addToBasket = async () => {
    await basket?.map((item) => {
      if (item.id === id) {
        item.count++;
        setCounter(true);
      }
      return basket;
    });

    // Dispatch some action with data to the Data Layer
    if (!counter) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          price: price,
          image: image,
          rating: rating,
          count: 1,
        },
      });
      setCounter(true);
    } else {
      dispatch({
        type: "UPDATE_BASKET",
        basket: basket,
      });
    }
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt={title} />
      <div className="product_buttons">
        <Link to="/product/:">
          <button className="product_view" onClick={addToBasket}>
            View Details
          </button>
        </Link>
        <button onClick={addToBasket}> Add to Basket </button>
      </div>
    </div>
  );
}

export default Product;
