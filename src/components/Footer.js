import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ footerData }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('sending');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (!response.ok) throw new Error('Subscription failed.');
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error('Subscription error:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    if (!footerData) return (
        <footer className="bg-[#1c1c1c] text-white">
            <div className="container mx-auto pt-20 pb-10 px-6 md:px-6 lg:px-6 text-center">
                <p className="text-gray-500">Loading footer...</p>
            </div>
        </footer>
    );

    const socialIcons = {
        facebook: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
        ),
        twitter: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        ),
        linkedin: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        ),
        dribbble: (
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.337 0 .668-.018.994-.052a.75.75 0 01.14-.118l1.73-1.285c.105-.078.234-.13.37-.156a10.03 10.03 0 00-1.234-5.322c-.343-1.07-.57-2.19-.668-3.342a.75.75 0 01.328-.71l1.87-1.385a.75.75 0 01.88.01c2.14 1.39 3.54 3.6 3.82 6.06a.75.75 0 01-.375.787l-1.92 1.075a.75.75 0 01-.65.01c-1.11-.6-2.27-1.04-3.46-1.32a.75.75 0 01-.58-.33l-1.03-1.716a.75.75 0 01.12-.943c.92-.81 1.76-1.75 2.48-2.78.18-.25.04-.6-.24-.7a10.03 10.03 0 00-5.12 1.48.75.75 0 01-.84-.11l-1.57-1.57a.75.75 0 01-.11-.84 10.03 10.03 0 001.48-5.12.75.75 0 01-.7-.24C5.17 3.32 4.23 2.48 3.2 1.56a.75.75 0 01-.94.12L.54 2.71a.75.75 0 01-.33-.58C.07 13.9 0 12.95 0 12A12 12 0 0112 0a12.1 12.1 0 01.05.994c-.018.337-.035.67-.052.994z" clipRule="evenodd" /></svg>
        ),
    };

    const SmartLink = ({ href, className, children }) => {
        if (href.startsWith('/')) {
            return <Link to={href} className={className}>{children}</Link>;
        }
        return <a href={href} className={className}>{children}</a>;
    };

    return (
        <footer className="bg-black text-white py-10 px-8 md:px-20">
            {/* ✅ Increased horizontal padding ONLY for small screens */}
            <div className="container mx-auto pt-20 pb-10 px-8 sm:px-10 md:px-6 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* About Section */}
                    <div className="lg:col-span-1">
                        <Link to="/">
                            <img src="/DELQ-Logo-White-scaled-1.webp" alt="Delq Solutions Logo" className="h-10 mb-6" />
                        </Link>
                        <p className="text-[#C4C4C4] text-sm leading-relaxed">{footerData.aboutText}</p>
                    </div>

                    {/* Services */}
                    <div className="text-sm">
                        <h3 className="font-bold text-lg mb-6">Services</h3>
                        <ul className="space-y-4">
                            {footerData.servicesLinks.map(link => (
                                <li key={link.name}>
                                    <SmartLink href={link.href} className="text-[#C4C4C4] hover:text-[#d90a2c] transition-colors">
                                        {link.name}
                                    </SmartLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div className="text-sm">
                        <h3 className="font-bold text-lg mb-6">Solutions</h3>
                        <ul className="space-y-4">
                            {footerData.solutionsLinks.map(link => (
                                <li key={link.name}>
                                    <SmartLink href={link.href} className="text-[#C4C4C4] hover:text-[#d90a2c] transition-colors">
                                        {link.name}
                                    </SmartLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About & Career */}
                    <div className="text-sm">
                        <h3 className="font-bold text-lg mb-6">About Us</h3>
                        <ul className="space-y-4">
                            {footerData.aboutUsLinks.map(link => (
                                <li key={link.name}>
                                    <SmartLink href={link.href} className="text-[#C4C4C4] hover:text-[#d90a2c] transition-colors">
                                        {link.name}
                                    </SmartLink>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-4">{footerData.career.heading}</h3>
                            <p className="text-[#C4C4C4]">{footerData.career.text}</p>
                            <SmartLink href={footerData.career.href} className="text-[#C4C4C4] hover:text-[#d90a2c] underline transition-colors">
                                {footerData.career.link_text}
                            </SmartLink>
                        </div>
                    </div>

                    {/* Subscribe Us */}
                    <div className="text-sm">
                        <h3 className="font-bold text-lg mb-6">Subscribe Us</h3>
                        <form onSubmit={handleSubscribe} className="relative mb-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors pb-2"
                                required
                            />
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="absolute right-0 -top-1 h-8 w-8 rounded-full bg-[#d90a2c] text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0l-7-7m7 7l-7 7"></path></svg>
                            </button>
                        </form>
                        {status === 'success' && <p className="mt-2 text-sm text-green-400">Subscribed!</p>}
                        {status === 'error' && <p className="mt-2 text-sm text-red-400">Error.</p>}

                        <address className="not-italic text-[#C4C4C4] space-y-2 mt-6">
                            <p><a href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`} className="hover:text-[#d90a2c] transition-colors">{footerData.contact.phone}</a></p>
                            <p><a href={`mailto:${footerData.contact.info_email}`} className="hover:text-[#d90a2c] transition-colors">{footerData.contact.info_email}</a></p>
                            <p><a href={`mailto:${footerData.contact.sales_email}`} className="hover:text-[#d90a2c] transition-colors">{footerData.contact.sales_email}</a></p>
                        </address>

                        <div className="flex space-x-4 mt-6">
                            {footerData.socialMedia.map(social => (
                                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[#C4C4C4] hover:text-[#d90a2c] transition-colors">
                                    {socialIcons[social.platform.toLowerCase()] || null}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">{footerData.copyrightText}</p>
                </div>
            </div>
        </footer>
    );
};