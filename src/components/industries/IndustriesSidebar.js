import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- UPDATED: IndustryLinkItem no longer needs isActive prop ---
const IndustryLinkItem = ({ name, href }) => (
    <Link
        to={href}
        // --- MODIFIED: Removed isActive logic. All buttons are red. ---
        className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors duration-300 bg-[#d90a2c] text-white hover:bg-black`}
    >
        <span>{name}</span>
        {/* No arrow icon, as requested */}
    </Link>
);

export default function IndustriesSidebar() {
    const [industryLinks, setIndustryLinks] = useState([]);

    useEffect(() => {
        // Fetch the list of industries for the sidebar
        const fetchSidebarData = async () => {
            try {
                const response = await fetch('/api/industries-sidebar-data');
                if (!response.ok) throw new Error('Failed to fetch sidebar data');
                const data = await response.json();
                setIndustryLinks(data);
            } catch (error) {
                console.error("Error fetching sidebar data:", error);
                // Set fallback data in case API fails
                setIndustryLinks([
                    { name: 'Education', href: '/industries/education' },
                    { name: 'Healthcare', href: '/industries/healthcare' },
                    { name: 'Retail & eCommerce', href: '/industries/retail' },
                ]);
            }
        };
        fetchSidebarData();
    }, []);

    return (
        <aside>
            <div className="transition-all duration-300 ease-in-out">
                {/* Industries Links Section */}
                <div className="bg-gray-100 p-8">
                    <h3 className="text-lg font-bold text-black mb-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                        OUR INDUSTRIES
                    </h3>
                    <ul className="space-y-3">
                        {industryLinks.map(link => (
                            <li key={link.name}>
                                <IndustryLinkItem
                                    name={link.name}
                                    href={link.href}
                                    // --- MODIFIED: Removed isActive prop ---
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Poster Image Section */}
                <div className="mt-12">
                    <img
                         // --- MODIFIED: Updated image path as requested ---
                        src="/services-sidebar-poster.png"
                        alt="Service Poster"
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>
        </aside>
    );
}