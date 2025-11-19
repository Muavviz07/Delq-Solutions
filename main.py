from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union
from app_data import DB  # <-- IMPORT THE DB FROM YOUR NEW FILE

app = FastAPI()

from fastapi.staticfiles import StaticFiles

app.mount("/imgs", StaticFiles(directory="imgs"), name="imgs")


# --- CORS Middleware ---
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Pydantic Models (Data Structures) ---

# --- REUSABLE GENERIC MODELS ---
class AccordionItem(BaseModel):
    number: int
    title: str
    description: str

class BreadcrumbItem(BaseModel):
    name: str
    href: str

class ContentBlock(BaseModel):
    type: str  # e.g., 'heading', 'paragraph', 'image', 'list', 'accordion_section', 'image_list'
    content: Optional[str] = None
    image_url: Optional[str] = None
    alt_text: Optional[str] = None
    items: Optional[List[str]] = None # For simple lists
    image_list_items: Optional[List[str]] = None # Kept separate for clarity in image_list
    heading: Optional[str] = None # For accordion_section
    subheading: Optional[str] = None # For accordion_section
    accordion_items: Optional[List[AccordionItem]] = None

# --- NEW GENERIC SERVICE PAGE MODEL ---
class GenericServicePageData(BaseModel):
    heroBackgroundImage: str
    heading: str
    breadcrumbs: List[BreadcrumbItem]
    content_blocks: List[ContentBlock]

class IndustrySidebarLink(BaseModel):
    name: str
    href: str

# --- Homepage Specific Models ---
class SliderItem(BaseModel):
    bgImage: str
    tagline: str
    headline: str
    description: str
    primaryBtnText: str | None = None
    primaryBtnLink: str | None = None
    secondaryBtnText: str | None = None
    secondaryBtnLink: str | None = None

class DetailedServiceItem(BaseModel):
    title: str
    number: str
    description: str
    bgImage: str

class ITSolutionItem(BaseModel):
    title: str
    image: str
    description: str
    link: str | None = None

class IndustryItem(BaseModel):
    name: str
    href: str
    thumbnail: str
    mainImage: str
    subtitle: str
    heading: str
    subheading: str
    description: str

class IndustriesData(BaseModel):
    top_level_heading: str
    industries: List[IndustryItem]

class BlogPostItem(BaseModel):
    image: str
    title: str
    link: str

# Shared Models (used across pages)
class ActionCallSectionData(BaseModel):
    tagline: str
    heading: str
    subheading: str
    backgroundImage: str
    
class FooterLink(BaseModel):
    name: str
    href: str

class FooterContact(BaseModel):
    phone: str
    info_email: str
    sales_email: str

class SocialMediaLink(BaseModel):
    platform: str
    url: str

class FooterCareer(BaseModel):
    heading: str
    text: str
    link_text: str
    href: str

class FooterData(BaseModel):
    aboutText: str
    servicesLinks: List[FooterLink]
    solutionsLinks: List[FooterLink]
    aboutUsLinks: List[FooterLink]
    career: FooterCareer
    contact: FooterContact
    copyrightText: str
    socialMedia: List[SocialMediaLink]

# Aggregate Model for Homepage Data
class HomePageData(BaseModel):
    sliderData: List[SliderItem]
    detailedServices: List[DetailedServiceItem]
    itSolutionsData: List[ITSolutionItem]
    industriesData: IndustriesData
    actionCallSectionData: ActionCallSectionData
    blogPosts: List[BlogPostItem]
    footerData: FooterData

# Form Submission Models
class ContactFormPayload(BaseModel):
    name: str
    email: str
    mobile: Optional[str] = None 
    helpTopic: Optional[str] = None
    help_topics: Optional[List[str]] = None
    message: Optional[str] = None 

class NewsletterSubscription(BaseModel):
    email: str

# Services Page Models
class ServicePageItem(BaseModel):
    title: str
    description: str
    icon: str
    
class ServicePageData(BaseModel):
    heading: str
    tagline: str
    heroBackgroundImage: str
    services: List[ServicePageItem]
    actionCallSectionData: ActionCallSectionData

