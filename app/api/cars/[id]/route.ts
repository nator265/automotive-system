// app/api/cars/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Car from "@/models/Car";
import mongoose from "mongoose";

interface RouteParams {
  id: string;
}

// GET: Fetch a single car by ID
export async function GET(
  request: NextRequest,
  context: { params: RouteParams | Promise<RouteParams> }
) {
  try {
    await connectDB();

    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Car ID" },
        { status: 400 }
      );
    }

    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    const transformedCar = {
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
      availability:
        car.type === "hire"
          ? "For Hire"
          : car.type === "sale"
          ? "For Sale"
          : "For Sale & Hire",
      engineCapacity: car.engineCapacity || 1500,
      steering: car.steering || "Right",
      seats: car.seats || 5,
      color: car.color || "Unknown",
      fuelType: car.fuel || "Petrol",
      features: car.features || [],
      chassisNumber: car.chassisNumber || "",
      engineNumber: car.engineNumber || "",
      lastInspectionDate: car.lastInspectionDate || "",
      fuelConsumption: car.fuelConsumption || "",
      interiorColor: car.interiorColor || "",
      bodyCondition: car.bodyCondition || "Good",
      interiorCondition: car.interiorCondition || "Good",
      notes: car.notes || "",
      location: car.location || "",
      condition: car.condition || "Good",
      importCountry: car.importCountry || "",
      doors: car.doors || 4,
      driveUnit: car.driveUnit || "FWD",
      bodyType: car.bodyType || "",
    };

    return NextResponse.json({ success: true, car: transformedCar });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch car" },
      { status: 500 }
    );
  }
}

// PUT: Update a car by ID
export async function PUT(
  request: NextRequest,
  context: { params: RouteParams | Promise<RouteParams> }
) {
  try {
    await connectDB();

    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Car ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updatedCar = await Car.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return NextResponse.json(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, car: updatedCar });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update car" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a car by ID
export async function DELETE(
  request: NextRequest,
  context: { params: RouteParams | Promise<RouteParams> }
) {
  try {
    await connectDB();

    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Car ID" },
        { status: 400 }
      );
    }

    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return NextResponse.json(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete car" },
      { status: 500 }
    );
  }
}
