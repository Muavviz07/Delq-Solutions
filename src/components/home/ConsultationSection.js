import React, { useState, useEffect, useRef } from 'react';

const useInView = (options) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [containerRef, options]);

  return [containerRef, isInView];
};

export default function ConsultationSection() {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [showPopup, setShowPopup] = useState(false);

  // Disable background scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);


  const textSpan = (text, delay) => (
    <span className="inline-block overflow-hidden align-bottom">
      <span
        className={`inline-block transform-gpu transition-transform duration-700 ease-out ${
          inView ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {text}
      </span>
    </span>
  );

  return (
    <>
      {/* --- MAIN SECTION --- */}
      <section ref={ref} className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-16">
            
            {/* Wrapper: Mobile = Column, Desktop = Row (unchanged layout for desktop) */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                
                {/* Content Wrapper: Handles Mobile Side-Line Layout */}
                <div className="w-full lg:flex-1 flex flex-row items-stretch">
                    <div className="flex-1 text-left">
                        <p className="text-sm font-semibold tracking-[0.2em] text-black mb-3 uppercase">
                        LET'S DISCUSS
                        </p>

                        <h2
                        className="text-3xl md:text-[2.6rem] font-bold text-[#1c1c1c] leading-[1.15] max-w-[880px] lg:max-w-[900px]"
                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                        >
                        Have <span className="text-[#d90a2c]">{textSpan('GREAT', 200)}</span>{' '}
                        <span className="text-[#d90a2c]">{textSpan('IDEA', 300)}</span> In Mind? Let's
                        <br />
                        Make It{' '}
                        <span className="text-[#d90a2c]">{textSpan('OUTSTANDING!!', 400)}</span>
                        </h2>
                    </div>

                    {/* Mobile Vertical Line (Hidden on Desktop) */}
                    <div className="lg:hidden w-1 bg-[#d90a2c] ml-6 rounded-full flex-shrink-0"></div>
                </div>

                {/* Desktop Vertical Line (Hidden on Mobile) */}
                <div className="hidden lg:block h-28 w-0.5 bg-[#d90a2c] ml-24 mr-4"></div>

                {/* Button (Visible on both, styled for position) */}
                <div className="w-full lg:flex-1 flex justify-start lg:justify-center mt-8 lg:mt-0">
                    <button
                    onClick={() => setShowPopup(true)}
                    className="bg-[#d90a2c] text-white px-12 py-4 rounded-full font-semibold hover:bg-black transition-colors duration-300 text-sm md:text-base w-full md:w-auto"
                    >
                    Get Your Free Consultation
                    </button>
                </div>

            </div>
        </div>
      </section>

      {/* --- POPUP FORM --- */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-fadeIn">
          <div className="relative bg-white w-full max-w-5xl rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl transform transition-all duration-300 scale-95 opacity-0 animate-popupAppear">
            {/* Left Form */}
            <div className="w-full md:w-1/2 p-8 md:p-14 text-left">
              <h2
                className="text-3xl md:text-4xl font-bold mb-8 text-black"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                Book Now
              </h2>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#d90a2c]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Id"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#d90a2c]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Your Mobile Number"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#d90a2c]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Domain"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#d90a2c]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows="3"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#d90a2c]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d90a2c] text-white font-semibold py-3 rounded-full hover:bg-black transition-all duration-300"
                >
                  Send Now
                </button>
              </form>
            </div>

            {/* Right Image */}
            <div className="hidden md:block w-1/2">
              <img
                src="/popup-form.webp"
                alt="Popup Visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-6 right-6 bg-[#d90a2c] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-black transition"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

/* --- Inline Animations --- */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes popupAppear {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease forwards;
}
.animate-popupAppear {
  animation: popupAppear 0.3s ease forwards;
}
`;
document.head.appendChild(style);