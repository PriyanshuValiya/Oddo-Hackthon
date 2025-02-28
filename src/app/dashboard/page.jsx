"use client";

import { useEffect } from "react";
import checkUser from "@/actions/checkUser";
import { useUser } from "@clerk/nextjs";

function Dashboard() {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      checkUser(user);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
