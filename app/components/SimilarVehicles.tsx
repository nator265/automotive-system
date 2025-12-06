import React from 'react'
import CarCard from "./CarCard";
import { cars } from "@/data/cars"; // import your car data
import { featuredCars } from "@/data/featured";

const SimilarVehicles = () => {
  return (
      <div>
          <div className="">
              <h2>Similar to what you are looking at</h2>
          </div>
          <div className=''>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {featuredCars.map((car) => (
                          <CarCard key={car.id} car={car} />
                        ))}
                      </div>
          </div>
    </div>
  )
}

export default SimilarVehicles 