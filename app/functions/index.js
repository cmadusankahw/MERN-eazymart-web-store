const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51I5Y4PDS9kpSbqAGctD3WpmeuB4q25vjG7Nzrp1Ks51pGxoiBj0uhwxAzzmlnG8AFQ0SOIF2ulUDi5uiiVO0TL9X0037cmSKhd"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res, next) => {
  res.status(200).send("App Started!");
});

app.post("/payments/create", async (req, res, next) => {
  try {
    const total = req.query.total; // can use req.params as well

    // test
    console.log("Payment request Recieved! >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "lkr",
    });

    // OK - created
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

// - Listen command
// Express app running on firebase cloud functions
exports.api = functions.https.onRequest(app);

// Example endpoint given from firebase
// http://localhost:5001/eazymart-webstore/us-central1/api
