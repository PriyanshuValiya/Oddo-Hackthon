import mongoose from "mongoose";

// Replace this with your actual MongoDB connection URL
const MONGODB_URL =
  process.env.NEXT_PUBLIC_MONGODB_URI ||
  "mongodb+srv://valiyapriyansukumar:priyanshu%40odoo@cluster0.qrh5f.mongodb.net"; // URL-encoded password

// Check if a connection is already established
if (mongoose.connection.readyState === 1) {
  console.log("Already connected to MongoDB");
} else {
  // Connect to MongoDB
  const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URL);
      console.log("Connected to MongoDB successfully");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };

  // Export the connection function
  export default connectDB;
}
