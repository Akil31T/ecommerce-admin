"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Eye, X } from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  items: number
}

const initialOrders: Order[] = [
  {
    id: "ORD001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "delivered",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 159.5,
    status: "shipped",
    date: "2024-01-14",
    items: 2,
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 89.99,
    status: "processing",
    date: "2024-01-13",
    items: 1,
  },
  {
    id: "ORD004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    total: 429.0,
    status: "pending",
    date: "2024-01-12",
    items: 4,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null)

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const handleCancelOrder = (order: Order) => {
    setOrderToCancel(order)
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    if (orderToCancel) {
      setOrders(orders.map((order) => (order.id === orderToCancel.id ? { ...order, status: "cancelled" } : order)))
      setShowCancelModal(false)
      setOrderToCancel(null)
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="mt-1 text-sm text-gray-600">Track and manage customer orders</p>
            </div>

            {/* Orders Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                            <div className="text-sm text-gray-500">{order.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]} border-0 focus:ring-2 focus:ring-blue-500`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.status !== "cancelled" && order.status !== "delivered" && (
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Details Modal */}
            {showModal && selectedOrder && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Order Details - {selectedOrder.id}</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h3>
                      <p className="text-sm text-gray-600">Name: {selectedOrder.customer}</p>
                      <p className="text-sm text-gray-600">Email: {selectedOrder.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Order Information</h3>
                      <p className="text-sm text-gray-600">Date: {selectedOrder.date}</p>
                      <p className="text-sm text-gray-600">Total: ${selectedOrder.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Items: {selectedOrder.items}</p>
                      <p className="text-sm text-gray-600">
                        Status:
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}
                        >
                          {selectedOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {/* Mock order items */}
                      <div className="border rounded p-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Product Name 1</span>
                          <span className="text-sm text-gray-500">$99.99</span>
                        </div>
                        <p className="text-xs text-gray-500">Quantity: 1</p>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Product Name 2</span>
                          <span className="text-sm text-gray-500">$199.99</span>
                        </div>
                        <p className="text-xs text-gray-500">Quantity: 2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cancel Order Modal */}
            {showCancelModal && orderToCancel && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Cancel Order</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to cancel order {orderToCancel.id}? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowCancelModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Keep Order
                    </button>
                    <button
                      onClick={confirmCancel}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
