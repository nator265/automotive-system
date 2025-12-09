import React from "react";
import Nav from "../components/Nav";
import CarCard from "../components/CarCard";
import { cars } from "../../data/cars";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { FilterList } from "@mui/icons-material";
import SimilarVehicles from "../components/SimilarVehicles";

const HirePage = () => {
  const forHire = cars.filter((c) => c.availability === "For Hire");

  return (
    <>
      <Nav />
      <div className="pt-20 md:pt-[100] p-4 md:p-8">
        <div className=" justify-between mb-5">
          <div className="">
            <h1 className="text-3xl font-bold mb-2">Hire a Car</h1>
            <p className="text-gray-500 mb-6">
              Browse cars available for hire.
            </p>
          </div>
          <div className="">
            <form action="" method="post" className="flex gap-4">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Your car awaits..."
                className="border border-gray-400 rounded-md md:w-[500px] h-12 p-4"
              />
              <div className="w-12 h-12 items-center justify-center flex hover:bg-gray-200 rounded-md border border-gray-400">
                <Link href="">
                  <SearchIcon />
                </Link>
              </div>
              <div className="w-12 h-12 items-center justify-center flex hover:bg-gray-200 rounded-md border border-gray-400">
                <Link href="">
                  <FilterList />
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forHire.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HirePage;
