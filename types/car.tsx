export interface Car {
  id: string; // Unique ID
  make: string; // Brand
  model: string; // Model
  year: number; // Manufacture year
  price: number; // Price
  mileage: number; // Mileage in km
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric"; // Fuel type
  transmission: "Automatic" | "Manual"; // Gear type
  bodyType: string; // Body type, e.g., Sedan, SUV
  color: string; // Exterior color
  engine: number; // Engine capacity in cc
  doors: number; // Number of doors
  seats: number; // Number of seats
  driveUnit: "FWD" | "RWD" | "AWD"; // Drive unit
  steering: "Left" | "Right"; // Steering side
  location: string; // Location / city
  condition: "Excellent" | "Good" | "Fair" | "Poor"; // Condition
  importCountry: string; // Import country
  availability: "For Sale" | "For Hire" | "For Sale & Hire"; // Availability
  description: string; // Car description
  features: string[]; // List of features
  images: string[]; // Array of image URLs

  // Optional BeForward-style fields
  chassisNumber?: string; // VIN / chassis
  engineNumber?: string; // Engine number
  lastInspectionDate?: string; // Last inspection
  fuelConsumption?: string; // Fuel consumption e.g., "12 km/l"
  interiorColor?: string; // Interior color
  bodyCondition?: "Excellent" | "Good" | "Fair" | "Poor"; // Body condition
  interiorCondition?: "Excellent" | "Good" | "Fair" | "Poor"; // Interior condition
  notes?: string; // Extra remarks
}
