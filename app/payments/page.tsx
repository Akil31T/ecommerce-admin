"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { CreditCard, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

interface Payment {
  id: string
  orderId: string
  customer: string
  amount: number
  method: "credit_card" | "paypal" | "bank_transfer"
  status: "completed" | "pending" | "failed" | "refunded"
  date: string
}

const initialPayments: Payment[] = [
  {
    id: "PAY001",
    orderId: "ORD001",
    customer: "John Doe",
    amount: 299.99,
    method: "credit_card",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "PAY002",
    orderId: "ORD002",
    customer: "Jane Smith",
    amount: 159.5,
    method: "paypal",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "PAY003",
    orderId: "ORD003",
    customer: "Mike Johnson",
    amount: 89.99,
    method: "bank_transfer",
    status: "pending",
    date: "2024-01-13",
  },
  {
    id: "PAY004",
    orderId: "ORD004",
    customer: "Sarah Wilson",
    amount: 429.0,
    method: "credit_card",
    status: "failed",
    date: "2024-01-12",
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
}

const methodIcons = {
  credit_card: CreditCard,
  paypal: DollarSign,
  bank_transfer: TrendingUp,
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [paymentToRefund, setPaymentToRefund] = useState<Payment | null>(null)

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const failedCount = payments.filter((p) => p.status === "failed").length

  const handleRefund = (payment: Payment) => {
    setPaymentToRefund(payment)
    setShowRefundModal(true)
  }

  const confirmRefund = () => {
    if (paymentToRefund) {
      setPayments(
        payments.map((payment) => (payment.id === paymentToRefund.id ? { ...payment, status: "refunded" } : payment)),
      )
      setShowRefundModal(false)
      setPaymentToRefund(null)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
              <p className="mt-1 text-sm text-gray-600">Monitor and manage payment transactions</p>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                        <dd className="text-2xl font-semibold text-gray-900">${totalRevenue.toFixed(2)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                        <dd className="text-2xl font-semibold text-gray-900">${pendingAmount.toFixed(2)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Failed Payments</dt>
                        <dd className="text-2xl font-semibold text-gray-900">{failedCount}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
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
                    {payments.map((payment) => {
                      const MethodIcon = methodIcons[payment.method]
                      return (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                            <a href={`/orders/${payment.orderId}`}>{payment.orderId}</a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <MethodIcon className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="text-sm text-gray-900 capitalize">
                                {payment.method.replace("_", " ")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.status]}`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {payment.status === "completed" && (
                              <button onClick={() => handleRefund(payment)} className="text-red-600 hover:text-red-900">
                                Refund
                              </button>
                            )}
                            {payment.status === "failed" && (
                              <button className="text-blue-600 hover:text-blue-900">Retry</button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Refund Modal */}
            {showRefundModal && paymentToRefund && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Process Refund</h2>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Payment ID: {paymentToRefund.id}</p>
                    <p className="text-sm text-gray-600 mb-2">Customer: {paymentToRefund.customer}</p>
                    <p className="text-sm text-gray-600 mb-4">Amount: ${paymentToRefund.amount.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to process a refund for this payment? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowRefundModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmRefund}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Process Refund
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
