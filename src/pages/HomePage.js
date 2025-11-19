import React, { useState, useEffect } from 'react';

// Import all your HOME components
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import DetailedServicesSection from '../components/home/DetailedServicesSection';
import ConsultationSection from '../components/home/ConsultationSection';
import ItSolutionsSection from '../components/home/ItSolutionsSection';
import IndustriesSection from '../components/home/IndustriesSection';
import ActionCallSection from '../components/home/ActionCallSection';
import BlogSection from '../components/home/BlogSection';
import ContactSection from '../components/home/ContactSection';
import NewsletterSection from '../components/home/NewsletterSection'; // <-- 1. IMPORT THE NEW COMPONENT

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/home-data');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPageData(data);
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
    return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Content...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center text-center text-xl font-bold text-red-500">
        <div>
            <p>Failed to load content.</p>
            <p className="text-sm font-normal text-gray-600 mt-2">Please ensure the FastAPI backend server is running on port 8000.</p>
        </div>
    </div>;
  }

  return (
    <main>
      <HeroSection sliderData={pageData.sliderData} />
      <ServicesSection />
      <DetailedServicesSection detailedServices={pageData.detailedServices} />
      <ConsultationSection />
      <ItSolutionsSection itSolutionsData={pageData.itSolutionsData} />
      <IndustriesSection industriesData={pageData.industriesData} />
      <ActionCallSection actionCallData={pageData.actionCallSectionData} />
      <BlogSection blogPosts={pageData.blogPosts} />
      <ContactSection />
      <NewsletterSection /> {/* <-- 2. ADD THE COMPONENT HERE */}
    </main>
  );
}