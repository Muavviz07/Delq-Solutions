import React, { useState, useEffect } from 'react';
import AboutSidebar from '../components/about/AboutSidebar';

// Helper functions and icons
const createMarkup = (htmlString) => { return { __html: htmlString }; };
const FeatureIcon1 = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> </svg> );
const FeatureIcon2 = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const IconExcellence = () => ( <svg className="w-full h-full text-[#d90a2c] opacity-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M32 4L40.237 20.9159L58.944 23.4729L45.472 36.5271L48.714 55.0841L32 46.25L15.286 55.0841L18.528 36.5271L5.056 23.4729L23.763 20.9159L32 4Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/> </svg> );
const IconInnovation = () => ( <svg className="w-full h-full text-[#d90a2c] opacity-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M36 49.3333C36 53.0152 32.868 56 29 56C25.132 56 22 53.0152 22 49.3333M36 49.3333C36 45.6514 32.868 42.6667 29 42.6667C25.132 42.6667 22 45.6514 22 49.3333M36 49.3333H40C46.6274 49.3333 52 44.1838 52 37.8667C52 31.5495 46.6274 26.4 40 26.4H36M22 49.3333H18C11.3726 49.3333 6 44.1838 6 37.8667C6 31.5495 11.3726 26.4 18 26.4H22M36 26.4V12C36 8.68629 32.866 6 29 6C25.134 6 22 8.68629 22 12V26.4M36 26.4H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/> </svg> );
const IconPartnership = () => ( <svg className="w-full h-full text-[#d90a2c] opacity-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M42 22H32V12H22V22H12V32H22V42H32V52H42V42H52V32H42V22Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/> <path d="M32 32H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/> </svg> );
const ValueIcons = [<IconExcellence />, <IconInnovation />, <IconPartnership />];

// Card component for the 3-card grid
const ValueCard = ({ value, icon }) => (
    <div className="relative bg-white p-10 rounded-xl shadow-sm border border-gray-100 overflow-hidden text-left">
        <div className="relative z-10">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 font-bold text-lg">{value.number}</span>
            <h4 className="text-2xl font-bold text-black mt-6" style={{ fontFamily: "'Urbanist', sans-serif" }}>{value.title}</h4>
            <p className="text-lg text-gray-600 leading-relaxed mt-3">{value.description}</p>
        </div>
        {/* Big BG Icon */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 z-0 opacity-60">
            {icon}
        </div>
    </div>
);


export default function OurStoryPage() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('/api/our-story-data');
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

    const { comp1_tagline, comp1_heading, comp1_description, comp1_imageUrl, comp1_features } = pageData;
    const { comp2_heading, comp2_description, comp2_imageUrl, comp2_serviceList } = pageData;
    const { comp3_heading, comp3_subheading, comp3_valueList } = pageData;

    return (
        <main className="bg-white">
            {/* Updated width to max-w-[84rem] */}
            <div className="container mx-auto max-w-[92rem] py-16 md:py-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* MAIN CONTENT: Col Span 2 */}
                    <div className="lg:col-span-2 space-y-24">
                        
                        {/* Component 1: Intro - Restored 2-column layout */}
                        <section>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <span className="inline-block bg-[#d90a2c]/10 text-[#d90a2c] text-xs font-bold px-4 py-2 rounded-full uppercase">
                                        {comp1_tagline}
                                    </span>
                                    <h1 
                                        className="text-4xl md:text-6xl font-bold text-black leading-tight"
                                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                                        dangerouslySetInnerHTML={createMarkup(comp1_heading)}
                                    />
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {comp1_description}
                                    </p>
                                    <div className="space-y-6 pt-2">
                                        {comp1_features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-5">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d90a2c]/10 text-[#d90a2c] flex items-center justify-center">
                                                    {index === 0 ? <FeatureIcon1 /> : <FeatureIcon2 />}
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-black">{feature.title}</h4>
                                                    <p className="text-base text-gray-600 leading-relaxed mt-1">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <img src={comp1_imageUrl} alt="Our journey" className="w-full h-auto object-cover rounded-xl shadow-md" />
                                </div>
                            </div>
                        </section>

                        {/* Component 2: Expertise - Restored 2-column layout */}
                        <section>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <h2 
                                        className="text-4xl md:text-5xl font-bold text-black leading-tight"
                                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                                        dangerouslySetInnerHTML={createMarkup(comp2_heading)}
                                    />
                                    <p className="text-lg text-gray-600 leading-relaxed">{comp2_description}</p>
                                    <img src={comp2_imageUrl} alt="Our expertise" className="w-full h-[400px] object-cover rounded-xl shadow-md" />
                                </div>
                                <div className="space-y-8 xl:pt-16">
                                    {comp2_serviceList.map((service, index) => (
                                        <div key={index}>
                                            <h3 className="text-2xl font-bold text-black uppercase" style={{ fontFamily: "'Urbanist', sans-serif" }}>{service.title}</h3>
                                            <p className="text-lg text-gray-600 leading-relaxed mt-2">{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Component 3: Values - Centered 3rd Card */}
                        <section className="bg-gray-50/70 p-10 rounded-xl text-left">
                             <div className="mb-12 text-left">
                                <h2 className="text-3xl md:text-5xl font-bold text-black" style={{ fontFamily: "'Urbanist', sans-serif" }} dangerouslySetInnerHTML={createMarkup(comp3_heading)} />
                                <p className="text-lg text-gray-600 leading-relaxed mt-4">{comp3_subheading}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Card 1 */}
                                {comp3_valueList[0] && (
                                    <ValueCard value={comp3_valueList[0]} icon={ValueIcons[0]} />
                                )}
                                {/* Card 2 */}
                                {comp3_valueList[1] && (
                                    <ValueCard value={comp3_valueList[1]} icon={ValueIcons[1]} />
                                )}
                                {/* Card 3 - Centered */}
                                {comp3_valueList[2] && (
                                    <div className="md:col-span-2 flex justify-center">
                                        <div className="w-full md:max-w-xl">
                                            <ValueCard value={comp3_valueList[2]} icon={ValueIcons[2]} />
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