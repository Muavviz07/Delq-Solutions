import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import the components you want to reuse
import IndustriesSection from '../components/home/IndustriesSection';
import ActionCallSection from '../components/home/ActionCallSection';
import IndustriesSidebar from '../components/industries/IndustriesSidebar'; // <-- IMPORT new sidebar

export default function IndustriesPage() {
  const [industryData, setIndustryData] = useState(null); // Data for this page hero
  const [homeData, setHomeData] = useState(null);       // Data for reused components
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const [industryRes, homeRes] = await Promise.all([
          fetch('http://localhost:8000/api/industries-data'), // Main page data
          fetch('http://localhost:8000/api/home-data')     // Homepage sections data
        ]);

        if (!industryRes.ok) throw new Error(`Industry data failed!`);
        if (!homeRes.ok) throw new Error(`Home data failed!`);

        const industryJson = await industryRes.json();
        const homeJson = await homeRes.json();
        
        setIndustryData(industryJson);
        setHomeData(homeJson);

      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch page data:", e);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Industries...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!industryData || !homeData) return null;

  return (
    <main>
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white pt-48 pb-24"
        style={{ backgroundImage: `url('${industryData.heroBackgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 
            className="text-5xl md:text-6xl font-bold" 
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {industryData.heading}
          </h1>
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium mt-4">
            <Link to="/" className="text-white hover:text-[#d90a2c] transition-colors">
              HOME
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">
              {industryData.heading.toUpperCase()}
            </span>
          </nav>
        </div>
      </section>

      {/* --- NEW: Layout with Sidebar --- */}
      <div className="container mx-auto py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">

            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-6">
                {/* IndustriesSection from homepage */}
                <IndustriesSection industriesData={homeData.industriesData} />
                
                {/* ActionCallSection from homepage */}
                <ActionCallSection actionCallData={homeData.actionCallSectionData} />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-10 lg:self-start">
                    {/* --- USE NEW SIDEBAR --- */}
                    <IndustriesSidebar />
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}
