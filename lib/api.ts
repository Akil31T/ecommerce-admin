// utils/api.ts
import axios, { Method } from "axios";

const api = axios.create({
  baseURL: 'https://ecommerce-api-nine-gilt.vercel.app/api',
  headers: {
    "Content-Type": "application/json ",
  },
});


api.interceptors.response.use(
  (response) => {
    // Handle successful responses  
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

const apiCall = async <T = unknown>(
  endpoint: string,
  method: Method,
  data?: T
) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiCall