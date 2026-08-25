import React from 'react';
import { 
  Compass, 
  User, 
  Sparkles, 
  Layers, 
  Calendar, 
  FolderGit2, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { UserProfile } from '../types';

export type WorkflowStep = 
  | 'profile'
  | 'assessment'
  | 'skill-gap'
  | 'roadmap'
  | 'portfolio'
  | 'readiness'
  | 'assistant'
  | 'evaluation';

interface NavbarProps {
  currentStep: WorkflowStep;
  onSelectStep: (step: WorkflowStep) => void;
  profile: UserProfile;
  hasAssessment: boolean;
  onOpenKnowledgeBase: () => void;
  onOpenEscalation: () => void;
  readinessScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onSelectStep,
  profile,
  hasAssessment,
  onOpenKnowledgeBase,
  onOpenEscalation,
  readinessScore,
}) => {
  const steps: { id: WorkflowStep; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'profile', label: '1. Profile', icon: User },
    { id: 'assessment', label: '2. AI Pathways', icon: Sparkles, badge: hasAssessment ? 'Ready' : undefined },
    { id: 'skill-gap', label: '3. Skill Gap', icon: Layers },
    { id: 'roadmap', label: '4. Roadmap', icon: Calendar },
    { id: 'portfolio', label: '5. Portfolio Lab', icon: FolderGit2 },
    { id: 'readiness', label: '6. Readiness', icon: TrendingUp },
    { id: 'assistant', label: '7. AI Assistant', icon: MessageSquare },
    { id: 'evaluation', label: '8. Audit & Safety', icon: ShieldCheck },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-sm" id="app-main-navbar">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white">RozgaarAI</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  Pakistan
                </span>
                <span className="hidden md:inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Bounded AI Workflow
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Your Education. Your Skills. Your Future — Guided by AI.
              </p>
            </div>
          </div>

          {/* User Quick Status & Actions */}
          <div className="flex items-center space-x-3">
            {/* Readiness Chip */}
            <button
              onClick={() => onSelectStep('readiness')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition text-xs text-slate-200"
              title="Career Readiness Guidance Indicator"
              id="navbar-readiness-indicator"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline text-slate-400">Readiness:</span>
              <span className="font-semibold text-emerald-400">{readinessScore}%</span>
            </button>

            {/* Knowledge Base Button */}
            <button
              onClick={onOpenKnowledgeBase}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition text-xs font-medium text-slate-200"
              id="navbar-open-knowledge-base"
              title="View Grounded Pakistani Knowledge Base"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="hidden md:inline">Trusted Knowledge</span>
            </button>

            {/* Human Escalation / Help */}
            <button
              onClick={onOpenEscalation}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition"
              id="navbar-open-escalation"
              title="Human Oversight & Advisory Escalation"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Human Oversight</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workflow Navigation Ribbon */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto scrollbar-none py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 sm:space-x-2 min-w-max">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                id={`nav-step-${step.id}`}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{step.label}</span>
                {step.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {step.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
