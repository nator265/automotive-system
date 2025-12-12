import mongoose, { Schema } from "mongoose";

const CarSchema = new Schema(
  {
    // Sale / Hire type
    type: { type: String, enum: ["hire", "sale", "both"], required: true },
    // Basic vehicle info
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: Number,
    price: Number,
    mileage: Number,
    fuel: { type: String }, // Petrol, Diesel, Hybrid, Electric
    transmission: { type: String }, // Automatic / Manual

    // Additional vehicle details (BeForward style)
    bodyType: String, // Sedan, SUV, Hatchback
    color: String,
    engine: Number, // CC
    doors: Number,
    seats: Number,
    driveUnit: { type: String, enum: ["FWD", "RWD", "AWD"] },
    steering: { type: String, enum: ["Left", "Right"] },
    location: String, // e.g., Lilongwe
    condition: { type: String, enum: ["Excellent", "Good", "Fair", "Poor"] },
    importCountry: String,

    // Description
    description: String,

    // Media
    images: [String], // Array of URLs
    features: [String], // Array of feature names

    // Optional BeForward-style extra fields
    chassisNumber: String,
    engineNumber: String,
    lastInspectionDate: String,
    fuelConsumption: String, // e.g., "12 km/L"
    interiorColor: String,
    bodyCondition: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Poor"],
    },
    interiorCondition: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Poor"],
    },
    notes: String,
  },
  { timestamps: true }
);

// Prevent Overwrite in Next.js (hot reload)
export default mongoose.models.Car || mongoose.model("Car", CarSchema);
