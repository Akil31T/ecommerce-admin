"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Users, ShoppingCart, Package, DollarSign, TrendingUp, TrendingDown, Eye } from "lucide-react"
import AnalyticsChart from "@/components/analytics-chart"
const stats = [
  {
    name: "Total Users",
    value: "2,651",
    icon: Users,
    change: "+12%",
    changeType: "positive",
    description: "Active customers",
  },
  {
    name: "Total Orders",
    value: "1,429",
    icon: ShoppingCart,
    change: "+8%",
    changeType: "positive",
    description: "This month",
  },
  {
    name: "Products",
    value: "342",
    icon: Package,
    change: "+3%",
    changeType: "positive",
    description: "In inventory",
  },
  {
    name: "Revenue",
    value: "$45,231",
    icon: DollarSign,
    change: "+18%",
    changeType: "positive",
    description: "Monthly revenue",
  },
]

const recentOrders = [
  { id: "ORD001", customer: "John Doe", amount: 299.99, status: "completed", date: "2024-01-15" },
  { id: "ORD002", customer: "Jane Smith", amount: 159.5, status: "pending", date: "2024-01-14" },
  { id: "ORD003", customer: "Mike Johnson", amount: 89.99, status: "shipped", date: "2024-01-13" },
  { id: "ORD004", customer: "Sarah Wilson", amount: 429.0, status: "processing", date: "2024-01-12" },
  { id: "ORD005", customer: "David Brown", amount: 199.99, status: "completed", date: "2024-01-11" },
]

const recentUsers = [
  { id: "1", name: "Alice Cooper", email: "alice@example.com", status: "active", joinDate: "2024-01-15" },
  { id: "2", name: "Bob Wilson", email: "bob@example.com", status: "active", joinDate: "2024-01-14" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", status: "inactive", joinDate: "2024-01-13" },
  { id: "4", name: "Daniel Lee", email: "daniel@example.com", status: "active", joinDate: "2024-01-12" },
]

const topProducts = [
  { id: "1", name: "Wireless Headphones", sales: 145, revenue: 14499.55, trend: "up" },
  { id: "2", name: "Smartphone Case", sales: 89, revenue: 2669.11, trend: "up" },
  { id: "3", name: "Laptop Stand", sales: 67, revenue: 4019.33, trend: "down" },
  { id: "4", name: "USB Cable", sales: 234, revenue: 2339.66, trend: "up" },
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Welcome back! Heres whats happening with your store today.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="text-sm text-gray-500">
                    {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <stat.icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <div
                              className={`ml-2 flex items-baseline text-sm font-semibold ${
                                stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {stat.changeType === "positive" ? (
                                <TrendingUp className="w-4 h-4 mr-1" />
                              ) : (
                                <TrendingDown className="w-4 h-4 mr-1" />
                              )}
                              {stat.change}
                            </div>
                          </dd>
                          <dd className="text-xs text-gray-400 mt-1">{stat.description}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white shadow-lg rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
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
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${order.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white shadow-lg rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Top Products</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.sales} sales</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">${product.revenue.toFixed(2)}</p>
                          <div className="flex items-center">
                            {product.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                            )}
                            <span className={`text-xs ${product.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                              {product.trend === "up" ? "+" : "-"}5%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Analytics Chart */}
              <div className="lg:col-span-2">
                <AnalyticsChart />
              </div>

              {/* Recent Users */}
              <div className="bg-white shadow-lg rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status as keyof typeof statusColors]}`}
                          >
                            {user.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="mt-6">
              <div className="bg-white shadow-lg rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                      <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Add User</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                      <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Add Product</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                      <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">View Orders</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                      <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Payments</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
