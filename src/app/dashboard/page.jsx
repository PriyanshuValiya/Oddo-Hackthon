"use client";

import { useEffect, useState } from "react";
import checkUser from "@/actions/checkUser";
import { useUser } from "@clerk/nextjs";

function Dashboard() {
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (isLoaded && user) {
        try {
          const userData = {
            id: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.imageUrl,
          };

          await checkUser(userData); 
        } catch (error) {
          console.error("Error in checkUser:", error);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return <div>Loading...</div>;
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
