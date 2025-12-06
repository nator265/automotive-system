"use client";

import React from "react";
import { Car } from "@/types/car";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

interface CarCardProps {
  car: Car;
}

const getBadge = (car: Car) => {
  if (car.price && car.price < 8000)
    return { text: "Great Price", color: "bg-green-500" };
  if (car.mileage && car.mileage < 60000)
    return { text: "Low Mileage", color: "bg-indigo-500" };
  return null;
};

const CarCard = ({ car }: CarCardProps) => {
  const badge = getBadge(car);
  const [discount, setDiscount] = React.useState<number | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("fleet_discounts");
      if (raw) {
        const parsed = JSON.parse(raw || "{}");
        if (parsed[car.id]) setDiscount(parsed[car.id]);
      }
    } catch (err) {}
  }, [car.id]);
  const subtitle = `${car.engineCapacity}cc ${car.transmission} • ${car.type}`;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative">
        <img
          src={car.images?.[0] ?? "/cars/placeholder.jpg"}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 md:h-56 object-cover"
        />

        {badge && (
          <span
            className={`absolute top-3 left-3 text-white text-sm px-3 py-1 rounded-full ${badge.color}`}
          >
            {badge.text}
          </span>
        )}

        <button
          aria-label="bookmark"
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
        >
          <BookmarkBorderIcon fontSize="small" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {car.make} {car.model} —{" "}
            <span className="font-normal text-gray-500">{car.year}</span>
          </h3>
          <p className="text-sm text-gray-500 truncate max-w-[18rem] md:max-w-full">
            {subtitle} — {car.features?.slice(0, 1).join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <SpeedIcon fontSize="small" className="text-gray-400" />
            <span>{car.mileage?.toLocaleString()} Miles</span>
          </div>
          <div className="flex items-center gap-2">
            <LocalGasStationIcon fontSize="small" className="text-gray-400" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2">
            <SettingsIcon fontSize="small" className="text-gray-400" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xl font-extrabold text-gray-900">
            {discount ? (
              <div>
                <div className="line-through text-sm text-gray-400">MWK{car.price.toLocaleString()}</div>
                <div className="text-lg text-green-600">MWK{Math.round((car.price || 0) * (1 - discount / 100)).toLocaleString()}</div>
              </div>
            ) : (
              <>MWK{car.price.toLocaleString()}</>
            )}
          </div>
          <Link
            href={`/buy/showroom`}
            className="text-sm text-blue-600 hover:underline flex items-center gap-2"
          >
            View Details <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
