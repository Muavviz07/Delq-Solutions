import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FormInput = ({ name, placeholder, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="sr-only">{placeholder}</label>
        <input type={type} name={name} id={name} className="w-full px-0 py-2 bg-transparent border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#d90a2c]" placeholder={placeholder} required />
    </div>
);

const serviceLinks = [
    {
        name: 'ARTIFICIAL INTELLIGENCE',
        // href: "/services/artificial-intelligence",
        sublinks: [
            { name: 'Generative AI Solutions', href: '/services/artificial-intelligence/generative-ai' },
            { name: 'Natural Language Processing (NLP)', href: '/services/artificial-intelligence/nlp' },
            { name: 'Computer Vision', href: '/services/artificial-intelligence/computer-vision' },
            { name: 'AI Strategy & Consulting', href: '/services/artificial-intelligence/ai-strategy' },
        ],
    },
    {
        name: 'SOFTWARE DEVELOPMENT',
        // href: "/services/software-development",
        sublinks: [
            { name: 'Web Development', href: '/services/software-development/web-development' },
            { name: 'Mobile Development', href: '/services/software-development/mobile-development' },
            { name: 'Enterprise Software', href: '/services/software-development/enterprise-software' },
        ],
    },
    {
        name: 'IT CONSULTING',
        // href: "/services/it-consulting",
        sublinks: [
            { name: 'Digital Transformation', href: '/services/it-consulting/digital-transformation' },
            { name: 'Legacy Modernization', href: '/services/it-consulting/legacy-modernization' },
            { name: 'System Integration', href: '/services/it-consulting/system-integration' },
            { name: 'Business Intelligence & Analysis', href: '/services/it-consulting/business-intelligence' },
            { name: 'IT Strategy and Planning', href: '/services/it-consulting/it-strategy' },
        ],
    },
    {
        name: 'CLOUD SERVICES',
        // href: "/services/cloud-services",
        sublinks: [
            { name: 'Cloud Migration', href: '/services/cloud-services/cloud-migration' },
            { name: 'Cloud Management', href: '/services/cloud-services/cloud-management' },
            { name: 'SaaS Development', href: '/services/cloud-services/saas-development' },
        ],
    },
    {
        name: 'SUPPORT & MAINTENANCE',
        // href: "/services/support-maintenance",
        sublinks: [
            { name: 'Software Support and Maintenance', href: '/services/support-maintenance/software-support' },
            { name: 'Application Support', href: '/services/support-maintenance/application-support' },
            { name: 'IT Helpdesk', href: '/services/support-maintenance/it-helpdesk' },
            { name: 'System Maintenance', href: '/services/support-maintenance/system-maintenance' },
        ],
    },
    {
        name: 'QUALITY ASSURANCE & TESTING',
        // href: "/services/quality-assurance",
        sublinks: [
            { name: 'Manual Testing', href: '/services/quality-assurance/manual-testing' },
            { name: 'Automation Testing', href: '/services/quality-assurance/automated-testing' },
            { name: 'Performance Testing', href: '/services/quality-assurance/performance-testing' },
            { name: 'Security Testing', href: '/services/quality-assurance/security-testing' },
        ],
    },
];

const ArrowTopRight = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" /></svg>);
const ArrowDownLeft = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M15 17H7V9" /></svg>);

export default function ServicesSidebar() {
    const [openService, setOpenService] = useState(null);
    const contentRefs = useRef({});
    const [contentHeights, setContentHeights] = useState({});

    const toggleService = (name) => {
        setOpenService((prev) => (prev === name ? null : name));
    };

    useEffect(() => {
        if (openService && contentRefs.current[openService]) {
            const h = contentRefs.current[openService].scrollHeight;
            setContentHeights((prev) => ({ ...prev, [openService]: h }));
        }
    }, [openService]);

    return (
        <aside>
            <div className="transition-all duration-300 ease-in-out">
                <div className="bg-gray-100 p-8">
                    <h3 className="text-lg font-bold text-black mb-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>OUR SERVICES</h3>
                    <ul className="space-y-3">
                        {serviceLinks.map(link => {
                            const isOpen = openService === link.name;
                            const hasSublinks = link.sublinks && link.sublinks.length > 0;
                            const MainElement = link.href && !hasSublinks ? Link : 'div';
                            return (
                                <li key={link.name}>
                                    {hasSublinks ? (
                                        <button type="button" onClick={() => toggleService(link.name)} className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors duration-300 ${isOpen ? 'bg-black text-white' : 'bg-[#d90a2c] text-white hover:bg-black'}`}>
                                            {link.href ? (<Link to={link.href} onClick={(e) => e.stopPropagation()} className="flex-grow text-left hover:underline">{link.name}</Link>) : (<span className="flex-grow text-left">{link.name}</span>)}
                                            <span className="transform transition-transform duration-300 ml-2 flex-shrink-0">{isOpen ? <ArrowDownLeft /> : <ArrowTopRight />}</span>
                                        </button>
                                    ) : (
                                        <MainElement to={link.href} className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-sm transition-colors duration-300 ${link.href ? 'bg-[#d90a2c] text-white hover:bg-black' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}><span>{link.name}</span></MainElement>
                                    )}
                                    {hasSublinks && (
                                        <div style={{ height: isOpen ? (contentHeights[link.name] || 0) : 0, transition: 'height 600ms ease' }} className="overflow-hidden">
                                            <ul ref={(el) => { contentRefs.current[link.name] = el; }} className="bg-white border border-gray-200 px-6 py-5 space-y-3">
                                                {link.sublinks?.map(s => (
                                                    <li key={s.name}><Link to={s.href} className="block text-black hover:text-[#d90a2c] text-sm">{s.name}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* Queries form & poster */}
                <div className="bg-white p-8 shadow-lg mt-12">
                    <h3 className="text-lg font-bold text-black mb-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>Have Any Queries ?</h3>
                    <form className="space-y-6">
                        <FormInput name="name" placeholder="Your Name" />
                        <FormInput name="email" placeholder="Your Email" type="email" />
                        <div><label htmlFor="message" className="sr-only">Message</label><textarea name="message" id="message" rows="4" className="w-full px-0 py-2 bg-transparent border-b border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#d90a2c]" placeholder="Message" required></textarea></div>
                        <button type="submit" className="w-full bg-[#d90a2c] text-white font-semibold py-3 rounded-full hover:bg-black transition-colors duration-300">Send Queries</button>
                    </form>
                </div>
                <div className="mt-12"><img src="/services-sidebar-poster.png" alt="Service Poster" className="w-full h-auto object-cover rounded-lg shadow-md" /></div>
            </div>
        </aside>
    );
}