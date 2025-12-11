"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  IconButton,
} from "@mui/material";

import CarCard from "@/app/components/CarCard";
import { cars as initialCars } from "@/data/cars";

/**
 * ManageFleetContent (clean, reorganized)
 *
 * - Single Tabs component
 * - Search + Filter aligned on the header right
 * - Filter modal with Beforward-style fields (UI-only)
 *
 * NOTE: Filtering behavior is NOT implemented — the modal fields are present and can be wired later.
 */

type TabType = "all" | "sale" | "hire";

const ManageFleetContent: React.FC = () => {
  const [displayCars, setDisplayCars] = useState(initialCars);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // search state (UI-only)
  const [searchQuery, setSearchQuery] = useState("");

  // filter modal state
  const [openFilter, setOpenFilter] = useState(false);

  // filter form state (UI-only, plenty of fields to match Beforward)
  const [filterForm, setFilterForm] = useState({
    yearMin: "",
    yearMax: "",
    make: "",
    model: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
    transmission: "",
    fuelType: "",
    bodyType: "",
    steering: "",
    engineMin: "",
    engineMax: "",
    color: "",
    driveUnit: "",
    doorsMin: "",
    doorsMax: "",
    location: "",
    condition: "",
    importCountry: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fleet_discounts");
      if (raw) setDiscounts(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, []);

  function saveDiscounts(next: Record<string, number>) {
    setDiscounts(next);
    try {
      localStorage.setItem("fleet_discounts", JSON.stringify(next));
    } catch {}
  }

  // When tab changes, other components can react via custom event (keeps parity with your previous design)
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("manageFleetTabChange", { detail: activeTab })
    );
  }, [activeTab]);

  // Filtered list according to active tab (search/filter not applied — left for later wiring)
  const filteredByTab = displayCars.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "sale")
      return c.availability?.toLowerCase().includes("sale");
    return c.availability?.toLowerCase().includes("hire");
  });

  // -------------------------
  // UI handlers
  // -------------------------
  const handleFilterField = (k: keyof typeof filterForm, v: string) =>
    setFilterForm((s) => ({ ...s, [k]: v }));

  return (
    <>
      {/* Filter Modal */}
      <Modal open={openFilter} onClose={() => setOpenFilter(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 700 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h2 className="text-xl font-bold mb-3">Filter Cars</h2>
          <p className="text-sm text-gray-600 mb-4">
            All fields are UI-only for now
          </p>

          {/* Year */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Year Min"
              type="number"
              value={filterForm.yearMin}
              onChange={(e) => handleFilterField("yearMin", e.target.value)}
            />
            <TextField
              label="Year Max"
              type="number"
              value={filterForm.yearMax}
              onChange={(e) => handleFilterField("yearMax", e.target.value)}
            />
          </div>

          {/* Make / Model */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Make"
              value={filterForm.make}
              onChange={(e) => handleFilterField("make", e.target.value)}
            />
            <TextField
              label="Model"
              value={filterForm.model}
              onChange={(e) => handleFilterField("model", e.target.value)}
            />
          </div>

          {/* Price range */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Price Min"
              type="number"
              value={filterForm.priceMin}
              onChange={(e) => handleFilterField("priceMin", e.target.value)}
            />
            <TextField
              label="Price Max"
              type="number"
              value={filterForm.priceMax}
              onChange={(e) => handleFilterField("priceMax", e.target.value)}
            />
          </div>

          {/* Mileage */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Mileage Min"
              type="number"
              value={filterForm.mileageMin}
              onChange={(e) => handleFilterField("mileageMin", e.target.value)}
            />
            <TextField
              label="Mileage Max"
              type="number"
              value={filterForm.mileageMax}
              onChange={(e) => handleFilterField("mileageMax", e.target.value)}
            />
          </div>

          {/* Transmission, Fuel */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormControl fullWidth>
              <InputLabel>Transmission</InputLabel>
              <Select
                label="Transmission"
                value={filterForm.transmission}
                onChange={(e) =>
                  handleFilterField("transmission", e.target.value)
                }
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="CVT">CVT</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                label="Fuel Type"
                value={filterForm.fuelType}
                onChange={(e) => handleFilterField("fuelType", e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Body Type / Steering */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormControl fullWidth>
              <InputLabel>Body Type</InputLabel>
              <Select
                label="Body Type"
                value={filterForm.bodyType}
                onChange={(e) => handleFilterField("bodyType", e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Hatchback">Hatchback</MenuItem>
                <MenuItem value="Coupe">Coupe</MenuItem>
                <MenuItem value="Wagon">Wagon</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Steering</InputLabel>
              <Select
                label="Steering"
                value={filterForm.steering}
                onChange={(e) => handleFilterField("steering", e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Right">Right Hand Drive</MenuItem>
                <MenuItem value="Left">Left Hand Drive</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Engine size */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Engine Min (cc)"
              type="number"
              value={filterForm.engineMin}
              onChange={(e) => handleFilterField("engineMin", e.target.value)}
            />
            <TextField
              label="Engine Max (cc)"
              type="number"
              value={filterForm.engineMax}
              onChange={(e) => handleFilterField("engineMax", e.target.value)}
            />
          </div>

          {/* Extra Beforward-like fields */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Color"
              value={filterForm.color}
              onChange={(e) => handleFilterField("color", e.target.value)}
            />
            <TextField
              label="Drive Unit"
              value={filterForm.driveUnit}
              onChange={(e) => handleFilterField("driveUnit", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Doors Min"
              type="number"
              value={filterForm.doorsMin}
              onChange={(e) => handleFilterField("doorsMin", e.target.value)}
            />
            <TextField
              label="Doors Max"
              type="number"
              value={filterForm.doorsMax}
              onChange={(e) => handleFilterField("doorsMax", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Location"
              value={filterForm.location}
              onChange={(e) => handleFilterField("location", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                label="Condition"
                value={filterForm.condition}
                onChange={(e) => handleFilterField("condition", e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Used">Used</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Salvage">Salvage</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Import Country"
              value={filterForm.importCountry}
              onChange={(e) =>
                handleFilterField("importCountry", e.target.value)
              }
            />
            <div /> {/* spacer to keep layout */}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() =>
                setFilterForm({
                  yearMin: "",
                  yearMax: "",
                  make: "",
                  model: "",
                  priceMin: "",
                  priceMax: "",
                  mileageMin: "",
                  mileageMax: "",
                  transmission: "",
                  fuelType: "",
                  bodyType: "",
                  steering: "",
                  engineMin: "",
                  engineMax: "",
                  color: "",
                  driveUnit: "",
                  doorsMin: "",
                  doorsMax: "",
                  location: "",
                  condition: "",
                  importCountry: "",
                })
              }
            >
              Reset
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenFilter(false)}
            >
              Apply (UI-only)
            </Button>
          </div>
        </Box>
      </Modal>

      {/* ------------------- MAIN CONTENT ------------------- */}
      <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Manage Fleet
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                View and manage all vehicles in your inventory
              </p>
            </div>

            {/* Right side: Add button + Search + Filter (aligned) */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/add-car"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:shadow-md transition flex items-center gap-2">
                <AddIcon fontSize="small" /> Add New Car
              </Link>

              {/* search box */}
              <div className="flex items-center border border-gray-300 rounded-md h-12 px-3 w-[220px] md:w-[300px]">
                <input
                  type="search"
                  placeholder="Search..."
                  className="grow outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon />
              </div>

              {/* filter button opens modal */}
              <IconButton
                onClick={() => setOpenFilter(true)}
                className="border border-gray-300 rounded-md hover:bg-gray-100"
                aria-label="Open filters"
              >
                <FilterListIcon />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Vehicles</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {displayCars.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Available</p>
            <p className="text-2xl font-bold text-green-600 mt-2">1</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">In Rental</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">4</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Sold</p>
            <p className="text-2xl font-bold text-red-600 mt-2">1</p>
          </div>
        </div>

        {/* Fleet header + Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Current Fleet</h2>
              <p className="text-sm text-gray-500">
                Use tabs to narrow to sale or hire listings.
              </p>
            </div>

            {/* Tabs (simple) */}
            <div className="mt-4 md:mt-0 flex gap-3">
              <button
                aria-pressed={activeTab === "all"}
                onClick={() => setActiveTab("all")}
                className={`px-3 py-2 rounded-md ${
                  activeTab === "all"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-700 hover:underline"
                }`}
              >
                All
              </button>
              <button
                aria-pressed={activeTab === "sale"}
                onClick={() => setActiveTab("sale")}
                className={`px-3 py-2 rounded-md ${
                  activeTab === "sale"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-700 hover:underline"
                }`}
              >
                Sale
              </button>
              <button
                aria-pressed={activeTab === "hire"}
                onClick={() => setActiveTab("hire")}
                className={`px-3 py-2 rounded-md ${
                  activeTab === "hire"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-700 hover:underline"
                }`}
              >
                Hire
              </button>
            </div>
          </div>

          {/* Fleet Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredByTab.map((car) => (
                <div key={car.id} className="relative">
                  <CarCard car={car} />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Link
                      href={`/dashboard/manage-fleet/edit/${car.id}`}
                      className="bg-white p-2 rounded shadow text-blue-600 hover:bg-gray-50"
                      title="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </Link>
                    <button
                      onClick={() => {
                        const ok = confirm(
                          "Are you sure you want to delete this car from the fleet? (Demo-only)"
                        );
                        if (!ok) return;
                        setDisplayCars((prev) =>
                          prev.filter((p) => p.id !== car.id)
                        );
                      }}
                      className="bg-white p-2 rounded shadow text-red-600 hover:bg-gray-50"
                      title="Delete"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredByTab.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No cars match the current tab.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageFleetContent;
