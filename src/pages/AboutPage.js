import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use a high-quality, relevant image from Unsplash
    const mainImageUrl = "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8Hx8fA%3D%3D";

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
          try {
            const response = await fetch('/api/about-data');
            if (!response.ok) throw new Error(`About page data failed!`);
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

    // Helper component for the arrow icon
    const ArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
    );

    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading About Us...</div>;
    }

    if (error) {
        return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
    }

    if (!pageData) return null;

    // Use the first core value for the "Our Story" box
    const storyData = pageData.core_values[0] || { title: "Our Story", description: "Loading story..." };

    return (
        <main className="bg-white">
            {/* <-- MODIFIED: Reduced vertical padding here (py-16 md:py-20) --> */}
            <div className="container mx-auto max-w-7xl py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                
                {/* --- Top Header Section --- */}
                <div className="mb-12">
                    <p className="text-sm font-semibold text-gray-600 tracking-wide">
                        {pageData.heading}
                    </p>
                    {/* Using Urbanist font as it's loaded in index.css */}
                    <h1 
                        className="text-5xl md:text-6xl font-bold text-black mt-2"
                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                    >
                        Setting Up Standard On
                    </h1>
                    <h2 
                        className="text-5xl md:text-6xl font-bold text-gray-400"
                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                    >
                        Culture Of Working
                    </h2>
                </div>

                {/* --- Main Content Section --- */}
                {/* This container uses relative positioning to allow the white box to overlap */}
                <div className="relative">
                    {/* This grid handles the responsive layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        
                        {/* Image: Spans 12/12 on mobile, 8/12 on desktop */}
                        <div className="lg:col-span-8">
                            <img
                                src={mainImageUrl}
                                alt="Team working"
                                className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                            />
                        </div>
                        
                        {/* Dark Background: Spans 12/12 on mobile, 4/12 on desktop */}
                        <div className="lg:col-span-4 bg-[#2C3E50] min-h-[200px] lg:min-h-[600px]">
                            {/* This is a placeholder to create the dark background color */}
                        </div>
                    </div>

                    {/* --- Overlapping White Box --- */}
                    {/* - On mobile: A simple block with margin-top.
                      - On desktop: Uses absolute positioning to center vertically and overlap.
                    */}
                    <div className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:w-5/12
                                    bg-white shadow-2xl p-8 md:p-12
                                    -mt-24 mx-4 sm:mx-8 lg:mt-0 lg:mx-0">
                        
                        <h3 
                            className="text-3xl font-bold text-black"
                            style={{ fontFamily: "'Urbanist', sans-serif" }}
                        >
                            {/* Using "Our Story" as a title, pulling content from core values */}
                            Our Story
                        </h3>

                        <p className="text-gray-600 leading-relaxed mt-4 text-sm">
                            {/* Using the description from the first core value */}
                            {storyData.description}
                        </p>

                        <Link 
                            to="/about/our-story" // Links to the page defined in Header.js
                            className="inline-flex items-center text-black font-bold mt-6 group"
                        >
                            Learn More
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowIcon />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}