import React from "react";
import "./Product.css";

// import test product image
import hplap from "../../../res/images/products/hplap.jpg";

function Product(props) {
  return (
    <div className="product">
      <div className="product_info">
        <p>HP Probook i10 (10th Gen)</p>
        <p className="product_price">
          <small>Rs.</small>
          <strong>19.99</strong>
        </p>
        <div className="product_rating">
          <p>⭐</p>
        </div>
      </div>
      <img src={hplap} alt="" />
      <button> Add to Basket </button>
    </div>
  );
}

export default Product;