# Solutions Page Models
class SolutionPageData(BaseModel):
    heading: str
    heroBackgroundImage: str

# Industries Page Model
class IndustryPageData(BaseModel):
    heading: str
    heroBackgroundImage: str

# Careers Page Models
class CareerItem(BaseModel):
    title: str
    location: str
    job_type: str
    link: str

class CareersPageData(BaseModel):
    heading: str 
    heroBackgroundImage: str 
    description: str
    sidebar_heading: str
    sidebar_image: str
    jobs: List[CareerItem]

# Contact Page Models
class ContactInfoItem(BaseModel):
    label: str
    icon: str 
    value: str
    href: Optional[str] = None

class ContactHelpOption(BaseModel):
    label: str
    id: str 

class ContactPageData(BaseModel):
    heading: str
    heroBackgroundImage: str
    section_tagline: str
    section_heading_line1: str
    section_heading_line2: str
    section_description: str
    contact_info: List[ContactInfoItem]
    section_image: str
    form_heading: str
    form_subheading: str
    help_options: List[ContactHelpOption]

# Client Portal Page Model
class ClientPortalPageData(BaseModel):
    heading: str

# Login Payload Model
class LoginPayload(BaseModel):
    email: str
    password: str

class CoreValueItem(BaseModel):
    letter: str
    title: str
    description: str

class AboutPageData(BaseModel):
    heading: str
    heroBackgroundImage: str
    core_values_image: str
    core_values: List[CoreValueItem]

# --- (Find and replace this Pydantic model) ---
class CultureValue(BaseModel):
    letter: str
    title: str
    description: str

class MissionVisionPageData(BaseModel):
    missionHeading: str
    missionDescription: str
    missionFeatures: List[str]
    missionImgBg: str
    missionImgOverlap: str
    visionHeading: str
    visionDescription: str
    visionFeatures: List[str]
    visionImgBg: str
    visionImgOverlap: str
    cultureHeading: str
    cultureDescription: str
    cultureImg: str
    cultureValues: List[CultureValue]

# --- (Add these with your other Pydantic models) ---
class OurStoryFeature(BaseModel):
    title: str
    description: str

class OurStoryService(BaseModel):
    title: str
    description: str

class OurStoryValue(BaseModel):
    number: str
    title: str
    description: str

class OurStoryPageData(BaseModel):
    comp1_tagline: str
    comp1_heading: str
    comp1_description: str
    comp1_imageUrl: str
    comp1_features: List[OurStoryFeature]
    comp2_heading: str
    comp2_description: str
    comp2_imageUrl: str
    comp2_serviceList: List[OurStoryService]
    comp3_heading: str
    comp3_subheading: str
    comp3_valueList: List[OurStoryValue]

# --- (Add these with your other Pydantic models) ---
class TeamBenefit(BaseModel):
    title: str
    description: str

class TeamPlaybookItem(BaseModel):
    number: str
    title: str
    description: str

class OurTeamPageData(BaseModel):
    comp1_heading: str
    comp1_subheading: str
    comp1_desc_p1: str
    comp1_desc_p2: str
    comp2_tagline: str
    comp2_heading: str
    comp2_benefits: List[TeamBenefit]
    comp3_heading: str
    comp3_subheading: str
    comp3_img1_url: str
    comp3_img2_url: str
    comp3_playbook: List[TeamPlaybookItem]

# --- API Endpoints ---
# @app.get("/")
# def read_root():
#     """Root endpoint for basic API health check."""
#     return {"message": "DELQ Solutions API is running!"}


@app.get("/api/home-data", response_model=HomePageData)
def get_home_page_data():
    """Returns all dynamic data needed for the Homepage."""
    print("--- SERVER LOG: /api/home-data endpoint was hit. ---")
    try:
        return HomePageData(**DB)
    except Exception as e:
        print(f"--- SERVER LOG: ERROR validating HomePageData: {e} ---")
        raise


@app.get("/api/services-data", response_model=ServicePageData)
def get_service_page_data():
    """Returns all dynamic data needed for the Services page."""
    print("--- SERVER LOG: /api/services-data endpoint was hit. ---")
    return DB["servicePageData"]


