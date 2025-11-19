import React, { useState, useEffect } from 'react';
import AboutSidebar from '../components/about/AboutSidebar';

// Helper functions and icons
const createMarkup = (htmlString) => { return { __html: htmlString }; };
const IconAutomation = () => ( <svg className="w-full h-full" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="80" height="80" rx="12" fill="#F4F7FB"/> <rect x="16" y="48" width="48" height="16" rx="4" fill="#D90A2C"/> <rect x="24" y="24" width="32" height="16" rx="4" fill="#2C3E50"/> </svg> );
const IconProductivity = () => ( <svg className="w-full h-full" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="80" height="80" rx="12" fill="#F4F7FB"/> <rect x="16" y="44" width="48" height="20" rx="4" fill="#2C3E50"/> <rect x="16" y="16" width="28" height="20" rx="4" fill="#D90A2C"/> <rect x="52" y="16" width="12" height="20" rx="4" fill="#2C3E50"/> </svg> );
const IconExpertise = () => ( <svg className="w-full h-full" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="80" height="80" rx="12" fill="#F4F7FB"/> <rect x="16" y="52" width="48" height="12" rx="4" fill="#D90A2C"/> <rect x="16" y="32" width="48" height="12" rx="4" fill="#2C3E50"/> <rect x="16" y="12" width="48" height="12" rx="4" fill="#D90A2C"/> </svg> );
const BenefitIcons = [<IconAutomation />, <IconProductivity />, <IconExpertise />];

// Card component for Benefits
const BenefitCard = ({ benefit, icon }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
        <div className="w-16 h-16 mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-black mb-3" style={{ fontFamily: "'Urbanist', sans-serif" }}>{benefit.title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed">{benefit.description}</p>
    </div>
);

// Card component for Playbook
const PlaybookCard = ({ item }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm text-left h-full">
        <span className="text-gray-300 font-bold text-3xl">{item.number}</span>
        <h4 className="text-2xl font-bold text-black my-3" style={{ fontFamily: "'Urbanist', sans-serif" }}>{item.title}</h4>
        <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
    </div>
);

export default function OurTeamPage() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('http://localhost:8000/api/our-team-data');
            if (!response.ok) throw new Error(`Data fetching failed`);
            const data = await response.json();
            setPageData(data);
          } catch (e) {
            setError(e.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
    }, []);

    if (isLoading) return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Page...</div>;
    if (error) return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
    if (!pageData) return null;

    const { comp1_heading, comp1_subheading, comp1_desc_p1, comp1_desc_p2 } = pageData;
    const { comp2_tagline, comp2_heading, comp2_benefits } = pageData;
    const { comp3_heading, comp3_subheading, comp3_img1_url, comp3_img2_url, comp3_playbook } = pageData;

    return (
        <main className="bg-gray-50">
            {/* Updated width to max-w-[84rem] */}
            <div className="container mx-auto max-w-[92rem] py-16 md:py-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-2 space-y-24">
                        
                        {/* Component 1 */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <svg className="w-10 h-10 text-[#d90a2c]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.694 9.306H24L16.653 15.064L19.347 24L12 18.694L4.653 24L7.347 15.064L0 9.306H9.306L12 0Z" />
                                </svg>
                                <div className="flex gap-3">
                                    <span className="border border-gray-400 text-gray-600 text-sm font-bold px-4 py-1 rounded-full">WHO</span>
                                    <span className="border border-gray-400 text-gray-600 text-sm font-bold px-4 py-1 rounded-full">WE</span>
                                    <span className="border border-gray-400 text-gray-600 text-sm font-bold px-4 py-1 rounded-full">ARE</span>
                                </div>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold text-black uppercase leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>{comp1_heading}</h1>

                            <div className="mt-10 space-y-6">
                                <h2 className="text-2xl font-bold text-black uppercase" style={{ fontFamily: "'Urbanist', sans-serif" }}>{comp1_subheading}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">{comp1_desc_p1}</p>
                                <p className="text-lg text-gray-600 leading-relaxed">{comp1_desc_p2}</p>
                            </div>
                        </section>

                        {/* Component 2 - Centered 3rd Card */}
                        <section>
                            <div className="text-left mb-10">
                                <span className="inline-block bg-[#d90a2c]/10 text-[#d90a2c] text-sm font-bold px-5 py-2 rounded-full uppercase">{comp2_tagline}</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-black mt-5 leading-tight" style={{ fontFamily: "'Urbanist', sans-serif" }} dangerouslySetInnerHTML={createMarkup(comp2_heading)} />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {comp2_benefits[0] && (
                                    <BenefitCard benefit={comp2_benefits[0]} icon={BenefitIcons[0]} />
                                )}
                                {comp2_benefits[1] && (
                                    <BenefitCard benefit={comp2_benefits[1]} icon={BenefitIcons[1]} />
                                )}
                                {comp2_benefits[2] && (
                                    <div className="md:col-span-2 flex justify-center">
                                        <div className="w-full md:max-w-xl">
                                            <BenefitCard benefit={comp2_benefits[2]} icon={BenefitIcons[2]} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Component 3: Centered 3rd Card */}
                        <section className="text-left">
                             <div className="mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold text-black" style={{ fontFamily: "'Urbanist', sans-serif" }}>{comp3_heading}</h2>
                                <h3 className="text-4xl md:text-5xl font-bold text-gray-400 mt-2" style={{ fontFamily: "'Urbanist', sans-serif" }}>{comp3_subheading}</h3>
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                                <img src={comp3_img1_url} alt="Company culture" className="w-full h-80 object-cover rounded-xl shadow-md" />
                                <img src={comp3_img2_url} alt="Company office" className="w-full h-80 object-cover rounded-xl shadow-md" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {comp3_playbook[0] && (
                                    <PlaybookCard item={comp3_playbook[0]} />
                                )}
                                {comp3_playbook[1] && (
                                    <PlaybookCard item={comp3_playbook[1]} />
                                )}
                                {comp3_playbook[2] && (
                                    <div className="md:col-span-2 flex justify-center">
                                        <div className="w-full md:max-w-xl">
                                            <PlaybookCard item={comp3_playbook[2]} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-10 lg:self-start">
                            <AboutSidebar />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}