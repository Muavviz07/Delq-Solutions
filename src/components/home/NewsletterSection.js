import React, { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

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
            setTimeout(() => setStatus(''), 5000); // Reset status after 5s

        } catch (error) {
            console.error('Subscription error:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000); // Reset status after 5s
        }
    };

    return (
        // Using bg-gray-50 for a light background as seen in the image
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side: Text Content */}
                    <div>
                        <p className="text-sm font-semibold tracking-[0.2em] text-black mb-3">
                            STAY IN TOUCH!
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-black leading-tight" // <-- MODIFIED: Reduced font size
                            style={{ fontFamily: "'Urbanist', sans-serif" }}
                        >
                            Get Yourself Enriched,
                            <br />
                            Always <span className="text-[#d90a2c]">STAY AHEAD!</span>
                        </h2>
                    </div>

                    {/* Right Side: Email Form */}
                    <div>
                        <form onSubmit={handleSubscribe} className="relative flex items-center">
                            <input
                                type="email"
                                name="email"
                                id="newsletter_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-300 text-black placeholder-gray-500
                                           py-4 pr-32 focus:outline-none focus:border-[#d90a2c] transition-colors"
                                placeholder="Email Address"
                                required
                                disabled={status === 'sending'}
                            />
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="absolute right-0 w-24 h-24 bg-[#d90a2c] text-white text-sm font-semibold
                                           rounded-full flex items-center justify-center
                                           hover:bg-black transition-all duration-300
                                           disabled:opacity-70"
                            >
                                {status === 'sending' ? (
                                    // Simple spinner
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Send'}
                            </button>
                        </form>
                        {status === 'success' && (
                            <p className="mt-3 text-sm text-green-600">
                                Thank you for subscribing!
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="mt-3 text-sm text-red-600">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}