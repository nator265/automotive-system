"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { Car } from "@/types/car";
import Notification from "@/app/components/Notification";

interface CarForm {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  color: string;
  engine: number;
  doors: number;
  seats: number;
  driveUnit: string;
  steering: string;
  location: string;
  condition: string;
  importCountry: string;
  availability: string;
  description: string;
  features: string[];
}

const EditCarPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<CarForm> | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Fetch car data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cars/${id}`);
        const data = await response.json();

        if (data.success) {
          setCar(data.car);
        } else {
          setError(data.error || "Car not found");
        }
      } catch (err) {
        setError("Failed to fetch car data");
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const update = (field: string, value: any) => {
    setCar((prev: any) => prev ? { ...prev, [field]: value } : null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      });

      const data = await response.json();

      if (data.success) {
        setNotification({ message: "Car updated successfully!", type: "success" });
        setTimeout(() => router.push("/dashboard/manage-fleet"), 2000);
      } else {
        setNotification({ message: data.error || "Failed to update car", type: "error" });
      }
    } catch (err) {
      setNotification({ message: "Failed to update car. Please try again.", type: "error" });
      console.error("Error updating car:", err);
    } finally {
      setSaving(false);
    }
  };

  const generatePreview = () => {
    if (!car) return;
    setEditingCar(car);
    setShowPreview(true);
  };

  const handleEditFromPreview = (field: string, value: any) => {
    if (editingCar) {
      setEditingCar({ ...editingCar, [field]: value });
    }
  };

  const applyPreviewChanges = () => {
    if (editingCar) {
      setCar(editingCar as Car);
    }
    setShowPreview(false);
  };

  const PreviewCarCard = ({ car, editable = false }: { car: any; editable?: boolean }) => {
    const getBadge = (car: any) => {
      if (car.availability?.toLowerCase().includes("sale") && car.availability?.toLowerCase().includes("hire")) {
        return { text: "Sale & Hire", color: "bg-purple-500" };
      } else if (car.availability?.toLowerCase().includes("sale")) {
        return { text: "For Sale", color: "bg-blue-500" };
      } else if (car.availability?.toLowerCase().includes("hire")) {
        return { text: "For Hire", color: "bg-green-500" };
      }
      return { text: "Available", color: "bg-gray-500" };
    };

    const badge = getBadge(car);

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
        <div className="relative">
          {car.images && car.images.length > 0 ? (
            <img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-white text-xs font-semibold ${badge.color}`}>
            {badge.text}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            {editable ? (
              <div className="flex gap-2 flex-1">
                <input
                  value={car.make || ""}
                  onChange={(e) => handleEditFromPreview("make", e.target.value)}
                  className="text-lg font-semibold text-gray-800 border p-1 rounded flex-1"
                  placeholder="Make"
                />
                <input
                  value={car.model || ""}
                  onChange={(e) => handleEditFromPreview("model", e.target.value)}
                  className="text-lg font-semibold text-gray-800 border p-1 rounded flex-1"
                  placeholder="Model"
                />
              </div>
            ) : (
              <h3 className="text-lg font-semibold text-gray-800">
                {car.make} {car.model}
              </h3>
            )}
            <span className="text-lg font-bold text-blue-600">
              ${car.price?.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <span>📅</span>
              {editable ? (
                <input
                  value={car.year || ""}
                  onChange={(e) => handleEditFromPreview("year", parseInt(e.target.value))}
                  type="number"
                  className="border p-1 rounded w-16"
                  placeholder="Year"
                />
              ) : (
                <span>{car.year}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span>🛣️</span>
              {editable ? (
                <input
                  value={car.mileage || ""}
                  onChange={(e) => handleEditFromPreview("mileage", parseInt(e.target.value))}
                  type="number"
                  className="border p-1 rounded w-20"
                  placeholder="Mileage"
                />
              ) : (
                <span>{car.mileage?.toLocaleString()} km</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span>⛽</span>
              {editable ? (
                <select
                  value={car.fuel || ""}
                  onChange={(e) => handleEditFromPreview("fuel", e.target.value)}
                  className="border p-1 rounded text-xs"
                >
                  <option value="">Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              ) : (
                <span>{car.fuel}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span>⚙️</span>
              {editable ? (
                <select
                  value={car.transmission || ""}
                  onChange={(e) => handleEditFromPreview("transmission", e.target.value)}
                  className="border p-1 rounded text-xs"
                >
                  <option value="">Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              ) : (
                <span>{car.transmission}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              View Details
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition">
              Contact
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="pt-16 p-6">
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color="#3b82f6" />
          <span className="ml-3 text-gray-600">Loading car data...</span>
        </div>
      </main>
    );
  }

  if (error || !car) {
    return (
      <main className="pt-16 p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Car not found</h2>
          <p className="text-sm text-gray-600 mb-4">{error || `No car exists with id ${id}`}</p>
          <Link href="/dashboard/manage-fleet" className="text-blue-600">Back to Manage Fleet</Link>
        </div>
      </main>
    );
  }

  if (showPreview) {
    return (
      <>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <main className="pt-16 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Car Preview</h1>
              <button
                onClick={() => setShowPreview(false)}
                className="text-blue-600 hover:underline"
              >
                Back to Edit
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <PreviewCarCard car={editingCar || car} editable={!!editingCar} />
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Edit Preview</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Make changes directly on the preview card above. Changes will be applied when you save.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={applyPreviewChanges}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Apply Changes
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="pt-16 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Car</h1>
          <Link href="/dashboard/manage-fleet" className="text-blue-600 hover:underline">
            Back to Manage Fleet
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <form onSubmit={handleSave} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Make</label>
                    <input
                      value={car.make || ""}
                      onChange={(e) => update("make", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                      value={car.model || ""}
                      onChange={(e) => update("model", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      value={car.year || ""}
                      onChange={(e) => update("year", Number(e.target.value))}
                      type="number"
                      className="mt-1 block w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      value={car.price || ""}
                      onChange={(e) => update("price", Number(e.target.value))}
                      type="number"
                      className="mt-1 block w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mileage</label>
                    <input
                      value={car.mileage || ""}
                      onChange={(e) => update("mileage", Number(e.target.value))}
                      type="number"
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Engine (cc)</label>
                    <input
                      value={car.engine || ""}
                      onChange={(e) => update("engine", Number(e.target.value))}
                      type="number"
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                    <select
                      value={car.fuel || ""}
                      onChange={(e) => update("fuel", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                    <select
                      value={car.transmission || ""}
                      onChange={(e) => update("transmission", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    >
                      <option value="">Select Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Body Type</label>
                    <input
                      value={car.bodyType || ""}
                      onChange={(e) => update("bodyType", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <input
                      value={car.color || ""}
                      onChange={(e) => update("color", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Doors</label>
                    <input
                      value={car.doors || ""}
                      onChange={(e) => update("doors", Number(e.target.value))}
                      type="number"
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                    <input
                      value={car.seats || ""}
                      onChange={(e) => update("seats", Number(e.target.value))}
                      type="number"
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Drive Unit</label>
                    <select
                      value={car.driveUnit || ""}
                      onChange={(e) => update("driveUnit", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    >
                      <option value="">Select Drive Unit</option>
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Steering</label>
                    <select
                      value={car.steering || ""}
                      onChange={(e) => update("steering", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    >
                      <option value="">Select Steering</option>
                      <option value="Left">Left</option>
                      <option value="Right">Right</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      value={car.location || ""}
                      onChange={(e) => update("location", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <select
                      value={car.condition || ""}
                      onChange={(e) => update("condition", e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Import Country</label>
                  <input
                    value={car.importCountry || ""}
                    onChange={(e) => update("importCountry", e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Availability</label>
                  <select
                    value={car.availability || ""}
                    onChange={(e) => update("availability", e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Hire">For Hire</option>
                    <option value="For Sale & Hire">For Sale & Hire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={car.description || ""}
                    onChange={(e) => update("description", e.target.value)}
                    rows={4}
                    className="mt-1 block w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && <ClipLoader size={16} color="#ffffff" />}
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={generatePreview}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                  >
                    Preview Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Preview</h2>
              {car.make && car.model ? (
                <PreviewCarCard car={car} />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Fill in the car details to see a preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default EditCarPage;
