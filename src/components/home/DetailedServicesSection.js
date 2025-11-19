import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const ServiceCard = ({ service, index, activeIndex, setActiveIndex }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = isMobile || index === activeIndex;

  return (
    <div
      style={!isMobile ? { flex: isActive ? "1 1 320px" : "1 1 100px" } : {}}
      className={`relative transition-all duration-700 ease-in-out flex-shrink-0 
                  w-[90vw] max-w-[450px] lg:w-auto lg:max-w-none lg:cursor-pointer 
                  ${isMobile ? "h-[450px]" : "h-[650px]"} 
                  shadow-lg overflow-hidden 
                  ${isMobile ? "rounded-none" : "rounded-3xl"}`}
      onMouseEnter={() => !isMobile && setActiveIndex(index)}
    >
      <img
        src={service.bgImage}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-105"
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? "opacity-70" : "opacity-50"
          }`}
      ></div>

      <div className="relative h-full p-6 text-white overflow-hidden">
        {/* Vertical Title */}
        <h3
          className={`absolute bottom-6 left-10 font-bold uppercase tracking-widest [writing-mode:vertical-rl] transform rotate-180 whitespace-nowrap 
          ${isMobile ? "text-2xl" : "text-4xl"}`}
        >
          {service.title}
        </h3>

        {/* Content */}
        <div
          className={`absolute left-24 right-8 top-8 bottom-8 flex flex-col justify-end transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"
            }`}
        >
          <div>
            <div className={`${isMobile ? "mb-6" : "mb-8"}`}>
              <div
                className={`transform-gpu transition-all duration-500 ease-out ${isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                  }`}
                style={{ transitionDelay: isActive ? "400ms" : "0ms" }}
              >
                <span
                  className={`font-bold text-gray-400 opacity-50 ${isMobile ? "text-5xl" : "text-7xl"
                    }`}
                >
                  {service.number}
                </span>
              </div>

              <div className="flex items-start gap-4 mt-4">
                <div
                  className={`transform-gpu transition-all duration-500 ease-out ${isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                    }`}
                  style={{ transitionDelay: isActive ? "500ms" : "0ms" }}
                >
                  <div
                    className={`${isMobile ? "h-16" : "h-24"} w-0.5 bg-white`}
                  ></div>
                </div>

                <div
                  className={`transform-gpu transition-all duration-500 ease-out ${isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                    }`}
                  style={{ transitionDelay: isActive ? "600ms" : "0ms" }}
                >
                  <p
                    className={`leading-relaxed ${isMobile ? "text-sm" : "text-base"
                      }`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          {/* View More Button */}
<div
  className={`transform-gpu transition-all duration-500 ease-out ${
    isActive ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`}
  style={{ transitionDelay: isActive ? "700ms" : "0ms" }}
>
  <Link
    to={
      service.link
        ? service.link
        : "/services/" + service.title.toLowerCase().replace(/ /g, "-")
    }
    className="bg-[#d90a2c] text-white px-7 py-2.5 rounded-full text-sm font-semibold self-start hover:bg-black transition-colors duration-300"
  >
    View More
  </Link>
</div>

        </div>
      </div>
    </div>
  );
};

export default function DetailedServicesSection({ detailedServices }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!detailedServices) return null;

  return (
    <section className="bg-white w-full py-20 overflow-hidden">
      <div
        className="w-full flex flex-row items-stretch justify-start gap-2 px-4 sm:px-6 
                   lg:justify-center overflow-x-auto lg:overflow-x-visible"
      >
        {detailedServices.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
}
