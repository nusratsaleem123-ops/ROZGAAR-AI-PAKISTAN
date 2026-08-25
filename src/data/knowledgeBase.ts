import { ProvenanceSource } from '../types';

export const TRUSTED_SOURCES: ProvenanceSource[] = [
  {
    name: 'P@SHA IT Industry Salary & Skills Survey 2024-2025',
    publisher: 'Pakistan Software Houses Association (P@SHA)',
    year: '2024',
    category: 'Industry Survey',
    description: 'Empirical compensation, skill demands, and tech stack benchmarks across 300+ Pakistani tech companies.'
  },
  {
    name: 'PSEB National IT & IT-enabled Services Strategy',
    publisher: 'Pakistan Software Export Board (PSEB) / Ministry of IT & Telecom',
    year: '2024',
    category: 'Government / Regulatory',
    description: 'National workforce demand, freelancing export figures, and high-growth digital export tracks.'
  },
  {
    name: 'NAVTTC National Vocational Qualification Framework (NVQF)',
    publisher: 'National Vocational and Technical Training Commission (NAVTTC)',
    year: '2023',
    category: 'Skill Council',
    description: 'Standard competency standards, vocational skill leveling, and competency units in Pakistan.'
  },
  {
    name: 'DigiSkills.pk National Skills Curriculum',
    publisher: 'Ignite National Technology Fund & Virtual University',
    year: '2024',
    category: 'Government / Regulatory',
    description: 'Curriculum standards for Freelancing, Digital Marketing, SEO, WordPress, Quickbooks, and Graphic Design.'
  },
  {
    name: 'Pakistan Bureau of Statistics (PBS) Labour Force & Macroeconomic Series',
    publisher: 'Pakistan Bureau of Statistics (PBS)',
    year: '2024',
    category: 'Labor Market Data',
    description: 'National employment indicators, urban/rural workforce demographics, and economic sector distribution.'
  },
  {
    name: 'State Bank of Pakistan (SBP) FinTech & Digital Economy Reports',
    publisher: 'State Bank of Pakistan',
    year: '2024',
    category: 'Government / Regulatory',
    description: 'Data on digital payments (Raast), banking sector digitalization, and remote freelance worker inflows.'
  }
];

export interface VerifiedCareerProfile {
  title: string;
  category: string;
  entryEducation: string[];
  coreCompetencies: string[];
  recommendedPakistanEntryPKR: string;
  midLevelPakistanPKR: string;
  freelanceRateUSD: string;
  demandTrend: 'Very High' | 'High' | 'Moderate' | 'Growing';
  topLocalCities: string[];
  keyTools: string[];
  sourceRef: string;
}

