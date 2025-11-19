import React, { useState, useRef, useEffect } from "react";

export default function ActionCallSection({ actionCallData }) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // ✅ Disable background scroll when popup is open
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

  if (!actionCallData) return null;

  return (
    <>
      {/* --- MAIN CALL SECTION --- */}
      <section
        className="relative bg-cover bg-center text-white py-32 md:py-48 px-6 md:px-16 lg:px-24 transition-all duration-300"
        style={{ backgroundImage: `url('${actionCallData.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative container mx-auto text-center z-10">
          <p className="text-sm font-semibold tracking-[0.2em] mb-4 opacity-80">
            {actionCallData.tagline}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {actionCallData.heading}
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-300 px-2 md:px-0">
            {actionCallData.subheading}
          </p>

          <div className="mt-10 md:mt-12 flex justify-center">
            <button
              onClick={() => setShowPopup(true)}
              className="relative group flex items-center justify-center h-24 w-24 md:h-28 md:w-28 rounded-full focus:outline-none"
            >
              <span className="animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-[#d90a2c] opacity-50"></span>
              <span className="relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-[#d90a2c] text-white text-sm font-bold uppercase tracking-wider transition-colors duration-300">
                Click Here
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* --- POPUP FORM --- */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-fadeIn">
          {/* Popup container */}
          <div
            ref={popupRef}
            className="relative bg-white w-full max-w-5xl rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl transform transition-all duration-300 scale-95 opacity-0 animate-popupAppear"
          >
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 p-8 md:p-14 text-left">
              <p className="text-xs font-semibold tracking-[0.2em] text-gray-600 mb-2 uppercase">
                We're Thrilled
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-8 text-black"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                Let's Discuss
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
                    placeholder="Your Email"
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
                  Send Queries
                </button>
              </form>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:block w-1/2">
              <img
                src={actionCallData.popupImage || "/popup-form.webp"}
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

/* --- Inline Tailwind-based animations --- */
const style = document.createElement("style");
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