@app.get("/api/solutions-data", response_model=SolutionPageData)
def get_solution_page_data():
    """Returns all dynamic data needed for the Solutions page."""
    print("--- SERVER LOG: /api/solutions-data endpoint was hit. ---")
    return DB["solutionPageData"]


@app.get("/api/industries-data", response_model=IndustryPageData)
def get_industry_page_data():
    """Returns all dynamic data needed for the Industries page."""
    print("--- SERVER LOG: /api/industries-data endpoint was hit. ---")
    return DB["industryPageData"]


@app.get("/api/careers-data", response_model=CareersPageData)
def get_careers_page_data():
    """Returns all dynamic data needed for the Careers page."""
    print("--- SERVER LOG: /api/careers-data endpoint was hit. ---")
    return DB["careersPageData"]


@app.get("/api/contact-page-data", response_model=ContactPageData)
def get_contact_page_data():
    """Returns all dynamic data needed for the Contact page content."""
    print("--- SERVER LOG: /api/contact-page-data endpoint was hit. ---")
    return DB["contactPageData"]


@app.get("/api/client-portal-data", response_model=ClientPortalPageData)
def get_client_portal_page_data():
    """Returns data needed for the Client Portal page."""
    print("--- SERVER LOG: /api/client-portal-data endpoint was hit. ---")
    return DB["clientPortalPageData"]


@app.post("/api/contact")
async def handle_contact_form(payload: ContactFormPayload):
    """Receives contact form submissions."""
    print("--- New Contact Form Submission ---")
    # ... (contact form logic) ...
    return {"message": "Form submitted successfully!"}

@app.post("/api/subscribe")
async def handle_subscription(payload: NewsletterSubscription):
    """Receives newsletter subscription email."""
    print(f"--- New Subscription: {payload.email} ---")
    return {"message": "Subscription successful!"}

@app.post("/api/login")
async def handle_login(payload: LoginPayload):
    """Handles client login attempts."""
    print("--- Client Login Attempt ---")
    # ... (login logic) ...
    if payload.email == "test@example.com" and payload.password == "password":
         print("--- Login Successful (Placeholder) ---")
         return {"message": "Login successful!", "status": "success"} 
    else:
        print("--- Login Failed (Placeholder) ---")
        return {"message": "Invalid credentials.", "status": "error"} 


@app.get("/api/about-data", response_model=AboutPageData)
def get_about_page_data():
    """Returns data needed for the About Us page."""
    print("--- SERVER LOG: /api/about-data endpoint was hit. ---")
    return DB["aboutPageData"]


# --- NEW GENERIC ENDPOINTS FOR SERVICE PAGES ---

@app.get("/api/services/software-development-data", response_model=GenericServicePageData)
def get_software_development_overview_data():
    """Returns data for the Software Development overview service page."""
    print("--- SERVER LOG: /api/services/software-development-data endpoint was hit. ---")
    return DB["softwareDevelopmentOverviewData"]

@app.get("/api/services/web-development-data", response_model=GenericServicePageData)
def get_web_development_page_data():
    """Returns data for the Web Development service page."""
    print("--- SERVER LOG: /api/services/web-development-data endpoint was hit. ---")
    return DB["webDevelopmentPageData"]

@app.get("/api/services/mobile-development-data", response_model=GenericServicePageData)
def get_mobile_development_page_data():
    """Returns data for the Mobile Development service page."""
    print("--- SERVER LOG: /api/services/mobile-development-data endpoint was hit. ---")
    return DB["mobileDevelopmentPageData"]

@app.get("/api/services/enterprise-software-data", response_model=GenericServicePageData)
def get_enterprise_software_page_data():
    """Returns data for the Enterprise Software service page."""
    print("--- SERVER LOG: /api/services/enterprise-software-data endpoint was hit. ---")
    return DB["enterpriseSoftwarePageData"]

@app.get("/api/services/it-consulting-data", response_model=GenericServicePageData)
def get_it_consulting_page_data():
    """Returns data for the IT Consulting service page."""
    print("--- SERVER LOG: /api/services/it-consulting-data endpoint was hit. ---")
    return DB["itConsultingPageData"]

