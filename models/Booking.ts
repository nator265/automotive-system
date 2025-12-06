import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  vehicle: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
}

const BookingSchema: Schema = new Schema<IBooking>(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Booking =
  (mongoose.models.Booking as mongoose.Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
