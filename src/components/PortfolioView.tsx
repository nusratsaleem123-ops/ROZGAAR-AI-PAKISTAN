import React, { useState } from 'react';
import { 
  FolderGit2, 
  Database, 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Target, 
  Award, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { PortfolioProject, UserProfile } from '../types';

interface PortfolioViewProps {
  portfolioProject: PortfolioProject | null;
  careerTitle: string;
  onRegeneratePortfolio: () => void;
  onGoToReadiness: () => void;
  isLoading: boolean;
  profile: UserProfile;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  portfolioProject,
  careerTitle,
  onRegeneratePortfolio,
  onGoToReadiness,
  isLoading,
  profile,
}) => {
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedBullets, setCopiedBullets] = useState(false);

  const handleCopyReadme = () => {
    if (!portfolioProject?.githubReadmeSnippet) return;
    navigator.clipboard.writeText(portfolioProject.githubReadmeSnippet);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleCopyBullets = () => {
    if (!portfolioProject?.resumeAndPortfolioBulletPoints) return;
    navigator.clipboard.writeText(portfolioProject.resumeAndPortfolioBulletPoints.join('\n• '));
    setCopiedBullets(true);
    setTimeout(() => setCopiedBullets(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4" id="portfolio-loading">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
        <h3 className="text-base font-semibold text-white">Generating Real-World Pakistan Portfolio Project...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Extracting authentic problem context, open datasets (PBS, SBP, Kaggle PK), and recruiter-tested resume bullets for {careerTitle}.
        </p>
      </div>
    );
  }

  if (!portfolioProject) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3" id="portfolio-empty">
        <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto" />
        <h3 className="text-sm font-semibold text-slate-300">Portfolio Lab Ready</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Generate an authentic Pakistani domain project tailored to {careerTitle} with real open datasets and GitHub scaffolding.
        </p>
        <button
          onClick={onRegeneratePortfolio}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition mt-2"
        >
          Generate Portfolio Specification
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="portfolio-view-container">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Pakistan Proof-of-Work Project
              </span>
              <span className="text-xs text-slate-400">Target Role: {portfolioProject.careerTarget}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{portfolioProject.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Domain Context: <strong className="text-slate-300">{portfolioProject.domainContext}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRegeneratePortfolio}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Generate New Project</span>
            </button>
            <button
              onClick={onGoToReadiness}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm transition flex items-center gap-1.5"
            >
              <span>Check Career Readiness</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Problem Statement Box */}
        <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
            Real-World Pakistani Problem Statement
          </span>
          <p className="text-slate-200 leading-relaxed">
            {portfolioProject.problemStatement}
          </p>
        </div>
      </div>

      {/* 2 Column Details: Methodology & Datasets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Objectives & Methodology */}
        <div className="space-y-6">
          {/* Objectives */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              Project Objectives
            </h3>
            <ul className="space-y-2">
              {portfolioProject.objectives?.map((obj, idx) => (
                <li key={idx} className="text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-750/60 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Methodology */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Step-by-Step Technical Execution
            </h3>
            <ol className="space-y-2 text-xs">
              {portfolioProject.stepByStepMethodology?.map((step, idx) => (
                <li key={idx} className="text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-750/60 flex items-start gap-2">
                  <span className="font-semibold text-emerald-400 shrink-0">Step {idx + 1}:</span>
                  <span>{step.replace(/^Step \d+:\s*/, '')}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Column: Datasets, Tech Stack & Resume Points */}
        <div className="space-y-6">
          {/* Datasets & Open Sources */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Authentic Pakistani Datasets & Sources
            </h3>
            <div className="space-y-2.5">
              {portfolioProject.pakistaniDatasetsAndSources?.map((ds, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-300">{ds.name}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      Verified Open Data
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{ds.description}</p>
                  <p className="text-[10px] text-slate-400">Source: <strong className="text-slate-300">{ds.source}</strong></p>
                </div>
              ))}
            </div>

            {/* Recommended Tools */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-1.5">Recommended Tech Stack & Tools:</span>
              <div className="flex flex-wrap gap-1.5">
                {portfolioProject.recommendedToolsAndStack?.map((tool, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Resume & CV Recruiter Bullet Points */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Recruiter-Ready CV Bullet Points (STAR Format)
              </h3>
              <button
                onClick={handleCopyBullets}
                className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
              >
                {copiedBullets ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBullets ? 'Copied!' : 'Copy Bullets'}</span>
              </button>
            </div>
            <ul className="space-y-2">
              {portfolioProject.resumeAndPortfolioBulletPoints?.map((bp, idx) => (
                <li key={idx} className="text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-slate-750/60 leading-relaxed">
                  • {bp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* GitHub README Scaffolding */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-white">GitHub README Scaffolding</h3>
          </div>
          <button
            onClick={handleCopyReadme}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition"
          >
            {copiedReadme ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReadme ? 'Copied Markdown' : 'Copy README.md'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
          {portfolioProject.githubReadmeSnippet}
        </pre>
      </div>

      {/* Evaluation Rubric */}
      {portfolioProject.evaluationRubric && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Self-Assessment Evaluation Rubric
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {portfolioProject.evaluationRubric.map((rubric, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-850 border border-slate-800 text-xs space-y-1">
                <span className="font-semibold text-emerald-300">{rubric.criterion}</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">{rubric.target}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
