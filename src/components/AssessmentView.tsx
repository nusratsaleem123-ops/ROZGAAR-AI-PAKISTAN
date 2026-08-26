import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Calendar, 
  FolderGit2, 
  BookOpen, 
  ShieldCheck,
  Briefcase,
  User,
  GraduationCap,
  Clock,
  Laptop,
  Edit3
} from 'lucide-react';
import { CareerRecommendation, UserProfile } from '../types';

interface AssessmentViewProps {
  recommendations: CareerRecommendation[];
  selectedCareer: CareerRecommendation | null;
  onSelectCareer: (career: CareerRecommendation) => void;
  onGoToSkillGap: (career: CareerRecommendation) => void;
  onGoToRoadmap: (career: CareerRecommendation) => void;
  onGoToPortfolio: (career: CareerRecommendation) => void;
  onGoBackToProfile?: () => void;
  onRunAssessment?: () => void;
  profile: UserProfile;
  isLoading: boolean;
  error?: string | null;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  recommendations,
  selectedCareer,
  onSelectCareer,
  onGoToSkillGap,
  onGoToRoadmap,
  onGoToPortfolio,
  onGoBackToProfile,
  onRunAssessment,
  profile,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4" id="assessment-loading">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
        <h3 className="text-base font-semibold text-white">Synthesizing Career Pathways with AI & Pakistan RAG...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Cross-referencing your academic profile ({profile.education || 'Education'} in {profile.fieldOfStudy || 'Field of Study'}) with P@SHA, NAVTTC, and DigiSkills.pk standards.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="assessment-view-container">
      {/* 1. Candidate Profile Summary Card (Always Visible) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm" id="candidate-profile-summary-banner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/80 flex items-center justify-center text-emerald-400 font-bold text-base shadow-sm">
              {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {profile.fullName || 'Candidate (Unnamed Profile)'}
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Active Candidate
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {profile.location || 'Pakistan'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <GraduationCap className="w-3 h-3 text-teal-400" />
                  {profile.education} {profile.fieldOfStudy ? `in ${profile.fieldOfStudy}` : ''}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onGoBackToProfile && (
              <button
                onClick={onGoBackToProfile}
                id="edit-profile-from-assessment-btn"
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit / Update Profile</span>
              </button>
            )}
            {onRunAssessment && (
              <button
                onClick={onRunAssessment}
                id="re-assess-button"
                type="button"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Re-Run AI Assessment</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Profile Meta Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-1">
          {/* Box 1: Experience & Status */}
          <div className="p-3 rounded-lg bg-slate-850 border border-slate-800/90 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Experience & Status</span>
            <p className="font-semibold text-slate-200">{profile.experienceLevel}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{profile.employmentStatus}</p>
          </div>

          {/* Box 2: Technical Skills */}
          <div className="p-3 rounded-lg bg-slate-850 border border-slate-800/90 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Technical & Software Skills</span>
            {profile.technicalSkills && profile.technicalSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                {profile.technicalSkills.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-amber-400/90">No technical skills listed yet</p>
            )}
          </div>

          {/* Box 3: Soft Skills & Languages */}
          <div className="p-3 rounded-lg bg-slate-850 border border-slate-800/90 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Soft Skills & Languages</span>
            {profile.softSkills && profile.softSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                {profile.softSkills.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">{profile.languages?.join(', ') || 'English, Urdu'}</p>
            )}
          </div>

          {/* Box 4: Constraints & Goals */}
          <div className="p-3 rounded-lg bg-slate-850 border border-slate-800/90 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Study Hours & Format</span>
            <p className="font-semibold text-emerald-400">{profile.weeklyHoursAvailable} hours/week • {profile.budgetPreference}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{profile.careerPreferences?.join(', ') || 'Remote & Local'}</p>
          </div>
        </div>
      </div>

