"use client";
import React, { useState } from "react";
import CarCard from "./CarCard";
import { cars } from "@/data/cars"; // import your car data
import { featuredCars } from "@/data/featured";
import Search from "./Search";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { CarBrandsCard } from "./Cards";
import { Filter, Filter1, FilterList } from "@mui/icons-material";

const CarCategories = () => {
  return (
    <div className="z-2 w-full bg-gray-200">
      {/* Search Section */}
      <div className="hidden md:flex z-3 w-full justify-center absolute -bottom-48 h-[300px]">
        <div className="bg-white w-3/4 h-full rounded-2xl shadow-md">
          <div className="flex items-center justify-center pt-8">
            <h2>Explore Our Premium Brands</h2>
          </div>
          <div className="flex gap-10 justify-center">
            <CarBrandsCard
              imageSrc="/carbrands/landrover.png"
              brandName="Land Rover"
            />
            <CarBrandsCard imageSrc="/carbrands/bmw.png" brandName="BMW" />
            <CarBrandsCard imageSrc="/carbrands/benz.png" brandName="Benz" />
          </div>
        </div>
      </div>

      {/* featured */}
      <div className="z-2 w-screen bg-neutral-50 p-12 md:pt-[400px] relative">
        <span className="text-4xl font-semibold text-gray-700">
          Featured Vehicles
        </span>
       ` <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>`
      </div>

      {/* section break */}
      <div className="relative h-[100px] w-full z-100 bg-gray-100"></div>

      {/* Explore Vehicles */}
      <div className="z-2 w-screen bg-neutral-50 p-12 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4">
          <div className="">
            <span className="text-4xl font-semibold text-gray-700">
              Explore Vehicles
            </span>
          </div>
          <div className="hidden md:flex">
            <form action="" method="post" className="flex gap-4">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Your car awaits..."
                className="border border-gray-400 rounded-md md:w-[500px] h-12 p-4 w-[80%]"
              />
              <div className="w-12 h-12 items-center justify-center flex hover:bg-gray-200 rounded-md border border-gray-400 ">
                <Link href="/">
                  <SearchIcon />
                </Link>
              </div>
              <div className="flex w-12 h-12 items-center justify-center hover:bg-gray-200 rounded-md border border-gray-400">
                <FilterList />
              </div>
            </form>
          </div>
        </div>
        {/* Tabs: All / Sale / Hire */}
        <Tabs />
        {/* mobile search button */}
        <div className="flex md:hidden">
          <form action="" method="post" className="flex gap-4">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Your car awaits..."
              className="border border-gray-400 rounded-md md:w-[500px] h-12 p-4 w-[80%]"
            />
            <div className="w-12 h-12 items-center justify-center flex hover:bg-gray-200 rounded-md border border-gray-400">
              <Link href="/">
                <SearchIcon />
              </Link>
            </div>
            <div className="w-12 h-12 items-center justify-center flex hover:bg-gray-200 rounded-md border border-gray-400">
              <Link href="/">
                <FilterList />
              </Link>
            </div>
          </form>
        </div>
        {/* cars list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-20 gap-8 md:space-y-5 mt-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCategories;

const Tabs: React.FC = () => {
  const [active, setActive] = useState<"all" | "sale" | "hire">("all");
  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("exploreTabChange", { detail: active })
    );
  }, [active]);

  const tabClass = (t: string) =>
    `px-4 py-2 rounded-md whitespace-nowrap ${
      active === t
        ? "border-b-2 border-blue-500 rounded-none"
        : "text-gray-700 hover:scale-110 transition-transform duration-150 transform hover:-translate-y-1"
    }`;

  return (
    <div className="mt-4">
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          role="tab"
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
          className={tabClass("all")}
        >
          All
        </button>
        <button
          role="tab"
          aria-pressed={active === "sale"}
          onClick={() => setActive("sale")}
          className={tabClass("sale")}
        >
          Sale
        </button>
        <button
          role="tab"
          aria-pressed={active === "hire"}
          onClick={() => setActive("hire")}
          className={tabClass("hire")}
        >
          Hire
        </button>
      </div>
    </div>
  );
};

const FilteredCarsGrid: React.FC = () => {
  const [tab, setTab] = useState<"all" | "sale" | "hire">("all");

  React.useEffect(() => {
    const handler = (e: Event) => {
      // @ts-ignore
      const detail = (e as CustomEvent).detail as "all" | "sale" | "hire";
      setTab(detail || "all");
    };
    window.addEventListener("exploreTabChange", handler as EventListener);
    return () =>
      window.removeEventListener("exploreTabChange", handler as EventListener);
  }, []);

  const filtered = cars.filter((c) => {
    if (tab === "all") return true;
    if (tab === "sale") return c.availability?.toLowerCase().includes("sale");
    return c.availability?.toLowerCase().includes("hire");
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {filtered.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