# --- NEW: ENDPOINT FOR DIGITAL TRANSFORMATION ---
@app.get("/api/services/digital-transformation-data", response_model=GenericServicePageData)
def get_digital_transformation_page_data():
    """Returns data for the Digital Transformation service page."""
    print("--- SERVER LOG: /api/services/digital-transformation-data endpoint was hit. ---")
    return DB["digitalTransformationPageData"]
# --- END OF NEW ENDPOINT ---

# --- NEW: ENDPOINT FOR LEGACY MODERNIZATION ---
@app.get("/api/services/legacy-modernization-data", response_model=GenericServicePageData)
def get_legacy_modernization_page_data():
    """Returns data for the Legacy Modernization service page."""
    print("--- SERVER LOG: /api/services/legacy-modernization-data endpoint was hit. ---")
    return DB["legacyModernizationPageData"]
# --- END OF NEW ENDPOINT ---

# --- NEW: ENDPOINT FOR SYSTEM INTEGRATION ---
@app.get("/api/services/system-integration-data", response_model=GenericServicePageData)
def get_system_integration_page_data():
    """Returns data for the System Integration service page."""
    print("--- SERVER LOG: /api/services/system-integration-data endpoint was hit. ---")
    return DB["systemIntegrationPageData"]

# --- NEW: ENDPOINT FOR BUSINESS INTELLIGENCE ---
@app.get("/api/services/business-intelligence-data", response_model=GenericServicePageData)
def get_business_intelligence_page_data():
    """Returns data for the Business Intelligence & Analysis service page."""
    print("--- SERVER LOG: /api/services/business-intelligence-data endpoint was hit. ---")
    return DB["businessIntelligencePageData"]
# --- END OF NEW ENDPOINT ---

# --- NEW: ENDPOINT FOR IT STRATEGY ---
@app.get("/api/services/it-strategy-data", response_model=GenericServicePageData)
def get_it_strategy_page_data():
    """Returns data for the IT Strategy and Planning service page."""
    print("--- SERVER LOG: /api/services/it-strategy-data endpoint was hit. ---")
    return DB["itStrategyPageData"]
# --- END OF NEW ENDPOINT ---

@app.get("/api/solutions/digital-transformation-data", response_model=GenericServicePageData) # Using GenericServicePageData model as structure is similar
def get_digital_transformation_solution_page_data():
    """Returns data for the Digital Transformation solution page."""
    print("--- SERVER LOG: /api/solutions/digital-transformation-data endpoint was hit. ---")
    # NOTE: You might create a GenericSolutionPageData model later if structure diverges
    return DB["digitalTransformationSolutionPageData"]

@app.get("/api/industries-sidebar-data", response_model=List[IndustrySidebarLink])
def get_industries_sidebar_data():
    """Returns data for the Industries page sidebar."""
    print("--- SERVER LOG: /api/industries-sidebar-data endpoint was hit. ---")
    return DB["industriesSidebarData"]
# --- END OF NEW ENDPOINT ---

# --- NEW: ENDPOINT FOR EDUCATION PAGE ---
@app.get("/api/industries/education-data", response_model=GenericServicePageData) # Reusing model
def get_education_page_data():
    """Returns data for the Education industry page."""
    print("--- SERVER LOG: /api/industries/education-data endpoint was hit. ---")
    return DB["educationPageData"]
# --- END OF NEW ENDPOINT ---
# --- (Add this with your other API endpoints) ---
@app.get("/api/mission-vision-data", response_model=MissionVisionPageData)
def get_mission_vision_page_data():
    """Returns data needed for the Mission & Vision page."""
    print("--- SERVER LOG: /api/mission-vision-data endpoint was hit. ---")
    return DB["missionVisionPageData"]

# --- (Add this with your other API endpoints) ---
@app.get("/api/our-story-data", response_model=OurStoryPageData)
def get_our_story_page_data():
    """Returns data needed for the Our Story page."""
    print("--- SERVER LOG: /api/our-story-data endpoint was hit. ---")
    return DB["ourStoryPageData"]

