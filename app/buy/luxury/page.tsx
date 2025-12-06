import React from "react";
import Nav from "../../components/Nav";
import CarCard from "../../components/CarCard";
import { cars } from "../../../data/cars";

const LuxuryPage = () => {
  const luxury = cars.filter((c) => (c.price || 0) > 50000000);

  return (
    <>
      <Nav />
      <div className="pt-14 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-2">Luxury Vehicles</h1>
        <p className="text-gray-500 mb-6">Premium and luxury cars in our collection</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {luxury.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow">No luxury vehicles yet.</div>
          ) : (
            luxury.map((car) => <CarCard key={car.id} car={car} />)
          )}
        </div>
      </div>
    </>
  );
};

export default LuxuryPage;
