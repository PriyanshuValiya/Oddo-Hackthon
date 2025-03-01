"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-black text-white border-t border-gray-700 text-sm">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        {/* Hackathon Name */}
        <motion.h2
          className="text-4xl font-bold text-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          DUHacks 4.0 - Hackathon '25
        </motion.h2>

        {/* Team Name */}
        <motion.h3
          className="text-2xl font-semibold mt-2 text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Team - CodeVortex
        </motion.h3>

        {/* Quote */}
        <motion.p
          className="text-gray-400 text-lg italic mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          "We try to provide the best solutions with dedication"
        </motion.p>

        {/* Team Members */}
        <div className="mt-6">
          <p className="text-gray-300 text-lg font-semibold">Priyanshu Valiya, Ashok Suthar, Vasu Vaghasia, Veer Patel</p>
        </div>

        {/* Contact & Links */}
        <div className="mt-4 flex justify-center items-center space-x-6">
          <a href="https://github.com/team-codevortex/project" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <FaGithub size={26} />
          </a>
          <a href="https://www.linkedin.com/in/bobsmith" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <FaLinkedin size={26} />
          </a>
          <a href="mailto:valiyapriyansukumar@gmail.com" className="text-gray-400 hover:text-white transition">
            ✉
          </a>
        </div>

        {/* Tech Stack */}
        <p className="mt-6 text-gray-400">Built with Passion ❤</p>
        <p className="text-gray-500">Tech Stack: React, Next.js, Node.js, Supabase, AI Integration</p>
      </div>
    </footer>
  );
}
