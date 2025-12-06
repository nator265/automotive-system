"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { cars } from "@/data/cars";
import Link from "next/link";

const EditDemoPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const found = cars.find((c) => c.id === id);
  const [form, setForm] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (found) setForm({ ...found });
  }, [found]);

  if (!found) {
    return (
      <main className="pt-16 p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Car not found</h2>
          <p className="text-sm text-gray-600 mb-4">No car exists with id {id}</p>
          <Link href="/dashboard/manage-fleet" className="text-blue-600">Back to Manage Fleet</Link>
        </div>
      </main>
    );
  }

  function update(field: string, value: any) {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // demo-only: not persisted
    setSaved(true);
    setTimeout(() => router.push("/dashboard/manage-fleet"), 1200);
  }

  return (
    <main className="pt-16 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Edit Car (Demo)</h1>
          <Link href="/dashboard/manage-fleet" className="text-sm text-gray-500">Cancel</Link>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <input value={form?.make || ""} onChange={(e) => update("make", e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input value={form?.model || ""} onChange={(e) => update("model", e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input value={form?.year || ""} onChange={(e) => update("year", Number(e.target.value))} type="number" className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input value={form?.price || ""} onChange={(e) => update("price", Number(e.target.value))} type="number" className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <select value={form?.availability || ""} onChange={(e) => update("availability", e.target.value)} className="mt-1 block w-full border rounded px-3 py-2">
              <option value="For Sale">For Sale</option>
              <option value="For Hire">For Hire</option>
              <option value="For Sale & Hire">For Sale & Hire</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save (demo)</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Back</button>
            {saved && <span className="text-sm text-green-600">Saved (demo) — returning...</span>}
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditDemoPage;
