import { 
  UserProfile, 
  CareerRecommendation, 
  SkillGapAnalysisResult, 
  SkillGapItem, 
  LearningRoadmap, 
  PortfolioProject,
  ChatMessage
} from '../types';

export function generateClientAssessment(profile: UserProfile): CareerRecommendation[] {
  const field = (profile.fieldOfStudy || '').toLowerCase();
  const techSkills = (profile.technicalSkills || []).map(s => s.toLowerCase());
  const interests = (profile.interests || []).map(i => i.toLowerCase());
  const prefs = (profile.careerPreferences || []).map(p => p.toLowerCase());
  const education = profile.education || 'Bachelors (Graduated)';
  const location = profile.location || 'Pakistan';
  const hours = profile.weeklyHoursAvailable || 15;

  const isEconOrCommerce = field.includes('econ') || field.includes('com') || field.includes('bus') || field.includes('acc') || field.includes('fin') || field.includes('bba') || field.includes('mba');
  const isCSOrTech = field.includes('cs') || field.includes('comp') || field.includes('soft') || field.includes('it') || field.includes('tech') || techSkills.some(s => s.includes('react') || s.includes('js') || s.includes('python') || s.includes('code'));
  const isDesignOrCreative = field.includes('art') || field.includes('des') || field.includes('media') || techSkills.some(s => s.includes('photoshop') || s.includes('figma') || s.includes('canva'));

  // Recommendation 1: Data Analytics & Business Intelligence
  const dataRec: CareerRecommendation = {
    id: 'rec-data-analytics',
    title: 'Data Analyst & Business Intelligence Specialist',
    category: 'Data & Analytics',
    matchScore: isEconOrCommerce ? 94 : isCSOrTech ? 90 : 85,
    confidence: 'High',
    confidenceReasoning: `Strong alignment with ${profile.fieldOfStudy || 'quantitative background'} and growing local bank, telco, and international remote demand in Pakistan.`,
    summary: 'Transform raw corporate data into interactive dashboards, KPI reports, and actionable strategic insights using Excel, SQL, and Power BI.',
    whyRecommended: [
      `Your academic background in ${profile.fieldOfStudy || 'higher education'} provides analytical reasoning for business problem decomposition.`,
      'Data Analytics is one of the highest-demand digital service exports from Pakistan (P@SHA 2024 Survey).',
      'High accessibility for hybrid local jobs (Habib Bank, Jazz, Systems Ltd, Daraz) and remote contracts on Upwork.'
    ],
    userStrengths: [
      profile.technicalSkills?.length ? profile.technicalSkills.slice(0, 3).join(', ') : 'Analytical Reasoning',
      profile.softSkills?.length ? profile.softSkills.slice(0, 2).join(', ') : 'Attention to Detail',
      'Structured logical reasoning'
    ],
    requiredSkills: [
      { skill: 'Advanced MS Excel & Power Query', level: 'Intermediate', category: 'Technical' },
      { skill: 'SQL Database Querying & Joins', level: 'Intermediate', category: 'Technical' },
      { skill: 'Power BI / Tableau Interactive Dashboards', level: 'Intermediate', category: 'Technical' },
      { skill: 'Python for Data Analysis (Pandas)', level: 'Basic', category: 'Technical' },
      { skill: 'Business Storytelling & Executive Reporting', level: 'Intermediate', category: 'Soft' }
    ],
    skillGaps: [
      { skill: 'SQL Relational Queries & Aggregations', priority: 'High', status: 'Need to Learn', estimatedHours: 25, recommendedResource: 'Kaggle SQL / Mode Analytics Free' },
      { skill: 'Power BI DAX Formulas & Data Modeling', priority: 'High', status: 'Need to Learn', estimatedHours: 30, recommendedResource: 'Microsoft Learn Power BI / DigiSkills.pk' },
      { skill: 'Python Pandas Data Wrangling', priority: 'Medium', status: 'Need to Learn', estimatedHours: 20, recommendedResource: 'freeCodeCamp Data Analysis with Python' }
    ],
    estimatedEffortWeeks: Math.max(6, Math.round(80 / (hours || 10))),
    pakistanMarketContext: {
      salaryRangeLocalPKR: 'PKR 75,000 - 140,000 / month (Entry level)',
      freelanceHourlyUSD: '$18 - $45 / hour (Upwork / Fiverr)',
      hiringDemandPakistan: 'Very High',
      topHiringHubs: ['Karachi', 'Lahore', 'Islamabad', 'Remote'],
      typicalEmployersOrPlatforms: ['Habib Bank / Meezan Bank', 'Jazz / Telenor', 'Daraz / Foodpanda', 'Systems Limited', 'Upwork Global']
    },
    sourcesCited: ['P@SHA IT Industry Salary Survey 2024', 'PSEB Tech Skills Matrix', 'DigiSkills.pk Analytics Track'],
    suggestedImmediateNextSteps: [
      'Master SQL aggregations and joins on LeetCode/Kaggle.',
      'Download public Pakistan Bureau of Statistics (PBS) inflation data for a dashboard project.',
      'Build a 3-page interactive Power BI report for your GitHub portfolio.'
    ]
  };

  // Recommendation 2: Frontend Web Development
  const frontendRec: CareerRecommendation = {
    id: 'rec-frontend-dev',
    title: 'Frontend Web Developer (React & TypeScript)',
    category: 'Software Engineering',
    matchScore: isCSOrTech ? 95 : 82,
    confidence: 'High',
    confidenceReasoning: 'Vibrant ecosystem of Pakistani software export houses and high global freelance hourly rates.',
    summary: 'Build responsive, accessible, high-performance web applications using modern React, Tailwind CSS, and TypeScript.',
    whyRecommended: [
      'Visual, tangible feedback makes learning rewarding and portfolio demonstration straightforward.',
      'Top skill category for Pakistani tech export firms and remote overseas contracts.',
      'Extensive free learning ecosystem with standardized open-source tooling.'
    ],
    userStrengths: [
      'Logical problem decomposition',
      'Familiarity with digital tools and computer operations',
      profile.softSkills?.[0] || 'Dedication to iterative improvement'
    ],
    requiredSkills: [
      { skill: 'JavaScript ES6+ & TypeScript', level: 'Intermediate', category: 'Technical' },
      { skill: 'React.js & State Management', level: 'Intermediate', category: 'Technical' },
      { skill: 'Tailwind CSS & Responsive UI', level: 'Intermediate', category: 'Technical' },
      { skill: 'Git & GitHub Collaboration', level: 'Basic', category: 'Technical' },
      { skill: 'API Integration (REST / JSON)', level: 'Intermediate', category: 'Technical' }
    ],
    skillGaps: [
      { skill: 'React Component Architecture & Hooks', priority: 'High', status: 'Need to Learn', estimatedHours: 35, recommendedResource: 'React.dev Official Interactive Tutorials' },
      { skill: 'TypeScript Static Typing & Generics', priority: 'Medium', status: 'Need to Learn', estimatedHours: 20, recommendedResource: 'TypeScript for Beginners / freeCodeCamp' },
      { skill: 'Tailwind CSS Mastery & Accessibility', priority: 'Medium', status: 'Improve', estimatedHours: 15, recommendedResource: 'Tailwind Labs Official Guides' }
    ],
    estimatedEffortWeeks: Math.max(8, Math.round(95 / (hours || 10))),
    pakistanMarketContext: {
      salaryRangeLocalPKR: 'PKR 85,000 - 160,000 / month (Entry level)',
      freelanceHourlyUSD: '$20 - $55 / hour',
      hiringDemandPakistan: 'Very High',
      topHiringHubs: ['Lahore', 'Islamabad', 'Karachi', 'Peshawar', 'Remote'],
      typicalEmployersOrPlatforms: ['Systems Limited', 'Contour Software', '10Pearls', 'VentureDive', 'Upwork / Toptal']
    },
    sourcesCited: ['P@SHA IT Industry Report 2024', 'PSEB Tech Skills Matrix', 'freeCodeCamp Curriculum'],
    suggestedImmediateNextSteps: [
      'Complete freeCodeCamp JavaScript Algorithms certification.',
      'Build 3 mini-apps (Weather App, E-commerce Cart, Task Board) in React.',
      'Deploy live projects to Vercel/GitHub Pages with clean source code.'
    ]
  };

  // Recommendation 3: E-Commerce Specialist & Cloud Bookkeeping
  const ecommerceRec: CareerRecommendation = {
    id: 'rec-ecommerce-bookkeeping',
    title: 'E-commerce Specialist & Digital Bookkeeper (QuickBooks / Xero)',
    category: 'Finance & Operations',
    matchScore: isEconOrCommerce ? 92 : 80,
    confidence: 'Medium',
    confidenceReasoning: 'Rapidly expanding market for Pakistani virtual assistants and accountants serving US, UK, and Gulf Shopify/Amazon sellers.',
    summary: 'Manage online store operations, reconcile multi-currency accounts, track inventory, and maintain books using QuickBooks Online and Xero.',
    whyRecommended: [
      'Low hardware requirement; operates smoothly on modest computers and mobile internet.',
      'High recurring retainer potential on freelancing platforms ($300 - $1,500/month per client).',
      'Directly leverages numerical accuracy and business logic into global digital commerce.'
    ],
    userStrengths: [
      'Attention to numerical accuracy',
      'Systematic organization & ledger tracking',
      profile.languages?.includes('English') ? 'English communication with overseas buyers' : 'Structured recordkeeping'
    ],
    requiredSkills: [
      { skill: 'QuickBooks Online ProAdvisor Certification', level: 'Intermediate', category: 'Technical' },
      { skill: 'Bank & Credit Card Reconciliation', level: 'Intermediate', category: 'Domain' },
      { skill: 'Shopify / Amazon Seller Central Basics', level: 'Basic', category: 'Domain' },
      { skill: 'MS Excel Financial Functions', level: 'Intermediate', category: 'Technical' },
      { skill: 'Client Communication & Email Etiquette', level: 'Intermediate', category: 'Soft' }
    ],
    skillGaps: [
      { skill: 'QuickBooks Online ProAdvisor Certification', priority: 'High', status: 'Need to Learn', estimatedHours: 20, recommendedResource: 'Intuit Free ProAdvisor Training' },
      { skill: 'Xero Accounting Fundamentals', priority: 'Medium', status: 'Need to Learn', estimatedHours: 15, recommendedResource: 'Xero Central Free Courses' },
      { skill: 'E-commerce Settlement Reconciliation', priority: 'High', status: 'Need to Learn', estimatedHours: 18, recommendedResource: 'DigiSkills.pk E-Commerce / YouTube' }
    ],
    estimatedEffortWeeks: Math.max(5, Math.round(65 / (hours || 10))),
    pakistanMarketContext: {
      salaryRangeLocalPKR: 'PKR 65,000 - 120,000 / month',
      freelanceHourlyUSD: '$15 - $35 / hour ($400 - $1200 / monthly retainer)',
      hiringDemandPakistan: 'Very High',
      topHiringHubs: ['Faisalabad', 'Lahore', 'Karachi', 'Sialkot', 'Remote'],
      typicalEmployersOrPlatforms: ['Upwork Global Clients', 'Fiverr Pro', 'Local Export Houses', 'Daraz Sellers']
    },
    sourcesCited: ['NAVTTC Skills Framework', 'DigiSkills.pk Freelancing Trends', 'PSEB BPO Export Survey'],
    suggestedImmediateNextSteps: [
      'Enroll in the free QuickBooks ProAdvisor certification program.',
      'Practice double-entry reconciliation using sample US/UK sales statements.',
      'Set up an optimized Upwork profile focusing on Shopify/Amazon bookkeeping.'
    ]
  };

  // Recommendation 4: UI/UX Product Designer (if creative/design interest)
  const designRec: CareerRecommendation = {
    id: 'rec-ui-ux-design',
    title: 'UI/UX Product Designer (Figma & User Research)',
    category: 'Design & Product',
    matchScore: isDesignCreativeMatch(profile) ? 95 : 84,
    confidence: 'High',
    confidenceReasoning: 'High demand in Pakistani product startups and remote global design retainers with visual portfolio proof.',
    summary: 'Design intuitive, human-centered user interfaces, mobile apps, and design systems in Figma for modern tech products.',
    whyRecommended: [
      'Emphasis on visual proof-of-work rather than formal coding degrees.',
      'Thriving remote freelancing niche with premium hourly rates on Upwork and Dribbble.',
      'Directly combines user empathy, aesthetic composition, and product logic.'
    ],
    userStrengths: [
      'Visual aesthetic sense',
      'Empathy for user pain points',
      profile.softSkills?.[0] || 'Creative problem solving'
    ],
    requiredSkills: [
      { skill: 'Figma Auto-Layout & Component Variants', level: 'Intermediate', category: 'Technical' },
      { skill: 'User Research & Wireframing', level: 'Intermediate', category: 'Domain' },
      { skill: 'Interactive Prototyping & Micro-interactions', level: 'Intermediate', category: 'Technical' },
      { skill: 'Design System Documentation', level: 'Basic', category: 'Technical' },
      { skill: 'Client Presentation & Usability Testing', level: 'Intermediate', category: 'Soft' }
    ],
    skillGaps: [
      { skill: 'Figma Advanced Components & Variables', priority: 'High', status: 'Need to Learn', estimatedHours: 25, recommendedResource: 'Figma YouTube Community Tutorials' },
      { skill: 'UX Case Study Documentation', priority: 'High', status: 'Need to Learn', estimatedHours: 20, recommendedResource: 'Uxcel / Nielsen Norman Group Articles' },
      { skill: 'Mobile UI Patterns (iOS & Android)', priority: 'Medium', status: 'Improve', estimatedHours: 15, recommendedResource: 'Mobbin.com UI Patterns' }
    ],
    estimatedEffortWeeks: Math.max(6, Math.round(75 / (hours || 10))),
    pakistanMarketContext: {
      salaryRangeLocalPKR: 'PKR 70,000 - 145,000 / month',
      freelanceHourlyUSD: '$20 - $50 / hour',
      hiringDemandPakistan: 'High',
      topHiringHubs: ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Remote'],
      typicalEmployersOrPlatforms: ['Careem / Foodpanda PK', 'VentureDive', 'Arbisoft', 'Upwork / Behance']
    },
    sourcesCited: ['P@SHA Design Trends 2024', 'Interaction Design Foundation'],
    suggestedImmediateNextSteps: [
      'Learn Figma auto-layout and component constraints.',
      'Redesign a popular Pakistani mobile app (e.g. Nayapay, Easypaisa, Daraz) with documented UX rationale.',
      'Publish a 3-part case study on Behance or Notion.'
    ]
  };

  if (isDesignCreativeMatch(profile)) {
    return [designRec, frontendRec, dataRec];
  } else if (isCSOrTech) {
    return [frontendRec, dataRec, designRec];
  } else if (isEconOrCommerce) {
    return [dataRec, ecommerceRec, frontendRec];
  } else {
    return [dataRec, frontendRec, ecommerceRec];
  }
}

