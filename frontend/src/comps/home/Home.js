import React from "react";
import "./Home.css";
import Product from "./product/Product";

import slider from "../../res/images/slider.png";
// import test product image
import hplap from "../../res/images/products/hplap.jpg";

function Home(props) {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={slider} alt="banner" />
        <div className="home_row">
          <Product
            title="Dell Laptop i10"
            price={189.99}
            image={hplap}
            rating={5}
          />
          <Product />
        </div>

        <div className="home_row">
          <Product />
          <Product />
          <Product />
        </div>

        <div className="home_row">
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Home;
