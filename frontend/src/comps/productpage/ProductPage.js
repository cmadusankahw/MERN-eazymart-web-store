import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../firebase";
import "./ProductPage.css";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../StateProvider";

function ProductPage(props) {
  // Using useParams Hook to use url params (equal to props.match.params)
  const { productId } = useParams();

  // product details
  const [productDetails, setProductDetails] = useState(null);

  // product reviews
  const [productReviews, setProductReviews] = useState([]);

  // basket is the 'state' now
  const [{ basket }, dispatch] = useStateValue();

  // Counter to handle count logic
  const [counter, setCounter] = useState(false);

  // Item count for basket
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (productId) {
      db.collection("products")
        .doc(productId)
        .onSnapshot((snapshot) => setProductDetails(snapshot.data()));
    }

    db.collection("products")
      .doc(productId)
      .collection("reviews")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setProductReviews(snapshot.docs.map((doc) => doc.data()))
      );
  }, [productId]);

  const addToBasket = async () => {
    await basket?.map((item) => {
      if (item.id === productDetails.id) {
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
          id: productDetails.id,
          title: productDetails.title,
          price: productDetails.price,
          image: productDetails.image,
          rating: productDetails.rating,
          count: count,
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
    <div className="productPage">
      <div className="productPage_top">
        <div className="productPage_left">
          <img src={productDetails?.image} alt={productDetails?.title} />
        </div>

        <div className="productPage_right">
          <h2 className="productPage_title"> {productDetails?.title} </h2>
          <small>Rs. </small>
          <p>{productDetails?.price}</p>
          <div className="productPage_rating">
            {Array(productDetails?.rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          <hr />
          <div className="productPage_counter">
            <button
              onClick={() => {
                setCount(count + 1);
              }}
            >
              {" "}
              +{" "}
            </button>
            <input
              type="number"
              onChange={(e) => setCount(parseInt(e.target.value))}
              value={count}
            />
            <button
              onClick={() => {
                return count > 0 ? setCount(count - 1) : null;
              }}
            >
              {" "}
              -{" "}
            </button>
          </div>
        </div>
        <div className="productPage_buttons">
          <button onClick={addToBasket}> Add to Basket </button>
          <Link to="/">
            <button className="productPage_back">Go Back</button>
          </Link>
        </div>
      </div>

      <div className="productPage_bottom">
        <div className="productPage_description">
          <p>{productDetails?.description}</p>
        </div>
        <div className="productPage_features">
          <ul>
            {productDetails?.features.map((feature) => {
              return <li>{feature}</li>;
            })}
          </ul>
        </div>
      </div>
      <hr />
      <div className="productPage_reviews">
        {productReviews?.map((review) => {
          return (
            <>
              <h5 classname="productPage_reviewUser">{review.user}</h5>
              <p classname="productPage_reviewTimestamp">
                {new Date(review.timestamp?.toDate()).toUTCString()}...
              </p>
              <div className="productPage_reviewRating">
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <p>⭐</p>
                  ))}
              </div>
              <p>{review.review}</p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ProductPage;
