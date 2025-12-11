import mongoose, { Schema } from "mongoose";

const CarSchema = new Schema(
  {
    type: { type: String, enum: ["hire", "sale"], required: true },
    make: String,
    model: String,
    year: Number,
    price: Number,
    mileage: Number,
    transmission: String,
    fuel: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
