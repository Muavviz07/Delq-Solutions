import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import the components you want to reuse
import ServicesSection from '../components/home/ServicesSection';
import DetailedServicesSection from '../components/home/DetailedServicesSection';
import ActionCallSection from '../components/home/ActionCallSection';

export default function ServicesPage() {
  const [pageData, setPageData] = useState(null);
  const [homeData, setHomeData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const [servicesRes, homeRes] = await Promise.all([
          fetch('http://localhost:8000/api/services-data'),
          fetch('http://localhost:8000/api/home-data')
        ]);

        if (!servicesRes.ok) {
          throw new Error(`Services data failed! status: ${servicesRes.status}`);
        }
        if (!homeRes.ok) {
          throw new Error(`Home data failed! status: ${homeRes.status}`);
        }

        const servicesJson = await servicesRes.json();
        const homeJson = await homeRes.json();
        
        setPageData(servicesJson);
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
    return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Services...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!pageData || !homeData) return null; 

  return (
    <main>
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white pt-48 pb-24"
        style={{ backgroundImage: `url('${pageData.heroBackgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 
            className="text-5xl md:text-6xl font-bold" 
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {pageData.heading}
          </h1>
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium mt-4">
            <Link to="/" className="text-white hover:text-[#d90a2c] transition-colors">
              HOME
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">
              {pageData.heading.toUpperCase()}
            </span>
          </nav>
        </div>
      </section>

      {/* Component 1: ServicesSection */}
      <ServicesSection />

      {/* Component 2: DetailedServicesSection */}
      <DetailedServicesSection detailedServices={homeData.detailedServices} />
      
      {/* Component 3: ActionCallSection */}
      <ActionCallSection actionCallData={homeData.actionCallSectionData} />

      {/* --- The "Explore Our Offerings" section has been removed --- */}

    </main>
  );
}