"use client";

import { motion } from "framer-motion";
import { FaChartLine, FaWallet, FaPiggyBank, FaBell, FaLock, FaRobot } from "react-icons/fa";
import SpotlightCard from "@/components/spotlight";

const features = [
  { icon: <FaChartLine className="text-blue-500 text-4xl" />, title: "Real-Time Insights", description: "Get AI-powered analytics on your spending and investments instantly." },
  { icon: <FaWallet className="text-green-500 text-4xl" />, title: "Expense Tracking", description: "Easily track and categorize your expenses to manage your budget effectively." },
  { icon: <FaPiggyBank className="text-yellow-500 text-4xl" />, title: "Smart Budgeting", description: "Receive personalized budgeting suggestions based on your financial goals." },
  { icon: <FaBell className="text-red-500 text-4xl" />, title: "Automated Alerts", description: "Stay on top of due payments and investment opportunities with smart notifications." },
  { icon: <FaLock className="text-gray-500 text-4xl" />, title: "Secure Transactions", description: "Advanced encryption ensures your financial data remains safe and private." },
  { icon: <FaRobot className="text-purple-500 text-4xl" />, title: "AI-Powered Recommendations", description: "Get smart investment and saving tips tailored to your spending habits." }
];

export default function FeatureCards() {
  return (
    <div className="p-8">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-black">Explore Our </span>
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Smart Features</span>
      </motion.h2>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <SpotlightCard  spotlightColor="rgba(103, 189, 255, 0.2)" className="border border-blue-500 shadow-lg shadow-gray-200"   >
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-grey text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-black">{feature.description}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}