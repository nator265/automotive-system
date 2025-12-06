"use client";

import React, { useEffect, useState } from "react";
import { cars } from "@/data/cars";

type Booking = {
  id: string;
  carId: string;
  mode: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  notes?: string;
  status: string;
  createdAt?: string;
  payment?: number;
};

type Car = {
  id: string;
  make: string;
  model: string;
  price: number;
};

const SalesPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [startMonth, setStartMonth] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'all' | 'approved' | 'pending' | 'disapproved'>('all');
  const [salesPeriod, setSalesPeriod] = useState<'30' | '90' | '3months'>('30');
  const [revenuePeriod, setRevenuePeriod] = useState<'30' | '90' | '3months'>('30');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);
  const [showRevenueDropdown, setShowRevenueDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'deny' | null>(null);
  const [denyReason, setDenyReason] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/sales");
      const json = await res.json();
      setBookings(json.sales || []);
    } catch (err) {
      console.error("fetch sales error", err);
    }
  }

  async function updateBookingStatus(id: string, status: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/sales/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchBookings(); // Refresh bookings
      } else {
        alert("Failed to update sale status");
      }
    } catch (err) {
      console.error("update sale error", err);
      alert("Error updating sale");
    } finally {
      setLoading(false);
    }
  }

  const salesBookings = bookings.filter((b) => b.mode === "sales");

  const getCarName = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? `${car.make} ${car.model}` : "Mazda CX-5";
  };

  const getPayment = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? car.price : 30000000;
  };

  const isWithinDateRange = (date: string, start: string, end: string) => {
    if (!start && !end) return true;
    const bookingDate = new Date(date);
    const startDate = start ? new Date(start + "-01") : null;
    const endDate = end ? new Date(end + "-01") : null;
    if (startDate && bookingDate < startDate) return false;
    if (endDate && bookingDate > endDate) return false;
    return true;
  };

  const calculateMetrics = (month: string) => {
    const now = new Date();
    const targetMonth = month ? new Date(month + "-01") : now;
    const startOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
    const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);

    const monthSales = salesBookings.filter((b: Booking) => {
      const bookingDate = new Date(b.date);
      return bookingDate >= startOfMonth && bookingDate <= endOfMonth && b.status === "accepted";
    });

    const totalRevenue = monthSales.reduce((sum: number, b: Booking) => sum + getPayment(b.carId), 0);

    return { sales: monthSales.length, revenue: totalRevenue };
  };

  const calculatePeriodMetrics = (days: number) => {
    const now = new Date();
    const periodAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const recentSales = salesBookings.filter((b: Booking) => {
      const bookingDate = new Date(b.date);
      return bookingDate >= periodAgo && b.status === "accepted";
    });

    const totalRevenue = recentSales.reduce((sum: number, b: Booking) => sum + getPayment(b.carId), 0);

    return { sales: recentSales.length, revenue: totalRevenue };
  };

  const getPeriodLabel = (period: '30' | '90' | '3months') => {
    switch (period) {
      case '30': return 'Last 30 Days';
      case '90': return 'Last 90 Days';
      case '3months': return 'Last 3 Months';
      default: return 'Last 30 Days';
    }
  };

  const getPeriodDays = (period: '30' | '90' | '3months') => {
    switch (period) {
      case '30': return 30;
      case '90': return 90;
      case '3months': return 90; // Approximate 3 months as 90 days
      default: return 30;
    }
  };

  const filteredSalesBookings = salesBookings.filter((b: Booking) =>
    isWithinDateRange(b.date, startMonth, endMonth)
  );

  const salesMetrics = calculatePeriodMetrics(getPeriodDays(salesPeriod));
  const revenueMetrics = calculatePeriodMetrics(getPeriodDays(revenuePeriod));

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sales</h1>
          <p className="text-gray-500 text-sm">Manage car sales</p>
        </div>
        <button
          onClick={() => setShowAddCarModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Add Car for Sale
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow relative">
          <h3 className="text-lg font-semibold text-blue-800">Sales</h3>
          <p className="text-2xl font-bold text-blue-600">
            {salesMetrics.sales}
          </p>
          {/* Line Chart */}
          <div className="mt-3 h-16 flex items-center justify-center">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              className="overflow-visible"
            >
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                points="10,50 30,40 50,30 70,25 90,20 110,15"
              />
              <circle cx="10" cy="50" r="3" fill="#2563eb" />
              <circle cx="30" cy="40" r="3" fill="#2563eb" />
              <circle cx="50" cy="30" r="3" fill="#2563eb" />
              <circle cx="70" cy="25" r="3" fill="#2563eb" />
              <circle cx="90" cy="20" r="3" fill="#2563eb" />
              <circle cx="110" cy="15" r="3" fill="#2563eb" />
            </svg>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {getPeriodLabel(salesPeriod)}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowSalesDropdown(!showSalesDropdown)}
                className="text-sm border rounded px-2 py-1 flex items-center gap-1 hover:bg-gray-50"
              >
                <span>▼</span>
              </button>
              {showSalesDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-32">
                  <button
                    onClick={() => {
                      setSalesPeriod("30");
                      setShowSalesDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => {
                      setSalesPeriod("90");
                      setShowSalesDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Last 90 Days
                  </button>
                  <button
                    onClick={() => {
                      setSalesPeriod("3months");
                      setShowSalesDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Last 3 Months
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow relative">
          <h3 className="text-lg font-semibold text-green-800">Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ₦{revenueMetrics.revenue.toLocaleString()}
          </p>
          {/* Line Chart */}
          <div className="mt-3 h-16 flex items-center justify-center">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              className="overflow-visible"
            >
              <polyline
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                points="10,45 30,35 50,25 70,20 90,15 110,10"
              />
              <circle cx="10" cy="45" r="3" fill="#16a34a" />
              <circle cx="30" cy="35" r="3" fill="#16a34a" />
              <circle cx="50" cy="25" r="3" fill="#16a34a" />
              <circle cx="70" cy="20" r="3" fill="#16a34a" />
              <circle cx="90" cy="15" r="3" fill="#16a34a" />
              <circle cx="110" cy="10" r="3" fill="#16a34a" />
            </svg>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {getPeriodLabel(revenuePeriod)}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowRevenueDropdown(!showRevenueDropdown)}
                className="text-sm border rounded px-2 py-1 flex items-center gap-1 hover:bg-gray-50"
              >
                <span>▼</span>
              </button>
              {showRevenueDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-32">
                  <button
                    onClick={() => {
                      setRevenuePeriod("30");
                      setShowRevenueDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => {
                      setRevenuePeriod("90");
                      setShowRevenueDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Last 90 Days
                  </button>
                  <button
                    onClick={() => {
                      setRevenuePeriod("3months");
                      setShowRevenueDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Last 3 Months
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Inspection Bookings</h2>

        {/* Tabs */}
        <div className="flex space-x-1 mb-4 border-b">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pending (
            {salesBookings.filter((b) => b.status === "pending").length})
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({salesBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === "approved"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Approved (
            {salesBookings.filter((b) => b.status === "accepted").length})
          </button>
          <button
            onClick={() => setActiveTab("disapproved")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === "disapproved"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Disapproved (
            {salesBookings.filter((b) => b.status === "denied").length})
          </button>
        </div>

        {/* Table */}
        {(() => {
          const filteredBookings = salesBookings.filter((booking: Booking) => {
            if (activeTab === "all") return true;
            if (activeTab === "approved") return booking.status === "accepted";
            if (activeTab === "pending") return booking.status === "pending";
            if (activeTab === "disapproved") return booking.status === "denied";
            return true;
          });

          if (filteredBookings.length === 0) {
            return (
              <p className="text-gray-500">
                No sales found for the selected tab.
              </p>
            );
          } else {
            return (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Car</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-t">
                        <td className="py-3 text-sm text-gray-700">
                          {booking.name}
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          {booking.email}
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          {booking.phone}
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          {getCarName(booking.carId)}
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          {booking.date}
                        </td>
                        <td className="py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                              booking.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "denied"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status === "accepted" && "✓"}
                            {booking.status === "denied" && "✗"}
                            {booking.status === "pending" && "⏳"}
                            {booking.status === "accepted"
                              ? "Approved"
                              : booking.status === "denied"
                              ? "Disapproved"
                              : "Pending"}
                          </span>
                        </td>
                        <td className="py-3 text-sm">
                          {booking.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setActionType("accept");
                                  setShowConfirmModal(true);
                                }}
                                disabled={loading}
                                className="text-green-600 hover:bg-green-100 p-2 rounded disabled:opacity-50"
                                title="Approve"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setActionType("deny");
                                  setShowConfirmModal(true);
                                }}
                                disabled={loading}
                                className="text-red-600 hover:bg-red-100 p-2 rounded disabled:opacity-50"
                                title="Deny"
                              >
                                ✗
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        })()}
      </div>

      {/* Sales History Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Sales History</h2>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Month
            </label>
            <input
              type="month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Month
            </label>
            <input
              type="month"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {filteredSalesBookings.length === 0 ? (
          <p className="text-gray-500">
            No sales found for the selected period.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th>Name</th>
                  <th>Car Purchased</th>
                  <th>Payment</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesBookings.map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="py-3 text-sm text-gray-700">
                      {booking.name}
                    </td>
                    <td className="py-3 text-sm text-gray-700">
                      {getCarName(booking.carId)}
                    </td>
                    <td className="py-3 text-sm text-gray-700">
                      MWK{getPayment(booking.carId).toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-700">Cash</td>
                    <td className="py-3 text-sm text-gray-700">
                      {booking.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Car for Sale</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Make
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Camry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type of Car
                </label>
                <select className="w-full p-2 border rounded">
                  <option value="">Select type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="coupe">Coupe</option>
                  <option value="convertible">Convertible</option>
                  <option value="van">Van</option>
                  <option value="wagon">Wagon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <select className="w-full p-2 border rounded">
                  <option value="">Select transmission</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                  <option value="cvt">CVT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Engine Capacity
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 2.0L"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sale Price
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 5000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Brief description of the car"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/car-image.jpg"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Add Car
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {actionType === "accept" ? "Confirm Approval" : "Confirm Denial"}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to{" "}
              {actionType === "accept" ? "approve" : "deny"} the sale for{" "}
              <strong>{selectedBooking.name}</strong> (
              {getCarName(selectedBooking.carId)})?
            </p>
            {actionType === "deny" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Denial (Optional)
                </label>
                <textarea
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Please provide a reason for denying this sale..."
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedBooking(null);
                  setActionType(null);
                  setDenyReason("");
                }}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (selectedBooking) {
                    await updateBookingStatus(
                      selectedBooking.id,
                      actionType === "accept" ? "accepted" : "denied"
                    );
                    setShowConfirmModal(false);
                    setSelectedBooking(null);
                    setActionType(null);
                    setDenyReason("");
                  }
                }}
                disabled={loading}
                className={`flex-1 py-2 rounded text-white ${
                  actionType === "accept"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } disabled:opacity-50`}
              >
                {loading
                  ? "Processing..."
                  : actionType === "accept"
                  ? "Approve"
                  : "Deny"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SalesPage;
