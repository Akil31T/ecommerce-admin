"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Product } from "@/lib/types";
import z from "zod";
import { productValidationSchema } from "../validationschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ErrorMessage } from "@/components/ErrorMessage";
import apiCall from "@/lib/api";
import { API_ENDPOINT } from "@/lib/constant";
import Swal from "sweetalert2";
import PreView from "../Component/View";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";

type ProductFormData = z.infer<typeof productValidationSchema>;

export default function ProductsPage() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [view, setView] = useState(false);
  // const [showview, setShowview] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productValidationSchema),
  });

  const fetchProducts = async () => {
    try {
      const response = await apiCall(API_ENDPOINT.newProducts, "GET");
      console.log("Fetched products:", response);
      setProducts(response?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      if (typeof editingProduct.image === "string") {
        setPreview(editingProduct.image); // Just set the URL
      }
    }
  }, [editingProduct]);

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    // append text fields (coerce to string or fallback to empty string to avoid undefined)
    formData.append("name", data.name ?? "");
    formData.append("description", data.description ?? "");
    formData.append("price", data.price ?? "");
    formData.append("stock", data.stock ?? "");
    formData.append("category", data.category ?? "");
    formData.append("status", data.status ?? "");

    if (data.image && data.image[0]) {
      // user uploaded new file
      formData.append("image", data.image[0]);
    } else if (editingProduct && editingProduct.image) {
      // no new upload → send old image URL
      formData.append("image", editingProduct.image);
    }

    try {
      if (editingProduct) {
        await apiCall(
          `${API_ENDPOINT.newProducts}/${editingProduct._id}`,
          "PUT",
          formData
        );
      } else {
        await apiCall(API_ENDPOINT.newProducts, "POST", formData);
      }

      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
      reset();
      Swal.fire({
        title: editingProduct ? "Updated!" : "Added!",
        text: editingProduct
          ? "Product updated successfully."
          : "Product created successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error submitting product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      setEditingProduct(product);
      setShowModal(true);
      setPreview(product.image || "");
      await apiCall(`${API_ENDPOINT.newProducts}/${product._id}`, "GET");

      setValue("name", product.name);
      setValue("description", product.description || "");
      setValue("price", String(product.price));
      setValue("category", product.category);
      setValue("stock", String(product.inventory?.quantity || 0));
      const statusValue =
        product.status === "active" || product.status === "inactive"
          ? product.status
          : "active";

      setValue("status", statusValue);
    } catch (err) {
      console.log("Error in handle edit:", err);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await apiCall(`${API_ENDPOINT.newProducts}/${_id}`, "DELETE");
      fetchProducts();
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting the product!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Products Management
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your product catalog
                </p>
              </div>
              <button
                onClick={() => {
                  reset();
                  setPreview("");
                  setEditingProduct(null);
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full capitalize ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock:{" "}
                        {product.stock === 0 || ''? "Out of Stock" : product.stock}{" "}
                        {/* {product.inStock ? "(In Stock)" : "(Out of Stock)"} */}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      {product.category}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product?._id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogContent>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                    <DialogTitle>
                      {editingProduct ? "Edit Product" : "Add Product"}
                    </DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {" "}
                      <div className="grid grid-row-2  gap-2 mb-4">
                        {preview && (
                          <>
                            <Dialog>
                              <DialogTrigger>
                                <div className="col-2 gap-3">
                                  <Image
                                    src={preview}
                                    alt="preview"
                                    width={100}
                                    height={100}
                                    onClick={() => {
                                      setView(true);
                                    }}
                                  />

                                  {view && <PreView preview={preview} />}
                                </div>
                              </DialogTrigger>
                            </Dialog>
                          </>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          {...register("image")}
                          className="flex items-center justify-center
    w-full h-12 border-2 border-dashed border-gray-400
    rounded-lg cursor-pointer hover:bg-gray-50"
                          ref={fileRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setPreview(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage>{errors.name?.message}</ErrorMessage>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          required
                          rows={3}
                          {...register("description")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage>
                          {errors.description?.message}
                        </ErrorMessage>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register("price")}
                        />
                        <ErrorMessage>{errors.price?.message}</ErrorMessage>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register("category")}
                        />
                        <ErrorMessage>{errors.category?.message}</ErrorMessage>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register("stock")}
                        />
                        <ErrorMessage>{errors.stock?.message}</ErrorMessage>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          {...register("status")}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <ErrorMessage>{errors.status?.message}</ErrorMessage>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <DialogClose>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(null);
                              setPreview(null);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </DialogClose>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                        >
                          {editingProduct ? "Update" : "Create"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
