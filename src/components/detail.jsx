"use client";

import React from "react";

export default function detailpage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Testimonials Section */}
      <div className="w-full max-w-5xl p-6 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            title="Small Business Owner"
            text="Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed."
          />
          <Testimonial
            title="Freelancer"
            text="The receipt scanning feature saves me hours each month. Now, I can focus on my work instead of manual data entry and expense tracking."
          />
          <Testimonial
            title="Financial Advisor"
            text="I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors."
          />
        </div>
      </div>

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

// Testimonial Component
const Testimonial = ({ title, text }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{text}</p>
    </div>
  );
};
