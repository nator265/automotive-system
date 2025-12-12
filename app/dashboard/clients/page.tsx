"use client";

import React, { useEffect, useState } from "react";

type Booking = {
  id: string;
  carId: string;
  mode: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  notes?: string;
  createdAt?: string;
};

type Sale = {
  id: string;
  carId: string;
  buyerName?: string;
  buyerEmail?: string;
  price?: number;
  createdAt?: string;
};

const ClientsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
    fetchSales();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      setBookings(json.bookings || []);
      const names = Array.from(new Set((json.bookings || []).map((b: Booking) => b.name)));
      setClients(names);
    } catch (err) {
      console.error("fetch bookings error", err);
    }
  }

  async function fetchSales() {
    try {
      const res = await fetch("/api/sales");
      const json = await res.json();
      setSales(json.sales || []);
    } catch (err) {
      console.error("fetch sales error", err);
    }
  }

  function openClient(name: string) {
    setSelectedClient(name);
  }

  function closeClient() {
    setSelectedClient(null);
  }

  const historyFor = (name: string) => {
    const hires = bookings.filter((b) => b.name === name);
    const buys = sales.filter((s) => s.buyerName === name || s.buyerEmail === name);
    return { hires, buys };
  };

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
        <p className="text-gray-500 text-sm">List of clients and their activity history</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">All Clients</h2>
        {clients.length === 0 ? (
          <p className="text-gray-500">No clients found yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {clients.map((name) => (
              <button
                key={name}
                onClick={() => openClient(name)}
                className="text-left p-3 border rounded hover:shadow transition bg-white"
              >
                <p className="font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">
                  {bookings.filter((b) => b.name === name).length} rentals
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Client history modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedClient} — History</h3>
              <button onClick={closeClient} className="text-gray-500">Close</button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Rentals / Hires</h4>
              <div className="space-y-3">
                {historyFor(selectedClient).hires.length === 0 ? (
                  <p className="text-gray-500 text-sm">No rental history.</p>
                ) : (
                  historyFor(selectedClient).hires.map((h) => (
                    <div key={h.id} className="p-3 border rounded">
                      <p className="font-medium">Car ID: {h.carId}</p>
                      <p className="text-sm text-gray-600">Mode: {h.mode}</p>
                      <p className="text-sm text-gray-600">Date: {h.date}</p>
                      <p className="text-sm text-gray-600">Notes: {h.notes}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Purchases</h4>
              <div className="space-y-3">
                {historyFor(selectedClient).buys.length === 0 ? (
                  <p className="text-gray-500 text-sm">No purchase history.</p>
                ) : (
                  historyFor(selectedClient).buys.map((s) => (
                    <div key={s.id} className="p-3 border rounded">
                      <p className="font-medium">Car ID: {s.carId}</p>
                      <p className="text-sm text-gray-600">Price: {s.price}</p>
                      <p className="text-sm text-gray-600">Date: {s.createdAt}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ClientsPage;