# --- (Add this with your other API endpoints) ---
@app.get("/api/our-team-data", response_model=OurTeamPageData)
def get_our_team_page_data():
    """Returns data needed for the Our Team page."""
    print("--- SERVER LOG: /api/our-team-data endpoint was hit. ---")
    return DB["ourTeamPageData"]

@app.get("/api/services/ai-capabilities-data", response_model=GenericServicePageData)
def get_ai_capabilities_page_data():
    print("--- SERVER LOG: /api/services/ai-capabilities-data endpoint was hit. ---")
    return DB["aiCapabilitiesPageData"]

@app.get("/api/services/ai/generative-ai-data", response_model=GenericServicePageData)
def get_gen_ai_page_data():
    print("--- SERVER LOG: /api/services/ai/generative-ai-data endpoint was hit. ---")
    return DB["generativeAiPageData"]

@app.get("/api/services/ai/nlp-data", response_model=GenericServicePageData)
def get_nlp_page_data():
    print("--- SERVER LOG: /api/services/ai/nlp-data endpoint was hit. ---")
    return DB["nlpPageData"]

@app.get("/api/services/ai/computer-vision-data", response_model=GenericServicePageData)
def get_computer_vision_page_data():
    print("--- SERVER LOG: /api/services/ai/computer-vision-data endpoint was hit. ---")
    return DB["computerVisionPageData"]

@app.get("/api/services/ai/ai-strategy-data", response_model=GenericServicePageData)
def get_ai_strategy_page_data():
    print("--- SERVER LOG: /api/services/ai/ai-strategy-data endpoint was hit. ---")
    return DB["aiStrategyPageData"]


@app.get("/api/services/cloud-services-data", response_model=GenericServicePageData)
def get_cloud_services_page_data():
    return DB["cloudServicesPageData"]

@app.get("/api/services/cloud/migration-data", response_model=GenericServicePageData)
def get_cloud_migration_page_data():
    return DB["cloudMigrationPageData"]

@app.get("/api/services/cloud/management-data", response_model=GenericServicePageData)
def get_cloud_management_page_data():
    return DB["cloudManagementPageData"]

@app.get("/api/services/cloud/saas-data", response_model=GenericServicePageData)
def get_saas_dev_page_data():
    return DB["saasDevelopmentPageData"]


@app.get("/api/services/support-maintenance-data", response_model=GenericServicePageData)
def get_support_maintenance_page_data():
    return DB["supportMaintenancePageData"]

@app.get("/api/services/support/software-support-data", response_model=GenericServicePageData)
def get_software_support_page_data():
    return DB["softwareSupportPageData"]

@app.get("/api/services/support/application-support-data", response_model=GenericServicePageData)
def get_application_support_page_data():
    return DB["applicationSupportPageData"]

@app.get("/api/services/support/it-helpdesk-data", response_model=GenericServicePageData)
def get_it_helpdesk_page_data():
    return DB["itHelpdeskPageData"]

@app.get("/api/services/support/system-maintenance-data", response_model=GenericServicePageData)
def get_system_maintenance_page_data():
    return DB["systemMaintenancePageData"]

# --- QUALITY ASSURANCE ENDPOINTS ---
@app.get("/api/services/quality-assurance-data", response_model=GenericServicePageData)
def get_quality_assurance_page_data():
    return DB["qualityAssurancePageData"]

@app.get("/api/services/qa/manual-testing-data", response_model=GenericServicePageData)
def get_manual_testing_page_data():
    return DB["manualTestingPageData"]

@app.get("/api/services/qa/automated-testing-data", response_model=GenericServicePageData)
def get_automation_testing_page_data():
    return DB["automationTestingPageData"]

@app.get("/api/services/qa/performance-testing-data", response_model=GenericServicePageData)
def get_performance_testing_page_data():
    return DB["performanceTestingPageData"]

@app.get("/api/services/qa/security-testing-data", response_model=GenericServicePageData)
def get_security_testing_page_data():
    return DB["securityTestingPageData"]

# --- DIGITAL TRANSFORMATION SUBPAGES ---
@app.get("/api/solutions/cloud-migration-data", response_model=GenericServicePageData)
def get_sol_cloud_migration_data():
    return DB["solCloudMigrationPageData"]

