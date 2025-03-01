"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { BarChart3, Receipt, PieChart, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  { value: 50000, label: "Active Users", icon: <BarChart3 size={32} className="text-blue-500" /> },
  { value: 20000000, label: "Transactions Tracked", icon: <Receipt size={32} className="text-blue-500" /> },
  { value: 98.9, label: "Uptime", icon: <PieChart size={32} className="text-blue-500" /> },
  { value: 4.5, label: "User Rating", icon: <CreditCard size={32} className="text-blue-500" /> },
];

const Counter = ({ from = 0, to, label }) => {
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = from;
    const duration = 2000;
    const increment = (to - from) / (duration / 50);

    const interval = setInterval(() => {
      start += increment;
      if (start >= to) {
        start = to;
        clearInterval(interval);
      }
      setCount(label === "User Rating" || label === "Uptime" ? Number(start.toFixed(1)) : Math.round(start));
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, from, to]);

  return <span ref={ref}>{to >= 1000 ? count.toLocaleString() : count}</span>;
};

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {statsData.map(({ value, label, icon }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Card className="flex flex-col items-center p-6 border border-blue-500 shadow-lg shadow-gray-200 rounded-xl">
            <CardContent className="flex flex-col items-center space-y-3">
              {icon}
              <p className="text-2xl font-bold">
                <Counter to={value} label={label} />
                {label === "Uptime" ? "%" : label === "User Rating" ? "/5" : "+"}
              </p>
              <p className="text-gray-600 text-sm">{label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
