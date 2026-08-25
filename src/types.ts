export type EducationLevel =
  | 'Matric / Secondary'
  | 'Intermediate / FSc / FA / ICS'
  | 'Bachelors (In Progress)'
  | 'Bachelors (Graduated)'
  | 'Masters / MS / MPhil'
  | 'Other / Diploma';

export type ExperienceLevel =
  | 'No Experience / Student'
  | 'Beginner (0-1 year)'
  | 'Intermediate (1-3 years)'
  | 'Experienced (3+ years)'
  | 'Career Switcher';

export type EmploymentStatus =
  | 'Student'
  | 'Unemployed / Job Seeking'
  | 'Employed (Looking to Switch)'
  | 'Freelancer (Part-time / Full-time)'
  | 'Self-employed / Entrepreneur';

export type CareerPreference =
  | 'Full-Time Employment (Local)'
  | 'Remote Work (International / Local)'
  | 'Freelancing (Upwork / Fiverr / Direct)'
  | 'Entrepreneurship / Startup'
  | 'Higher Education / Research';

export interface UserProfile {
  id: string;
  fullName: string;
  location: string;
  education: EducationLevel;
  fieldOfStudy: string;
  experienceLevel: ExperienceLevel;
  employmentStatus: EmploymentStatus;
  technicalSkills: string[];
  softSkills: string[];
  digitalSkills: string[];
  languages: string[];
  interests: string[];
  careerPreferences: CareerPreference[];
  weeklyHoursAvailable: number;
  budgetPreference: 'Free Only' | 'Low-Cost / Affordable' | 'Any / Certification Investment';
  deviceLimitations: string;
  targetCareerInterest?: string;
  preferredLanguageMode: 'English' | 'Urdu / Roman Urdu' | 'Bilingual';
  createdAt: string;
  updatedAt: string;
}

export interface ProvenanceSource {
  name: string;
  publisher: string;
  year: string;
  category: 'Government / Regulatory' | 'Industry Survey' | 'Skill Council' | 'Labor Market Data';
  description: string;
  url?: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceReasoning: string;
  summary: string;
  whyRecommended: string[];
  userStrengths: string[];
  requiredSkills: {
    skill: string;
    level: 'Basic' | 'Intermediate' | 'Advanced';
    category: 'Technical' | 'Soft' | 'Domain';
  }[];
  skillGaps: {
    skill: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Need to Learn' | 'Improve' | 'Already Have';
    estimatedHours: number;
    recommendedResource: string;
  }[];
  estimatedEffortWeeks: number;
  pakistanMarketContext: {
    salaryRangeLocalPKR: string;
    freelanceHourlyUSD: string;
    hiringDemandPakistan: 'Very High' | 'High' | 'Moderate' | 'Growing';
    topHiringHubs: string[];
    typicalEmployersOrPlatforms: string[];
  };
  sourcesCited: string[];
  suggestedImmediateNextSteps: string[];
}

export interface SkillGapItem {
  skill: string;
  category: 'Technical' | 'Soft' | 'Tool / Framework' | 'Domain Knowledge';
  status: 'Already Have' | 'Improve' | 'Need to Learn';
  priority: 'High' | 'Medium' | 'Low';
  estimatedHours: number;
  curatedFreeResource: {
    title: string;
    platform: string;
    type: 'Video Course' | 'Interactive Tutorial' | 'Official Docs' | 'Practice Platform';
    linkOrSearch: string;
    pakistaniFriendly: boolean;
  };
  keyConceptToMaster: string;
}

export interface SkillGapAnalysisResult {
  careerTitle: string;
  matchPercentage: number;
  alreadyHaveCount: number;
  improveCount: number;
  needToLearnCount: number;
  totalEstimatedHours: number;
  skills: SkillGapItem[];
  strategicAdvice: string;
  provenanceNotes: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  phaseTitle: string;
  theme: string;
  hoursRequired: number;
  learningObjectives: string[];
  topics: string[];
  recommendedResources: {
    name: string;
    type: string;
    isFree: boolean;
    provider: string;
    urlOrQuery: string;
  }[];
  handsOnTask: {
    title: string;
    description: string;
    deliverable: string;
  };
  milestoneCheck: string;
  isCompleted: boolean;
}

export interface LearningRoadmap {
  id: string;
  careerTitle: string;
  durationWeeks: number;
  hoursPerWeek: number;
  prerequisites: string[];
  weeks: RoadmapWeek[];
  milestones: string[];
  capstoneProjectSummary: string;
  interviewPrepGuide: string;
  provenance: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  careerTarget: string;
  domainContext: string;
  problemStatement: string;
  objectives: string[];
  pakistaniDatasetsAndSources: {
    name: string;
    description: string;
    source: string;
  }[];
  stepByStepMethodology: string[];
  recommendedToolsAndStack: string[];
  expectedOutputs: string[];
  resumeAndPortfolioBulletPoints: string[];
  githubReadmeSnippet: string;
  evaluationRubric: {
    criterion: string;
    target: string;
  }[];
}

export interface CareerReadinessScore {
  overallScore: number;
  technicalSkillsScore: number;
  softSkillsScore: number;
  portfolioScore: number;
  interviewReadinessScore: number;
  breakdownSummary: string;
  keyStrengths: string[];
  criticalPriorities: string[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: string[];
  uncertaintyNote?: string;
  suggestedFollowUps?: string[];
}

export interface UserProgressState {
  completedSkillNames: string[];
  completedWeekNumbers: number[];
  completedProjectIds: string[];
  savedCareerId?: string;
  lastAssessedDate?: string;
}

export interface EvaluationTestCase {
  id: string;
  name: string;
  category: 'Safety & Guarantees' | 'Fairness & Bias' | 'Ethics & Fabrication' | 'Uncertainty & Market Reality' | 'Socioeconomic Inclusivity';
  prompt: string;
  expectedBehavior: string;
  simulatedResponse?: string;
  complianceStatus?: 'PASS' | 'FLAG' | 'FAIL';
  guardrailExplanation?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actionType: 'CAREER_ASSESSMENT' | 'SKILL_GAP' | 'ROADMAP_GENERATION' | 'PORTFOLIO_GEN' | 'CHAT_QUERY' | 'EVALUATION_RUN';
  summary: string;
  retrievedSources: string[];
  confidence: string;
  guardrailsApplied: string[];
}
