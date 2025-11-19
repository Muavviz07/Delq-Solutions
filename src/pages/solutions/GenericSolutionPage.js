// src/pages/solutions/GenericSolutionPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import reusable components
import SolutionsSidebar from '../../components/solutions/SolutionsSidebar'; // <-- Import the new sidebar
import { AccordionWrapper } from '../../components/shared/AccordionItem';
import ContactSection from '../../components/home/ContactSection';

// --- Helper Component for list items with red diamond (Same as GenericServicePage) ---
const ListItem = ({ children }) => (
    <li className="flex items-start">
        <svg className="w-5 h-5 text-[#d90a2c] mr-3 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm7.293-2.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z" clipRule="evenodd" transform="rotate(45 10 10)" />
        </svg>
        {/* --- MODIFIED: Increased font size from text-sm to text-base --- */}
        <span className="text-[#4d4d4d] text-base">{children}</span>
    </li>
);

// --- Helper component to render a single content block (Same as GenericServicePage) ---
const ContentBlock = ({ block }) => {
    switch (block.type) {
        // --- MODIFIED: Increased font size from text-3xl to text-4xl ---
        case 'heading':
            return ( <h2 className="text-4xl font-bold text-black" style={{ fontFamily: "'Urbanist', sans-serif" }} dangerouslySetInnerHTML={{ __html: block.content }} /> );
        case 'paragraph':
            const containsLink = block.content && block.content.includes('<a href=');
            // --- MODIFIED: Increased font size from text-sm to text-base ---
            return ( <p className={`text-[#4d4d4d] leading-relaxed text-base py-1 ${containsLink ? 'service-link-paragraph' : ''}`} dangerouslySetInnerHTML={{ __html: block.content }} /> );
        case 'image':
            return ( <img src={block.image_url} alt={block.alt_text || 'Solution content image'} className="w-full h-96 object-cover rounded-lg shadow-md" /> );
        case 'image_list':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <img src={block.image_url} alt={block.alt_text || 'Solution info'} className="w-full h-80 object-cover rounded-lg shadow-md" />
                    <ul className="space-y-4">
                        {(block.items || []).slice(0, 5).map((item, index) => ( <ListItem key={index}>{item}</ListItem> ))}
                    </ul>
                </div>
            );
        case 'accordion_section':
             const showHeading = block.heading && block.heading.trim() !== '';
            return (
                <section>
                     {/* --- MODIFIED: Increased font size from text-3xl to text-4xl --- */}
                     {showHeading && ( <h2 className={`text-4xl font-bold mb-2 ${block.heading.includes("WHY CHOOSE") || block.heading.includes("WHY PARTNER") ? 'text-[#d90a2c]' : 'text-black'}`} style={{ fontFamily: "'Urbanist', sans-serif" }}> {block.heading} </h2> )}
                    {/* --- MODIFIED: Increased font size from text-sm to text-base --- */}
                    {block.subheading && ( <p className="text-[#4d4d4d] leading-relaxed mb-2 text-base py-1">{block.subheading}</p> )}
                    <AccordionWrapper items={block.accordion_items || []} defaultIndex={0} />
                </section>
            );
        default:
            return <p>Unknown block type: {block.type}</p>;
    }
};


// --- Main Page Component ---
export default function GenericSolutionPage({ fetchUrl, pageType = "Solution" }) { // Added pageType for breadcrumbs

    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const response = await fetch(`http://localhost:8000${fetchUrl}`);
            if (!response.ok) throw new Error(`Data fetching failed for ${fetchUrl}`);
            const data = await response.json();
            setPageData(data);
          } catch (e) {
            setError(e.message);
            console.error("Failed to fetch page data:", e);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
    }, [fetchUrl]);

    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Page...</div>;
    }
    if (error) {
        return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
    }
    if (!pageData) return null;

    // Default breadcrumbs if not provided by API
     const breadcrumbs = pageData.breadcrumbs || [
        {"name": "HOME", "href": "/"},
        {"name": "OUR SOLUTIONS", "href": "/solutions"}, // Default Solutions link
        {"name": pageData.heading?.toUpperCase() || pageType.toUpperCase(), "href": null} // Use heading from data or pageType
    ];

    return (
        <main className="bg-white">

            {/* Hero Section (Same as GenericServicePage) */}
            <section
                className="relative bg-cover bg-center text-white pt-32 pb-16 md:pt-48 md:pb-24"
                style={{ backgroundImage: `url('${pageData.heroBackgroundImage}')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="relative z-10 container mx-auto text-center px-4">
                    <h1
                        className="text-5xl md:text-6xl font-bold"
                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                    >
                        {pageData.heading}
                    </h1>
                    {/* Breadcrumbs */}
                    <nav className="flex justify-center items-center space-x-2 text-sm font-medium mt-3 uppercase">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <span className="text-gray-400">/</span>}
                                {crumb.href && crumb.href !== "#" ? (
                                    <Link to={crumb.href} className="text-white hover:text-[#d90a2c] transition-colors">
                                        {crumb.name}
                                    </Link>
                                ) : (
                                    <span className="text-gray-300">{crumb.name}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </section>

            {/* Main Content Area with Sidebar */}
           {/* --- MODIFIED: Reduced horizontal padding (removed md:px-10 lg:px-16 xl:px-24) --- */}
           <div className="container mx-auto py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">

                    {/* Left Column (Main Content - Same as GenericServicePage) */}
                    <div className="lg:col-span-2 space-y-6">
                        {(pageData.content_blocks || []).map((block, index) => (
                            index === 0 && block.type === 'image' ? (
                                <img key={index} src={block.image_url} alt={block.alt_text || 'Solution content image'} className="w-full h-[28rem] object-cover rounded-lg shadow-md" />
                            ) : (
                                <ContentBlock key={index} block={block} />
                            )
                        ))}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-10 lg:self-start">
                             {/* --- Use SolutionsSidebar --- */}
                            <SolutionsSidebar />
                        </div>
                    </div>

                </div>
            </div>

            {/* Final Contact Section (Reused) */}
            <ContactSection />

        </main>
    );
}