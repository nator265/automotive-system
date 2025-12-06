import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached: any = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connect() {
  if (!MONGODB_URI) {
    console.warn(
      "MONGODB_URI not defined — skipping DB connection (dev only). Set MONGODB_URI in .env.local to enable DB features."
    );
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    } as mongoose.ConnectOptions;

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err?.message || err);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return null;
  }
}

export default connect;
