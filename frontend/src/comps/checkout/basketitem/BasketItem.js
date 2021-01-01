import React, { useState } from "react";
import "./BasketItem.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../../StateProvider";

function BasketItem({ basketitem }) {
  const [{ basket }, dispatch] = useStateValue();

  // handle popups
  const [open, setOpen] = useState(false);
  const closeModal = async () => setOpen(false);

  const removeFromBasket = () => {
    setOpen(true);
    // dispatch item removal code
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: basketitem.id,
    });
  };

  return (
    <div className="basketItem">
      <img
        className="basketItem_image"
        src={basketitem?.image}
        alt={basketitem?.title}
      />

      <div className="basketItem_info">
        <p className="basketItem_title">{basketitem?.title}</p>
        <p className="basketItem_price">
          <small>Rs. </small>
          <strong>{basketitem?.price}</strong>
        </p>
        <div className="basketItem_ratingCount">
          <div className="basketItem_rating">
            {Array(basketitem?.rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          <div className="basketItem_countWrap">
            <p className="basketItem_count">x {basketitem?.count}</p>
          </div>
        </div>

        <button onClick={removeFromBasket}> Remove from Basket </button>
      </div>
      <Popup open={open} onClose={closeModal} position="top left">
        <div className="popup_content">
          <img
            className="popup_image"
            src={basketitem?.image}
            alt={basketitem?.title}
          />
          <p>One {basketitem?.title}(s) Removed from Basket!</p>
          <a className="popup_close" onClick={closeModal}>
            &times;
          </a>
        </div>
      </Popup>
    </div>
  );
}

export default BasketItem;
