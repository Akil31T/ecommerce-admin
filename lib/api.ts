// utils/api.ts
import axios from "axios";
import { PRODUCT_API } from "./constant";

const api = axios.create({
  baseURL:'https://ecommerce-api-nine-gilt.vercel.app/api',
  headers: {
    "Content-Type": "application/json ",
  },
});

export default api;
