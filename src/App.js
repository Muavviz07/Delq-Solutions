import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import ClientPortalPage from './pages/ClientPortalPage';
import AboutPage from './pages/AboutPage';
import MissionVisionPage from './pages/MissionVisionPage';
import OurStoryPage from './pages/OurStoryPage';
import OurTeamPage from './pages/OurTeamPage';

import SoftwareDevelopmentPage from './pages/services/SoftwareDevelopmentPage';
import WebDevelopmentPage from './pages/services/WebDevelopmentPage';
import MobileDevelopmentPage from './pages/services/MobileDevelopmentPage';
import EnterpriseSoftwarePage from './pages/services/EnterpriseSoftwarePage';
import ITConsultingPage from './pages/services/ITConsultingPage';
import DigitalTransformationPage from './pages/services/DigitalTransformationPage';
import LegacyModernizationPage from './pages/services/LegacyModernizationPage';
import SystemIntegrationPage from './pages/services/SystemIntegrationPage';
import BusinessIntelligencePage from './pages/services/BusinessIntelligencePage';
import ITStrategyPage from './pages/services/ITStrategyPage';

import AiCapabilitiesPage from './pages/services/ai/AiCapabilitiesPage'; // <-- Main AI Page
import GenerativeAiPage from './pages/services/ai/GenerativeAiPage';
import NlpPage from './pages/services/ai/NlpPage';
import ComputerVisionPage from './pages/services/ai/ComputerVisionPage';
import AiStrategyPage from './pages/services/ai/AiStrategyPage';

import DigitalTransformationSolutionPage from './pages/solutions/DigitalTransformationPage';
import EducationPage from './pages/industries/EducationPage';

import CloudServicesPage from './pages/services/CloudServicesPage';
import CloudMigrationPage from './pages/services/cloud/CloudMigrationPage';
import CloudManagementPage from './pages/services/cloud/CloudManagementPage';
import SaasDevelopmentPage from './pages/services/cloud/SaasDevelopmentPage';

import SupportMaintenancePage from './pages/services/SupportMaintenancePage';
import SoftwareSupportPage from './pages/services/support/SoftwareSupportPage';
import ApplicationSupportPage from './pages/services/support/ApplicationSupportPage';
import ItHelpdeskPage from './pages/services/support/ItHelpdeskPage';
import SystemMaintenancePage from './pages/services/support/SystemMaintenancePage';

import QualityAssurancePage from './pages/services/QualityAssurancePage';
import ManualTestingPage from './pages/services/qa/ManualTestingPage';
import AutomationTestingPage from './pages/services/qa/AutomationTestingPage';
import PerformanceTestingPage from './pages/services/qa/PerformanceTestingPage';
import SecurityTestingPage from './pages/services/qa/SecurityTestingPage';

import SolCloudMigrationPage from './pages/solutions/DigitalTransformation/SolCloudMigrationPage';
import SolAutomationPage from './pages/solutions/DigitalTransformation/SolAutomationPage';
import SolDataAnalyticsPage from './pages/solutions/DigitalTransformation/SolDataAnalyticsPage';

import CyberSecurityPage from './pages/solutions/CyberSecurityPage';
import ThreatMonitoringPage from './pages/solutions/cyber_security/ThreatMonitoringPage';
import IncidentResponsePage from './pages/solutions/cyber_security/IncidentResponsePage';
import CompliancePage from './pages/solutions/cyber_security/CompliancePage';

import EnterpriseApplicationsPage from './pages/solutions/EnterpriseApplicationsPage';
import ErpSystemsPage from './pages/solutions/enterprise/ErpSystemsPage';
import CrmSolutionsPage from './pages/solutions/enterprise/CrmSolutionsPage';
import SupplyChainPage from './pages/solutions/enterprise/SupplyChainPage';

import EmergingTechnologiesPage from './pages/solutions/EmergingTechnologiesPage';
import AiMlSolutionsPage from './pages/solutions/emerging/AiMlSolutionsPage';
import BlockchainPage from './pages/solutions/emerging/BlockchainPage';
import IotPage from './pages/solutions/emerging/IotPage';

