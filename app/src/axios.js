import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-eazymart-webstore.cloudfunctions.net/api", // the API (cloud function) URL from backend
});

export default instance;
