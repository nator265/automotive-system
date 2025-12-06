import mongoose, { Schema } from "mongoose";

export interface IVehicle {
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  salePrice?: number;
  isAvailable: boolean;
  imageUrl?: string;
  createdAt?: Date;
}

const VehicleSchema: Schema = new Schema<IVehicle>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    salePrice: { type: Number },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Vehicle =
  (mongoose.models.Vehicle as mongoose.Model<IVehicle>) ||
  mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;