function isDesignCreativeMatch(profile: UserProfile): boolean {
  const str = `${profile.fieldOfStudy} ${profile.interests.join(' ')} ${profile.technicalSkills.join(' ')}`.toLowerCase();
  return str.includes('design') || str.includes('graphic') || str.includes('figma') || str.includes('ui') || str.includes('ux') || str.includes('art') || str.includes('creative');
}

export function generateClientSkillGap(profile: UserProfile, careerTitle: string): SkillGapAnalysisResult {
  const isData = careerTitle.toLowerCase().includes('data') || careerTitle.toLowerCase().includes('analyst');
  const isWeb = careerTitle.toLowerCase().includes('frontend') || careerTitle.toLowerCase().includes('web') || careerTitle.toLowerCase().includes('react');
  const isDesign = careerTitle.toLowerCase().includes('design') || careerTitle.toLowerCase().includes('ui');

  let skills: SkillGapItem[] = [];

  if (isData) {
    skills = [
      {
        skill: 'Analytical Problem Formulation',
        category: 'Domain Knowledge',
        status: 'Already Have',
        priority: 'Low',
        estimatedHours: 0,
        curatedFreeResource: {
          title: 'Academic Foundation Review',
          platform: 'University Coursework / HEC Library',
          type: 'Official Docs',
          linkOrSearch: `${profile.fieldOfStudy || 'Undergraduate'} data principles`,
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Translating business questions into analytical queries'
      },
      {
        skill: 'SQL Relational Queries & Aggregations',
        category: 'Technical',
        status: 'Need to Learn',
        priority: 'High',
        estimatedHours: 25,
        curatedFreeResource: {
          title: 'Complete SQL Masterclass for Data Analytics',
          platform: 'Kaggle Learn / Mode Analytics (Free)',
          type: 'Interactive Tutorial',
          linkOrSearch: 'Kaggle SQL course',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'JOINs, GROUP BY, Window Functions (ROW_NUMBER, RANK), CTEs'
      },
      {
        skill: 'Power BI Interactive Dashboard Design',
        category: 'Tool / Framework',
        status: 'Need to Learn',
        priority: 'High',
        estimatedHours: 28,
        curatedFreeResource: {
          title: 'Microsoft Power BI Data Analyst Track',
          platform: 'Microsoft Learn / DigiSkills.pk (Free)',
          type: 'Video Course',
          linkOrSearch: 'DigiSkills Power BI / YouTube Edureka',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Star Schema Modeling, DAX measures (CALCULATE, FILTER), Visual Storytelling'
      },
      {
        skill: 'Python for Data Analysis (Pandas & NumPy)',
        category: 'Technical',
        status: 'Need to Learn',
        priority: 'Medium',
        estimatedHours: 20,
        curatedFreeResource: {
          title: 'Data Analysis with Python Certification',
          platform: 'freeCodeCamp.org (Free)',
          type: 'Interactive Tutorial',
          linkOrSearch: 'freeCodeCamp Data Analysis with Python',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'DataFrame cleaning, handling missing data, groupby aggregations, Plotly charts'
      },
      {
        skill: 'Client Communication & Freelance Bidding',
        category: 'Soft',
        status: 'Improve',
        priority: 'Medium',
        estimatedHours: 12,
        curatedFreeResource: {
          title: 'DigiSkills Freelancing (Hisham Sarwar)',
          platform: 'DigiSkills.pk (Ignite Pakistan)',
          type: 'Video Course',
          linkOrSearch: 'DigiSkills Freelancing course playlist',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Winning proposal framing, scope definition, and remote client updates'
      }
    ];
  } else if (isWeb) {
    skills = [
      {
        skill: 'HTML5, CSS3 & Modern Semantic Layouts',
        category: 'Technical',
        status: 'Already Have',
        priority: 'Low',
        estimatedHours: 0,
        curatedFreeResource: {
          title: 'Responsive Web Design Certification',
          platform: 'freeCodeCamp (Free)',
          type: 'Interactive Tutorial',
          linkOrSearch: 'freeCodeCamp Responsive Web Design',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Flexbox, CSS Grid, semantic tags, and responsive viewport sizing'
      },
      {
        skill: 'JavaScript ES6+ Fundamentals & Async Logic',
        category: 'Technical',
        status: 'Need to Learn',
        priority: 'High',
        estimatedHours: 30,
        curatedFreeResource: {
          title: 'JavaScript Algorithms & Data Structures',
          platform: 'freeCodeCamp / JavaScript.info',
          type: 'Interactive Tutorial',
          linkOrSearch: 'JavaScript.info free guide',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Closures, Promises, async/await, Array methods (map, filter, reduce)'
      },
      {
        skill: 'React.js Component Architecture & State Management',
        category: 'Tool / Framework',
        status: 'Need to Learn',
        priority: 'High',
        estimatedHours: 35,
        curatedFreeResource: {
          title: 'Official Interactive React 18+ Documentation',
          platform: 'React.dev (Free)',
          type: 'Official Docs',
          linkOrSearch: 'React.dev learn tutorials',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'useState, useEffect, custom hooks, context, component composition'
      },
      {
        skill: 'Tailwind CSS & Responsive UI Systems',
        category: 'Technical',
        status: 'Need to Learn',
        priority: 'Medium',
        estimatedHours: 15,
        curatedFreeResource: {
          title: 'Tailwind CSS from Scratch',
          platform: 'Tailwind Labs YouTube (Free)',
          type: 'Video Course',
          linkOrSearch: 'Tailwind CSS beginner tutorial',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Utility classes, dark mode, responsive prefixes (sm, md, lg), spacing rules'
      }
    ];
  } else {
    skills = [
      {
        skill: 'Core Academic & Quantitative Foundations',
        category: 'Domain Knowledge',
        status: 'Already Have',
        priority: 'Low',
        estimatedHours: 0,
        curatedFreeResource: {
          title: 'Undergraduate Core Competencies',
          platform: 'HEC Pakistan Curriculum',
          type: 'Official Docs',
          linkOrSearch: `${profile.fieldOfStudy || 'General'} concepts`,
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Logical problem breakdown and accuracy'
      },
      {
        skill: 'Industry Standard Software Mastery',
        category: 'Tool / Framework',
        status: 'Need to Learn',
        priority: 'High',
        estimatedHours: 25,
        curatedFreeResource: {
          title: `${careerTitle} Hands-on Masterclass`,
          platform: 'DigiSkills.pk / YouTube (Free)',
          type: 'Video Course',
          linkOrSearch: `${careerTitle} tutorial DigiSkills`,
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Professional software workflows and error handling'
      },
      {
        skill: 'End-to-End Capstone Project Building',
        category: 'Technical',
        status: 'Need to Learn',
        priority: 'High',
        estimatedHours: 30,
        curatedFreeResource: {
          title: 'Pakistani Real-World Case Studies',
          platform: 'GitHub / Kaggle Open Data (Free)',
          type: 'Practice Platform',
          linkOrSearch: 'Pakistan open datasets projects',
          pakistaniFriendly: true
        },
        keyConceptToMaster: 'Deploying a live public proof-of-work project'
      }
    ];
  }

  const alreadyHaveCount = skills.filter((s) => s.status === 'Already Have').length;
  const improveCount = skills.filter((s) => s.status === 'Improve').length;
  const needToLearnCount = skills.filter((s) => s.status === 'Need to Learn').length;
  const totalEstimatedHours = skills.reduce((sum, item) => sum + item.estimatedHours, 0);

  return {
    careerTitle: careerTitle || 'Data Analyst',
    matchPercentage: profile.technicalSkills?.length > 2 ? 88 : 78,
    alreadyHaveCount,
    improveCount,
    needToLearnCount,
    totalEstimatedHours,
    skills,
    strategicAdvice: `Leverage your ${profile.fieldOfStudy || 'academic'} foundation in ${profile.location || 'Pakistan'} by following structured, hands-on tutorials on DigiSkills and Kaggle to build public proof-of-work.`,
    provenanceNotes: 'Grounded in NAVTTC NVQF Level 5 and P@SHA Competency Benchmarks.'
  };
}

export function generateClientRoadmap(careerTitle: string, durationWeeks: number = 8, hoursPerWeek: number = 15): LearningRoadmap {
  const weeks = [];
  for (let i = 1; i <= durationWeeks; i++) {
    let theme = 'Core Fundamentals & Tool Setup';
    let phaseTitle = 'Phase 1: Foundations';
    if (i > durationWeeks * 0.25 && i <= durationWeeks * 0.5) {
      theme = 'Intermediate Workflows & Applied Practice';
      phaseTitle = 'Phase 2: Applied Tooling';
    } else if (i > durationWeeks * 0.5 && i <= durationWeeks * 0.75) {
      theme = 'Real-World Pakistani Case Studies & Mini-Projects';
      phaseTitle = 'Phase 3: Project Building';
    } else if (i > durationWeeks * 0.75) {
      theme = 'Capstone Portfolio, Interview Prep & Freelance Bidding';
      phaseTitle = 'Phase 4: Launch & Readiness';
    }

    weeks.push({
      weekNumber: i,
      phaseTitle,
      theme: `Week ${i}: ${theme}`,
      hoursRequired: hoursPerWeek,
      learningObjectives: [
        `Master key concepts and syntax required for Week ${i}`,
        `Complete 2 practical coding or analytical exercises`,
        `Commit code and notes to your public GitHub repository`
      ],
      topics: [`Concept ${i}.1 Overview`, `Hands-on Implementation`, `Pakistan Market Case Application`],
      recommendedResources: [
        {
          name: `DigiSkills.pk / FreeCodeCamp ${careerTitle} Module ${i}`,
          type: 'Video & Practical Tutorial',
          isFree: true,
          provider: 'DigiSkills.pk / freeCodeCamp',
          urlOrQuery: `${careerTitle} free tutorial week ${i}`
        }
      ],
      handsOnTask: {
        title: `Week ${i} Milestone Task`,
        description: `Implement a standalone component or script solving a practical Pakistani industry problem.`,
        deliverable: `Clean GitHub repository link or documented analytical report.`
      },
      milestoneCheck: `Complete exercise test cases with 100% verified correctness.`,
      isCompleted: i === 1
    });
  }

  return {
    id: `roadmap-${Date.now()}`,
    careerTitle,
    durationWeeks,
    hoursPerWeek,
    prerequisites: ['Basic computer & internet literacy', 'Dedicated study schedule', 'GitHub / Google Account'],
    weeks,
    milestones: [
      'Week 2: Core Foundations Checkpoint',
      'Week 4: Tooling & Scripting Proficiency',
      'Week 6: Pakistan Industry Case Study Prototype',
      `Week ${durationWeeks}: Production-Grade Portfolio Ready for Employment / Freelance`
    ],
    capstoneProjectSummary: `End-to-end Pakistani industry case study demonstrating raw data ingest, clean processing, interactive presentation, and actionable business insights.`,
    interviewPrepGuide: `Includes top 20 technical behavioral questions, STAR method framing for Pakistani tech employers, and live coding/whiteboarding tips.`,
    provenance: 'Grounded in P@SHA Skills Survey 2024 and DigiSkills National Curriculum.'
  };
}

export function generateClientPortfolio(careerTitle: string): PortfolioProject {
  const isData = careerTitle.toLowerCase().includes('data') || careerTitle.toLowerCase().includes('analyst');
  const isWeb = careerTitle.toLowerCase().includes('frontend') || careerTitle.toLowerCase().includes('web') || careerTitle.toLowerCase().includes('react');

  if (isWeb) {
    return {
      id: `portfolio-${Date.now()}`,
      title: 'Pakistan AgriConnect: SME Farm-to-Market Produce Trading Portal',
      careerTarget: careerTitle,
      domainContext: 'Pakistani Agricultural Supply Chain & E-Commerce',
      problemStatement: 'Smallholder farmers in Punjab and Sindh lose up to 30% of perishable crop margins to multi-tiered middlemen (Aarthis). A transparent, mobile-responsive local trading marketplace connects growers directly with bulk urban buyers (supermarkets, restaurants).',
      objectives: [
        'Build a responsive web application in React and Tailwind CSS optimized for low-bandwidth mobile connections.',
        'Implement dynamic mandis price tracking based on daily Punjab/Sindh Agriculture Department rates.',
        'Design a clean, bilingual (Urdu/English) product catalog with direct WhatsApp ordering integration.',
        'Deploy the production web application on Vercel with clean GitHub documentation.'
      ],
      pakistaniDatasetsAndSources: [
        {
          name: 'Punjab Agriculture Department Mandi Rates',
          description: 'Daily wholesale market prices for 40+ commodities across 30 Punjab mandis.',
          source: 'Punjab Agriculture Market Information System (amis.pk)'
        },
        {
          name: 'Sindh Wholesale Commodity Prices',
          description: 'Weekly agricultural rate bulletins across Karachi, Hyderabad, and Sukkur.',
          source: 'Sindh Agriculture Extension Department'
        }
      ],
      stepByStepMethodology: [
        'Step 1: Architect component tree (ProduceCard, PriceFilter, MandiTicker, WhatsAppCheckout).',
        'Step 2: Implement responsive layout using Tailwind CSS with verified mobile touch targets (>44px).',
        'Step 3: Integrate local storage for persistent order cart and mandi bookmarking.',
        'Step 4: Connect WhatsApp click-to-chat API with auto-generated order summary text.',
        'Step 5: Write comprehensive README with architecture diagram, screenshots, and live demo link.'
      ],
      recommendedToolsAndStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub', 'Vercel'],
      expectedOutputs: [
        'Live Deployed Web Application',
        'Open-Source GitHub Repository with Clean Commits',
        'Lighthouse 95+ Performance & Accessibility Score'
      ],
      resumeAndPortfolioBulletPoints: [
        'Engineered an open-source AgriTech marketplace web app in React & TypeScript to streamline rural Pakistani farmer-to-buyer transactions.',
        'Optimized bundle size and asset loading for smooth 3G performance across semi-rural Pakistani bandwidth environments.',
        'Implemented dual-language Urdu/English UI and seamless WhatsApp API order dispatching.'
      ],
      githubReadmeSnippet: `# Pakistan AgriConnect - Direct Produce Trading Portal\n\nA responsive React & TypeScript web application connecting Pakistani farmers directly with urban bulk buyers.\n\n### Tech Stack\n- React 18 / TypeScript\n- Tailwind CSS\n- Vite\n\n### Key Features\n- Daily Mandi Price Ticker (AMIS Punjab data)\n- Low-bandwidth mobile responsive interface\n- WhatsApp direct order generation`,
      evaluationRubric: [
        { criterion: 'Code Quality & Modularity', target: 'Clean TypeScript types, zero any-casts, modular component architecture.' },
        { criterion: 'Mobile Responsiveness', target: 'Seamless usability on 360px mobile screens up to 4K displays.' },
        { criterion: 'User Experience', target: 'Zero broken links; instant feedback on all interactive controls.' }
      ]
    };
  }

  return {
    id: `portfolio-${Date.now()}`,
    title: 'Pakistan CPI Inflation & Household Expenditure Interactive Dashboard',
    careerTarget: careerTitle,
    domainContext: 'Macroeconomic & Consumer Analytics in Pakistan',
    problemStatement: 'Pakistani households and retail businesses face rapid shifts in food, fuel, and utility prices. Public data published in monthly PBS bulletins is difficult for non-technical citizens and SMEs to analyze dynamically.',
    objectives: [
      'Extract, clean, and standardize 5 years of historical monthly CPI data from Pakistan Bureau of Statistics (PBS).',
      'Perform exploratory data analysis to identify the top 5 inflation drivers (e.g. Electricity tariffs, Edible oil, Wheat flour).',
      'Design an intuitive interactive dashboard allowing users to filter by Province (Punjab, Sindh, KP, Balochistan) and urban vs rural baskets.',
      'Deploy the solution live to GitHub and write an executive summary report.'
    ],
    pakistaniDatasetsAndSources: [
      {
        name: 'PBS Monthly Consumer Price Index (CPI) Series',
        description: 'Official monthly inflation indices across 12 commodity groups and 35+ major cities.',
        source: 'Pakistan Bureau of Statistics (pbs.gov.pk/cpi)'
      },
      {
        name: 'State Bank of Pakistan (SBP) Monetary Policy Data',
        description: 'Policy rate trends, exchange rate fluctuations (USD/PKR), and money supply data.',
        source: 'State Bank of Pakistan Open Data Portal'
      }
    ],
    stepByStepMethodology: [
      'Step 1: Ingest PBS Excel/CSV files and clean messy column headers.',
      'Step 2: Calculate Month-on-Month (MoM) and Year-on-Year (YoY) percentage shifts.',
      'Step 3: Build interactive charts with trendlines, moving averages, and category breakdowns.',
      'Step 4: Formulate 3 actionable insights on food security and supply chain shocks.',
      'Step 5: Document findings in a structured GitHub README with screenshots and live demo link.'
    ],
    recommendedToolsAndStack: ['Python (Pandas, Plotly)', 'Power BI / Tableau / Streamlit', 'Excel PowerQuery', 'GitHub'],
    expectedOutputs: [
      'Interactive Web/Power BI Dashboard',
      'Cleaned Open-Source Dataset on Kaggle/GitHub',
      '2-Page Executive Analytical Brief (PDF / Medium Article)'
    ],
    resumeAndPortfolioBulletPoints: [
      'Architected an end-to-end CPI Inflation Analyzer processing 60+ months of Pakistan Bureau of Statistics data.',
      'Engineered dynamic YoY & MoM inflation metrics across 12 commodity sectors, enabling instant urban-rural price comparison.',
      'Constructed a production-ready interactive dashboard with 100% open-source reproducible data pipelines.'
    ],
    githubReadmeSnippet: `# Pakistan Inflation & Macro Trends Dashboard\n\nAn evidence-grounded exploratory data analysis and interactive dashboard tracking 5-year Consumer Price Index (CPI) movements in Pakistan.\n\n### Data Provenance\n- Pakistan Bureau of Statistics (PBS)\n- State Bank of Pakistan (SBP)\n\n### Key Findings\n- Food inflation accounted for 48% of total urban headline index volatility between 2022-2024.`,
    evaluationRubric: [
      { criterion: 'Data Cleaning & Accuracy', target: 'Zero missing values in primary timeseries; validated against SBP annual report figures.' },
      { criterion: 'Visual Clarity & Usability', target: 'Passes WCAG contrast check; intuitive filtering by region and item group in under 2 clicks.' },
      { criterion: 'Business Insights', target: 'Provides clear narrative takeaways, not just raw charts.' }
    ]
  };
}

export function generateClientChatReply(
  userMessage: string,
  profile: UserProfile,
  careerTitle: string
): { reply: string; citations: string[]; uncertaintyNote?: string; suggestedFollowUps?: string[] } {
  const query = userMessage.toLowerCase();
  const name = profile.fullName || 'Candidate';
  const field = profile.fieldOfStudy || 'Undergraduate Degree';
  const role = careerTitle || 'Selected Career';

  if (query.includes('salary') || query.includes('pay') || query.includes('pkr') || query.includes('earn') || query.includes('income')) {
    return {
      reply: `Based on the **P@SHA IT Industry Salary Survey (2024-2025)** and current Pakistani hiring benchmarks for **${role}**:

• **Local Entry-Level / Junior (0-1.5 years):** PKR 75,000 to PKR 135,000/month in Karachi, Lahore, and Islamabad.
• **Mid-Level (2-4 years):** PKR 180,000 to PKR 320,000/month.
• **Remote Global / Freelance (Upwork / Fiverr):** Starting at $18 - $35/hour (approx. PKR 150,000 - PKR 400,000/month depending on contract volume).

*Tips for Pakistan:* IT export earnings deposited into official Pakistani bank Freelancer Accounts (such as Meezan or HBL Freelancer) benefit from the subsidized **0.25% PSEB withholding tax** regime.`,
      citations: ['P@SHA IT Industry Salary Survey 2024-2025', 'PSEB Tech Export Guidelines', 'State Bank of Pakistan PRAL IT Tax Rules'],
      uncertaintyNote: 'Salaries vary based on company size (e.g. Systems Ltd, Contour vs. early-stage agencies) and English communication ability.',
      suggestedFollowUps: [
        'How can I set up a PSEB-registered Freelancer bank account in Pakistan?',
        'What skills push my compensation into the higher PKR bracket?'
      ]
    };
  }

  if (query.includes('cv') || query.includes('resume') || query.includes('fake') || query.includes('experience')) {
    if (query.includes('fake') || query.includes('lie') || query.includes('cheat')) {
      return {
        reply: `⚠️ **Responsible AI & Integrity Advisory:** 
I cannot fabricate or recommend adding fictitious experience to your CV. Pakistani tech recruiters (at companies like 10Pearls, VentureDive, Systems Ltd) and international freelance platforms conduct background verification and technical tests where fabricated experience is quickly detected.

**How to genuinely stand out without prior work experience:**
1. **Highlight Proof-of-Work Projects:** Feature 2-3 GitHub repositories with live links (use our **Portfolio Lab** tab).
2. **Translate Academic Strengths:** Frame your **${field}** coursework into analytical accomplishments.
3. **Showcase Verified Certifications:** List DigiSkills.pk, freeCodeCamp, or Microsoft Learn badges.`,
        citations: ['P@SHA Recruitment Ethics Framework', 'HEC Career Guidelines'],
        uncertaintyNote: 'Authentic project code and clear problem explanations beat exaggerated resumes every time.',
        suggestedFollowUps: [
          'What bullet points should I put for my AgriConnect or CPI project?',
          'How do I prepare for a live technical coding test in Pakistan?'
        ]
      };
    }

    return {
      reply: `Here is the recommended CV structure tailored for Pakistani tech recruiters and ATS filters for **${role}**:

1. **Header:** Name, Contact, GitHub Profile Link, LinkedIn URL, Portfolio Demo Link.
2. **Target Summary (2 lines):** "${field} graduate specializing in ${role} with practical expertise in ${profile.technicalSkills.slice(0, 3).join(', ') || 'modern tools'}."
3. **Featured Projects (Most Important):** Include problem statement, Pakistani data context, tech stack, and GitHub repository URL.
4. **Technical Competencies:** Structured by Category (Languages, Frameworks, Tools, Soft Skills).
5. **Education:** ${profile.education} in ${field} (${profile.location}).`,
      citations: ['P@SHA Hiring Standards', 'PSEB TechLift Guidance'],
      suggestedFollowUps: [
        'Generate custom bullet points for my portfolio project',
        'How do I tailor my LinkedIn profile for remote overseas recruiters?'
      ]
    };
  }

  if (query.includes('digiskills') || query.includes('course') || query.includes('free') || query.includes('learn') || query.includes('youtube')) {
    return {
      reply: `Here are the top **100% free, high-impact learning resources** for a learner in Pakistan targeting **${role}**:

1. **DigiSkills.pk (Government of Pakistan / Ignite):**
   • *Freelancing Track:* Essential module by Hisham Sarwar on client bidding, profile ranking, and milestone delivery.
   • *Data Analytics & Business:* Modules on Excel formulas, data hygiene, and introductory business reporting.
2. **freeCodeCamp & Odin Project:**
   • Complete interactive modules on JavaScript, React, Python, and SQL with automated project evaluation.
3. **YouTube Channels in Urdu & English:**
   • *CodeWithHarry / Chai aur Code:* Urdu/Hindi programming fundamentals.
   • *Alex The Analyst:* Comprehensive real-world SQL, Power BI, and Portfolio walkthroughs.
4. **Microsoft Learn & Kaggle:**
   • Free official sandbox environments to practice data queries and cloud architectures.`,
      citations: ['DigiSkills.pk / Ministry of IT & Telecom', 'freeCodeCamp Open Curriculum', 'NAVTTC Skill Matrix'],
      suggestedFollowUps: [
        'How many hours per week should I study to get job ready in 10-12 weeks?',
        'Can I access these courses on a mobile device or low-spec laptop?'
      ]
    };
  }

  if (query.includes('job') || query.includes('apply') || query.includes('portal') || query.includes('hire') || query.includes('where')) {
    return {
      reply: `Here is the step-by-step **Job Application Strategy for Pakistan**:

1. **Top Pakistani Job Portals:**
   • **LinkedIn Jobs (Pakistan filter):** Best for software houses, multinational banks (HBL, Meezan), and tech startups in Karachi, Lahore, and Islamabad.
   • **Rozee.pk & Mustakbil.com:** Traditional corporate and enterprise recruitment.
   • **PSEB TechLift Portal:** Government initiative connecting vetted graduates with 2,000+ local software export firms.
2. **Remote & Global Freelancing:**
   • **Upwork & Fiverr:** Filter for "Fixed Price" entry contracts ($50-$200) to gain your first 5-star reviews.
   • **Toptal & Turing:** For intermediate developers after 1-2 completed portfolio case studies.
3. **Application Rule of Thumb:** Apply with a customized portfolio link rather than a generic PDF attachment.`,
      citations: ['PSEB Tech Portal (pseb.org.pk)', 'P@SHA IT Industry Report 2024', 'Rozee.pk Employment Index'],
      suggestedFollowUps: [
        'What should I say in a connection note to a Pakistani HR recruiter on LinkedIn?',
        'How do I convert my degree into an asset during interviews?'
      ]
    };
  }

  // General Guidance
  return {
    reply: `Assalam-o-Alaikum ${name}! For your background in **${field}** aiming toward **${role}**:

Your best next action is to follow our **4-step career trajectory**:
1. **Bridge Key Skill Gaps:** Spend ${profile.weeklyHoursAvailable} hours/week mastering the high-priority tools in your Roadmap.
2. **Build Proof-of-Work:** Complete the **Pakistan Domain Portfolio Project** in tab 5 (recruiters prioritize working demos over theoretical degrees).
3. **Optimize Your Profile:** Use the ATS keywords and bullet points generated in your Readiness diagnostic.
4. **Apply Confidently:** Target both local companies (via LinkedIn PK / Rozee.pk) and international remote contracts (via Upwork).

What specific area would you like to explore next?`,
    citations: ['P@SHA Career Framework', 'NAVTTC NVQF Guidelines', 'DigiSkills.pk Curriculum'],
    uncertaintyNote: 'Consistent weekly project progress is the single highest predictor of job placement.',
    suggestedFollowUps: [
      'Show me recommended Pakistani job portals',
      'What are typical entry-level salary ranges in PKR?',
      'How do I bridge my highest priority skill gap?'
    ]
  };
}

