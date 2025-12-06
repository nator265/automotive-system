"use client";

import React, { useEffect, useState } from "react";

const MessagesPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      setBookings(json.bookings || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500">Messages and booking enquiries from customers</p>
      </div>

      <div className="space-y-3">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-4">No messages yet.</div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{b.name} — {b.phone}</p>
                  <p className="text-xs text-gray-500">{b.email} • {b.date}</p>
                </div>
                <div className="text-right text-xs text-gray-400">{b.createdAt}</div>
              </div>
              <div className="mt-3 text-sm text-gray-700">
                <p><strong>Mode:</strong> {b.mode}</p>
                <p><strong>Car ID:</strong> {b.carId}</p>
                <p className="mt-2"><strong>Notes:</strong> {b.notes}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default MessagesPage;
