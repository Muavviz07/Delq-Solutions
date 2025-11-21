import React, { useEffect } from 'react';

// --- SVG Icons (Helper components) ---
const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 bg-[#d90a2c] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors duration-300"
  >
    {children}
  </a>
);

const ContactRow = ({ children }) => (
  <div className="flex items-center gap-3 text-black text-base font-semibold">
    {children}
  </div>
);


// --- Main Sidebar Component ---
function Sidebar({ isOpen, onClose }) {
  // Effect to prevent the background from scrolling when the sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* The Close Button */}
      <button
        onClick={onClose}
        className={`
          absolute top-6 right-6 z-50 h-12 w-12 rounded-full bg-[#d90a2c] text-white 
          flex items-center justify-center hover:bg-black transition-all duration-300
          transform ${isOpen ? 'scale-100' : 'scale-0'}
        `}
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* The Sidebar Panel */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-white shadow-2xl 
          w-full md:w-4/5 lg:w-3/5 xl:w-1/2
          transform transition-transform duration-500 ease-in-out
          flex flex-col 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div className="p-8 md:p-16 overflow-y-auto text-left flex-grow flex flex-col items-start">
          <h2 id="sidebar-title" className="text-2xl font-bold text-black mb-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            About Us
          </h2>

          <img src="/DELQ-Home-About-Us.webp" alt="DELQ office" className="w-full mb-8 rounded-lg" />

          <p className="text-black leading-relaxed mb-6">
            DELQ is more than just a technology company. We are a team of visionaries,
            problem-solvers, and collaborators united by a passion for creating innovative
            solutions that redefine success. We have grown into a trusted partner by combining
            cutting-edge technology with a customer-centric approach. Our mission is to help
            businesses unlock their full potential by leveraging the power of digital
            transformation.
          </p>
          
          <button className="bg-[#d90a2c] text-white px-8 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300">
            Know More
          </button>

          <div className="w-full border-t border-gray-200 my-8"></div>

          <div className="w-full">
            <h3 className="text-xl font-bold text-black mb-4">We Are Social</h3>
            <div className="flex items-center gap-3">
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.5 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/></svg>
              </SocialIcon>
            </div>
          </div>
          
          <div className="w-full border-t border-gray-200 my-8"></div>
          
          <div className="w-full">
            <h3 className="text-xl font-bold text-black mb-4">Contact Us</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <ContactRow>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>
                {/* --- UPDATED NUMBER --- */}
                <span>+44 7586 955136</span>
              </ContactRow>
              <ContactRow>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <span>info@delqsolutions.com</span>
              </ContactRow>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}

export default Sidebar;