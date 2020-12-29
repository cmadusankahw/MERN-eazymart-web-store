import React from "react";
import "./Home.css";
import Product from "./product/Product";

import slider from "../../res/images/slider.png";

function Home(props) {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={slider} alt="banner" />
        <div className="home_row">
          <Product />
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Home;
