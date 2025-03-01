"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "./header";


const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        imageRef.current.classList.toggle("scrolled", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <section className="relative flex flex-col  items-center justify-center text-center px-6 lg:px-12 py-32">
        <div className="container mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empower Your Finances <br /> with Smart Insights.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            FinTrack is an AI-powered personal finance platform designed to simplify <br />
            <strong>expense tracking</strong>, <strong>budgeting</strong>, and <strong>investment management</strong>. 
            <br />Get real-time insights,
            personalized recommendations, and automated financial planning to optimize your savings and investments.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 text-lg font-semibold rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="hero-image-wrapper mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div
              ref={imageRef}
              className="hero-image max-w-4xl w-full overflow-hidden rounded-xl shadow-xl transition-transform duration-500"
            >
              <Image
                src="/banner.jpeg"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="rounded-xl border border-gray-200"
                priority
              />
            </div>
          </motion.div>
        </div>

        
      </section>
      
    </>
    
  );
};

export default HeroSection;
