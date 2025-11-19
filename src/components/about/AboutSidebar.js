import React from 'react';
import { Link } from 'react-router-dom';

// --- Navigation Data ---
const aboutLinks = [
    { name: "Our Story", href: "/about/our-story" },
    { name: "Our Team", href: "/about/our-team" },
    { name: "Mission & Vision", href: "/about/mission-vision" }
];

// --- Helper: Navigation Button ---
const AboutNavLink = ({ name, href }) => (
    <Link
        to={href}
        // Removed font-bold, reduced padding to py-3
        className="w-full flex justify-between items-center px-6 py-3 font-medium text-sm uppercase transition-all duration-300 bg-[#d90a2c] text-white hover:bg-black hover:pl-8"
    >
        <span>{name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
    </Link>
);

export default function AboutSidebar() {
    return (
        <aside className="space-y-8">
            
            {/* 1. Navigation Section */}
            <div className="bg-gray-100 p-8">
                <h3 className="text-2xl font-bold text-black mb-6 uppercase" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                    About Us
                </h3>
                <ul className="space-y-3">
                    {aboutLinks.map((link) => (
                        <li key={link.name}>
                            <AboutNavLink 
                                name={link.name} 
                                href={link.href} 
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* 2. Awards / Achievements Section */}
            <div className="bg-white border border-gray-200 p-8 shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-black mb-8 uppercase" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                    Why Trust Us?
                </h3>
                <ul className="space-y-5">
                    {[
                        "ISO Certified (2025)",
                        "100+ Successful Projects",
                        "Trusted by 70+ Companies",
                        "15+ Years of Excellence"
                    ].map((item, index) => (
                        <li key={index} className="group flex items-center transition-all duration-300 hover:translate-x-2 cursor-default">
                            {/* Custom Red Marker */}
                            <span className="w-2 h-2 bg-[#d90a2c] rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                            <span className="text-gray-700 font-semibold text-base group-hover:text-black transition-colors">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3. Leadership Quote Section */}
            <div className="relative bg-[#1c1c1c] p-10 rounded-lg overflow-hidden text-white">
                {/* Decorative Quote Icon */}
                <div className="absolute top-0 right-4 text-[#d90a2c] opacity-20 text-8xl font-serif leading-none">”</div>
                
                <h3 className="text-sm font-bold tracking-widest mb-6 text-[#d90a2c] uppercase">
                    Leadership Thought
                </h3>
                
                <blockquote className="italic text-xl leading-relaxed text-gray-200 font-light relative z-10">
                    "We build solutions today, that prepare you for tomorrow."
                </blockquote>
            </div>

        </aside>
    );
}