"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <motion.div
          className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          FinTrack
        </motion.div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
        {["Features", "Pricing", "Contact"].map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-blue-600">
            {item}
          </Link>
        ))}
      </nav>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex space-x-4">
        <Link href="/login">
          <Button variant="outline" className="dark:text-white">Login</Button>
        </Link>
        <Link href="/dashboard">
          <Button className="bg-blue-600 text-white">Get Started</Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden flex flex-col items-center space-y-4 py-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {["Features", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-300 text-lg hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link href="/login">
            <Button variant="outline" className="w-32">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="w-32 bg-blue-600 text-white">Get Started</Button>
          </Link>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
