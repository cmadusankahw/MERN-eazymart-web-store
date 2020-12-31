import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Footer from "./comps/footer/Footer";
import Header from "./comps/header/Header";
import Home from "./comps/home/Home";
import Checkout from "./comps/checkout/Checkout";
import ProductPage from "./comps/productpage/ProductPage";
import Login from "./comps/login/Login";

function App() {
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
