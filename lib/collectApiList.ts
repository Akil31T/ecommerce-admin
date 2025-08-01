import api from "./api";
import { Product } from "./types";


// 🔹 Create product (POST)
export const createProduct = async (product: Product) => {
  const response = await api.post("/products", product);
  return response.data;
};

// 🔹 Get all products (GET)
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// 🔹 Get a single product (GET)
export const getProductById = async (productId: string) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

// 🔹 Update product (PUT)
export const updateProduct = async (productId: string, updatedProduct: Partial<Product>) => {
  const response = await api.put(`/products/${productId}`, updatedProduct);
  return response.data;
};

// 🔹 Delete product (DELETE)
export const deleteProduct = async (productId: string) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};
