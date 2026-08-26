import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Clock, 
  Laptop, 
  Sparkles, 
  Plus, 
  X, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Languages, 
  HeartHandshake,
  AlertCircle,
  Save,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { UserProfile, EducationLevel, ExperienceLevel, EmploymentStatus, CareerPreference } from '../types';
import { PAKISTAN_PRESET_PERSONAS } from '../data/pakistanPersonas';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onSaveProfile: (profileToSave: UserProfile) => boolean;
  onRunAssessment: () => void;
  isLoading: boolean;
  assessmentError?: string | null;
  onClearAssessmentError?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onSaveProfile,
  onRunAssessment,
  isLoading,
  assessmentError,
  onClearAssessmentError,
}) => {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const pakistanLocations = [
    'Karachi, Sindh',
    'Lahore, Punjab',
    'Islamabad, Federal Capital',
    'Rawalpindi, Punjab',
    'Peshawar, Khyber Pakhtunkhwa',
    'Quetta, Balochistan',
    'Faisalabad, Punjab',
    'Multan, Punjab',
    'Sialkot, Punjab',
    'Gujranwala, Punjab',
    'Hyderabad, Sindh',
    'Abbottabad, KP',
    'Gilgit / Skardu, GB',
    'Muzaffarabad, AJK',
    'Remote / Other Region'
  ];

  const educationOptions: EducationLevel[] = [
    'Matric / Secondary',
    'Intermediate / FSc / FA / ICS',
    'Bachelors (In Progress)',
    'Bachelors (Graduated)',
    'Masters / MS / MPhil',
    'Other / Diploma'
  ];

  const experienceOptions: ExperienceLevel[] = [
    'No Experience / Student',
    'Beginner (0-1 year)',
    'Intermediate (1-3 years)',
    'Experienced (3+ years)',
    'Career Switcher'
  ];

  const employmentOptions: EmploymentStatus[] = [
    'Student',
    'Unemployed / Job Seeking',
    'Employed (Looking to Switch)',
    'Freelancer (Part-time / Full-time)',
    'Self-employed / Entrepreneur'
  ];

  const careerPreferenceOptions: CareerPreference[] = [
    'Full-Time Employment (Local)',
    'Remote Work (International / Local)',
    'Freelancing (Upwork / Fiverr / Direct)',
    'Entrepreneurship / Startup',
    'Higher Education / Research'
  ];

  const validate = (data: UserProfile): string[] => {
    const errors: string[] = [];
    if (!data.fullName || !data.fullName.trim()) {
      errors.push('Full Name is required.');
    }
    if (!data.location || !data.location.trim()) {
      errors.push('Location in Pakistan is required.');
    }
    if (!data.education) {
      errors.push('Education level is required.');
    }
    if (!data.fieldOfStudy || !data.fieldOfStudy.trim()) {
      errors.push('Field of Study / Major is required.');
    }
    if (!data.technicalSkills || data.technicalSkills.length === 0) {
      errors.push('Please add at least one technical skill or software tool.');
    }
    return errors;
  };

  const handleSave = () => {
    if (onClearAssessmentError) onClearAssessmentError();
    const errors = validate(profile);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setSaveNotification(null);
      return false;
    }

    setValidationErrors([]);
    const success = onSaveProfile(profile);
    if (success) {
      setSaveNotification('Profile saved successfully. Your details are now persisted and ready for AI assessment.');
      setTimeout(() => {
        setSaveNotification(null);
      }, 5000);
      return true;
    }
    return false;
  };

  const handleRunAssessmentClick = () => {
    if (onClearAssessmentError) onClearAssessmentError();
    const errors = validate(profile);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setSaveNotification(null);
      return;
    }

    setValidationErrors([]);
    onSaveProfile(profile);
    onRunAssessment();
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PAKISTAN_PRESET_PERSONAS.find((p) => p.id === presetId);
    if (preset && preset.profile) {
      const updated: UserProfile = {
        ...profile,
        ...preset.profile,
        updatedAt: new Date().toISOString()
      };
      onUpdateProfile(updated);
      onSaveProfile(updated);
      setValidationErrors([]);
      setSaveNotification(`Loaded persona "${preset.label}" and saved to profile.`);
      setTimeout(() => setSaveNotification(null), 4000);
    }
  };

  const handleAddSkill = (type: 'technical' | 'soft' | 'interest', value: string) => {
    if (!value.trim()) return;
    const trimmed = value.trim();
    if (type === 'technical') {
      if (!profile.technicalSkills.includes(trimmed)) {
        const updated = { ...profile, technicalSkills: [...profile.technicalSkills, trimmed] };
        onUpdateProfile(updated);
      }
      setTechInput('');
    } else if (type === 'soft') {
      if (!profile.softSkills.includes(trimmed)) {
        const updated = { ...profile, softSkills: [...profile.softSkills, trimmed] };
        onUpdateProfile(updated);
      }
      setSoftInput('');
    } else if (type === 'interest') {
      if (!profile.interests.includes(trimmed)) {
        const updated = { ...profile, interests: [...profile.interests, trimmed] };
        onUpdateProfile(updated);
      }
      setInterestInput('');
    }
  };

  const handleRemoveSkill = (type: 'technical' | 'soft' | 'interest', itemToRemove: string) => {
    if (type === 'technical') {
      onUpdateProfile({ ...profile, technicalSkills: profile.technicalSkills.filter(s => s !== itemToRemove) });
    } else if (type === 'soft') {
      onUpdateProfile({ ...profile, softSkills: profile.softSkills.filter(s => s !== itemToRemove) });
    } else if (type === 'interest') {
      onUpdateProfile({ ...profile, interests: profile.interests.filter(s => s !== itemToRemove) });
    }
  };

  const handleTogglePreference = (pref: CareerPreference) => {
    const exists = profile.careerPreferences.includes(pref);
    const updated = exists 
      ? profile.careerPreferences.filter(p => p !== pref)
      : [...profile.careerPreferences, pref];
    onUpdateProfile({ ...profile, careerPreferences: updated });
  };

  return (
    <div className="space-y-6" id="profile-container">
      {/* Introduction & Persona Presets */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              Structured Career Profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Transforming individual background, constraints, and education into explainable AI-guided pathways.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              id="top-save-profile-button"
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span>Save Profile</span>
            </button>
            <button
              onClick={handleRunAssessmentClick}
              disabled={isLoading}
              id="top-run-assessment-button"
              type="button"
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Assessing...' : 'Run Assessment'}</span>
            </button>
          </div>
        </div>

        {/* Persona quick buttons */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Quick-Load Authentic Pakistani Personas:</span>
            <span className="text-[11px] text-slate-500">1-click populated profiles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PAKISTAN_PRESET_PERSONAS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                id={`preset-btn-${preset.id}`}
                type="button"
                className="text-left p-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {preset.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 transition">Load ➔</span>
                </div>
                <p className="text-xs font-semibold text-slate-200 mt-1.5">{preset.label}</p>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveNotification && (
        <div 
          id="profile-save-success-banner" 
          className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-600/80 text-emerald-200 flex items-start justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-300">Profile Saved Successfully</h4>
              <p className="text-xs text-emerald-200/90 mt-0.5">{saveNotification}</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setSaveNotification(null)}
            className="text-emerald-400 hover:text-emerald-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Validation Errors Banner */}
      {validationErrors.length > 0 && (
        <div 
          id="profile-validation-error-banner"
          className="p-4 rounded-xl bg-rose-950/70 border border-rose-600/80 text-rose-200 flex items-start justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-300">Please Complete Required Fields Before Saving:</h4>
              <ul className="text-xs text-rose-200/90 mt-1 list-disc list-inside space-y-0.5">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setValidationErrors([])}
            className="text-rose-400 hover:text-rose-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Assessment Error Banner */}
      {assessmentError && (
        <div 
          id="profile-assessment-error-banner"
          className="p-4 rounded-xl bg-amber-950/70 border border-amber-600/80 text-amber-200 flex items-start justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300">Assessment Error</h4>
              <p className="text-xs text-amber-200/90 mt-0.5">{assessmentError}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRunAssessmentClick}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold transition"
            >
              Retry
            </button>
            {onClearAssessmentError && (
              <button 
                type="button" 
                onClick={onClearAssessmentError}
                className="text-amber-400 hover:text-amber-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Academic & Location */}
        <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <GraduationCap className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">Education & Location</h3>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Full Name <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => onUpdateProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Zainab Farooq"
              id="profile-fullname-input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Location in Pakistan <span className="text-emerald-400">*</span>
            </label>
            <select
              value={profile.location}
              onChange={(e) => onUpdateProfile({ ...profile, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              id="profile-location-select"
            >
              {pakistanLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Education Level <span className="text-emerald-400">*</span>
            </label>
            <select
              value={profile.education}
              onChange={(e) => onUpdateProfile({ ...profile, education: e.target.value as EducationLevel })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              id="profile-education-select"
            >
              {educationOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Field of Study / Major <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              value={profile.fieldOfStudy}
              onChange={(e) => onUpdateProfile({ ...profile, fieldOfStudy: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Economics, Computer Science, BBA, Commerce"
              id="profile-field-input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Employment Status</label>
            <select
              value={profile.employmentStatus}
              onChange={(e) => onUpdateProfile({ ...profile, employmentStatus: e.target.value as EmploymentStatus })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              id="profile-employment-select"
            >
              {employmentOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Experience Level</label>
            <select
              value={profile.experienceLevel}
              onChange={(e) => onUpdateProfile({ ...profile, experienceLevel: e.target.value as ExperienceLevel })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              id="profile-experience-select"
            >
              {experienceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Column 2: Skills & Competencies */}
        <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Current Skills & Aptitude</h3>
          </div>

          {/* Technical Skills */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Technical Skills & Software <span className="text-emerald-400">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill('technical', techInput);
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Excel, Python, C++, Accounting, Canva"
                id="profile-tech-input"
              />
              <button
                type="button"
                onClick={() => handleAddSkill('technical', techInput)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {profile.technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill('technical', skill)}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Soft Skills & Communication</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={softInput}
                onChange={(e) => setSoftInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill('soft', softInput);
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Analytical Reasoning, Presentation, English writing"
                id="profile-soft-input"
              />
              <button
                type="button"
                onClick={() => handleAddSkill('soft', softInput)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {profile.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill('soft', skill)}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Domain Interests */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Interests & Industries</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill('interest', interestInput);
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Data, FinTech, E-Commerce, Software, Design"
                id="profile-interest-input"
              />
              <button
                type="button"
                onClick={() => handleAddSkill('interest', interestInput)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/80"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill('interest', interest)}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Realistic Constraints & Preferences */}
        <div className="space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Constraints & Pathways</h3>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1">
              <span>Weekly Learning Time</span>
              <span className="text-emerald-400 font-bold">{profile.weeklyHoursAvailable} hours/week</span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              step="2"
              value={profile.weeklyHoursAvailable}
              onChange={(e) => onUpdateProfile({ ...profile, weeklyHoursAvailable: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-500"
              id="profile-hours-slider"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Roadmaps will automatically calibrate pace and duration based on this commitment.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Budget Preference</label>
            <select
              value={profile.budgetPreference}
              onChange={(e) => onUpdateProfile({ ...profile, budgetPreference: e.target.value as any })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              id="profile-budget-select"
            >
              <option value="Free Only">Free Only (DigiSkills, YouTube, freeCodeCamp, Open Access)</option>
              <option value="Low-Cost / Affordable">Low-Cost / Affordable (Under PKR 5,000 / month)</option>
              <option value="Any / Certification Investment">Any / Certification Investment</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Hardware / Device Environment</label>
            <input
              type="text"
              value={profile.deviceLimitations}
              onChange={(e) => onUpdateProfile({ ...profile, deviceLimitations: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Core i3 laptop, mobile internet, 8GB RAM"
              id="profile-device-input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Career Format Preferences</label>
            <div className="space-y-1.5">
              {careerPreferenceOptions.map((pref) => {
                const isSelected = profile.careerPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => handleTogglePreference(pref)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{pref}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Profile is mapped against <strong>P@SHA</strong>, <strong>NAVTTC NVQF</strong>, and <strong>DigiSkills.pk</strong> frameworks without storing personally sensitive credentials.
          </span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSave}
            id="save-profile-button"
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>Save Profile</span>
          </button>
          <button
            type="button"
            onClick={handleRunAssessmentClick}
            disabled={isLoading}
            id="run-assessment-button"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md shadow-emerald-950/50 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Profile & Market Data...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Career Assessment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

