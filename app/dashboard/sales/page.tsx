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
  status: "pending" | "accepted" | "denied";
  payment?: number;
};

const SalesPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK-1",
      carId: "C-1",
      mode: "buy",
      name: "John Doe",
      email: "john@example.com",
      phone: "0999999999",
      date: "2025-11-20",
      status: "pending",
      payment: 25000000,
    },
    {
      id: "BK-2",
      carId: "C-2",
      mode: "buy",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0888888888",
      date: "2025-11-18",
      status: "accepted",
      payment: 30000000,
    },
    {
      id: "BK-3",
      carId: "C-3",
      mode: "buy",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "0777777777",
      date: "2025-11-15",
      status: "denied",
      payment: 28000000,
    },
    {
      id: "BK-4",
      carId: "C-1",
      mode: "buy",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "0666666666",
      date: "2025-10-30",
      status: "accepted",
      payment: 25000000,
    },
  ]);

  const [activeTab, setActiveTab] = useState<
    "all" | "approved" | "pending" | "disapproved"
  >("all");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionType, setActionType] = useState<"accept" | "deny" | null>(null);

  const getCarName = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? `${car.make} ${car.model}` : "Mazda CX-5";
  };

  const getPayment = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? car.price : 30000000;
  };

  const updateBookingStatus = (id: string, status: "accepted" | "denied") => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const salesBookings = bookings.filter((b) => b.mode === "buy");

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sales</h1>
          <p className="text-gray-500 text-sm">Manage car sales</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow relative">
          <h3 className="text-lg font-semibold text-blue-800">Sales</h3>
          <p className="text-2xl font-bold text-blue-600">
            {salesBookings.filter((b) => b.status === "accepted").length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow relative">
          <h3 className="text-lg font-semibold text-green-800">Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            MWK
            {salesBookings
              .filter((b) => b.status === "accepted")
              .reduce((sum, b) => sum + (b.payment || getPayment(b.carId)), 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Inspection Bookings Table */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Inspection Bookings</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-4 border-b">
          {[
            { key: "pending", label: "Pending" },
            { key: "all", label: "All" },
            { key: "approved", label: "Approved" },
            { key: "disapproved", label: "Disapproved" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === tab.key
                  ? tab.key === "pending"
                    ? "bg-yellow-500 text-white"
                    : tab.key === "approved"
                    ? "bg-green-500 text-white"
                    : tab.key === "disapproved"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label} (
              {tab.key === "all"
                ? salesBookings.length
                : tab.key === "approved"
                ? salesBookings.filter((b) => b.status === "accepted").length
                : tab.key === "pending"
                ? salesBookings.filter((b) => b.status === "pending").length
                : salesBookings.filter((b) => b.status === "denied").length}
              )
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Car</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesBookings
                .filter((b) => {
                  if (activeTab === "all") return true;
                  if (activeTab === "approved") return b.status === "accepted";
                  if (activeTab === "pending") return b.status === "pending";
                  if (activeTab === "disapproved") return b.status === "denied";
                  return true;
                })
                .map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {getCarName(booking.carId)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.date}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                          booking.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "denied"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status === "accepted" && "✓ Approved"}
                        {booking.status === "denied" && "✗ Disapproved"}
                        {booking.status === "pending" && "⏳ Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {booking.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActionType("accept");
                              setShowConfirmModal(true);
                            }}
                            className="text-green-600 hover:bg-green-100 p-2 rounded"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
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
      </div>

      {/* Sales History Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Sales History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Car Purchased</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {salesBookings
                .filter((b) => b.status === "accepted")
                .map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {getCarName(booking.carId)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      MWK{" "}
                      {(
                        booking.payment || getPayment(booking.carId)
                      ).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">Cash</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
              {actionType === "accept" ? "approve" : "deny"} the sale for{" "}
              <strong>{selectedBooking.name}</strong> (
              {getCarName(selectedBooking.carId)})?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedBooking(null);
                  setActionType(null);
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

export default SalesPage;
