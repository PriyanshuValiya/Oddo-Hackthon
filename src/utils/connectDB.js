import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://valiyapriyansukumar:odoohackathon@cluster0.qrh5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let cached = global.mongoose || { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) {
    console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    cached.promise = null; // Reset promise for retry
    throw new Error("Database connection failed");
  }
};

global.mongoose = cached;

export default connectDB;
