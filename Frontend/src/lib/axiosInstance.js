import axios from "axios";

const env = import.meta.env.VITE_REACT_APP_ENVIRONMENT;
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: env !== "development" ? backendUrl : "http://localhost:8080/api/v1",
  // You can also add other configuration options here, such as headers, timeout, etc.
});

export default instance;
