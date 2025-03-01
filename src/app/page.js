import FeatureCards from "@/components/features";

import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Stats from "@/components/stats";
import Detailpage from "@/components/detail";
import Stock from "@/components/Stock";



export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-5 space-y-10">
      <HeroSection />
      <Stats />
      <FeatureCards />
      <Detailpage />
      <Footer />
      {/* <Stock/> */}
    </div>
  );
}
