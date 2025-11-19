import React from "react";

export default function BlogSection({ blogPosts }) {
  if (!blogPosts || blogPosts.length === 0) return null;

  return (
    <section className="bg-white py-28 px-8 md:px-16 lg:px-24">
      {/* Header */}
      <div className="container mx-auto text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-black mb-4">
          NEW TRENDING TOPICS
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1c1c1c]"
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Articles &{" "}
          <span className="text-[#d90a2c] relative inline-block">
            Blog Posts
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d90a2c] transform -translate-y-1"></span>
          </span>
        </h2>
        <p className="mt-4 text-gray-600">
          Thoughts, tips, and tech — straight from our team.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image wrapper — allows overflow for arrow button */}
            <div className="relative overflow-visible">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Arrow Button — half in / half out of the image */}
              <a
                href={post.link}
                className="absolute -bottom-6 right-6 flex items-center justify-center h-14 w-14 rounded-full bg-[#d90a2c] text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rotate-[-45deg]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0l-7-7m7 7l-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Content */}
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-black mt-4 h-20">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
