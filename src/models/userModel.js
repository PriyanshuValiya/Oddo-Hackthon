import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
});

// Check if the model already exists to avoid redefining it
// const User = mongoose.models.User || mongoose.model("User", userSchema);
const User = (mongoose.models && mongoose.models.User) || mongoose.model("User", userSchema);

export default User;
