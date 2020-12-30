import React from "react";
import "./BasketItem.css";

function BasketItem({ basketitem }) {
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
          <div className="basketItem_rating">
            {Array(basketitem?.rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </div>
          <p>x {basketitem?.count}</p>
          <button> Remove from Basket </button>
        </p>
      </div>
    </div>
  );
}

export default BasketItem;
