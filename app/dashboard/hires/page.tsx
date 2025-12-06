"use client";

import React, { useState } from "react";
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
  status: "pending" | "accepted" | "denied";
  payment?: number;
};

const HiresPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "H-1",
      carId: "C-1",
      mode: "hire",
      name: "John Doe",
      email: "john@example.com",
      phone: "0999999999",
      date: "2025-11-20",
      status: "pending",
      payment: 50000,
    },
    {
      id: "H-2",
      carId: "C-2",
      mode: "hire",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0888888888",
      date: "2025-11-18",
      status: "accepted",
      payment: 70000,
    },
    {
      id: "H-3",
      carId: "C-3",
      mode: "hire",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "0777777777",
      date: "2025-11-15",
      status: "denied",
      payment: 60000,
    },
    {
      id: "H-4",
      carId: "C-1",
      mode: "hire",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "0666666666",
      date: "2025-10-30",
      status: "accepted",
      payment: 50000,
    },
  ]);

  const [hiresPeriod, setHiresPeriod] = useState<"30" | "90" | "3months">("30");
  const [revenuePeriod, setRevenuePeriod] = useState<"30" | "90" | "3months">(
    "30"
  );
  const [activeTab, setActiveTab] = useState<
    "all" | "approved" | "pending" | "disapproved"
  >("all");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionType, setActionType] = useState<"accept" | "deny" | null>(null);
  const [denyReason, setDenyReason] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const hireBookings = bookings.filter((b) => b.mode === "hire");

  const getCarName = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? `${car.make} ${car.model}` : "Unknown Car";
  };

  const getPayment = (booking: Booking) => booking.payment || 50000;

  const calculatePeriodMetrics = (days: number) => {
    const now = new Date();
    const periodAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const recentHires = hireBookings.filter(
      (b) => new Date(b.date) >= periodAgo && b.status === "accepted"
    );
    const totalRevenue = recentHires.reduce((sum, b) => sum + getPayment(b), 0);
    return { hires: recentHires.length, revenue: totalRevenue };
  };

  const getPeriodLabel = (period: "30" | "90" | "3months") => {
    switch (period) {
      case "30":
        return "Last 30 Days";
      case "90":
        return "Last 90 Days";
      case "3months":
        return "Last 3 Months";
    }
  };

  const getPeriodDays = (period: "30" | "90" | "3months") => {
    switch (period) {
      case "30":
        return 30;
      case "90":
        return 90;
      case "3months":
        return 90;
    }
  };

  const hiresMetrics = calculatePeriodMetrics(getPeriodDays(hiresPeriod));
  const revenueMetrics = calculatePeriodMetrics(getPeriodDays(revenuePeriod));

  const updateBookingStatus = (id: string, status: "accepted" | "denied") => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const filteredBookings = hireBookings.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "approved") return b.status === "accepted";
    if (activeTab === "pending") return b.status === "pending";
    if (activeTab === "disapproved") return b.status === "denied";
    return true;
  });

  const filteredHistoryBookings = hireBookings.filter((b) => {
    const bookingDate = new Date(b.date);
    const startDate = startMonth ? new Date(startMonth + "-01") : null;
    const endDate = endMonth ? new Date(endMonth + "-01") : null;
    if (startDate && bookingDate < startDate) return false;
    if (endDate && bookingDate > endDate) return false;
    return true;
  });

  return (
    <main className="w-full mt-5 p-4 md:p-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-800">Hires</h3>
          <p className="text-3xl font-bold text-blue-600">
            {hiresMetrics.hires}
          </p>
          <span className="text-sm text-gray-600">
            {getPeriodLabel(hiresPeriod)}
          </span>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            MWK{revenueMetrics.revenue.toLocaleString()}
          </p>
          <span className="text-sm text-gray-600">
            {getPeriodLabel(revenuePeriod)}
          </span>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow p-4 mb-10">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        <div className="flex space-x-1 mb-4 border-b">
          {["pending", "all", "approved", "disapproved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === tab
                  ? tab === "pending"
                    ? "bg-yellow-500 text-white"
                    : tab === "approved"
                    ? "bg-green-500 text-white"
                    : tab === "disapproved"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {tab === "all"
                ? hireBookings.length
                : tab === "approved"
                ? hireBookings.filter((b) => b.status === "accepted").length
                : tab === "pending"
                ? hireBookings.filter((b) => b.status === "pending").length
                : hireBookings.filter((b) => b.status === "denied").length}
              )
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
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
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="py-3 text-sm text-gray-700">{b.name}</td>
                    <td className="py-3 text-sm text-gray-700">{b.email}</td>
                    <td className="py-3 text-sm text-gray-700">{b.phone}</td>
                    <td className="py-3 text-sm text-gray-700">
                      {getCarName(b.carId)}
                    </td>
                    <td className="py-3 text-sm text-gray-700">{b.date}</td>
                    <td className="py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          b.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : b.status === "denied"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status === "accepted"
                          ? "✓ Approved"
                          : b.status === "denied"
                          ? "✗ Denied"
                          : "⏳ Pending"}
                      </span>
                    </td>
                    <td className="py-3 text-sm">
                      {b.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setActionType("accept");
                              setShowConfirmModal(true);
                            }}
                            className="text-green-600 hover:bg-green-100 p-2 rounded"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setActionType("deny");
                              setShowConfirmModal(true);
                            }}
                            className="text-red-600 hover:bg-red-100 p-2 rounded"
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
        )}
      </div>

      {/* Hire History Table */}
      <div className="bg-white rounded-lg shadow p-4 mb-10">
        <h2 className="text-lg font-semibold mb-4">Hire History</h2>

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

        {filteredHistoryBookings.length === 0 ? (
          <p className="text-gray-500">
            No hire bookings found for the selected period.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th>Name</th>
                  <th>Car Taken</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistoryBookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="py-3 text-sm text-gray-700">{b.name}</td>
                    <td className="py-3 text-sm text-gray-700">
                      Toyot Axio
                    </td>
                    <td className="py-3 text-sm text-gray-700">
                      MWK{getPayment(b).toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-gray-700">{b.date}</td>
                    <td className="py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          b.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : b.status === "denied"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {actionType === "accept" ? "Confirm Approval" : "Confirm Denial"}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to{" "}
              {actionType === "accept" ? "approve" : "deny"} the booking for{" "}
              {selectedBooking.name}?
            </p>
            {actionType === "deny" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for denial:
                </label>
                <textarea
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Please provide a reason..."
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
                onClick={() => {
                  if (selectedBooking && actionType) {
                    updateBookingStatus(
                      selectedBooking.id,
                      actionType === "accept" ? "accepted" : "denied"
                    );
                    setShowConfirmModal(false);
                    setSelectedBooking(null);
                    setActionType(null);
                    setDenyReason("");
                  }
                }}
                className={`flex-1 py-2 rounded text-white ${
                  actionType === "accept"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {actionType === "accept" ? "Approve" : "Deny"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HiresPage;
