import React, { useState, useEffect, useRef } from 'react';
import AboutSidebar from '../components/about/AboutSidebar';

// Helper functions and icons
const CheckIcon = () => ( <svg className="w-5 h-5 text-[#d90a2c] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}> <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /> </svg> );
const IconNorthEast = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" /> </svg> );
const IconSouthWest = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M15 17H7V9" /> </svg> );

const CultureItem = ({ value, isActive, onToggle }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');
    useEffect(() => { setContentHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px'); }, [isActive]);
    return (
        <div className={`rounded-lg transition-colors duration-300 ${isActive ? 'bg-[#d90a2c]' : 'bg-gray-100'}`}>
            <button onClick={onToggle} className={`w-full flex justify-between items-center p-6 text-left ${isActive ? 'text-white' : 'text-black'}`}>
                <div className="flex items-center">
                    <span className="text-5xl font-bold text-black mr-4" style={{ fontFamily: "'Urbanist', sans-serif" }}>{value.letter}</span>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "'Urbanist', sans-serif" }}>{value.title}</h3>
                </div>
                {isActive ? <IconNorthEast /> : <IconSouthWest />}
            </button>
            <div ref={contentRef} style={{ maxHeight: contentHeight }} className="overflow-hidden transition-all duration-500 ease-in-out">
                <div className="px-6 pb-8 -mt-2 pl-20">
                    <p className="text-lg text-white/90 leading-relaxed">{value.description}</p>
                </div>
            </div>
        </div>
    );
};

export default function MissionVisionPage() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCultureTab, setActiveCultureTab] = useState(2); 

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('http://localhost:8000/api/mission-vision-data');
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

    if (isLoading) return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading...</div>;
    if (error) return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
    if (!pageData) return null;

    return (
        <main className="bg-white">
            {/* Layout: max-w-[84rem] */}
            <div className="container mx-auto max-w-[92rem] py-16 md:py-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-2 space-y-24">
                        {/* Comp 1: Mission (Side by Side on XL) */}
                        <section>
                             <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                                <div className="relative h-[450px] w-full">
                                    <img src={pageData.missionImgBg} alt="Mission background" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                                    <img src={pageData.missionImgOverlap} alt="Our mission" className="absolute w-2/3 h-auto -bottom-10 -right-6 object-cover rounded-2xl shadow-md border-8 border-white" />
                                </div>
                                <div className="mt-10 xl:mt-0 xl:pl-6">
                                    <h2 className="text-4xl md:text-5xl font-bold text-black" style={{ fontFamily: "'Urbanist', sans-serif" }}>{pageData.missionHeading}</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed my-6">{pageData.missionDescription}</p>
                                    <ul className="space-y-4">
                                        {pageData.missionFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center"><CheckIcon /><span className="text-lg font-semibold text-gray-700">{feature}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Comp 2: Vision (Side by Side on XL) */}
                        <section>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                                <div className="xl:pr-6">
                                    <h2 className="text-4xl md:text-5xl font-bold text-black" style={{ fontFamily: "'Urbanist', sans-serif" }}>{pageData.visionHeading}</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed my-6">{pageData.visionDescription}</p>
                                    <ul className="space-y-4">
                                        {pageData.visionFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center"><CheckIcon /><span className="text-lg font-semibold text-gray-700">{feature}</span></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="relative h-[450px] w-full mt-10 xl:mt-0 order-first xl:order-last">
                                    <img src={pageData.visionImgBg} alt="Vision background" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                                    <img src={pageData.visionImgOverlap} alt="Our vision" className="absolute w-2/3 h-auto -bottom-10 -left-6 object-cover rounded-2xl shadow-md border-8 border-white" />
                                </div>
                            </div>
                        </section>

                        {/* Comp 3: Culture (STACKED Vertically) */}
                        <section className="text-left">
                             <div className="mb-12 text-left">
                                <h2 className="text-4xl md:text-5xl font-bold text-black" style={{ fontFamily: "'Urbanist', sans-serif" }}>{pageData.cultureHeading}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mt-4">{pageData.cultureDescription}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-12">
                                <div><img src={pageData.cultureImg} alt="Our culture" className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg" /></div>
                                <div className="space-y-5">
                                    {pageData.cultureValues.map((value, index) => (
                                        <CultureItem key={value.letter} value={value} isActive={activeCultureTab === index} onToggle={() => setActiveCultureTab(activeCultureTab === index ? null : index)} />
                                    ))}
                                </div>
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