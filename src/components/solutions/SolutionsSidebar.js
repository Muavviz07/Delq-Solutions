import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simple component for the form input fields (same as in ServicesSidebar)
const FormInput = ({ name, placeholder, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="sr-only">{placeholder}</label>
        <input
            type={type}
            name={name}
            id={name}
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#d90a2c]"
            placeholder={placeholder}
            required
        />
    </div>
);

// --- UPDATED: Solutions structure ---
const solutionLinks = [
    {
        name: 'DIGITAL TRANSFORMATION',
        href: '/solutions/digital-transformation',
        sublinks: [
            { name: 'Cloud Migration', href: '/solutions/digital-transformation/cloud-migration' },
            { name: 'Automation & RPA', href: '/solutions/digital-transformation/automation-rpa' },
            { name: 'Data Analytics', href: '/solutions/digital-transformation/data-analytics' },
        ],
    },
    {
        name: 'CYBER SECURITY',
        href: '/solutions/cyber-security',
        sublinks: [
            { name: 'Threat Monitoring', href: '/solutions/cyber-security/threat-monitoring' },
            { name: 'Incident Response', href: '/solutions/cyber-security/incident-response' },
            { name: 'Compliance', href: '/solutions/cyber-security/compliance' },
        ],
    },
    {
        name: 'ENTERPRISE APPLICATIONS',
        href: '/solutions/enterprise-applications',
        sublinks: [
            { name: 'ERP Systems', href: '/solutions/enterprise-applications/erp-systems' },
            { name: 'CRM Solutions', href: '/solutions/enterprise-applications/crm-solutions' },
            { name: 'Supply Chain Management', href: '/solutions/enterprise-applications/supply-chain' },
        ],
    },
    {
        name: 'EMERGING TECHNOLOGIES',
        href: '/solutions/emerging-technologies',
        sublinks: [
            { name: 'AI & Machine Learning', href: '/solutions/emerging-technologies/ai-ml' },
            { name: 'Blockchain', href: '/solutions/emerging-technologies/blockchain' },
            { name: 'Internet of Things', href: '/solutions/emerging-technologies/iot' },
        ],
    },
];

// Arrow icons (same as in ServicesSidebar)
const ArrowTopRight = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" /></svg>);
const ArrowDownLeft = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M15 17H7V9" /></svg>);

export default function SolutionsSidebar() {
    const [openSolution, setOpenSolution] = useState(null); // Changed state variable name
    const contentRefs = useRef({});
    const [contentHeights, setContentHeights] = useState({});

    const toggleSolution = (name) => { // Changed function name
        setOpenSolution((prev) => (prev === name ? null : name));
    };

    useEffect(() => {
        // Use openSolution in dependency array
        if (openSolution && contentRefs.current[openSolution]) {
            const h = contentRefs.current[openSolution].scrollHeight;
            setContentHeights((prev) => ({ ...prev, [openSolution]: h }));
        }
    }, [openSolution]);

    return (
        <aside>
            <div className="transition-all duration-300 ease-in-out">
                {/* Solutions Links Section */}
                <div className="bg-gray-100 p-8">
                     {/* --- UPDATED: Title --- */}
                    <h3 className="text-lg font-bold text-black mb-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                        OUR SOLUTIONS
                    </h3>
                    <ul className="space-y-3">
                        {solutionLinks.map(link => { // Use solutionLinks
                            const isOpen = openSolution === link.name; // Use openSolution
                            const hasSublinks = link.sublinks && link.sublinks.length > 0;
                            const MainElement = link.href && !hasSublinks ? Link : 'div';

                            return (
                                <li key={link.name}>
                                    {hasSublinks ? (
                                        <button
                                            type="button"
                                            onClick={() => toggleSolution(link.name)} // Use toggleSolution
                                            className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors duration-300 ${isOpen ? 'bg-black text-white' : 'bg-[#d90a2c] text-white hover:bg-black'}`}
                                        >
                                            {link.href ? (
                                                <Link to={link.href} onClick={(e) => e.stopPropagation()} className="flex-grow text-left hover:underline">{link.name}</Link>
                                            ) : (
                                                <span className="flex-grow text-left">{link.name}</span>
                                            )}
                                            <span className="transform transition-transform duration-300 ml-2 flex-shrink-0">
                                                {isOpen ? <ArrowDownLeft /> : <ArrowTopRight />}
                                            </span>
                                        </button>
                                    ) : (
                                         <MainElement
                                            to={link.href}
                                            className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors duration-300 ${link.href ? 'bg-[#d90a2c] text-white hover:bg-black' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                                        >
                                            <span>{link.name}</span>
                                        </MainElement>
                                    )}

                                    {/* Sublinks */}
                                    {hasSublinks && (
                                        <div
                                            style={{ height: isOpen ? (contentHeights[link.name] || 0) : 0, transition: 'height 600ms ease' }}
                                            className="overflow-hidden"
                                        >
                                            <ul
                                                ref={(el) => { contentRefs.current[link.name] = el; }}
                                                className="bg-white border border-gray-200 px-6 py-5 space-y-3"
                                            >
                                                {link.sublinks?.map(s => (
                                                    <li key={s.name}>
                                                         {/* --- Use same styling as service sublinks --- */}
                                                        <Link to={s.href} className="block text-black hover:text-[#d90a2c] text-sm">
                                                            {s.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Queries Form Section (same as ServicesSidebar) */}
                <div className="bg-white p-8 shadow-lg mt-12">
                     <h3 className="text-lg font-bold text-black mb-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                        Have Any Queries ?
                    </h3>
                    <form className="space-y-6">
                        <FormInput name="name" placeholder="Your Name" />
                        <FormInput name="email" placeholder="Your Email" type="email" />
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                className="w-full px-0 py-2 bg-transparent border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#d90a2c]"
                                placeholder="Message"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#d90a2c] text-white font-semibold py-3 rounded-full hover:bg-black transition-colors duration-300"
                        >
                            Send Queries
                        </button>
                    </form>
                </div>

                {/* Poster Image Section (updated image name) */}
                <div className="mt-12">
                      <img
                        src="/sols-sidebar-poster.webp" // --- UPDATED ---
                        alt="Solutions Poster" // --- UPDATED ---
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>
        </aside>
    );
}
