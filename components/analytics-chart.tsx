"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface ChartData {
  name: string
  value: number
  change: number
}

const salesData: ChartData[] = [
  { name: "Jan", value: 4000, change: 12 },
  { name: "Feb", value: 3000, change: -5 },
  { name: "Mar", value: 5000, change: 18 },
  { name: "Apr", value: 4500, change: 8 },
  { name: "May", value: 6000, change: 25 },
  { name: "Jun", value: 5500, change: 15 },
]

export default function AnalyticsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const maxValue = Math.max(...salesData.map((item) => item.value))

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sales Analytics</h3>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {salesData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className="w-12 text-sm text-gray-500 font-medium">{item.name}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-20 text-right">
                <div className="text-sm font-medium text-gray-900">${item.value.toLocaleString()}</div>
                <div
                  className={`flex items-center justify-end text-xs ${
                    item.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
