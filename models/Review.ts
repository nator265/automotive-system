import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  message: string;
  rating?: number;
  imageUrl?: string;
  createdAt?: Date;
}

const ReviewSchema: Schema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, default: 5 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Review =
  (mongoose.models.Review as mongoose.Model<IReview>) ||
  mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
