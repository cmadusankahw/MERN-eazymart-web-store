import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RoomIcon from "@material-ui/icons/Room";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
  const [count, setCount] = useState(1);

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

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#ec6911",
    },
  }))(LinearProgress);

  return (
    <div className="productPage">
      <div className="productPage_breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="textPrimary" to="/">
            Eazy Mart Home
          </Link>
          <Link color="textPrimary" to={`${productDetails?.category}`}>
            {productDetails?.category}
          </Link>
          <Typography color="textPrimary">{productDetails?.title}</Typography>
        </Breadcrumbs>
      </div>
      <div className="productPage_top">
        <div className="productPage_left">
          <img src={productDetails?.image} alt={productDetails?.title} />
        </div>

        <div className="productPage_right">
          <h2 className="productPage_title"> {productDetails?.title} </h2>
          <div className="productPage_price">
            <small>Rs. </small>
            <p>{productDetails?.price}</p>
          </div>
          <div className="productPage_rating">
            {Array(productDetails?.rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          <hr />

          <div className="productPage_content">
            <div className="productPage_description">
              <p>{productDetails?.description}</p>
            </div>
            <div className="productPage_features">
              <p> Features:</p>
              <ul>
                {productDetails?.features?.map((feature) => {
                  return <li>{feature}</li>;
                })}
              </ul>
            </div>
            <p className="productPage_stock">
              <CheckBoxIcon /> In-Stock{" "}
            </p>
          </div>
        </div>

        <div className="productPage_purchase">
          <div className="productPage_purchaseExchange">
            <input type="radio" value="" checked="checked" /> Without Exhange
            <div className="productPage_price">
              <small>Rs. </small>
              <p>{productDetails?.price}</p>
            </div>
            <p className="productPage_warranty">
              14 Days MoneyBack Warranty Included
            </p>
          </div>
          <div className="productPage_purchaseCounter">
            <p className="productPage_quantity"> Quantity:</p>
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
                  return count > 1 ? setCount(count - 1) : null;
                }}
              >
                {" "}
                -{" "}
              </button>
            </div>

            <div className="productPage_buttons">
              <button className="productPage_add" onClick={addToBasket}>
                <AddShoppingCartIcon />
                Add to Basket
              </button>
              <br />
              <Link to="/">
                <button className="productPage_buy">
                  <PlayArrowIcon />
                  Buy Now
                </button>
              </Link>
            </div>
            <small className="productPage_gift">
              <input type="checkbox" /> This order contains a gift{" "}
            </small>
            <hr />
            <div className="productPage_deliveryLocation">
              <RoomIcon />
              <p> Select Delivery Location</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="productPage_review">
        <div className="productPage_reviewLeft">
          <h3>Customer Reviews</h3>
          <div className="productPage_rating">
            {Array(productDetails?.rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          <div className="productPage_allRatings">
            <p> {1245} all Ratings</p>
            <div className="productPage_ratingLine">
              <span>5 star </span>
              <BorderLinearProgress variant="determinate" value={50} />
              <span>{50} %</span>
            </div>
            <div className="productPage_ratingLine">
              <span>4 star </span>
              <BorderLinearProgress variant="determinate" value={35} />
              <span>{35} %</span>
            </div>
            <div className="productPage_ratingLine">
              <span>3 star </span>
              <BorderLinearProgress variant="determinate" value={58} />
              <span>{58} %</span>
            </div>
            <div className="productPage_ratingLine">
              <span>2 star </span>
              <BorderLinearProgress variant="determinate" value={25} />
              <span>{25} %</span>
            </div>
            <div className="productPage_ratingLine">
              <span>1 star </span>
              <BorderLinearProgress variant="determinate" value={15} />
              <span>{15} %</span>
            </div>
          </div>
        </div>

        <div className="productPage_reviewRight">
          <div className="productPage_reviewTypes">
            <h3>Read Reviews that mention</h3>
            <div className="productPage_reviewTypesAll">
              <Chip
                className="productPage_chip"
                avatar={<Avatar>B</Avatar>}
                label="Best Reviews"
              />
              <Chip
                className="productPage_chip"
                avatar={<Avatar>V</Avatar>}
                label="Value for Money"
              />
              <Chip
                className="productPage_chip"
                avatar={<Avatar>E</Avatar>}
                label="Easy to Use"
              />
              <Chip
                className="productPage_chip"
                avatar={<Avatar>C</Avatar>}
                label="Waaranty and Coverage"
              />
            </div>
          </div>
          <h3>Top Reviews from Sri Lanka</h3>
          <div className="productPage_reviews">
            {productReviews?.map((review) => {
              return (
                <>
                  <div classname="productPage_reviewUser">
                    <AccountCircleIcon />
                    <h5> {review.user} </h5>
                  </div>
                  <span classname="productPage_reviewTimestamp">
                    {new Date(review.timestamp?.toDate()).toUTCString()}...
                  </span>
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
      </div>
    </div>
  );
}

export default ProductPage;
