"use client";

import React, { useState, useEffect } from "react";

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

type Client = {
  name: string;
  email: string;
  phone: string;
};

const ClientsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    // Dummy bookings
    const dummyBookings: Booking[] = [
      {
        id: "b1",
        carId: "C001",
        mode: "Daily",
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        date: "2025-12-01",
        notes: "Needs child seat",
      },
      {
        id: "b2",
        carId: "C002",
        mode: "Weekly",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "0987654321",
        date: "2025-11-28",
      },
    ];

    // Dummy sales
    const dummySales: Sale[] = [
      {
        id: "s1",
        carId: "C003",
        buyerName: "Alice Johnson",
        buyerEmail: "alice@example.com",
        price: 25000,
        createdAt: "2025-11-20",
      },
      {
        id: "s2",
        carId: "C001",
        buyerName: "John Doe",
        buyerEmail: "john@example.com",
        price: 18000,
        createdAt: "2025-12-02",
      },
    ];

    setBookings(dummyBookings);
    setSales(dummySales);

    // Extract unique clients
    const clientMap = new Map<string, Client>();

    dummyBookings.forEach((b) => {
      if (!clientMap.has(b.name)) {
        clientMap.set(b.name, {
          name: b.name,
          email: b.email,
          phone: b.phone,
        });
      }
    });

    dummySales.forEach((s) => {
      if (s.buyerName && !clientMap.has(s.buyerName)) {
        clientMap.set(s.buyerName, {
          name: s.buyerName,
          email: s.buyerEmail || "",
          phone: "",
        });
      }
    });

    setClients(Array.from(clientMap.values()));
  }, []);

  const historyFor = (client: Client) => {
    const hires = bookings.filter((b) => b.name === client.name);
    const buys = sales.filter(
      (s) => s.buyerName === client.name || s.buyerEmail === client.email
    );
    return { hires, buys };
  };

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
        <p className="text-gray-500 text-sm">
          List of clients and their activity history
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">All Clients</h2>

        {clients.length === 0 ? (
          <p className="text-gray-500">No clients found yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedClient(client)}
                    className="hover:bg-gray-100 cursor-pointer transition"
                  >
                    <td className="px-4 py-3 border-t">{client.name}</td>
                    <td className="px-4 py-3 border-t">{client.email}</td>
                    <td className="px-4 py-3 border-t">{client.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODERN MODAL */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 z-50">
          <div className="bg-white w-full max-w-4xl mx-4 rounded-xl shadow-xl p-6 animate-[slideDown_.25s_ease-out]">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedClient.name} — History
              </h3>
              <button
                onClick={() => setSelectedClient(null)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-8">
              {/* HIRES TABLE */}
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  🚗 Rentals / Hires
                </h4>

                {historyFor(selectedClient).hires.length === 0 ? (
                  <p className="text-gray-500">No rental history.</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left">Car ID</th>
                          <th className="px-4 py-2 text-left">Mode</th>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyFor(selectedClient).hires.map((h) => (
                          <tr key={h.id} className="border-t hover:bg-gray-100">
                            <td className="px-4 py-2">{h.carId}</td>
                            <td className="px-4 py-2">{h.mode}</td>
                            <td className="px-4 py-2">{h.date}</td>
                            <td className="px-4 py-2">{h.notes || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* PURCHASES TABLE */}
              <div>
                <h4 className="text-lg font-semibold mb-3">💰 Purchases</h4>

                {historyFor(selectedClient).buys.length === 0 ? (
                  <p className="text-gray-500">No purchase history.</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left">Car ID</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyFor(selectedClient).buys.map((s) => (
                          <tr key={s.id} className="border-t hover:bg-gray-100">
                            <td className="px-4 py-2">{s.carId}</td>
                            <td className="px-4 py-2">{s.price}</td>
                            <td className="px-4 py-2">{s.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
