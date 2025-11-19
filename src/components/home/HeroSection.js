import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";



// Helper function to render HTML from string
const createMarkup = (htmlString) => {
  return { __html: htmlString };
};

const SLIDE_DURATION_S = 5;

const SliderNavigation = ({ count, currentIndex, onNavigate }) => {
  return (
    <div className="flex space-x-2 mt-3 sm:mt-5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="w-10 h-1 bg-white bg-opacity-30 overflow-hidden focus:outline-none transition-all duration-300"
        >
          {index === currentIndex && (
            <div
              key={currentIndex}
              className="h-full bg-[#d90a2c]"
              style={{
                animation: `progress ${SLIDE_DURATION_S}s linear forwards`,
              }}
            ></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default function HeroSection({ sliderData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timeoutRef = useRef(null);

  const minSwipeDistance = 50;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!sliderData || sliderData.length === 0) return;
    resetTimeout();
    timeoutRef.current = setTimeout(goToNext, SLIDE_DURATION_S * 1000);
    return () => resetTimeout();
  }, [currentIndex, sliderData]);

  const goToNext = () => {
    const isLastSlide = currentIndex === sliderData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliderData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNavClick = (index) => setCurrentIndex(index);
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goToNext();
    if (distance < -minSwipeDistance) goToPrev();
  };

  if (!sliderData || sliderData.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden text-white h-[65vh] sm:h-[70vh] md:h-screen"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6 sm:px-8">
            <div className="transform md:translate-y-12">
              <p className="text-sm font-semibold tracking-widest mb-2">
                {slide.tagline}
              </p>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
                dangerouslySetInnerHTML={createMarkup(slide.headline)}
              />
              <p className="mt-3 max-w-2xl mx-auto text-white text-sm font-normal px-4 sm:px-6">
                {slide.description}
              </p>
              <div className="mt-6 flex flex-row justify-center items-center space-x-4">
                <Link
                  to={
                    slide.primaryBtnLink ||
                    "/services/" + slide.tagline.toLowerCase().replace(/ /g, "-")
                  }
                  className="px-7 py-2.5 text-sm font-semibold bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  {slide.primaryBtnText || "Learn More"}
                </Link>

                <Link
                  to={slide.secondaryBtnLink || "/services"}
                  className="px-7 py-2.5 text-sm font-semibold bg-[#d90a2c] border-2 border-[#d90a2c] text-white rounded-full hover:bg-black hover:border-black transition-all duration-300"
                >
                  {slide.secondaryBtnText || "Our Services"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
        <SliderNavigation
          count={sliderData.length}
          currentIndex={currentIndex}
          onNavigate={handleNavClick}
        />
      </div>
    </div>
  );
}
