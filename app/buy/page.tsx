"use client"
import React from "react";
import Nav from "../components/Nav";  
import CarCard from "../components/CarCard";
import { cars } from "../../data/cars";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { FilterList } from "@mui/icons-material";

const BuyPage = () => {
  const [filter, setFilter] = React.useState("All");
  const forSale = cars.filter((c) => c.availability === "For Sale");
  const filtered = forSale.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Luxury") return (c.price || 0) > 50000000;
    return c.type === filter;
  });

  return (
    <>
      <Nav />
      <div className="pt-14 md:pt-[100] p-4 md:p-8">
        <div className="flex justify-between mb-5">
          <div className="">
            <h1 className="text-3xl font-bold mb-2">Buy a Car</h1>
            <p className="text-gray-500 mb-6">
              Browse cars available for sale.
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

        <div className="mb-6">
          <label className="text-sm text-gray-600 mr-3">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>All</option>
            <option>Hatchback</option>
            <option>SUV</option>
            <option>Luxury</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyPage;
