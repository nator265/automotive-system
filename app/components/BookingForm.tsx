"use client";

import React, { useState } from "react";

type BookingProps = {
  carId: string;
  mode: "view" | "hire" | "buy";
};

const BookingForm = ({ carId, mode = "view" }: BookingProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carId,
            mode,
            name,
            email,
            phone,
            date,
            notes,
          }),
        });
        if (!res.ok) throw new Error("Failed to submit");
        setSubmitted(true);
      } catch (err) {
        console.error("Booking submit error", err);
        alert("Failed to submit booking. Try again later.");
      }
    })();
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-100 p-4 rounded">
        <h4 className="font-semibold">Request submitted</h4>
        <p className="text-sm text-gray-600">
          We received your request and will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" value={carId} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          required
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <textarea
        placeholder="Notes or preferred time"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded px-3 py-2"
        rows={3}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Request Appointment
        </button>
        <button
          type="button"
          className="border px-4 py-2 rounded"
          onClick={() => {
            setName("");
            setEmail("");
            setPhone("");
            setDate("");
            setNotes("");
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
