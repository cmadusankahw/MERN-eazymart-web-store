import React from "react";
import "./Product.css";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../../StateProvider";

function Product({ id, title, image, price, rating }) {
  // basket is the 'state' now
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // Dispatch some action with data to the Data Layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
      },
    });
  };

  // test basket
  // console.log("Basket Items >>>>", basket);

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
      <button onClick={addToBasket}> Add to Basket </button>
    </div>
  );
}

export default Product;
