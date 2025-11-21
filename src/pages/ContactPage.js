import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simple component for the form input fields
const FormInput = ({ name, placeholder, label, type = 'text', required = true }) => (
  <div className="relative pt-4">
    <input
      type={type}
      name={name}
      id={name}
      className="peer w-full px-0 py-2 bg-transparent border-b-2 border-white/50 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors"
      placeholder={placeholder}
      required={required}
    />
    <label
      htmlFor={name}
      className="absolute left-0 -top-0 text-white/80 text-sm transition-all duration-300 pointer-events-none
                 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70 peer-placeholder-shown:top-6
                 peer-focus:-top-0 peer-focus:text-white/80 peer-focus:text-sm"
    >
      {label || placeholder} {required && '*'}
    </label>
  </div>
);

// Checkbox component
const CheckboxInput = ({ id, label }) => (
  <div className="flex items-center">
    <input
      id={id}
      name="help_topics"
      value={id}
      type="checkbox"
      className="h-4 w-4 text-[#d90a2c] border-white/50 rounded focus:ring-[#d90a2c] focus:ring-offset-0 bg-transparent accent-black"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-white">
      {label}
    </label>
  </div>
);

export default function ContactPage() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await fetch('/api/contact-page-data');
        if (!response.ok) throw new Error(`Contact page data failed!`);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(event.target);
    const helpTopics = formData.getAll('help_topics');
    const payload = {
      name: formData.get('your-full-name'),
      email: formData.get('your-email-id'),
      mobile: formData.get('tell-us-about-you'),
      help_topics: helpTopics,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      setFormStatus('success');
      event.target.reset();
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">Loading Contact Info...</div>;
  if (error) return <div className="h-screen w-full flex items-center justify-center text-red-500">{error}</div>;
  if (!pageData) return null;

  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white pt-48 pb-24"
        style={{ backgroundImage: `url('${pageData.heroBackgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto text-center px-8 md:px-16 lg:px-24">
          <h1 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            {pageData.heading}
          </h1>
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium mt-4">
            <Link to="/" className="text-white hover:text-[#d90a2c] transition-colors">HOME</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">{pageData.heading.toUpperCase()}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto py-28 px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Info */}
          <div className="lg:pr-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 mb-3 uppercase">
              {pageData.section_tagline}
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
            >
              {pageData.section_heading_line1}{' '}
              <span className="text-[#d90a2c]">{pageData.section_heading_line2}</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              {pageData.section_description}
            </p>

            {/* Contact Info (updated layout) */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">

              {/* Mail Info */}
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-transparent text-[#d90a2c] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-black">Mail Us @</h4>
                  <a href="mailto:info@delqsolutions.com" className="text-gray-600 hover:text-[#d90a2c]">
                    info@delqsolutions.com
                  </a>
                </div>
              </div>

              {/* Divider for large screens */}
              <div className="hidden lg:block w-px h-10 bg-gray-300"></div>

              {/* Call Info */}
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-transparent text-[#d90a2c] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l1.94-1.94a1 1 0 0 1 1.06-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 6a1 1 0 0 1-1 1h3.33a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.06z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-black">Call Us</h4>
                  {/* --- UPDATED NUMBER AND LINK --- */}
                  <a href="tel:+447586955136" className="text-gray-600 hover:text-[#d90a2c]">
                    +44 7586 955136
                  </a>
                </div>
              </div>
            </div>

            {/* Image */}
            <img
              src={pageData.section_image}
              alt="Contact team"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#d90a2c] text-white p-10 md:p-16 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Urbanist', sans-serif" }}>
              {pageData.form_heading}
            </h3>
            <p className="mb-10 text-gray-200">{pageData.form_subheading}</p>

            <form onSubmit={handleFormSubmit} className="space-y-8">
              <FormInput name="your-full-name" label="Your Full Name" />
              <FormInput name="your-email-id" label="Your Email id" type="email" />
              <FormInput name="tell-us-about-you" label="Tell Us About You" required={false} />

              <fieldset className="pt-4">
                <legend className="text-lg font-semibold mb-4">How Can We Help?</legend>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {pageData.help_options.map(option => (
                    <CheckboxInput key={option.id} id={option.id} label={option.label} />
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-black text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 mt-8"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Lets Get Started'}
              </button>

              {formStatus === 'success' && (
                <p className="mt-4 text-center text-green-300">Message sent successfully!</p>
              )}
              {formStatus === 'error' && (
                <p className="mt-4 text-center text-yellow-300">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}