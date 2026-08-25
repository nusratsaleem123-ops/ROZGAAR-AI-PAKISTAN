import React from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { SkillGapAnalysisResult, SkillGapItem, UserProfile } from '../types';

interface SkillGapViewProps {
  skillGapResult: SkillGapAnalysisResult | null;
  careerTitle: string;
  onGenerateRoadmap: () => void;
  onRefreshGapAnalysis: () => void;
  isLoading: boolean;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  skillGapResult,
  careerTitle,
  onGenerateRoadmap,
  onRefreshGapAnalysis,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4" id="skillgap-loading">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
        <h3 className="text-base font-semibold text-white">Mapping Competencies & Missing Skill Gaps...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Comparing your current profile against {careerTitle} standards using NAVTTC NVQF and DigiSkills curriculum frameworks.
        </p>
      </div>
    );
  }

  if (!skillGapResult) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3" id="skillgap-empty">
        <Layers className="w-8 h-8 text-slate-500 mx-auto" />
        <h3 className="text-sm font-semibold text-slate-300">Skill Gap Analysis Not Generated</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Select a career from Step 2 or click below to analyze your skill delta for {careerTitle || 'your target career'}.
        </p>
        <button
          onClick={onRefreshGapAnalysis}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition mt-2"
        >
          Run Skill Gap Analysis
        </button>
      </div>
    );
  }

  const alreadyHave = skillGapResult.skills?.filter((s) => s.status === 'Already Have') || [];
  const improve = skillGapResult.skills?.filter((s) => s.status === 'Improve') || [];
  const needToLearn = skillGapResult.skills?.filter((s) => s.status === 'Need to Learn') || [];

  return (
    <div className="space-y-6" id="skillgap-view-container">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400">Target Role</span>
          <p className="text-sm font-bold text-white mt-1 truncate" title={skillGapResult.careerTitle}>
            {skillGapResult.careerTitle}
          </p>
          <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
            {skillGapResult.matchPercentage}% Skill Match
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400">Skills Already Acquired</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-400">{alreadyHave.length}</span>
            <span className="text-xs text-slate-400">transferable competencies</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Verified from current profile</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400">Skills to Bridge</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-400">{needToLearn.length + improve.length}</span>
            <span className="text-xs text-slate-400">({needToLearn.length} new, {improve.length} polish)</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-400/80">Categorized by priority</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400">Estimated Effort</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-teal-400">{skillGapResult.totalEstimatedHours}h</span>
            <span className="text-xs text-slate-400">total practice time</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Based on self-paced study</div>
        </div>
      </div>

      {/* Strategic Advice Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Strategic Learning Focus</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {skillGapResult.strategicAdvice}
            </p>
          </div>
          <button
            onClick={onGenerateRoadmap}
            id="btn-roadmap-from-gap"
            className="shrink-0 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md flex items-center gap-2 transition"
          >
            <span>Generate Customized Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Section Breakdown: Need to Learn, Improve, Already Have */}
      <div className="space-y-6">
        {/* Section 1: Need to Learn */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <h4 className="text-sm font-bold text-white">1. Missing Skills to Learn from Scratch ({needToLearn.length})</h4>
            </div>
            <span className="text-xs text-slate-400">High leverage for entry employability</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {needToLearn.map((item, idx) => (
              <SkillCard key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* Section 2: Improve */}
        {improve.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h4 className="text-sm font-bold text-white">2. Skills Requiring Strengthening ({improve.length})</h4>
              </div>
              <span className="text-xs text-slate-400">Elevate to professional portfolio standard</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improve.map((item, idx) => (
                <SkillCard key={idx} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Already Have */}
        {alreadyHave.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h4 className="text-sm font-bold text-white">3. Existing Transferable Skills ({alreadyHave.length})</h4>
              </div>
              <span className="text-xs text-emerald-400 font-medium">Ready to showcase on CV</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alreadyHave.map((item, idx) => (
                <SkillCard key={idx} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Provenance Footer */}
      <div className="text-[11px] text-slate-400 flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          {skillGapResult.provenanceNotes || 'Grounded in NAVTTC National Competency Standards & DigiSkills.pk.'}
        </span>
      </div>
    </div>
  );
};

const SkillCard: React.FC<{ item: SkillGapItem }> = ({ item }) => {
  const priorityColor = 
    item.priority === 'High' 
      ? 'bg-red-950/80 text-red-300 border-red-800'
      : item.priority === 'Medium'
      ? 'bg-amber-950/80 text-amber-300 border-amber-800'
      : 'bg-slate-800 text-slate-300 border-slate-700';

  const statusBadge = 
    item.status === 'Need to Learn'
      ? 'bg-red-900/40 text-red-300'
      : item.status === 'Improve'
      ? 'bg-amber-900/40 text-amber-300'
      : 'bg-emerald-900/40 text-emerald-300';

  return (
    <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityColor}`}>
              {item.priority} Priority
            </span>
            <span className="text-[10px] text-slate-400">{item.category}</span>
          </div>
          <h5 className="text-sm font-bold text-white mt-1.5">{item.skill}</h5>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {item.estimatedHours} hrs
          </span>
        </div>
      </div>

      <div className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
        <span className="text-slate-400 text-[11px] block">Key Concept to Master:</span>
        <span className="font-medium">{item.keyConceptToMaster}</span>
      </div>

      {/* Free Pakistani / Global Curated Resource */}
      {item.curatedFreeResource && (
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 truncate mr-2">
            <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate font-medium text-[11px]">
              {item.curatedFreeResource.platform}: {item.curatedFreeResource.title}
            </span>
          </div>
          {item.curatedFreeResource.pakistaniFriendly && (
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
              Pakistani Friendly
            </span>
          )}
        </div>
      )}
    </div>
  );
};
