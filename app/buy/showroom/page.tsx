"use client";

import React, { useState } from "react";
import Nav from "../../components/Nav";
import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SimilarVehicles from "@/app/components/SimilarVehicles";
import Contact from "@/app/components/Contact";

// Spec Card Component
const SpecCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className="text-xs text-slate-500 font-semibold">{label}</p>
    </div>
    <p className="text-lg font-bold text-slate-900">{value}</p>
  </div>
);

const getCommonFeatures = () => [
  "Leather Seats",
  "Sunroof",
  "Heated Seats",
  "Lane Assist",
  "Blind Spot Monitoring",
  "Reverse Camera",
  "Bluetooth Connectivity",
  "Climate Control",
];

const ShowroomPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const car = {
    make: "Mazda",
    model: "CX-5",
    year: 2018,
    price: 58500000,
    type: "SUV",
    fuel: "Diesel",
    transmission: "Automatic",
    steering: "Right",
    engineCapacity: 2200,
    mileage: 68000,
    seats: 5,
    color: "Red",
    features: [
      "Leather Seats",
      "Heated Seats",
      "Sunroof",
      "Lane Assist",
      "Blind Spot Monitoring",
      "Reverse Camera",
      "Bluetooth Connectivity",
      "Climate Control",
    ],
    images: ["/cars/cx5_1.jpg", "/cars/cx5_2.jpg", "/cars/cx5_3.jpg"],
  };

  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % car.images.length);
  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? car.images.length - 1 : i - 1));

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted", formData);
    setShowBookingModal(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <>
      <Nav />

      <div className="pt-14 md:pt-15 bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 min-h-screen">
        {/* Back Button */}
        <div className="px-4 md:px-12 pt-6">
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition"
          >
            <ArrowBackIcon fontSize="small" /> Back to Listings
          </Link>
        </div>

        {/* Main Content */}
        <div className="px-4 pt-8">
          <div className="">
            {" "}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              {car.make} <span className="text-blue-600">{car.model}</span>
            </h1>
            <p className="text-slate-500 text-lg mb-6">
              {car.type} • {car.year} • {car.color}
            </p>
          </div>
          <div className="w-full">
            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl px-5 pb-20">
              <div className="w-full h-[420px] md:h-[560px] bg-slate-200">
                <img
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-50 md:top-1/5 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
                >
                  <ChevronLeftIcon />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-50 md:top-1/5 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
                >
                  <ChevronRightIcon />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {car.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 ${
                      idx === currentImageIndex
                        ? "border-blue-600 shadow-lg"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Details + Price */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pricing Sidebar */}
                <div className="lg:col-span-1 gap-5">
                  <aside className="flex h-[250px] items-center text-center">
                    <h1>Video Preview unavailable</h1>
                  </aside>
                  <aside className="sticky top-28">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <p className="text-sm text-slate-500">Premium Price</p>
                      <div className="text-4xl font-bold text-slate-900 my-4">
                        MWK{car.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600 mb-6">
                        {car.seats} seats • {car.steering} steering
                      </div>
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold"
                      >
                        Book an Inspection
                      </button>
                    </div>
                  </aside>
                </div>
                {/* Car Details */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-md">
                  <div className="mb-4">
                    <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      Featured Showcase
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <SpecCard
                      label="Fuel"
                      value={car.fuel}
                      icon={<LocalGasStationIcon className="text-blue-600" />}
                    />
                    <SpecCard
                      label="Mileage"
                      value={`${(car.mileage / 1000).toFixed(0)}k mi`}
                      icon={<SpeedIcon className="text-blue-600" />}
                    />
                    <SpecCard
                      label="Transmission"
                      value={car.transmission}
                      icon={<DirectionsCarIcon className="text-blue-600" />}
                    />
                    <SpecCard
                      label="Engine"
                      value={`${car.engineCapacity}cc`}
                      icon={<span className="text-blue-600">⚙️</span>}
                    />
                  </div>

                  {/* Key Features */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4">
                      Key Features
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {getCommonFeatures().map((feat) => {
                        const available = car.features.includes(feat);
                        return (
                          <div
                            key={feat}
                            className={`p-3 rounded-lg border ${
                              available
                                ? "bg-blue-50 border-blue-200 shadow-sm"
                                : "bg-white border-slate-100 text-slate-400"
                            }`}
                          >
                            <div className="font-medium text-sm">{feat}</div>
                            {available && (
                              <div className="text-xs text-blue-600 mt-1">
                                Available
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-30 bg-white p-10 rounded-lg shadow-sm">
                <SimilarVehicles />
              </div>
              <div className="mt-20">
                <Contact />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-500 text-white p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <EventIcon /> Schedule Inspection
                </h3>

                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-blue-700 rounded-lg transition"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <p className="text-slate-600 mb-4">
                  Book an appointment to inspect the {car.make} {car.model}
                </p>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+265 1 234 567"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="Any special requests?"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowroomPage;
