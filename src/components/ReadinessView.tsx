import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Code, 
  MessageSquare, 
  FolderGit2, 
  Calendar,
  Briefcase
} from 'lucide-react';
import { UserProfile, CareerRecommendation } from '../types';

interface ReadinessViewProps {
  overallScore: number;
  technicalScore: number;
  softSkillsScore: number;
  portfolioScore: number;
  interviewScore: number;
  selectedCareer: CareerRecommendation | null;
  completedWeeksCount: number;
  totalWeeksCount: number;
  onGoToRoadmap: () => void;
  onGoToPortfolio: () => void;
  onGoToAssistant: () => void;
  profile: UserProfile;
}

export const ReadinessView: React.FC<ReadinessViewProps> = ({
  overallScore,
  technicalScore,
  softSkillsScore,
  portfolioScore,
  interviewScore,
  selectedCareer,
  completedWeeksCount,
  totalWeeksCount,
  onGoToRoadmap,
  onGoToPortfolio,
  onGoToAssistant,
  profile,
}) => {
  const careerTitle = selectedCareer?.title || 'Selected Career Pathway';

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-400 border-emerald-500 bg-emerald-950/60';
    if (val >= 60) return 'text-teal-400 border-teal-500 bg-teal-950/60';
    if (val >= 40) return 'text-amber-400 border-amber-500 bg-amber-950/60';
    return 'text-rose-400 border-rose-500 bg-rose-950/60';
  };

  const getBarColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-teal-500';
    if (val >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-6" id="readiness-view-container">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Decision Support Guidance
              </span>
              <span className="text-xs text-slate-400">Target Role: <strong className="text-slate-200">{careerTitle}</strong></span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Career Readiness Diagnostic Indicator</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Transparent multi-dimensional indicator measuring skill coverage, practical portfolio artifacts, and roadmap milestone velocity.
            </p>
          </div>

          {/* Overall Score Badge */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center ${getScoreColor(overallScore)}`}>
              <span className="text-2xl font-black">{overallScore}%</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold">Readiness</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white">Overall Status</span>
              <p className="text-xs text-slate-400">
                {overallScore >= 75 ? 'Strong Competitive Profile' : overallScore >= 50 ? 'Developing Competencies' : 'Early Foundation Stage'}
              </p>
              <span className="text-[11px] text-emerald-400 font-medium">
                {completedWeeksCount} of {totalWeeksCount || 8} roadmap weeks completed
              </span>
            </div>
          </div>
        </div>

        {/* Responsible AI Compliance Notice */}
        <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>White Paper & Responsible AI Governance Principle:</strong> This readiness indicator is strictly a personalized guidance diagnostic to help identify development gaps. It does <em>not</em> constitute an automated hiring guarantee or employer evaluation decision. Final employment decisions in Pakistan and globally remain subject to qualified human review and employer technical assessments.
          </div>
        </div>
      </div>

      {/* 4 Factor Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Technical Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              Technical Skills
            </span>
            <span className="text-sm font-bold text-emerald-400">{technicalScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className={`h-full ${getBarColor(technicalScore)} transition-all duration-500`} style={{ width: `${technicalScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Measures alignment with core technical tools and framework requirements from NAVTTC/P@SHA standards.
          </p>
        </div>

        {/* Soft Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              Soft & Communication
            </span>
            <span className="text-sm font-bold text-teal-400">{softSkillsScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className={`h-full ${getBarColor(softSkillsScore)} transition-all duration-500`} style={{ width: `${softSkillsScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Evaluates written English, analytical storytelling, client communication, and stakeholder management.
          </p>
        </div>

        {/* Portfolio & Proof of Work */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
              Portfolio & Proof-of-Work
            </span>
            <span className="text-sm font-bold text-amber-400">{portfolioScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className={`h-full ${getBarColor(portfolioScore)} transition-all duration-500`} style={{ width: `${portfolioScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Reflects public GitHub repositories, deployed demos, and verified Pakistan domain case studies.
          </p>
        </div>

        {/* Interview Readiness */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              Interview Preparation
            </span>
            <span className="text-sm font-bold text-indigo-400">{interviewScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className={`h-full ${getBarColor(interviewScore)} transition-all duration-500`} style={{ width: `${interviewScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Assesses preparation for behavioral questions (STAR format), technical coding tests, and live problem-solving.
          </p>
        </div>
      </div>

      {/* Strategic Improvement Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Strengths */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Verified Profile Strengths
          </h3>
          <ul className="space-y-2 text-xs">
            <li className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 text-slate-300">
              • Academic foundation in <strong>{profile.fieldOfStudy || 'Undergraduate studies'}</strong> provides strong transferable analytical discipline.
            </li>
            <li className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 text-slate-300">
              • Known technical skills ({profile.technicalSkills.slice(0, 3).join(', ') || 'Core competencies'}) reduce initial onboarding friction.
            </li>
            <li className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 text-slate-300">
              • Weekly commitment of <strong>{profile.weeklyHoursAvailable} hours</strong> supports steady progress toward market readiness.
            </li>
          </ul>
        </div>

        {/* High Priority Actions to Boost Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            Highest Yield Next Steps
          </h3>
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-300">Complete next weekly roadmap milestone</span>
              <button
                onClick={onGoToRoadmap}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                Go to Roadmap <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-300">Deploy authentic Pakistani portfolio project to GitHub</span>
              <button
                onClick={onGoToPortfolio}
                className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
              >
                Open Portfolio Lab <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-300">Ask Career Assistant for interview & CV guidance</span>
              <button
                onClick={onGoToAssistant}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                Ask Assistant <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
