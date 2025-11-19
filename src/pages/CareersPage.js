import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simple component for form input fields
const FormInput = ({ name, placeholder, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="sr-only">{placeholder}</label>
    <input
      type={type}
      name={name}
      id={name}
      className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#d90a2c]"
      placeholder={placeholder}
      required
    />
  </div>
);

// --- JobItem Component ---
const JobItem = ({ job, isActive, onActivate }) => (
  <div
    onMouseEnter={onActivate}
    // Preserved layout fixes from previous step
    className={`group cursor-pointer shadow-lg rounded-lg p-6 md:px-8 md:py-9 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-0 transition-all duration-300 
      ${isActive ? 'bg-[#d90a2c]' : 'bg-white hover:bg-[#d90a2c]'}
    `}
  >
    {/* Job Info */}
    <div className="w-full md:w-auto">
      <h3
        className={`text-xl font-bold transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-black group-hover:text-white'
        }`}
      >
        {job.title}
      </h3>
      <p
        className={`text-base mt-1 transition-colors duration-300 ${
          isActive ? 'text-gray-200' : 'text-gray-600 group-hover:text-gray-200'
        }`}
      >
        {job.location} - {job.job_type}
      </p>
    </div>

    {/* Buttons / Icons */}
    <div className="mt-2 md:mt-0">
      {isActive ? (
        <Link
          to={job.link}
          // UPDATED: Added 'hover:bg-white hover:text-black'
          className="border border-white text-white text-sm font-semibold py-2.5 px-6 rounded-full bg-transparent transition-all duration-300 inline-block hover:bg-white hover:text-black"
        >
          Read More
        </Link>
      ) : (
        <Link
          to={job.link}
          className="bg-[#d90a2c] text-white w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 transform group-hover:rotate-12 group-hover:scale-110"
        >
          {/* Correct top-right arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 -rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      )}
    </div>
  </div>
);
// --- END JobItem ---

// Main Component
export default function CareersPage() {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/careers-data');
        if (!response.ok) throw new Error(`Careers data failed!`);
        const data = await response.json();
        setPageData(data);

        // Set first job as active by default
        if (data.jobs && data.jobs.length > 0) {
          setActiveJob(data.jobs[0].title);
        }
      } catch (e) {
        setError(e.message);
        console.error('Failed to fetch page data:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center text-2xl font-bold">
        Loading Careers...
      </div>
    );
  if (error)
    return (
      <div className="h-screen w-full flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!pageData) return null;

  return (
    <main className="bg-gray-50">

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white pt-48 pb-24"
        style={{ backgroundImage: `url('${pageData.heroBackgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto text-center px-8 md:px-16 lg:px-24">
          <h1
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {pageData.heading}
          </h1>
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium mt-4">
            <Link
              to="/"
              className="text-white hover:text-[#d90a2c] transition-colors"
            >
              HOME
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">
              {pageData.heading.toUpperCase()}
            </span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="container mx-auto py-20 px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 mb-3">
              EXPLORE OUR OPEN POSITIONS
            </p>
            <h2
              className="text-5xl md:text-6xl font-bold text-black leading-tight"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
            >
              Discover Your <br />
              <span className="text-[#d90a2c]">Dream</span> Career
            </h2>
          </div>
          <div className="pl-4 border-l-4 border-[#d90a2c]">
            <p className="text-gray-600 italic">"{pageData.description}"</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto pb-28 px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {pageData.jobs.map((job) => (
              <JobItem
                key={job.title}
                job={job}
                isActive={activeJob === job.title}
                onActivate={() => setActiveJob(job.title)} // Hover permanently sets active
              />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-8 sticky top-32">
              <h3
                className="text-xl font-bold text-black mb-6"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {pageData.sidebar_heading}
              </h3>
              <img
                src={pageData.sidebar_image}
                alt="Opening Positions"
                className="w-full h-48 object-cover rounded-lg mb-8"
              />

              <h3
                className="text-xl font-bold text-black mb-6"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                Have Queries ?
              </h3>
              <form className="space-y-6">
                <FormInput name="name" placeholder="Your Name" />
                <FormInput name="email" placeholder="Your Email" type="email" />
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#d90a2c]"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#d90a2c] text-white font-semibold py-3 rounded-lg hover:bg-black transition-colors duration-300"
                >
                  Send Queries
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}