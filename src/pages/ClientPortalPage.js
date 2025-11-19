import React, { useState, useEffect } from 'react';

// Input component with floating label (Unchanged)
const FormInput = ({ name, label, type = 'text', value, onChange, required = true }) => (
    <div className="relative pt-2">
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="peer w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-[#d90a2c]"
            placeholder={label}
            required={required}
        />
        <label
            htmlFor={name}
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all duration-300 pointer-events-none
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                        peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-sm"
        >
            {label} {required && '*'}
        </label>
    </div>
);


// Main Page Component
export default function ClientPortalPage() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginStatus, setLoginStatus] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
             try {
                const response = await fetch('http://localhost:8000/api/client-portal-data');
                if (!response.ok) throw new Error(`Client Portal data failed!`);
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
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginStatus('sending');
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Login failed.');
            const result = await response.json();
            console.log("Login Response:", result);
            setLoginStatus('success');
            setTimeout(() => setLoginStatus(''), 5000);
        } catch (error) {
            console.error('Login error:', error);
            setLoginStatus('error');
            setTimeout(() => setLoginStatus(''), 5000);
        }
    };

    if (isLoading) { /* ... loading state ... */ }
    if (error) { /* ... error state ... */ }
    if (!pageData) return null;

    return (
        // --- UPDATED: Reduced top padding from pt-32 to pt-20 ---
        <main className="bg-gray-100 min-h-screen flex items-center justify-center pt-20 pb-20 px-4">

            {/* --- (Unchanged) Increased max-width max-w-lg --- */}
            <div className="w-full max-w-lg">
                <h1
                    className="text-3xl md:text-4xl font-bold text-black text-center mb-8"
                    style={{ fontFamily: "'Urbanist', sans-serif" }}
                >
                    {pageData.heading}
                </h1>

                {/* White Card (Unchanged) */}
                <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl">
                    <form onSubmit={handleLoginSubmit} className="space-y-8">
                        <FormInput
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loginStatus === 'sending'}
                                className="w-auto bg-[#d90a2c] text-white font-semibold py-3 px-8 rounded-full hover:bg-black transition-colors duration-300 disabled:opacity-50"
                            >
                                {loginStatus === 'sending' ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                        {loginStatus === 'success' && <p className="mt-4 text-center text-sm text-green-600">Login successful (placeholder)!</p>}
                        {loginStatus === 'error' && <p className="mt-4 text-center text-sm text-red-600">Login failed. Please check credentials.</p>}
                    </form>
                </div>
            </div>
        </main>
    );
}