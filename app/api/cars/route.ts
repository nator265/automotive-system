import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Vehicle from "@/models/Car";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const cars = await Vehicle.find({}).sort({ createdAt: -1 });

    // Transform the data to match the frontend Car interface
    const transformedCars = cars.map(car => ({
      id: car._id.toString(),
      type: car.type,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      transmission: car.transmission,
      fuel: car.fuel,
      description: car.description,
      images: car.images || [],
      availability: car.type === "hire" ? "For Hire" : "For Sale",
      // Add default values for fields that might not exist in the database
      engineCapacity: 1500, // Default value
      steering: "Right", // Default value
      seats: 5, // Default value
      color: "Unknown", // Default value
      fuelType: car.fuel || "Petrol", // Use fuel field
      features: [], // Empty array for now
    }));

    return NextResponse.json({
      success: true,
      cars: transformedCars
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
