import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";

// to get values from Data Layer with useStateValue
import { useStateValue } from "../../StateProvider";
import { getBasketCount } from "../../reducer";
import { auth } from "../../firebase";

import logolq from "../../res/images/logolq.png";

function Header({ isLogin }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const [hideclass, setHideClass] = useState("");

  // hide login button on login page with useEffect hook
  useEffect(() => {
    isLogin
      ? setHideClass("header_option_hide")
      : setHideClass("header_option");
  }, [isLogin]);

  // handling sign-out logic if user is already signed-in
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={logolq} alt="easzymart Logo" />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <div onClick={handleAuthentication} className={hideclass}>
          <span className="header_optionLineOne">
            {user
              ? user.displayName
                ? user.displayName
                : user.email
              : "Hello Guest"}
          </span>
          <Link to={!user && "/login"}>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </Link>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {getBasketCount(basket)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
