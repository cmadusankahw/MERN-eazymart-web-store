import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Login.css";
import logolq from "../../res/images/logolq.png";
import { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // pulling the web history with useHistory hook
  const history = useHistory();

  // Sign In
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(`/`);
        alert("Successfully Signed In!");
      })
      .catch((err) => {
        alert("An Error Occured: " + err.message);
      });
  };

  // Sign Up
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push(`/`);
        alert(
          " Successfully Created EazyMart Account! Please Sign-In to continue..."
        );
      })
      .catch((err) => {
        alert("An Error Occured: " + err.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" src={logolq} alt="Logo" />
      </Link>
      <div className="login_container">
        <h1> Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signIn} type="submit" className="login_signinButton">
            Sign In
          </button>
        </form>
        <p>
          By Signing-in you agree to EazyMart's Conditions of Use & Sale. Please
          see our Privacy Notice, Our Cookies Policy and our Interest-Based Ads
        </p>
        <button
          onClick={register}
          type="submit"
          className="login_registerButton"
        >
          Create your EazyMart Account
        </button>
      </div>
    </div>
  );
}

export default Login;