import HealthcarePage from './pages/industries/HealthcarePage';
import RetailPage from './pages/industries/RetailPage';
import ManufacturingPage from './pages/industries/ManufacturingPage';
import LogisticsPage from './pages/industries/LogisticsPage';
import EnergyPage from './pages/industries/EnergyPage';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        const response = await fetch('/api/home-data');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFooterData(data.footerData);
      } catch (e) {
        console.error("Failed to fetch layout data:", e);
      }
    };
    fetchLayoutData();
  }, []);

  return (
    <BrowserRouter>
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(0.95); opacity: 0.5; } 70% { transform: scale(1.4); opacity: 0; } }
        .animate-pulse-slow { animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .form-input:focus ~ .form-label, .form-input:not(:placeholder-shown) ~ .form-label { transform: translateY(-1.5rem) scale(0.8); }
      `}</style>

      <div className="bg-white text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <Header onSidebarOpen={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/mission-vision" element={<MissionVisionPage />} />
          <Route path="/about/our-story" element={<OurStoryPage />} />
          <Route path="/about/our-team" element={<OurTeamPage />} />

          {/* Services - Main Pages */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Services - AI Capabilities (Updated Structure) */}
          <Route path="/services/ai-capabilities" element={<AiCapabilitiesPage />} />
          <Route path="/services/ai-capabilities/generative-ai" element={<GenerativeAiPage />} />
          <Route path="/services/ai-capabilities/nlp" element={<NlpPage />} />
          <Route path="/services/ai-capabilities/computer-vision" element={<ComputerVisionPage />} />
          <Route path="/services/ai-capabilities/ai-strategy" element={<AiStrategyPage />} />

          {/* Services - Software Development (Updated Structure) */}
          <Route path="/services/software-development" element={<SoftwareDevelopmentPage />} />
          <Route path="/services/software-development/web-development" element={<WebDevelopmentPage />} />
          <Route path="/services/software-development/mobile-development" element={<MobileDevelopmentPage />} />
          <Route path="/services/software-development/enterprise-software" element={<EnterpriseSoftwarePage />} />

          {/* Services - IT Consulting (Updated Structure) */}
          <Route path="/services/it-consulting" element={<ITConsultingPage />} />
          <Route path="/services/it-consulting/digital-transformation" element={<DigitalTransformationPage />} />
          <Route path="/services/it-consulting/legacy-modernization" element={<LegacyModernizationPage />} />
          <Route path="/services/it-consulting/system-integration" element={<SystemIntegrationPage />} />
          <Route path="/services/it-consulting/business-intelligence" element={<BusinessIntelligencePage />} />
          <Route path="/services/it-consulting/it-strategy" element={<ITStrategyPage />} />

          {/* Services - Cloud Services (Updated Structure) */}
          <Route path="/services/cloud-services" element={<CloudServicesPage />} />
          <Route path="/services/cloud-services/cloud-migration" element={<CloudMigrationPage />} />
          <Route path="/services/cloud-services/cloud-management" element={<CloudManagementPage />} />
          <Route path="/services/cloud-services/saas-development" element={<SaasDevelopmentPage />} />


          {/* Services - Support & Maintenance */}
          <Route path="/services/support-maintenance" element={<SupportMaintenancePage />} />
          <Route path="/services/support-maintenance/software-support" element={<SoftwareSupportPage />} />
          <Route path="/services/support-maintenance/application-support" element={<ApplicationSupportPage />} />
          <Route path="/services/support-maintenance/it-helpdesk" element={<ItHelpdeskPage />} />
          <Route path="/services/support-maintenance/system-maintenance" element={<SystemMaintenancePage />} />

          {/* Services - Quality Assurance */}
          <Route path="/services/quality-assurance" element={<QualityAssurancePage />} />
          <Route path="/services/quality-assurance/manual-testing" element={<ManualTestingPage />} />
          <Route path="/services/quality-assurance/automated-testing" element={<AutomationTestingPage />} />
          <Route path="/services/quality-assurance/performance-testing" element={<PerformanceTestingPage />} />
          <Route path="/services/quality-assurance/security-testing" element={<SecurityTestingPage />} />
          {/* Solutions */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/digital-transformation" element={<DigitalTransformationSolutionPage />} />
          <Route path="/solutions/digital-transformation/cloud-migration" element={<SolCloudMigrationPage />} />
          <Route path="/solutions/digital-transformation/automation-rpa" element={<SolAutomationPage />} />
          <Route path="/solutions/digital-transformation/data-analytics" element={<SolDataAnalyticsPage />} />

          {/* Solutions - Cyber Security & Subpages */}
          <Route path="/solutions/cyber-security" element={<CyberSecurityPage />} />
          <Route path="/solutions/cyber-security/threat-monitoring" element={<ThreatMonitoringPage />} />
          <Route path="/solutions/cyber-security/incident-response" element={<IncidentResponsePage />} />
          <Route path="/solutions/cyber-security/compliance" element={<CompliancePage />} />

          {/* Solutions - Enterprise Applications & Subpages */}
          <Route path="/solutions/enterprise-applications" element={<EnterpriseApplicationsPage />} />
          <Route path="/solutions/enterprise-applications/erp-systems" element={<ErpSystemsPage />} />
          <Route path="/solutions/enterprise-applications/crm-solutions" element={<CrmSolutionsPage />} />
          <Route path="/solutions/enterprise-applications/supply-chain" element={<SupplyChainPage />} />

          {/* Solutions - Emerging Technologies & Subpages */}
          <Route path="/solutions/emerging-technologies" element={<EmergingTechnologiesPage />} />
          <Route path="/solutions/emerging-technologies/ai-ml" element={<AiMlSolutionsPage />} />
          <Route path="/solutions/emerging-technologies/blockchain" element={<BlockchainPage />} />
          <Route path="/solutions/emerging-technologies/iot" element={<IotPage />} />

          {/* Industries */}

          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/education" element={<EducationPage />} />
          <Route path="/industries/healthcare" element={<HealthcarePage />} />
          <Route path="/industries/retail" element={<RetailPage />} />
          <Route path="/industries/manufacturing" element={<ManufacturingPage />} />
          <Route path="/industries/logistics" element={<LogisticsPage />} />
          <Route path="/industries/energy-utilities" element={<EnergyPage />} />

          {/* Other */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
        </Routes>

        <Footer footerData={footerData} />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}