@app.get("/api/solutions/automation-rpa-data", response_model=GenericServicePageData)
def get_sol_automation_data():
    return DB["solAutomationPageData"]

@app.get("/api/solutions/data-analytics-data", response_model=GenericServicePageData)
def get_sol_analytics_data():
    return DB["solDataAnalyticsPageData"]

# --- CYBER SECURITY ---
@app.get("/api/solutions/cyber-security-data", response_model=GenericServicePageData)
def get_cyber_security_data():
    return DB["cyberSecurityPageData"]

@app.get("/api/solutions/threat-monitoring-data", response_model=GenericServicePageData)
def get_threat_monitoring_data():
    return DB["threatMonitoringPageData"]

@app.get("/api/solutions/incident-response-data", response_model=GenericServicePageData)
def get_incident_response_data():
    return DB["incidentResponsePageData"]

@app.get("/api/solutions/compliance-data", response_model=GenericServicePageData)
def get_compliance_data():
    return DB["compliancePageData"]

# --- ENTERPRISE APPS ---
@app.get("/api/solutions/enterprise-applications-data", response_model=GenericServicePageData)
def get_enterprise_apps_data():
    return DB["enterpriseAppsPageData"]

@app.get("/api/solutions/erp-systems-data", response_model=GenericServicePageData)
def get_erp_systems_data():
    return DB["erpSystemsPageData"]

@app.get("/api/solutions/crm-solutions-data", response_model=GenericServicePageData)
def get_crm_solutions_data():
    return DB["crmSolutionsPageData"]

@app.get("/api/solutions/supply-chain-data", response_model=GenericServicePageData)
def get_supply_chain_data():
    return DB["supplyChainPageData"]

# --- EMERGING TECH ---
@app.get("/api/solutions/emerging-technologies-data", response_model=GenericServicePageData)
def get_emerging_tech_data():
    return DB["emergingTechPageData"]

@app.get("/api/solutions/ai-ml-data", response_model=GenericServicePageData)
def get_ai_ml_data():
    return DB["aiMlSolutionsPageData"]

@app.get("/api/solutions/blockchain-data", response_model=GenericServicePageData)
def get_blockchain_data():
    return DB["blockchainPageData"]

@app.get("/api/solutions/iot-data", response_model=GenericServicePageData)
def get_iot_data():
    return DB["iotPageData"]



# --- INDUSTRY ENDPOINTS ---
@app.get("/api/industries/healthcare-data", response_model=GenericServicePageData)
def get_healthcare_data():
    return DB["healthcarePageData"]

@app.get("/api/industries/retail-data", response_model=GenericServicePageData)
def get_retail_data():
    return DB["retailPageData"]

@app.get("/api/industries/manufacturing-data", response_model=GenericServicePageData)
def get_manufacturing_data():
    return DB["manufacturingPageData"]

@app.get("/api/industries/logistics-data", response_model=GenericServicePageData)
def get_logistics_data():
    return DB["logisticsPageData"]

@app.get("/api/industries/energy-data", response_model=GenericServicePageData)
def get_energy_data():
    return DB["energyPageData"]


import os

# ============================================
# SERVE REACT FRONTEND (For Docker/Production)
# ============================================

# 1. Mount the 'static' folder (CSS/JS built by React)
if os.path.exists("build/static"):
    app.mount("/static", StaticFiles(directory="build/static"), name="static")

# 2. Catch-all route to serve the React App
# This allows URLs like /about, /contact to work by serving index.html
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # A. Check if it's a specific file in the build root (like manifest.json or favicon.ico)
    if os.path.exists(f"build/{full_path}"):
        return FileResponse(f"build/{full_path}")
        
    # B. Otherwise, serve index.html (SPA Routing)
    if os.path.exists("build/index.html"):
        return FileResponse("build/index.html")
        
    return {"error": "React build not found. Did you run 'npm run build' in the Dockerfile?"}

# --- Optional: Add this block to run directly with 'python main.py' ---
if __name__ == "__main__":
    import uvicorn
    print("Starting Uvicorn server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
