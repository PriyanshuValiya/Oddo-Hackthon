import React from "react";

import FeatureCards from "@/components/features";
import Stats from "@/components/stats";
import HeroSection from "@/components/hero";

import {
  howItWorksData
} from "@/data/landing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
    
      <HeroSection />
      <Stats />
      <FeatureCards />

      {/* How It Works Section */}
       <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> 

     

    </div>
  );
};

export default LandingPage;
