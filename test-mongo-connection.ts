import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is missing in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected successfully to MongoDB Atlas!");
    await mongoose.disconnect();
  } catch (err: any) {
    console.error("❌ Connection failed:", err.message);
  }
}

testConnection();
