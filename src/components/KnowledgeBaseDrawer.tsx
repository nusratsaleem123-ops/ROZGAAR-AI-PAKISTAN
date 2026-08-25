import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Building2, 
  Award, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Layers, 
  GraduationCap
} from 'lucide-react';
import { VERIFIED_CAREER_DOMAINS, TRUSTED_SOURCES } from '../data/knowledgeBase';

interface KnowledgeBaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBaseDrawer: React.FC<KnowledgeBaseDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'careers' | 'sources'>('careers');

  if (!isOpen) return null;

  const filteredCareers = VERIFIED_CAREER_DOMAINS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.coreCompetencies.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm" id="knowledge-base-drawer">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-2xl h-full p-6 space-y-5 overflow-y-auto flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Trusted Pakistani Knowledge Base</h2>
              <p className="text-xs text-slate-400">Grounded evidence repository for RAG & career workflows</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Search */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'careers'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Pakistani Career Taxonomy ({VERIFIED_CAREER_DOMAINS.length})
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'sources'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Provenance Sources ({TRUSTED_SOURCES.length})
            </button>
          </div>

          {activeTab === 'careers' && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search taxonomy by role, skill, or keyword (e.g. Data, React, Accounting)..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-4">
          {activeTab === 'careers' && (
            <div className="space-y-4">
              {filteredCareers.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                        {c.category}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">{c.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 block">{c.recommendedPakistanEntryPKR}</span>
                      <span className="text-[10px] text-teal-300">{c.freelanceRateUSD}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Top Cities / Hubs:</span>
                      <span className="text-slate-200">{c.topLocalCities.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Typical Entry Degrees:</span>
                      <span className="text-slate-200 truncate block">{c.entryEducation.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 block">Required Competencies:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.coreCompetencies.map((sk) => (
                        <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    Source: <strong className="text-slate-300">{c.sourceRef}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-3">
              {TRUSTED_SOURCES.map((src, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{src.name}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {src.publisher} ({src.year})
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{src.description}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-800">
                    <span>Category: <strong>{src.category}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