export const VERIFIED_CAREER_DOMAINS: VerifiedCareerProfile[] = [
  {
    title: 'Data Analyst / Business Intelligence Specialist',
    category: 'Data & Analytics',
    entryEducation: ['Bachelors in Economics', 'Computer Science', 'BBA / Finance', 'Statistics', 'Mathematics', 'Engineering'],
    coreCompetencies: ['Advanced Excel', 'SQL Querying', 'Power BI / Tableau', 'Python for Data Analysis', 'Statistical Inference', 'Business Storytelling'],
    recommendedPakistanEntryPKR: 'PKR 70,000 - 120,000 / month',
    midLevelPakistanPKR: 'PKR 140,000 - 250,000+ / month',
    freelanceRateUSD: '$18 - $45 / hour',
    demandTrend: 'Very High',
    topLocalCities: ['Karachi', 'Lahore', 'Islamabad / Rawalpindi', 'Faisalabad'],
    keyTools: ['Microsoft Excel (Pivot/PowerQuery)', 'PostgreSQL / MySQL', 'Power BI', 'Python (Pandas, Seaborn)', 'DAX'],
    sourceRef: 'P@SHA Salary Survey & SBP Financial Analytics Reports'
  },
  {
    title: 'Frontend Web Developer (React / Next.js / TypeScript)',
    category: 'Software Development',
    entryEducation: ['BS Computer Science', 'Software Engineering', 'IT', 'Self-taught with Strong Portfolio', 'FSc + Web Bootcamps'],
    coreCompetencies: ['HTML5/CSS3/Tailwind', 'JavaScript (ES6+) & TypeScript', 'React.js & State Management', 'REST / GraphQL APIs', 'Git & CI/CD Basics', 'Responsive Web Design'],
    recommendedPakistanEntryPKR: 'PKR 80,000 - 140,000 / month',
    midLevelPakistanPKR: 'PKR 180,000 - 350,000+ / month',
    freelanceRateUSD: '$20 - $55 / hour',
    demandTrend: 'Very High',
    topLocalCities: ['Lahore', 'Islamabad', 'Karachi', 'Peshawar', 'Multan', 'Remote'],
    keyTools: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Git/GitHub', 'Figma (Developer Handoff)'],
    sourceRef: 'P@SHA IT Industry Report & PSEB Freelance Track'
  },
  {
    title: 'Digital Marketing & Performance Media Strategist',
    category: 'Marketing & Growth',
    entryEducation: ['BBA / Marketing', 'Media Studies', 'Mass Communication', 'Commerce', 'Any Bachelors with DigiSkills certification'],
    coreCompetencies: ['Meta & Google Ads Management', 'Search Engine Optimization (SEO)', 'Content Strategy & Copywriting', 'Google Analytics 4 (GA4)', 'E-commerce Conversion Optimization', 'Email Automation'],
    recommendedPakistanEntryPKR: 'PKR 60,000 - 100,000 / month',
    midLevelPakistanPKR: 'PKR 120,000 - 220,000 / month',
    freelanceRateUSD: '$15 - $40 / hour',
    demandTrend: 'High',
    topLocalCities: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Sialkot'],
    keyTools: ['Google Ads', 'Meta Business Suite', 'Ahrefs/SEMrush', 'GA4 & Tag Manager', 'Shopify / WooCommerce', 'Canva/Figma'],
    sourceRef: 'DigiSkills.pk Curriculum & Local E-Commerce Federation'
  },
  {
    title: 'E-commerce Specialist & Bookkeeper (QuickBooks / Xero)',
    category: 'Finance & E-commerce Operations',
    entryEducation: ['B.Com', 'BBA Finance', 'ACCA (Partial/Qualified)', 'Economics', 'Intermediate Commerce with Vocational Certificate'],
    coreCompetencies: ['QuickBooks Online / Xero', 'Amazon / Shopify Store Operations', 'Reconciliation & VAT/Sales Tax', 'Inventory Tracking', 'Financial Reporting', 'Customer Support Workflows'],
    recommendedPakistanEntryPKR: 'PKR 60,000 - 110,000 / month',
    midLevelPakistanPKR: 'PKR 130,000 - 220,000 / month',
    freelanceRateUSD: '$15 - $35 / hour',
    demandTrend: 'Very High',
    topLocalCities: ['Lahore', 'Karachi', 'Sialkot', 'Gujranwala', 'Rawalpindi', 'Remote'],
    keyTools: ['QuickBooks Online', 'Xero', 'MS Excel (VLOOKUP/XLOOKUP/Macros)', 'Shopify Dashboard', 'Amazon Seller Central'],
    sourceRef: 'NAVTTC National Framework & Ignite DigiSkills Data'
  },
  {
    title: 'UI/UX Product Designer',
    category: 'Design & User Experience',
    entryEducation: ['BS Computer Science', 'Graphic Design / Fine Arts', 'BBA', 'Architecture', 'Self-taught with Design Portfolio'],
    coreCompetencies: ['User Research & Persona Building', 'Wireframing & Prototyping', 'Figma Component Systems', 'Design Systems (Auto-layout/Tokens)', 'Usability Testing', 'Developer Handoff'],
    recommendedPakistanEntryPKR: 'PKR 75,000 - 130,000 / month',
    midLevelPakistanPKR: 'PKR 160,000 - 300,000+ / month',
    freelanceRateUSD: '$22 - $50 / hour',
    demandTrend: 'High',
    topLocalCities: ['Lahore', 'Islamabad', 'Karachi', 'Remote'],
    keyTools: ['Figma', 'FigJam', 'Miro', 'Protopie', 'Notion', 'Lottie'],
    sourceRef: 'P@SHA Salary Survey'
  },
  {
    title: 'Python Backend & AI Integration Engineer',
    category: 'Software & AI Engineering',
    entryEducation: ['BS Computer Science', 'Software Engineering', 'Data Science', 'Electrical Engineering'],
    coreCompetencies: ['Python (FastAPI / Django)', 'RESTful API Architecture', 'SQL & Vector Databases', 'LLM API Integration & Prompt Engineering', 'Docker Basics', 'Unit Testing & Git'],
    recommendedPakistanEntryPKR: 'PKR 90,000 - 160,000 / month',
    midLevelPakistanPKR: 'PKR 200,000 - 420,000+ / month',
    freelanceRateUSD: '$25 - $65 / hour',
    demandTrend: 'Very High',
    topLocalCities: ['Islamabad', 'Lahore', 'Karachi', 'Peshawar', 'Remote'],
    keyTools: ['FastAPI', 'PostgreSQL', 'Docker', 'Google Gemini / OpenAI APIs', 'LangChain / LlamaIndex', 'Postman'],
    sourceRef: 'P@SHA Tech Demand Report 2024'
  },
  {
    title: 'Technical Content Strategist & Copywriter',
    category: 'Content & Communications',
    entryEducation: ['BA / BS English', 'Mass Communication', 'BBA', 'Computer Science (tech writing switch)', 'Any Graduate with C2 English'],
    coreCompetencies: ['B2B SaaS Content Writing', 'SEO On-Page Optimization', 'Case Studies & Whitepapers', 'Technical Documentation', 'AI-assisted Content Editing', 'Email Copywriting'],
    recommendedPakistanEntryPKR: 'PKR 55,000 - 95,000 / month',
    midLevelPakistanPKR: 'PKR 110,000 - 200,000 / month',
    freelanceRateUSD: '$18 - $45 / hour',
    demandTrend: 'Moderate',
    topLocalCities: ['Karachi', 'Lahore', 'Islamabad', 'Remote'],
    keyTools: ['Google Docs', 'SurferSEO / Clearscope', 'WordPress CMS', 'Grammarly / Hemingway', 'Gemini / Claude for Ideation'],
    sourceRef: 'PSEB Freelance Registry & DigiSkills'
  },
  {
    title: 'Cloud & DevOps Associate',
    category: 'Infrastructure & Cloud',
    entryEducation: ['BS Computer Science', 'BS Information Technology', 'Telecommunications / Electrical Engineering'],
    coreCompetencies: ['Linux / Bash Scripting', 'AWS / GCP Core Services', 'Docker & Containerization', 'CI/CD Pipelines (GitHub Actions)', 'Infrastructure as Code (Terraform basics)', 'Monitoring & Logging'],
    recommendedPakistanEntryPKR: 'PKR 90,000 - 150,000 / month',
    midLevelPakistanPKR: 'PKR 220,000 - 450,000+ / month',
    freelanceRateUSD: '$25 - $70 / hour',
    demandTrend: 'Very High',
    topLocalCities: ['Islamabad', 'Lahore', 'Karachi', 'Remote'],
    keyTools: ['AWS / GCP', 'Docker', 'Linux', 'GitHub Actions', 'Terraform', 'Nginx'],
    sourceRef: 'P@SHA IT Survey 2024'
  }
];
