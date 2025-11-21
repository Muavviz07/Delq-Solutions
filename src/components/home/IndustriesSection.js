import React, { useState } from "react";
import { Link } from "react-router-dom";

// Helper function to render HTML safely
const createMarkup = (htmlString) => ({ __html: htmlString });

export default function IndustriesSection({ industriesData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!industriesData) return null;

  const activeIndustry = industriesData.industries[activeIndex];

  // --- SMOOTH TRANSITION LOGIC ---
  const handleIndustryChange = (index) => {
    if (index === activeIndex) {
      setIsDropdownOpen(false);
      return;
    }
    
    // 1. Start transition (fade out)
    setIsTransitioning(true);
    setIsDropdownOpen(false);

    // 2. Wait for fade out, then swap data
    setTimeout(() => {
      setActiveIndex(index);
      // 3. Fade back in
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  return (
    <section className="bg-white py-28">
      {/* Header */}
      <div className="container mx-auto px-8 md:px-16 lg:px-20 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-black-300 mb-4">
          INDUSTRIES WE SERVE
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight"
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Building <span className="text-[#d90a2c]">SMARTER</span> Solutions
          <br />
          For A Connected World
        </h2>
      </div>

      {/* ---- Mobile Dropdown Menu ---- */}
      <div className="container mx-auto px-6 mt-10 block lg:hidden">
        <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative w-full font-semibold py-3 px-5 text-center flex justify-between items-center rounded-md overflow-hidden transition-all duration-300"
            style={{
              backgroundImage: `url(${activeIndustry.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <span className="relative z-10 text-white uppercase tracking-wider text-sm">
              {activeIndustry.name}
            </span>
            <span className={`relative z-10 text-white text-lg transform transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </button>

          {/* Dropdown List with Smooth Animation */}
          <div 
            className={`absolute w-full left-0 right-0 z-20 overflow-hidden transition-all duration-500 ease-in-out rounded-md shadow-xl ${
                isDropdownOpen ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="flex flex-col">
                {industriesData.industries.map((industry, index) => (
                    <button
                    key={index}
                    onClick={() => handleIndustryChange(index)}
                    // --- REVERTED STYLING: Using background images again ---
                    className={`relative block w-full text-left px-5 py-6 font-semibold text-white transition-all duration-300 ${
                        activeIndex === index
                        ? "ring-4 ring-inset ring-[#d90a2c]" 
                        : "hover:ring-4 hover:ring-inset hover:ring-[#d90a2c]"
                    }`}
                    style={{
                        backgroundImage: `url(${industry.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    >
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                    <span className="relative z-10">{industry.name}</span>
                    </button>
                ))}
            </div>
          </div>
        </div>

        {/* Smooth content transition container */}
        <div
          className={`relative mt-10 transition-all duration-300 ease-in-out transform ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
            }`}
        >
          <div className="overflow-hidden rounded-lg mb-6 shadow-md">
            <img
                src={activeIndustry.mainImage}
                alt={activeIndustry.name}
                className="w-full h-64 object-cover transform transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <p className="text-xs font-bold tracking-[0.2em] text-[#d90a2c] mb-2 uppercase">
            {activeIndustry.subtitle}
          </p>
          <h3
            className="text-3xl font-bold text-[#1c1c1c] mb-3 leading-tight"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
            dangerouslySetInnerHTML={createMarkup(activeIndustry.heading)}
          />
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            {activeIndustry.subheading}
          </h4>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            {activeIndustry.description}
          </p>
          <Link
            to={activeIndustry.href}
            className="bg-[#d90a2c] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors duration-300 inline-block shadow-lg"
          >
            Know More
          </Link>

        </div>
      </div>

      {/* ---- Desktop Layout (Unchanged) ---- */}
      <div className="container mx-auto px-8 md:px-16 lg:px-20 mt-20 hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${isTransitioning
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
              }`}
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-black-500 mb-2">
              {activeIndustry.subtitle}
            </p>
            <h3
              className="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-4 leading-snug"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
              dangerouslySetInnerHTML={createMarkup(activeIndustry.heading)}
            />
            <h4 className="text-3xl font-semibold text-black-700 mb-4">
              {activeIndustry.subheading}
            </h4>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {activeIndustry.description}
            </p>
            <Link
              to={activeIndustry.href}
              className="bg-[#d90a2c] text-white px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors duration-300 inline-block"
            >
              Know More
            </Link>

          </div>

          {/* Right Column */}
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            {industriesData.industries.map((industry, index) => (
              <img
                key={index}
                src={industry.mainImage}
                alt={industry.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---- Desktop Timeline Section (Unchanged) ---- */}
      <div className="container mx-auto px-8 md:px-16 lg:px-20 mt-20 hidden lg:block">
        <div className="relative">
          <div
            className="absolute left-0 w-full"
            style={{ top: "144px", height: "4px" }}
          >
            <div className="w-full h-1 bg-gray-200"></div>
          </div>

          <div className="flex flex-row items-end relative z-10">
            {industriesData.industries.map((industry, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 cursor-pointer group"
                onClick={() => handleIndustryChange(index)}
              >
                <div className="relative w-full mb-0" style={{ height: "144px" }}>
                  {activeIndex === index ? (
                    <>
                      <img
                        src={industry.thumbnail}
                        alt={industry.name}
                        className="absolute left-0 top-0 w-full h-full object-cover shadow-lg transition-none"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {industry.name}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span
                        className="absolute left-1/2 bottom-12 transform -translate-x-1/2 font-bold text-black group-hover:opacity-0 transition-opacity duration-300 z-10"
                        style={{ bottom: "48px" }}
                      >
                        {industry.name}
                      </span>
                      <img
                        src={industry.thumbnail}
                        alt={industry.name}
                        className="absolute left-0 top-0 w-full h-full object-cover shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out origin-left scale-x-0 group-hover:scale-x-100"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out origin-left scale-x-0 group-hover:scale-x-100">
                        <span className="text-lg font-bold text-white">
                          {industry.name}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative -mt-3 z-20">
                  <div
                    className={`h-5 w-5 rounded-full shadow transition-colors duration-300 ${activeIndex === index
                        ? "bg-[#d90a2c]"
                        : "bg-gray-400 group-hover:bg-gray-500"
                      }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}