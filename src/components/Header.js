import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSidebarOpen }) => {
  const [activeService, setActiveService] = useState("Artificial Intelligence");
  const [activeSolution, setActiveSolution] = useState("Digital Transformation");
  const [activeIndustry, setActiveIndustry] = useState("Education");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState(null);
  const [openMegaMenu, setOpenMegaMenu] = useState(null);

  const servicesData = {
    "Artificial Intelligence": {
      href: "/services/artificial-intelligence",
      subcategories: [
        { name: "Generative AI Solutions", href: "/services/artificial-intelligence/generative-ai" },
        { name: "Natural Language Processing (NLP)", href: "/services/artificial-intelligence/nlp" },
        { name: "Computer Vision", href: "/services/artificial-intelligence/computer-vision" },
        { name: "AI Strategy & Consulting", href: "/services/artificial-intelligence/ai-strategy" },
      ],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000",
      text: "Unlock the potential of artificial intelligence to automate, innovate, and transform your business operations.",
    },
    "Software Development": {
      href: "/services/software-development",
      subcategories: [
        { name: "Web Development", href: "/services/software-development/web-development" },
        { name: "Mobile Development", href: "/services/software-development/mobile-development" },
        { name: "Enterprise Software", href: "/services/software-development/enterprise-software" },
      ],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000",
      text: "Transforms business ideas into scalable digital solutions that streamline operations and enhance customer engagement.",
    },
    "IT Consulting": {
      href: "/services/it-consulting",
      subcategories: [
        { name: "Digital Transformation", href: "/services/it-consulting/digital-transformation" },
        { name: "Legacy Modernization", href: "/services/it-consulting/legacy-modernization" },
        { name: "System Integration", href: "/services/it-consulting/system-integration" },
        { name: "Business Intelligence & Analysis", href: "/services/it-consulting/business-intelligence" },
        { name: "IT Strategy & Planning", href: "/services/it-consulting/it-strategy" },
      ],
      image: "https://images.unsplash.com/photo-1581092334641-22d6363a9a00?q=80&w=1000",
      text: "Our experts align IT strategies with your business goals, driving transformation and innovation across your enterprise.",
    },
    "Cloud Services": {
      href: "/services/cloud-services",
      subcategories: [
        { name: "Cloud Migration", href: "/services/cloud-migration" },
        { name: "Cloud Management", href: "/services/cloud-management" },
        { name: "SaaS Development", href: "/services/saas-development" },
      ],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000",
      text: "Harness the power of the cloud to scale efficiently, reduce costs, and enhance performance with our cloud services.",
    },
    "Support & Maintenance": {
      href: "/services/support-maintenance",
      subcategories: [
        { name: "Software Support and Maintenance", href: "/services/software-support" },
        { name: "Application Support", href: "/services/application-support" },
        { name: "IT Helpdesk", href: "/services/it-helpdesk" },
        { name: "System Maintenance", href: "/services/system-maintenance" },
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
      text: "We keep your systems running at peak efficiency with proactive support, maintenance, and monitoring.",
    },
    "Quality Assurance & Testing": {
      href: "/services/quality-assurance",
      subcategories: [
        { name: "Manual Testing", href: "/services/manual-testing" },
        { name: "Automation Testing", href: "/services/automated-testing" },
        { name: "Performance Testing", href: "/services/performance-testing" },
        { name: "Security Testing", href: "/services/security-testing" },
      ],
      image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1000",
      text: "Ensure flawless software performance with our robust testing and QA frameworks, tailored for your business needs.",
    },
  };

  const solutionsData = {
    "Digital Transformation": {
      href: "/solutions/digital-transformation",
      subcategories: [
        { name: "Cloud Migration", href: "/solutions/digital-transformation/cloud-migration" },
        { name: "Automation & RPA", href: "/solutions/digital-transformation/automation-rpa" },
        { name: "Data Analytics", href: "/solutions/digital-transformation/data-analytics" },
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000",
      text: "Transform your business with cutting-edge digital solutions that drive efficiency, innovation, and competitive advantage.",
    },
    "Cyber Security": {
      href: "/solutions/cyber-security",
      subcategories: [
        { name: "Threat Monitoring", href: "/solutions/cyber-security/threat-monitoring" },
        { name: "Incident Response", href: "/solutions/cyber-security/incident-response" },
        { name: "Compliance", href: "/solutions/cyber-security/compliance" },
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000",
      text: "Protect your digital assets with comprehensive cybersecurity solutions designed to safeguard your business from evolving threats.",
    },
    "Enterprise Applications": {
      href: "/solutions/enterprise-applications",
      subcategories: [
        { name: "ERP Systems", href: "/solutions/enterprise-applications/erp-systems" },
        { name: "CRM Solutions", href: "/solutions/enterprise-applications/crm-solutions" },
        { name: "Supply Chain Management", href: "/solutions/enterprise-applications/supply-chain" },
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
      text: "Streamline your business operations with integrated enterprise applications that enhance productivity and decision-making.",
    },
    "Emerging Technologies": {
      href: "/solutions/emerging-technologies",
      subcategories: [
        { name: "AI & Machine Learning", href: "/solutions/emerging-technologies/ai-ml" },
        { name: "Blockchain", href: "/solutions/emerging-technologies/blockchain" },
        { name: "Internet of Things", href: "/solutions/emerging-technologies/iot" },
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
      text: "Stay ahead of the curve with innovative technologies that unlock new possibilities and drive future growth.",
    },
  };

  const industriesData = {
    Education: {
      href: "/industries/education",
      description: [
        "Personalized edtech platforms use AI-driven analytics, interactive multimedia, and gamification to create adaptive learning paths that boost engagement and performance.",
        "Cloud-based LMS and robust data management enable seamless collaboration, remote access, scalability, and strict compliance with privacy regulations.",
      ],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
    },
    Healthcare: {
      href: "/industries/healthcare",
      description: [
        "Digital health solutions integrate electronic health records, telemedicine platforms, and AI-powered diagnostics to enhance patient care and streamline medical workflows.",
        "Secure data management and compliance with healthcare regulations ensure patient privacy while enabling real-time collaboration between healthcare providers.",
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000",
    },
    "Retail & eCommerce": {
      href: "/industries/retail",
      description: [
        "Omnichannel retail platforms provide seamless shopping experiences across online and offline channels, with integrated inventory management and customer analytics.",
        "AI-powered recommendation engines and personalized marketing automation drive customer engagement and increase conversion rates.",
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000",
    },
    Manufacturing: {
      href: "/industries/manufacturing",
      description: [
        "Smart manufacturing solutions leverage IoT sensors, predictive analytics, and automation to optimize production processes and reduce operational costs.",
        "Real-time monitoring and quality control systems ensure consistent product quality while enabling predictive maintenance and supply chain optimization.",
      ],
      image: "https://images.unsplash.com/photo-1581092334641-22d6363a9a00?q=80&w=1000",
    },
    Logistics: {
      href: "/industries/logistics",
      description: [
        "Advanced logistics management systems provide end-to-end visibility across supply chains with real-time tracking, route optimization, and automated warehousing.",
        "AI-driven demand forecasting and inventory optimization reduce costs while improving delivery times and customer satisfaction.",
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000",
    },
    "Energy & Utilities": {
      href: "/industries/energy-utilities",
      description: [
        "Smart grid technologies and renewable energy management systems optimize power distribution and integrate sustainable energy sources effectively.",
        "IoT-enabled monitoring and predictive analytics help utilities maintain infrastructure, reduce energy waste, and ensure reliable service delivery.",
      ],
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1000",
    },
  };

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about",
      dropdown: true,
      subpages: [
        { name: "Our Story", href: "/about/our-story" },
        { name: "Our Team", href: "/about/our-team" },
        { name: "Mission and Vision", href: "/about/mission-vision" },
      ],
    },
    { name: "Services", href: "/services", megaMenu: true },
    { name: "Solutions", href: "/solutions", megaMenu: true },
    { name: "Industries", href: "/industries", megaMenu: true },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-white text-black shadow-md py-4 px-4 sm:px-6 relative">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center flex-shrink-0">
          <button onClick={onSidebarOpen} className="hidden lg:block text-black mr-4 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <Link to="/">
            <img src="/DELQ-Logo.webp" alt="Delq Solutions Logo" className="h-8 md:h-10" />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-8 text-sm justify-center flex-grow">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => {
                if (link.megaMenu || link.dropdown) setOpenMegaMenu(link.name);
              }}
              onMouseLeave={() => setOpenMegaMenu(null)}
            >
              <Link
                to={link.href}
                onClick={() => setOpenMegaMenu(null)}
                className="text-black hover:text-[#d90a2c] transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-[#d90a2c] flex items-center"
              >
                {link.name}
                {(link.name === "Services" || link.name === "Solutions" || link.name === "Industries" || link.name === "About Us") && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 ml-0.5">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>

              {link.dropdown && (
                <div className={`absolute left-0 top-full w-48 bg-white border border-gray-200 shadow-lg transition-all duration-300 ease-in-out transform z-30 ${openMegaMenu === link.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
                  <div className="py-2">
                    {link.subpages.map((subpage, idx) => (
                      <Link key={idx} to={subpage.href} onClick={() => setOpenMegaMenu(null)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#d90a2c] hover:text-white transition-colors duration-200">
                        {subpage.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {link.megaMenu && (
                <div 
                  className={`fixed left-0 right-0 top-16 lg:top-[4.5rem] w-screen bg-white border-t-2 border-[#d90a2c] shadow-lg transition-all duration-500 ease-in-out transform z-40 h-auto max-h-[80vh] overflow-y-auto ${openMegaMenu === link.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-1"}`}
                >
                  <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-8 p-8">
                      <div className="col-span-4 border-r border-gray-200">
                        {link.name === "Services" ? Object.entries(servicesData).map(([service, data]) => (
                          <Link key={service} to={data.href || "#"} onMouseEnter={() => setActiveService(service)} onClick={() => setOpenMegaMenu(null)} className={`block cursor-pointer px-4 py-3 text-base font-normal mb-2 transition-all duration-300 ${activeService === service ? "bg-[#d90a2c] text-white shadow-sm" : "bg-gray-100 hover:bg-[#d90a2c] hover:text-white"}`}>
                            {service}
                          </Link>
                        )) : link.name === "Solutions" ? Object.keys(solutionsData).map((solution) => (
                          <Link key={solution} to={solutionsData[solution].href || "#"} onMouseEnter={() => setActiveSolution(solution)} onClick={() => setOpenMegaMenu(null)} className={`block cursor-pointer px-4 py-3 text-base font-normal mb-2 transition-all duration-300 ${activeSolution === solution ? "bg-[#d90a2c] text-white shadow-sm" : "bg-gray-100 hover:bg-[#d90a2c] hover:text-white"}`}>
                            {solution}
                          </Link>
                        )) : Object.entries(industriesData).map(([industry, data]) => (
                          <Link key={industry} to={data.href || "#"} onMouseEnter={() => setActiveIndustry(industry)} onClick={() => setOpenMegaMenu(null)} className={`block cursor-pointer px-4 py-3 text-base font-normal mb-2 transition-all duration-300 ${activeIndustry === industry ? "bg-[#d90a2c] text-white shadow-sm" : "bg-gray-100 hover:bg-[#d90a2c] hover:text-white"}`}>
                            {industry}
                          </Link>
                        ))}
                      </div>

                      <div className="col-span-4 flex flex-col space-y-3 transition-all duration-300 ease-in-out">
                        {link.name === "Services" ? servicesData[activeService].subcategories.map((item, idx) => (
                          <Link key={idx} to={item.href} onClick={() => setOpenMegaMenu(null)} className="block text-center font-normal bg-[#d90a2c] text-white py-3 text-base rounded-lg hover:bg-black transition-all duration-300">
                            {item.name}
                          </Link>
                        )) : link.name === "Solutions" ? solutionsData[activeSolution].subcategories.map((item, idx) => (
                          <Link key={idx} to={item.href} onClick={() => setOpenMegaMenu(null)} className="block text-center font-normal bg-[#d90a2c] text-white py-3 text-base rounded-lg hover:bg-black transition-all duration-300">
                            {item.name}
                          </Link>
                        )) : (
                          <div className="space-y-4">
                            {industriesData[activeIndustry].description.map((paragraph, idx) => (
                              <p key={idx} className="text-gray-700 text-base leading-relaxed">{paragraph}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 transition-all duration-300 ease-in-out">
                        {link.name === "Services" ? (
                          <>
                            <img src={servicesData[activeService].image} alt={activeService} className="w-full h-48 object-cover mb-3" />
                            <p className="text-gray-600 text-base">{servicesData[activeService].text}</p>
                          </>
                        ) : link.name === "Solutions" ? (
                          <>
                            <img src={solutionsData[activeSolution].image} alt={activeSolution} className="w-full h-48 object-cover mb-3" />
                            <p className="text-gray-600 text-base">{solutionsData[activeSolution].text}</p>
                          </>
                        ) : (
                          <img src={industriesData[activeIndustry].image} alt={activeIndustry} className="w-full h-48 object-cover" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6 text-sm flex-shrink-0 justify-end">
          <div className="flex items-center text-black">
            <a href="tel:+914447766611" className="font-bold hover:text-[#d90a2c] transition-colors duration-300">+91 44 4776 6611</a>
          </div>
          <Link to="/client-portal" className="text-black underline font-semibold hover:text-[#d90a2c] transition-colors duration-300">Client Portal</Link>
        </div>

        <div className="flex lg:hidden items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="block lg:hidden text-black p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
{isMenuOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-[80] animate-[fadeIn_0.25s]"
      onClick={() => {
        setIsMenuOpen(false);
        setMobilePanel(null);
      }}
    ></div>

    {/* Drawer */}
    <div
      className="fixed top-0 right-0 h-full w-[82%] max-w-[420px] blur-glass shadow-2xl z-[100]
                 animate-[drawerIn_0.28s_cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* ---------- MAIN MENU ---------- */}
      {mobilePanel === null && (
        <div className="h-full flex flex-col">

          {/* Close Button */}
          <div className="px-5 pt-6 pb-4 border-b flex justify-end">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setMobilePanel(null);
              }}
              className="text-2xl font-bold"
            >✕</button>
          </div>

          {/* Menu items */}
          <ul className="flex-1 overflow-y-auto py-3">

            {/* HOME */}
            <li className="border-b">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block px-5 py-4 text-lg"
              >
                Home
              </Link>
            </li>

            {/* ABOUT (Option C) */}
            <li className="border-b flex items-center">
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-4 text-lg flex-1"
              >
                About Us
              </Link>
              <button
                onClick={() => setMobilePanel("About")}
                className="px-5 py-4 text-xl"
              >
                ›
              </button>
            </li>

            {/* SERVICES (Option C) */}
            <li className="border-b flex items-center">
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-4 text-lg flex-1"
              >
                Services
              </Link>
              <button
                onClick={() => setMobilePanel("Services")}
                className="px-5 py-4 text-xl"
              >
                ›
              </button>
            </li>

            {/* SOLUTIONS */}
            <li className="border-b flex items-center">
              <Link
                to="/solutions"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-4 text-lg flex-1"
              >
                Solutions
              </Link>
              <button
                onClick={() => setMobilePanel("Solutions")}
                className="px-5 py-4 text-xl"
              >
                ›
              </button>
            </li>

            {/* INDUSTRIES */}
            <li className="border-b flex items-center">
              <Link
                to="/industries"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-4 text-lg flex-1"
              >
                Industries
              </Link>
              <button
                onClick={() => setMobilePanel("Industries")}
                className="px-5 py-4 text-xl"
              >
                ›
              </button>
            </li>

            {/* DIRECT PAGES */}
            <li className="border-b">
              <Link to="/careers" onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">
                Careers
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* ---------- ABOUT PANEL ---------- */}
      {mobilePanel === "About" && (
        <div className="h-full flex flex-col animate-[panelIn_0.25s_ease-out]">
          <div className="px-5 pt-6 pb-4 border-b flex items-center gap-4">
            <button onClick={() => setMobilePanel(null)} className="text-xl font-semibold">‹</button>
            <span className="font-bold text-lg">About Us</span>
          </div>

          <ul className="flex-1 overflow-y-auto py-3">
            <li className="border-b"><Link to="/about/our-story" onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">Our Story</Link></li>
            <li className="border-b"><Link to="/about/our-team" onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">Our Team</Link></li>
            <li><Link to="/about/mission-vision" onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">Mission & Vision</Link></li>
          </ul>
        </div>
      )}

      {/* ---------- SERVICES PANEL ---------- */}
      {mobilePanel === "Services" && (
        <div className="h-full flex flex-col animate-[panelIn_0.25s_ease-out]">
          <div className="px-5 pt-6 pb-4 border-b flex items-center gap-4">
            <button onClick={() => setMobilePanel(null)} className="text-xl font-semibold">‹</button>
            <span className="font-bold text-lg">Services</span>
          </div>

          <ul className="flex-1 overflow-y-auto py-3">
            {Object.keys(servicesData).map((cat) => (
              <li key={cat} className="border-b flex">
                <Link
                  to={servicesData[cat].href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-4 text-lg flex-1"
                >
                  {cat}
                </Link>
                <button
                  onClick={() => setMobilePanel(cat)}
                  className="px-5 py-4 text-xl"
                >
                  ›
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- INDIVIDUAL SERVICE CATEGORY ---------- */}
      {Object.keys(servicesData).includes(mobilePanel) && (
        <div className="h-full flex flex-col animate-[panelIn_0.25s_ease-out]">
          <div className="px-5 pt-6 pb-4 border-b flex items-center gap-4">
            <button onClick={() => setMobilePanel("Services")} className="text-xl font-semibold">‹</button>
            <span className="font-bold text-lg">{mobilePanel}</span>
          </div>

          <ul className="flex-1 overflow-y-auto py-3">
            {servicesData[mobilePanel].subcategories.map((sub) => (
              <li key={sub.name} className="border-b">
                <Link to={sub.href} onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- SOLUTIONS PANEL ---------- */}
      {mobilePanel === "Solutions" && (
        <div className="h-full flex flex-col animate-[panelIn_0.25s_ease-out]">
          <div className="px-5 pt-6 pb-4 border-b flex items-center gap-start">
            <button onClick={() => setMobilePanel(null)} className="text-xl font-semibold mr-3">‹</button>
            <span className="font-bold text-lg">Solutions</span>
          </div>

          <ul className="flex-1 overflow-y-auto py-3">
            {Object.keys(solutionsData).map((cat) => (
              <li key={cat} className="border-b flex">
                <Link
                  to={solutionsData[cat].href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-4 flex-1 text-lg"
                >
                  {cat}
                </Link>
                <button
                  onClick={() => setMobilePanel(cat)}
                  className="px-5 py-4 text-xl"
                >
                  ›
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- SOLUTION SUBCATEGORY PANEL ---------- */}
      {Object.keys(solutionsData).includes(mobilePanel) && (
        <div className="h-full flex flex-col animate-[panelIn_0.25s_ease-out]">
          <div className="px-5 pt-6 pb-4 border-b flex items-center gap-4">
            <button onClick={() => setMobilePanel("Solutions")} className="text-xl font-semibold">‹</button>
            <span className="font-bold text-lg">{mobilePanel}</span>
          </div>

          <ul className="flex-1 overflow-y-auto py-3">
            {solutionsData[mobilePanel].subcategories.map((sub) => (
              <li key={sub.name} className="border-b">
                <Link to={sub.href} onClick={() => setIsMenuOpen(false)} className="block px-5 py-4 text-lg">
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- INDUSTRIES PANEL ---------- */}
      {mobilePanel === "Industries" && (
        <div className="h-full flex flex-col animate-[panelIn_0.25s_ease-out]">
          <div className="px-5 pt-6 pb-4 border-b flex items-center gap-4">
            <button onClick={() => setMobilePanel(null)} className="text-xl font-semibold">‹</button>
            <span className="font-bold text-lg">Industries</span>
          </div>

          <ul className="flex-1 overflow-y-auto py-3">
            {Object.keys(industriesData).map((n) => (
              <li key={n} className="border-b">
                <Link
                  to={industriesData[n].href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-5 py-4 text-lg"
                >
                  {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
)}


    </header>
  );
};

export default Header;