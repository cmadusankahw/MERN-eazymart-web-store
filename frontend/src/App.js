import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Footer from "./comps/footer/Footer";
import Header from "./comps/header/Header";
import Home from "./comps/home/Home";
import Checkout from "./comps/checkout/Checkout";
import ProductPage from "./comps/productpage/ProductPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/products/:productId">
            <ProductPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
