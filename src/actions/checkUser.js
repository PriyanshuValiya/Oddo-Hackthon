import User from "../models/userModel.js";
import connectDB from "../utils/connectDB.js";

export default async function checkUser(user) {
  if (!user) {
    console.error("No user provided to checkUser function");
    return;
  }

  const userId = user?.id;
  const userName = user?.fullName;
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userImage = user?.imageUrl;

  try {
    await connectDB();
    console.log(userName);

    // const existingUser = await User.findOne({ clerkUserId: userId });

    // if (!existingUser) {
    //   const newUser = new User({
    //     clerkUserId: userId,
    //     name: userName,
    //     email: userEmail,
    //     imageUrl: userImage,
    //   });

    //   await newUser.save();
    //   console.log("New user :", newUser);
    // } else {
    //   console.log("User already exists !!");
    // }
  } catch (error) {
    console.error("Error checking/adding user:", error);
  }
}
