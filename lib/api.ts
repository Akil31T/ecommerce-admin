// utils/api.ts
import axios, { Method } from "axios";
import { PRODUCT_API } from "../lib/constant";

const api = axios.create({
  baseURL: PRODUCT_API,
});


api.interceptors.response.use(
  (response) => {
    return response;
  }
  , (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code 
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error: No response received", error.request);
    }
    return Promise.reject(error);
  }
);

// utils/api.ts

// const apiCall = async <T = unknown>(
//   endpoint: string,
//   method: Method,
//   data?: T
// ) => {
//   try {
//     const response = await api({
//       url: endpoint,
//       method,
//       data,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("API call error:", error);
//     throw error;
//   }
// };

const apiCall = async <T = unknown>(
  endpoint: string,
  method: Method,
  data?: T
) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await api({
      url: endpoint,
      method,
      data,
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiCall