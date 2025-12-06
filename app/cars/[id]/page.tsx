import React from "react";
import { cars } from "../../../data/cars";
import BookingForm from "../../components/BookingForm";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

const CarDetailPage = ({ params }: Props) => {
  const { id } = params;
  const car = cars.find((c) => c.id === id);
  if (!car) return notFound();

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-md shadow overflow-hidden">
            <img
              src={car.images?.[0] ?? "/cars/placeholder.jpg"}
              alt={`${car.make} ${car.model}`}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold">
                {car.make} {car.model}{" "}
                <span className="text-gray-500 font-normal">{car.year}</span>
              </h1>
              <p className="text-xl text-blue-600 font-semibold mt-2">
                ${car.price.toLocaleString()}
              </p>
              <p className="text-gray-600 mt-3">
                {car.type} · {car.transmission} · {car.fuel} · {car.color}
              </p>

              <div className="mt-4">
                <h4 className="font-semibold">Features</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {car.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div>Mileage: {car.mileage.toLocaleString()} miles</div>
                <div>Seats: {car.seats}</div>
                <div>Engine: {car.engineCapacity} cc</div>
                <div>Steering: {car.steering}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-md shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Book an Appointment</h3>
          <p className="text-sm text-gray-500 mb-4">
            Request a time to view the car in person.
          </p>
          <BookingForm
            carId={car.id}
            mode={car.availability === "For Hire" ? "hire" : "buy"}
          />
        </aside>
      </div>
    </div>
  );
};

export default CarDetailPage;
