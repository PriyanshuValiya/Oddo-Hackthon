"use server";

import User from "../models/userModel.js";
import connectDB from "../utils/connectDB.js";

export default async function checkUser({ id, name, email, imageUrl }) {
  if (!id) {
    console.error("No user ID provided to checkUser function");
    return;
  }

  await connectDB(); 

  try {
    const existingUser = await User.findOne({ clerkUserId: id });

    if (!existingUser) {
      const newUser = await User.create({
        clerkUserId: id,
        name,
        email,
        imageUrl,
      });

      console.log("New user added:", newUser);
    } else {
      console.log("User already exists:", existingUser);
    }
  } catch (error) {
    console.error("Error checking/adding user:", error);
  }
}
