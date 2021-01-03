import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Product.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../../StateProvider";

function Product({ id, title, image, price, rating }) {
  // basket is the 'state' now
  const [{ basket }, dispatch] = useStateValue();

  const [counter, setCounter] = useState(false);

  // handle popups
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

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
    setOpen(true);
  };

  // pulling the web history with useHistory hook
  const history = useHistory();

  // function to handle routing logic when selecting an available channel
  const viewProduct = () => {
    if (id) {
      history.push(`/products/${id}`);
    } else {
      history.push(title);
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
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt={title} />
      <div className="product_buttons">
        <button className="product_view" onClick={viewProduct}>
          View Details
        </button>
        <button className="product_add" onClick={addToBasket}>
          Add to Basket
        </button>
      </div>

      <Popup
        open={open}
        onClose={closeModal}
        position="top left"
        closeOnDocumentClick
        role="tooltip"
      >
        <div className="popup_content">
          <img className="popup_image" src={image} alt={title} />
          <p>One {title}(s) Added to basket!</p>
          <a href="#" className="popup_close" onClick={closeModal}>
            &times;
          </a>
        </div>
      </Popup>
    </div>
  );
}

export default Product;
