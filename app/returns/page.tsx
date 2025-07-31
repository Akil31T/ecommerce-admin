"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Eye, Check, X } from "lucide-react"

interface Return {
  id: string
  orderId: string
  customer: string
  product: string
  reason: string
  status: "pending" | "approved" | "rejected" | "processed"
  requestDate: string
  amount: number
}

const initialReturns: Return[] = [
  {
    id: "RET001",
    orderId: "ORD001",
    customer: "John Doe",
    product: "Wireless Headphones",
    reason: "Defective",
    status: "pending",
    requestDate: "2024-01-15",
    amount: 99.99,
  },
  {
    id: "RET002",
    orderId: "ORD002",
    customer: "Jane Smith",
    product: "Smartphone Case",
    reason: "Wrong Size",
    status: "approved",
    requestDate: "2024-01-14",
    amount: 29.99,
  },
  {
    id: "RET003",
    orderId: "ORD003",
    customer: "Mike Johnson",
    product: "Laptop",
    reason: "Not as described",
    status: "processed",
    requestDate: "2024-01-13",
    amount: 899.99,
  },
  {
    id: "RET004",
    orderId: "ORD004",
    customer: "Sarah Wilson",
    product: "Watch",
    reason: "Changed mind",
    status: "rejected",
    requestDate: "2024-01-12",
    amount: 199.99,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  processed: "bg-blue-100 text-blue-800",
}

export default function ReturnsPage() {
  const [returns, setReturns] = useState<Return[]>(initialReturns)
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleViewReturn = (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setShowModal(true)
  }

  const updateReturnStatus = (returnId: string, newStatus: Return["status"]) => {
    setReturns(
      returns.map((returnItem) => (returnItem.id === returnId ? { ...returnItem, status: newStatus } : returnItem)),
    )
  }

  const pendingReturns = returns.filter((r) => r.status === "pending").length
  const approvedReturns = returns.filter((r) => r.status === "approved").length
  const totalRefundAmount = returns.filter((r) => r.status === "processed").reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Returns Management</h1>
              <p className="mt-1 text-sm text-gray-600">Handle product return requests and refunds</p>
            </div>

            {/* Returns Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Eye className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Returns</dt>
                        <dd className="text-2xl font-semibold text-gray-900">{pendingReturns}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Approved Returns</dt>
                        <dd className="text-2xl font-semibold text-gray-900">{approvedReturns}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <X className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Refunded</dt>
                        <dd className="text-2xl font-semibold text-gray-900">${totalRefundAmount.toFixed(2)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Returns Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Return ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {returns.map((returnItem) => (
                      <tr key={returnItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {returnItem.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                          <a href={`/orders/${returnItem.orderId}`}>{returnItem.orderId}</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{returnItem.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{returnItem.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{returnItem.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${returnItem.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[returnItem.status]}`}
                          >
                            {returnItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{returnItem.requestDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewReturn(returnItem)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {returnItem.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateReturnStatus(returnItem.id, "approved")}
                                className="text-green-600 hover:text-green-900 mr-3"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateReturnStatus(returnItem.id, "rejected")}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {returnItem.status === "approved" && (
                            <button
                              onClick={() => updateReturnStatus(returnItem.id, "processed")}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Process
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Return Details Modal */}
            {showModal && selectedReturn && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Return Details - {selectedReturn.id}</h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Return Information</h3>
                      <p className="text-sm text-gray-600">Return ID: {selectedReturn.id}</p>
                      <p className="text-sm text-gray-600">Order ID: {selectedReturn.orderId}</p>
                      <p className="text-sm text-gray-600">Product: {selectedReturn.product}</p>
                      <p className="text-sm text-gray-600">Amount: ${selectedReturn.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Customer & Status</h3>
                      <p className="text-sm text-gray-600">Customer: {selectedReturn.customer}</p>
                      <p className="text-sm text-gray-600">Request Date: {selectedReturn.requestDate}</p>
                      <p className="text-sm text-gray-600">
                        Status:
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedReturn.status]}`}
                        >
                          {selectedReturn.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Return Reason</h3>
                    <p className="text-sm text-gray-600">{selectedReturn.reason}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Additional Notes</h3>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Add notes about this return..."
                    />
                  </div>

                  {selectedReturn.status === "pending" && (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          updateReturnStatus(selectedReturn.id, "rejected")
                          setShowModal(false)
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Reject Return
                      </button>
                      <button
                        onClick={() => {
                          updateReturnStatus(selectedReturn.id, "approved")
                          setShowModal(false)
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Approve Return
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
