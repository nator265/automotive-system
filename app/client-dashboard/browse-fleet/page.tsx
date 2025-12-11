"use client";

import React, { useState } from "react";
import CarCard from "../../components/CarCard";
import { cars } from "../../../data/cars";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { FilterList } from "@mui/icons-material";

const BrowseFleetPage = () => {
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
        window.removeEventListener(
          "exploreTabChange",
          handler as EventListener
        );
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Browse Fleet
        </h1>
        <p className="text-gray-600">
          Explore our available vehicles and find the perfect one for your
          needs.
        </p>
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
  );
};

export default BrowseFleetPage;
