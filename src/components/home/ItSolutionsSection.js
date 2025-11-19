import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function ItSolutionsSection({ itSolutionsData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!itSolutionsData) return null;

  return (
    <section className="bg-[#1c1c1c] text-white py-28 px-6 md:px-10">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold tracking-[0.2em] mb-4 uppercase">
          INNOVATE | COLLABORATE | 
          {/* Mobile Break */}
          <br className="block md:hidden" />
          {" "}SUCCEED
        </p>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Accelerating Business
          {/* Mobile Break 1 */}
          <br className="block md:hidden" />
          {" "}Growth
          {/* Desktop Break (Original) */}
          <br className="hidden md:block" />
          {/* Mobile Break 2 */}
          <br className="block md:hidden" />
          
          <span className="text-[#d90a2c] underline">With</span> IT Solutions
        </h2>

        {/* ---------- DESKTOP / LARGE SCREENS ---------- */}
        <div className="hidden lg:grid mt-20 grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3 space-y-10">
            <div className="relative overflow-hidden rounded-lg h-[450px]">
              {itSolutionsData.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-8">
              <div className="flex items-start gap-8">
                <div className="w-px h-28 bg-white self-stretch"></div>
                <p className="text-base text-white leading-relaxed max-w-md">
                  {itSolutionsData[activeIndex].description}
                </p>
              </div>

              <Link
                to={itSolutionsData[activeIndex].link}
                className="bg-[#d90a2c] text-white px-14 py-3 rounded-full text-base font-semibold self-start hover:bg-black transition-colors duration-300 flex-shrink-0"
              >
                View More
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {itSolutionsData.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-8 cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex justify-end items-center gap-6">
                  <h3
                    className={`text-5xl font-bold text-right transition-colors duration-300 ${
                      activeIndex === index ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`text-3xl font-bold transition-colors duration-300 [writing-mode:vertical-rl] ${
                      activeIndex === index ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- MOBILE / TABLET VERSION ---------- */}
        <div className="block lg:hidden mt-14 space-y-10">
          {itSolutionsData.map((item, index) => (
            <div key={index} className="space-y-6">
              <div
                className={`flex justify-between items-center border-b border-gray-700 pb-3 cursor-pointer ${
                  activeIndex === index ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {item.title}
                </h3>
                <span className="text-sm font-semibold">
                  0{index + 1}
                </span>
              </div>

              {activeIndex === index && (
                <div className="space-y-5 animate-[fadeIn_0.5s_ease-in-out]">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <p className="text-base text-gray-200 leading-relaxed">
                    {item.description}
                  </p>
                  <Link
                    to={item.link}
                    className="bg-[#d90a2c] text-white px-10 py-3 rounded-full text-base font-semibold hover:bg-black transition-colors duration-300 mt-3 inline-block"
                  >
                    View More
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}