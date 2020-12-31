import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Footer from "./comps/footer/Footer";
import Header from "./comps/header/Header";
import Home from "./comps/home/Home";
import Checkout from "./comps/checkout/Checkout";
import ProductPage from "./comps/productpage/ProductPage";
import Login from "./comps/login/Login";
import { auth } from "./firebase";

// to get values from Data Layer with useStateValue
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // test
      console.log("THE USER >>>>", authUser);

      if (authUser) {
        // user has just logged in or/ the user has already logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user has logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Header isLogin />
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/products/:productId">
            <Header />
            <ProductPage />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
