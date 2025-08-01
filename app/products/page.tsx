"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Product } from "@/lib/types"
import z from "zod"
import { productValidationSchema } from "../validationschema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api"
// import Image from "next/image"
import { ErrorMessage } from "@/components/ErrorMessage"

type ProductFormData = z.infer<typeof productValidationSchema>;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productValidationSchema),
  });

  const fetchProducts = async () => {
    const response = await api.get("/products");
    console.log("Fetched products:", response.data.data);
    setProducts(response.data.data);
    return response.data.data.data;
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  const onSubmit = async (data: ProductFormData) => {
    const bodyData = {
      name: data.name,
      description: data.description,
      price: Number(data.price), // convert to number
      category: data.category,
      tags: [],
      variants: [],
      inventory: {
        quantity: Number(data.stock),
        inStock: data.stock ? true : false,
      },
      status: "active",
      // image: data.image || "", // fallback to empty string
    };
    const response = await api.post("/products", bodyData);

    console.log("Product created:", response.data);
  };



  const handleEdit = (product: Product) => {
    setEditingProduct(product)

    setShowModal(true)
  }

  const handleDelete = async (_id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const response = await api.delete(`/products/${_id}`);
      alert("Product deleted successfully");
      fetchProducts(); // Refresh the product list after deletion
      return response.data;
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
                <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
                <p className="mt-1 text-sm text-gray-600">Manage your product catalog</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded"
                  /> */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                      {/* <span
                        className={`px-2 py-1 text-xs rounded-full ${product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                      >
                        {product.status}
                      </span> */}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.quantity} {product.inStock ? "(In Stock)" : "(Out of Stock)"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{product.category}</p>
                    <div className="flex justify-between">
                      <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(String(product?._id))} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                    /> */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        required
                        rows={3}
                        {...register("description")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage>{errors.description?.message}</ErrorMessage>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <input
                        type="text"

                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("price")}
                      />
                      <ErrorMessage>{errors.price?.message}</ErrorMessage>

                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("category")}
                      />
                      <ErrorMessage>{errors.category?.message}</ErrorMessage>


                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("stock")}
                      />
                      <ErrorMessage>{errors.stock?.message}</ErrorMessage>


                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
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
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false)
                          setEditingProduct(null)
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {editingProduct ? "Update" : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}


