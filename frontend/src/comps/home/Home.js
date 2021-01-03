import React, { useState, useEffect } from "react";

import "./Home.css";
import db from "../../firebase";
import Product from "./product/Product";
import slider from "../../res/images/slider.png";

function Home(props) {
  const [products, setProducts] = useState([]);

  // run this when sidebar comp loads (Run once or run agin n again when vars given are changed)
  useEffect(() => {
    // getting data from cloud firestore collection
    db.collection("products").onSnapshot((snapshot) =>
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          price: doc.data().price,
          rating: doc.data().rating,
          image: doc.data().image,
        }))
      )
    );
  }, []);

  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={slider} alt="banner" />
        <div className="home_row">
          {products.slice(0, 2).map((product) => (
            <Product
              key={product?.id}
              id={product?.id}
              title={product?.title}
              price={product?.price}
              image={product?.image}
              rating={product?.rating}
            />
          ))}
        </div>

        <div className="home_row">
          {products.slice(2, 5).map((product) => (
            <Product
              key={product?.id}
              id={product?.id}
              title={product?.title}
              price={product?.price}
              image={product?.image}
              rating={product?.rating}
            />
          ))}
        </div>

        <div className="home_row">
          {products.slice(5, 6).map((product) => (
            <Product
              key={product?.id}
              id={product?.id}
              title={product?.title}
              price={product?.price}
              image={product?.image}
              rating={product?.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
