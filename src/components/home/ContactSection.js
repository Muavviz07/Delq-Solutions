import React, { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        helpTopic: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            setStatus('success');
            setFormData({ name: '', email: '', mobile: '', helpTopic: '', message: '' });
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };
    
    // --- UPDATED FormInput Component (Colors Reverted) ---
    const FormInput = ({ name, placeholder, value, onChange, type = 'text' }) => (
        <div className="relative mb-12">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                // --- REVERTED: Back to border-white/50 ---
                className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors"
                placeholder={placeholder}
                required
            />
            {/* --- REVERTED: Back to text-white/80 --- */}
            <label htmlFor={name} className="absolute left-0 -top-6 text-white text-sm transition-all duration-300 pointer-events-none">
                {placeholder}
            </label>
        </div>
    );

    return (
        // --- UPDATED: Increased horizontal padding from px-8 to px-10 ---
        <section className="bg-[#d90a2c] py-28 px-10 text-white">
            <div className="container mx-auto">
                <p className="text-sm font-semibold tracking-[0.2em] mb-2">CONTACT US</p>
                <h2 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: "'Urbanist', sans-serif" }}>Get In Touch</h2>
                
                <form onSubmit={handleSubmit} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    <div>
                        <FormInput name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                        <FormInput name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} type="email" />
                        <FormInput name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
                    </div>
                     <div>
                        <FormInput name="helpTopic" placeholder="How Can I Help You?" value={formData.helpTopic} onChange={handleChange} />
                        <FormInput name="message" placeholder="Add Your Message" value={formData.message} onChange={handleChange} />
                    </div>
                     <div className="md:col-span-2 mt-4">
                        <button type="submit" disabled={status === 'sending'} className="bg-black text-white px-12 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50">
                            {status === 'sending' ? 'Submitting...' : 'Submit Now'}
                        </button>
                    </div>
                </form>
                {status === 'success' && <p className="mt-6 text-lg text-white font-semibold">Thank you for your message! We'll be in touch soon.</p>}
                {status === 'error' && <p className="mt-6 text-lg text-white bg-black p-4 rounded-md">Something went wrong. Please try again later.</p>}
            </div>
        </section>
    )
}