"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ClipLoader } from "react-spinners";

import CarCard from "@/app/components/CarCard";
import { Car } from "@/types/car";

type TabType = "all" | "sale" | "hire";

const ManageFleetContent: React.FC = () => {
  const router = useRouter();
  const [displayCars, setDisplayCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // filter form state
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

  // Fetch cars from database
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/cars");
      const data = await response.json();

      if (data.success) {
        setDisplayCars(data.cars);
      } else {
        setError(data.error || "Failed to fetch cars");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

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

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("manageFleetTabChange", { detail: activeTab })
    );
  }, [activeTab]);

  // Filter cars by search query
  const filteredBySearch = displayCars.filter((car) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      car.make.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.year.toString().includes(query) ||
      car.transmission.toLowerCase().includes(query) ||
      car.fuel.toLowerCase().includes(query)
    );
  });

  // Filtered list according to active tab
  const filteredByTab = filteredBySearch.filter((car) => {
    if (activeTab === "all") return true;
    if (activeTab === "sale")
      return car.availability?.toLowerCase().includes("sale");
    return car.availability?.toLowerCase().includes("hire");
  });

  // Delete car from database
  const deleteCar = async (carId: string) => {
    try {
      setDeleteLoading(carId);

      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setDisplayCars((prev) => prev.filter((car) => car.id !== carId));
        alert("Car deleted successfully");
      } else {
        alert(data.error || "Failed to delete car");
      }
    } catch (err) {
      alert("Failed to delete car. Please try again.");
      console.error("Error deleting car:", err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleFilterField = (k: keyof typeof filterForm, v: string) =>
    setFilterForm((s) => ({ ...s, [k]: v }));

  const handleAddNewCar = () => {
    router.push("/dashboard/add-car");
  };

  if (loading) {
    return (
      <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color="#3b82f6" />
          <span className="ml-3 text-gray-600">Loading cars...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Cars
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCars}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

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
            Use filters to narrow down your car search.
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
              Apply Filters
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Main Content */}
      <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Manage Fleet
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                View and manage all vehicles in your inventory (
                {displayCars.length} cars)
              </p>
            </div>

            {/* Right side: Add button + Search + Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleAddNewCar}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:shadow-md transition flex items-center gap-2"
              >
                <AddIcon fontSize="small" /> Add New Car
              </button>

              {/* search box */}
              <div className="flex items-center border border-gray-300 rounded-md h-12 px-3 w-[220px] md:w-[300px]">
                <input
                  type="search"
                  placeholder="Search cars..."
                  className="grow outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="text-gray-500" />
              </div>

              {/* filter button */}
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
            <p className="text-gray-500 text-sm">For Sale</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {
                displayCars.filter((car) =>
                  car.availability?.toLowerCase().includes("sale")
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">For Hire</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {
                displayCars.filter((car) =>
                  car.availability?.toLowerCase().includes("hire")
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">With Images</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {
                displayCars.filter((car) => car.images && car.images.length > 0)
                  .length
              }
            </p>
          </div>
        </div>

        {/* Fleet header + Sticky Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Left: Title */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">Current Fleet</h2>
              <p className="text-sm text-gray-500">
                Use tabs to filter by sale or hire listings
              </p>
            </div>

            {/* Right: Search, Filter, Add, Tabs */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
              {/* Tabs */}
              <div className="flex gap-3 flex-wrap md:mr-4">
                <button
                  aria-pressed={activeTab === "all"}
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "all"
                      ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                      : "text-gray-700 hover:underline"
                  }`}
                >
                  All ({filteredByTab.length})
                </button>
                <button
                  aria-pressed={activeTab === "sale"}
                  onClick={() => setActiveTab("sale")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "sale"
                      ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                      : "text-gray-700 hover:underline"
                  }`}
                >
                  Sale (
                  {
                    filteredByTab.filter((car) =>
                      car.availability?.toLowerCase().includes("sale")
                    ).length
                  }
                  )
                </button>
                <button
                  aria-pressed={activeTab === "hire"}
                  onClick={() => setActiveTab("hire")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "hire"
                      ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                      : "text-gray-700 hover:underline"
                  }`}
                >
                  Hire (
                  {
                    filteredByTab.filter((car) =>
                      car.availability?.toLowerCase().includes("hire")
                    ).length
                  }
                  )
                </button>
              </div>
            </div>
          </div>

          {/* Fleet Grid */}
          <div className="p-6">
            {filteredByTab.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No cars found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first car"}
                </p>
                <button
                  onClick={handleAddNewCar}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add New Car
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredByTab.map((car) => (
                  <div key={car.id} className="relative">
                    <CarCard car={car} />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Link
                        href={`/dashboard/manage-fleet/edit/${car.id}`}
                        className="bg-white p-2 rounded shadow text-blue-600 hover:bg-gray-50"
                        title="Edit Car"
                      >
                        <EditIcon fontSize="small" />
                      </Link>
                      <button
                        onClick={() => {
                          const ok = confirm(
                            `Are you sure you want to delete the ${car.make} ${car.model}? This action cannot be undone.`
                          );
                          if (ok) deleteCar(car.id);
                        }}
                        disabled={deleteLoading === car.id}
                        className="bg-white p-2 rounded shadow text-red-600 hover:bg-gray-50 disabled:opacity-50"
                        title="Delete Car"
                      >
                        {deleteLoading === car.id ? (
                          <ClipLoader size={16} color="#dc2626" />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageFleetContent;
