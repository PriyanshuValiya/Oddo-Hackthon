"use client";

import React from "react";

export default function detailpage() {
  return (
    <div>
  
      {/* Call-to-Action Section */}
      <div className="w-full max-w-5xl mt-10 p-8 text-center bg-blue-600 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Ready to Take Control of Your Finances?</h2>
        <p className="mt-2">Join thousands of users already managing their finances smarter with Welth.</p>
        <button className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200">
          Start Free Trial
        </button>
      </div>
    </div>
  );
}


