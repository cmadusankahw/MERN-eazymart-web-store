import axios from "axios";

const instance = axios.create({
  baseURL: " http://localhost:5001/eazymart-webstore/us-central1/api", // the API (cloud function) URL from backend
});

export default instance;
