import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  UserCheck, 
  Building2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Send,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface HumanEscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const HumanEscalationModal: React.FC<HumanEscalationModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [issueType, setIssueType] = useState('Career Transition Advice');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="human-escalation-modal">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Human Oversight & Advisor Escalation</h2>
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                White Paper Mandate
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              RozgaarAI is an AI-assisted decision support system. Complex personal situations benefit from direct human guidance.
            </p>
          </div>
        </div>

        {/* Verified Pakistani Human Guidance Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Building2 className="w-4 h-4" />
              <span>NAVTTC Regional Counseling</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              National Vocational and Technical Training Commission centers across Karachi, Lahore, Islamabad, Peshawar & Quetta.
            </p>
            <div className="text-[10px] text-slate-400 pt-1">
              Toll-Free Helpline: <strong>0800-88866</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-semibold">
              <UserCheck className="w-4 h-4" />
              <span>University Placement Advisory</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Guidance offices at HEC recognized institutions (NUST, FAST, LUMS, IBA, PU, UET) offering in-person career counseling.
            </p>
            <div className="text-[10px] text-slate-400 pt-1">
              HEC Guidance Portal: <strong>hec.gov.pk/careers</strong>
            </div>
          </div>
        </div>

        {/* Escalation Request Form */}
        {isSubmitted ? (
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Escalation Request Logged</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your profile context ({profile.fullName || 'Candidate'}, {profile.education}) and query have been flagged for human mentor review. A certified advisor will review your roadmap.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition mt-2"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="font-semibold text-slate-200 block">Submit Inquiry for Human Career Counselor:</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Inquiry Topic</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Career Transition Advice">Non-Tech to Tech Career Transition</option>
                  <option value="Freelancing Guidance">Freelancing Payment & Client Strategy</option>
                  <option value="Academic Equivalence">HEC / Foreign Degree Equivalence</option>
                  <option value="Special Needs or Hardware Limitations">Hardware / Financial Constraints Support</option>
                  <option value="Other Human Review">Report an AI Output Discrepancy</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Preferred Response Mode</label>
                <input
                  type="text"
                  placeholder="Email or WhatsApp Number"
                  defaultValue="career-support@rozgaar-ai.pk"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Describe your specific situation or question:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. I have an economics degree and want advice on whether to focus on Power BI or Python for local Karachi corporate jobs..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero personally identifiable information sold or shared.
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Advisor</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
