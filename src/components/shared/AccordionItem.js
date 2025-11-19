import React, { useState, useRef, useEffect } from 'react';

// Single accordion item styled to spec
export default function AccordionItem({ item, index, activeIndex, onToggle }) {
    const isActive = index === activeIndex;
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        // Recalculate height whenever isActive changes
        if (contentRef.current) {
            setContentHeight(isActive ? contentRef.current.scrollHeight : 0);
        }
    }, [isActive]); // Dependency ensures recalculation on state change

    // Inactive: bottom-left arrow (Original Icon)
    const InactiveIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-black" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M15 17H7V9" />
        </svg>
    );

    // Active: top-right arrow (Original Icon)
    const ActiveIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-[#d90a2c]" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
    );

    return (
        <div className="border-b border-gray-200">
            <button
                type="button"
                className="relative w-full flex items-center justify-between py-6 pr-10 text-left"
                onClick={() => onToggle(index)}
                aria-expanded={isActive}
            >
                <div className="flex items-center">
                    <span className={`text-lg font-bold mr-3 ${isActive ? 'text-[#d90a2c]' : 'text-black'}`}>{item.number}.</span>
                    <h3 className={`text-lg font-bold ${isActive ? 'text-[#d90a2c]' : 'text-black'}`}>{item.title}</h3>
                </div>
                <span className="absolute right-0 top-1/2 -translate-y-1/2">
                    {isActive ? <ActiveIcon /> : <InactiveIcon />}
                </span>
            </button>
            <div style={{ height: contentHeight, transition: 'height 300ms ease-out' }} className="overflow-hidden">
                 {/* --- MODIFIED: Reduced bottom padding from pb-6 to pb-4 --- */}
                <div ref={contentRef} className={`pb-4 pl-10 pr-6 lg:w-3/4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {/* --- MODIFIED: Changed text-gray-600 to text-black --- */}
                    <p className="text-black leading-relaxed text-sm">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

// Wrapper to manage state for a list of items
export function AccordionWrapper({ items, defaultIndex = null }) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const handleToggle = (idx) => setActiveIndex(activeIndex === idx ? null : idx);
    return (
        <div className="w-full">
            {(items || []).map((item, idx) => (
                <AccordionItem key={idx} item={item} index={idx} activeIndex={activeIndex} onToggle={handleToggle} />)
            )}
        </div>
    );
}

