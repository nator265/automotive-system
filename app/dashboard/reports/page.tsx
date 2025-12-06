"use client";

import React, { useEffect, useState } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DateRangeIcon from "@mui/icons-material/DateRange";

const ReportsContent = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
    fetchSales();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      setBookings(json.bookings || []);
    } catch (err) {
      console.error("fetch bookings", err);
    }
  }

  async function fetchSales() {
    try {
      const res = await fetch("/api/sales");
      const json = await res.json();
      setSales(json.sales || []);
    } catch (err) {
      console.error("fetch sales", err);
    }
  }

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Reports
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View and analyze your business performance
        </p>
      </div>

      {/* Date Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <DateRangeIcon className="text-gray-400" />
          <select className="outline-none text-gray-700 text-sm">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">$45,240</p>
              <p className="text-green-600 text-xs mt-1">
                ↑ 12% from last month
              </p>
            </div>
            <BarChartIcon className="text-blue-600 text-3xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Rentals</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">328</p>
              <p className="text-green-600 text-xs mt-1">
                ↑ 8% from last month
              </p>
            </div>
            <TrendingUpIcon className="text-green-600 text-3xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Sale Price</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">$13,820</p>
              <p className="text-orange-600 text-xs mt-1">→ No change</p>
            </div>
            <BarChartIcon className="text-orange-600 text-3xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Listings</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">45</p>
              <p className="text-red-600 text-xs mt-1">↓ 3% from last month</p>
            </div>
            <BarChartIcon className="text-red-600 text-3xl" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Trend</h2>
          <div className="h-64 bg-linear-to-b from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChartIcon sx={{ fontSize: 48, color: "#3b82f6" }} />
              <p className="text-gray-600 font-medium mt-2">
                Sales Chart Placeholder
              </p>
              <p className="text-gray-400 text-sm">
                Chart visualization would go here
              </p>
            </div>
          </div>
        </div>

        {/* Rentals Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Rental Activity
          </h2>
          <div className="h-64 bg-linear-to-b from-green-50 to-green-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUpIcon sx={{ fontSize: 48, color: "#10b981" }} />
              <p className="text-gray-600 font-medium mt-2">
                Rentals Chart Placeholder
              </p>
              <p className="text-gray-400 text-sm">
                Chart visualization would go here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Sales Records</h2>
            <p className="text-sm text-gray-500 mt-1">All recorded sales and details</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Buyer</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Contacts</th>
                </tr>
              </thead>
              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td className="px-6 py-4 text-gray-500" colSpan={4}>No sales recorded.</td>
                  </tr>
                ) : (
                  sales.map((s) => (
                    <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{s.buyerName || s.buyerEmail || "-"}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{s.price || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Hire Records</h2>
            <p className="text-sm text-gray-500 mt-1">All rented/hired vehicles and client details</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Client</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td className="px-6 py-4 text-gray-500" colSpan={4}>No bookings found.</td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{b.name} / {b.email}</td>
                      <td className="px-6 py-4">{b.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportsContent;
