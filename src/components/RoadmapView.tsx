import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Code, 
  Award, 
  FolderGit2, 
  Sparkles, 
  FileText, 
  Download,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { LearningRoadmap, RoadmapWeek, UserProfile } from '../types';

interface RoadmapViewProps {
  roadmap: LearningRoadmap | null;
  careerTitle: string;
  completedWeeks: number[];
  onToggleWeekCompletion: (weekNumber: number) => void;
  onGoToPortfolio: () => void;
  onRegenerateRoadmap: () => void;
  isLoading: boolean;
  profile: UserProfile;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  careerTitle,
  completedWeeks,
  onToggleWeekCompletion,
  onGoToPortfolio,
  onRegenerateRoadmap,
  isLoading,
  profile,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4" id="roadmap-loading">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
        <h3 className="text-base font-semibold text-white">Generating Personalized {profile.weeklyHoursAvailable}h/week Roadmap...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Structuring progressive milestones, curated DigiSkills/YouTube resources, and hands-on deliverables for {careerTitle}.
        </p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3" id="roadmap-empty">
        <Calendar className="w-8 h-8 text-slate-500 mx-auto" />
        <h3 className="text-sm font-semibold text-slate-300">No Active Learning Roadmap</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Generate a custom week-by-week learning plan tailored to your available time ({profile.weeklyHoursAvailable} hrs/week).
        </p>
        <button
          onClick={onRegenerateRoadmap}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition mt-2"
        >
          Generate Learning Roadmap
        </button>
      </div>
    );
  }

  const totalWeeks = roadmap.weeks?.length || 0;
  const completedCount = completedWeeks.length;
  const progressPercent = totalWeeks > 0 ? Math.round((completedCount / totalWeeks) * 100) : 0;

  // Extract unique phases
  const phases = ['All', ...Array.from(new Set(roadmap.weeks?.map((w) => w.phaseTitle) || []))];

  const filteredWeeks = selectedPhase === 'All' 
    ? roadmap.weeks 
    : roadmap.weeks?.filter((w) => w.phaseTitle === selectedPhase);

  const handleDownloadRoadmap = () => {
    const textContent = `RozgaarAI Pakistan - Personalized Learning Roadmap
Career Track: ${roadmap.careerTitle}
Estimated Commitment: ${roadmap.hoursPerWeek} Hours / Week (${roadmap.durationWeeks} Weeks Total)
Student: ${profile.fullName || 'Candidate'} (${profile.education})

${roadmap.weeks.map(w => `
--- WEEK ${w.weekNumber}: ${w.theme} (${w.phaseTitle}) ---
Hours Required: ${w.hoursRequired}h
Objectives:
${w.learningObjectives.map(o => `  • ${o}`).join('\n')}
Key Topics: ${w.topics.join(', ')}
Hands-on Milestone Task:
  Title: ${w.handsOnTask.title}
  Deliverable: ${w.handsOnTask.deliverable}
`).join('\n')}

Capstone Project Summary:
${roadmap.capstoneProjectSummary}

Grounded in: ${roadmap.provenance}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RozgaarAI_Roadmap_${roadmap.careerTitle.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6" id="roadmap-view-container">
      {/* Header & Progress Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Active Curriculum
              </span>
              <span className="text-xs text-slate-400">
                Paced for <strong>{roadmap.hoursPerWeek} hours/week</strong> ({roadmap.durationWeeks} Weeks Total)
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{roadmap.careerTitle} — Guided Learning Path</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadRoadmap}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
              title="Export Roadmap as Text Document"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Plan</span>
            </button>
            <button
              onClick={onGoToPortfolio}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm flex items-center gap-1.5 transition"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio Lab</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Roadmap Execution Progress</span>
            <span className="font-bold text-emerald-400">
              {completedCount} of {totalWeeks} Weeks Finished ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs text-slate-400 mr-2 shrink-0">Filter Phase:</span>
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition whitespace-nowrap ${
                selectedPhase === phase
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {/* Week by Week Schedule Accordion / Timeline */}
      <div className="space-y-4">
        {filteredWeeks?.map((week) => {
          const isDone = completedWeeks.includes(week.weekNumber);
          const isExpanded = expandedWeek === week.weekNumber;

          return (
            <div
              key={week.weekNumber}
              id={`roadmap-week-${week.weekNumber}`}
              className={`rounded-xl border transition-all ${
                isDone 
                  ? 'bg-slate-900/90 border-emerald-800/80' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-750'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWeekCompletion(week.weekNumber);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition shrink-0 ${
                      isDone 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-800 border border-slate-700 text-slate-500 hover:text-emerald-400 hover:border-emerald-500'
                    }`}
                    title={isDone ? 'Mark as Incomplete' : 'Mark Week as Completed'}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {week.phaseTitle}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {week.hoursRequired} hrs
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold mt-0.5 ${isDone ? 'text-emerald-200 line-through' : 'text-white'}`}>
                      {week.theme}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isDone && (
                    <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Completed
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-4 text-xs">
                  {/* Objectives & Topics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="font-semibold text-slate-300 block">Weekly Learning Objectives:</span>
                      <ul className="space-y-1.5">
                        {week.learningObjectives.map((obj, idx) => (
                          <li key={idx} className="text-slate-400 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="font-semibold text-slate-300 block">Core Topics to Cover:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {week.topics.map((t, idx) => (
                          <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Curated Resources */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="font-semibold text-slate-300 block">Curated Free Study Resources:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {week.recommendedResources.map((res, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-800/60 border border-slate-750 flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate mr-2">
                            <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <div className="truncate">
                              <p className="font-medium text-slate-200 truncate">{res.name}</p>
                              <span className="text-[10px] text-slate-400">{res.provider} ({res.type})</span>
                            </div>
                          </div>
                          {res.isFree && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                              Free
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hands-on Task Box */}
                  <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <Code className="w-4 h-4" />
                      <span>Hands-On Milestone Task: {week.handsOnTask?.title}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {week.handsOnTask?.description}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-1">
                      <strong>Deliverable:</strong> {week.handsOnTask?.deliverable}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Capstone Summary Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Capstone Project Goal</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {roadmap.capstoneProjectSummary}
        </p>
        <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
          <span>{roadmap.provenance}</span>
          <button
            onClick={onGoToPortfolio}
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            Launch Portfolio Lab ➔
          </button>
        </div>
      </div>
    </div>
  );
};
