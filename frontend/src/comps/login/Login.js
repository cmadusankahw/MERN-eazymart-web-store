import React from "react";
import "./Login.css";

import logolq from "../../res/images/logolq.png";
import { Link } from "react-router-dom";

function Login(props) {
  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" src={logolq} alt="Logo" />
      </Link>
      <div className="login_container">
        <h1> Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" />

          <h5>Password</h5>
          <input type="password" />

          <button className="login_signinButton"> Sign In</button>
        </form>
        <p>
          By Signing-in you agree to EazyMart's Conditions of Use & Sale. Please
          see our Privacy Notice, Our Cookies Policy and our Interest-Based Ads
        </p>
        <button className="login_registerButton">
          Create your EazyMart Account
        </button>
      </div>
    </div>
  );
}

export default Login;
