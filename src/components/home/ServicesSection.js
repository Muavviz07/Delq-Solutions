import React from 'react';

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 md:py-28 px-10 sm:px-14 md:px-20">
      <div className="container mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-black mb-3 sm:mb-4">
          BARRIER BREAKING
          {/* Mobile Break for Subtitle */}
          <br className="block md:hidden" />
          {" "}SERVICES
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#1c1c1c] leading-snug sm:leading-loose"
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Elevate Your
          {/* Mobile Break 1 */}
          <br className="block md:hidden" />
          {" "}Business With
          
          {/* Desktop Break (Existing) */}
          <br className="hidden md:block" />
          
          {/* Mobile Break 2 */}
          <br className="block md:hidden" />
          
          <span className="text-[#d90a2c] underline">Next-Gen</span> IT
          
          {/* Mobile Break 3 */}
          <br className="block md:hidden" />
          {" "}Services
        </h2>
      </div>
    </section>
  );
}