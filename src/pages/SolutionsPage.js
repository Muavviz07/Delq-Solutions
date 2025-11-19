import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. Import the components you want
import ItSolutionsSection from '../components/home/ItSolutionsSection';
import ActionCallSection from '../components/home/ActionCallSection';

export default function SolutionsPage() {
  const [solutionData, setSolutionData] = useState(null); // Data for this page
  const [homeData, setHomeData] = useState(null);       // Data for reused components
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        // Fetch both sets of data in parallel
        const [solutionRes, homeRes] = await Promise.all([
          fetch('/api/solutions-data'),
          fetch('/api/home-data')
        ]);

        if (!solutionRes.ok) throw new Error(`Solutions data failed!`);
        if (!homeRes.ok) throw new Error(`Home data failed!`);

        const solutionJson = await solutionRes.json();
        const homeJson = await homeRes.json();
        
        setSolutionData(solutionJson);
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
    return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Solutions...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!solutionData || !homeData) return null; // Wait for both data sets

  return (
    <main>
      
      {/* Component 1: Hero Section (like Services) */}
      <section 
        className="relative bg-cover bg-center text-white pt-48 pb-24"
        style={{ backgroundImage: `url('${solutionData.heroBackgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 
            className="text-5xl md:text-6xl font-bold" 
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {solutionData.heading}
          </h1>
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium mt-4">
            <Link to="/" className="text-white hover:text-[#d90a2c] transition-colors">
              HOME
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">
              {solutionData.heading.toUpperCase()}
            </span>
          </nav>
        </div>
      </section>

      {/* Component 2: ItSolutionsSection */}
      <ItSolutionsSection itSolutionsData={homeData.itSolutionsData} />
      
      {/* Component 3: ActionCallSection */}
      <ActionCallSection actionCallData={homeData.actionCallSectionData} />

    </main>
  );
}