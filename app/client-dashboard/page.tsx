"use client";

import React, { useState } from "react";
import CarCard from "../components/CarCard";
import { cars } from "../../data/cars";

// Mock data for demonstration
const upcomingBooking = {
  car: cars[0],
  pickupDate: "2023-10-15",
  returnDate: "2023-10-20",
  location: "Nairobi Airport"
};

const recommendedCars = cars.slice(0, 3);

const loyaltyPoints = { current: 1250, total: 2000 };

const addOns = [
  { name: "Insurance Package", price: 50 },
  { name: "Fuel Option", price: 30 },
  { name: "GPS", price: 20 },
  { name: "Baby Seat", price: 25 },
  { name: "Delivery Option", price: 40 }
];

const promotions = [
  { title: "Seasonal Discount", description: "20% off on weekend bookings", code: "WEEKEND20" },
  { title: "Loyalty Bonus", description: "Extra 500 points on next booking", code: "LOYALTY500" }
];

const bookings = [
  { id: 1, car: cars[0], status: "Upcoming", date: "2023-10-15" },
  { id: 2, car: cars[1], status: "Active", date: "2023-10-10" },
  { id: 3, car: cars[2], status: "Past", date: "2023-09-20" }
];

const payments = [
  { id: 1, amount: 150, date: "2023-10-01", status: "Paid" },
  { id: 2, amount: 200, date: "2023-09-15", status: "Paid" }
];

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, John!</h1>
            <p className="text-gray-600 mt-1">Ready for your next adventure?</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search for cars..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="relative">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0a9 9 0 109 0m-9 0V3" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
            <img
              alt="John Doe"
              src="/profilephoto/profilephoto.jpg"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Booking */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Booking</h3>
          <img src={upcomingBooking.car.images[0]} alt={upcomingBooking.car.model} className="w-full h-32 object-cover rounded-xl mb-4" />
          <p className="text-gray-600 mb-2">{upcomingBooking.car.model}</p>
          <p className="text-sm text-gray-500">Pickup: {upcomingBooking.pickupDate}</p>
          <p className="text-sm text-gray-500">Return: {upcomingBooking.returnDate}</p>
          <p className="text-sm text-gray-500">{upcomingBooking.location}</p>
          <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">View Details</button>
        </div>

        {/* Quick Book Button */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-sm hover:shadow-md transition p-6 text-white text-center">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Quick Book</h3>
          <p className="mb-4 opacity-90">Find and book your perfect car in minutes</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Book Now
          </button>
        </div>

        {/* Recommended Cars */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
          <div className="space-y-3">
            {recommendedCars.map((car) => (
              <div key={car.id} className="flex items-center gap-3">
                <img src={car.images[0]} alt={car.model} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium">{car.model}</p>
                  <p className="text-sm text-gray-500">${car.price}/day</p>
                </div>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition">Book</button>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Points */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Loyalty Points</h3>
          <div className="flex items-center justify-between mb-2">
            <p>{loyaltyPoints.current} / {loyaltyPoints.total} points</p>
            <p className="text-blue-600">{Math.round((loyaltyPoints.current / loyaltyPoints.total) * 100)}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(loyaltyPoints.current / loyaltyPoints.total) * 100}%` }}></div>
          </div>
          <p className="text-gray-600">Earn 750 more points to unlock premium benefits!</p>
        </div>
      </div>

      {/* Profit-Generating Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Add-ons */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Add-ons</h3>
          <div className="space-y-3">
            {addOns.map((addon, index) => (
              <div key={index} className="flex items-center justify-between">
                <p>{addon.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">${addon.price}</p>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotions */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
          <h3 className="text-lg font-semibold mb-4">Special Promotions</h3>
          <div className="space-y-4">
            {promotions.map((promo, index) => (
              <div key={index} className="border border-dashed border-gray-300 rounded-lg p-4">
                <p className="font-medium mb-1">{promo.title}</p>
                <p className="text-gray-600 mb-2">{promo.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{promo.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Management */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">My Bookings</h3>
        <div className="flex space-x-1 mb-4">
          {["Upcoming", "Active", "Past"].map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabChange(index)}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === index ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {bookings.filter(booking => {
            if (activeTab === 0) return booking.status === "Upcoming";
            if (activeTab === 1) return booking.status === "Active";
            return booking.status === "Past";
          }).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <img src={booking.car.images[0]} alt={booking.car.model} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-medium">{booking.car.model}</p>
                  <p className="text-gray-600">{booking.date}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    booking.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                    booking.status === "Active" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition">View</button>
                {booking.status === "Upcoming" && <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition">Modify</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Car Availability Calendar */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Car Availability</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div key={day} className={`p-2 text-center rounded-lg ${
              day % 3 === 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}>
              <span className="text-sm">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>

      {/* Payments & Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <div className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">${payment.amount}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{payment.status}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Download Invoices</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
          <h3 className="text-lg font-semibold mb-4">Wallet Balance</h3>
          <p className="text-2xl font-bold text-green-600 mb-2">$250.00</p>
          <p className="text-gray-600 mb-4">Available credit</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add Funds</button>
        </div>
      </div>

      {/* Profile & ID Verification */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Profile & Verification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">ID Verification</p>
                <p className="text-green-600">Verified</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Contact Info
            </button>
          </div>
          <div>
            <p className="font-medium mb-2">Contact Information</p>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
        <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat Support
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            WhatsApp Support
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
