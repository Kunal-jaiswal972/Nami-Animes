import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.enime.moe/",
  // You can also add other configuration options here, such as headers, timeout, etc.
});

export default instance;