      {/* Error state if any */}
      {error && (
        <div className="bg-slate-900 border border-amber-800/80 rounded-xl p-5 text-center space-y-3" id="assessment-error-container">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Assessment Note</span>
          </div>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {error}
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            {onRunAssessment && (
              <button
                onClick={onRunAssessment}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Re-Evaluate Now</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!recommendations || recommendations.length === 0) ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-4" id="assessment-empty">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-semibold text-white">Generate Career Recommendations for {profile.fullName || 'Candidate'}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click below to cross-reference your profile with Pakistani and global remote industry benchmarks.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            {onRunAssessment && (
              <button
                onClick={onRunAssessment}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-950/60"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Recommendations Now</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Header Banner */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Matched AI Career Pathways</h3>
              <p className="text-xs text-slate-400">
                Select a pathway below to view detailed Pakistani market demand, skill gap matrix, and roadmaps.
              </p>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              P@SHA & NAVTTC Benchmarks
            </span>
          </div>

          {/* Pathways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendations.map((career) => {
              const isSelected = selectedCareer?.id === career.id;
              return (
                <div
                  key={career.id}
                  onClick={() => onSelectCareer(career)}
                  id={`career-card-${career.id}`}
                  className={`cursor-pointer rounded-xl p-5 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-850 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {career.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                          {career.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mt-2.5 line-clamp-2">{career.title}</h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">{career.summary}</p>

                    {/* Confidence & Uncertainty */}
                    <div className="mt-3.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-[11px]">
                      <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                        <span>AI Confidence:</span>
                        <span className={`font-semibold ${
                          career.confidence === 'High' ? 'text-emerald-400' : career.confidence === 'Medium' ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          {career.confidence} Confidence
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2">
                        {career.confidenceReasoning}
                      </p>
                    </div>

                    {/* Salary & Freelance quick tags */}
                    <div className="mt-3.5 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="text-slate-400 text-[11px]">Local Entry:</span>
                        <span className="font-semibold text-emerald-300">{career.pakistanMarketContext?.salaryRangeLocalPKR}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="text-slate-400 text-[11px]">Freelance:</span>
                        <span className="font-semibold text-teal-300">{career.pakistanMarketContext?.freelanceHourlyUSD}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Est. Effort: <strong className="text-slate-200">{career.estimatedEffortWeeks} weeks</strong>
                    </span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${
                      isSelected ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {isSelected ? 'Selected' : 'View Deep Dive'} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Career Deep Dive Details */}
          {selectedCareer && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6" id="selected-career-deep-dive">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Detailed Pathway Exploration
                    </span>
                    <span className="text-xs text-slate-400">Category: {selectedCareer.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedCareer.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                    {selectedCareer.summary}
                  </p>
                </div>

                {/* Quick Action Navigation Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onGoToSkillGap(selectedCareer)}
                    id="btn-inspect-skill-gap"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Skill Gap Matrix</span>
                  </button>
                  <button
                    onClick={() => onGoToRoadmap(selectedCareer)}
                    id="btn-generate-roadmap"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>Personalized Roadmap</span>
                  </button>
                  <button
                    onClick={() => onGoToPortfolio(selectedCareer)}
                    id="btn-generate-portfolio"
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Pakistan Portfolio Lab</span>
                  </button>
                </div>
              </div>

              {/* 3 Column Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Why Recommended & Strengths */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Why Recommended for You
                  </h4>
                  <ul className="space-y-2">
                    {selectedCareer.whyRecommended?.map((reason, idx) => (
                      <li key={idx} className="text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-750/60 leading-relaxed">
                        {reason}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">
                    Your Transferable Strengths
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareer.userStrengths?.map((str, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {str}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pakistan Market Reality & Employers */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-teal-400" />
                    Pakistani Market Context
                  </h4>
                  <div className="bg-slate-800/50 p-3.5 rounded-lg border border-slate-700/60 space-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Local Entry Level Monthly:</span>
                      <span className="font-semibold text-emerald-300">{selectedCareer.pakistanMarketContext?.salaryRangeLocalPKR}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Global Freelance Rate:</span>
                      <span className="font-semibold text-teal-300">{selectedCareer.pakistanMarketContext?.freelanceHourlyUSD}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Top Pakistani Hiring Hubs:</span>
                      <span className="text-slate-200">{selectedCareer.pakistanMarketContext?.topHiringHubs?.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Typical Employers / Platforms:</span>
                      <span className="text-slate-200">{selectedCareer.pakistanMarketContext?.typicalEmployersOrPlatforms?.join(', ')}</span>
                    </div>
                  </div>

                  {/* Provenance sources cited */}
                  <div className="text-[11px] text-slate-400">
                    <span className="font-medium text-slate-300">Trusted Sources Cited: </span>
                    <span>{selectedCareer.sourcesCited?.join(' • ')}</span>
                  </div>
                </div>

                {/* Immediate Next Steps */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    Suggested Next Actions
                  </h4>
                  <ul className="space-y-2">
                    {selectedCareer.suggestedImmediateNextSteps?.map((step, idx) => (
                      <li key={idx} className="text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-750/60 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Responsible AI Disclaimer */}
                  <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-[11px] text-amber-300/80">
                    <strong>Decision Support Notice:</strong> Career demand and compensation are based on industry surveys and aggregate market data. Final hiring is subject to individual competence and employer evaluation.
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

