/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, WorkflowStep } from './components/Navbar';
import { ProfileView } from './components/ProfileView';
import { AssessmentView } from './components/AssessmentView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { PortfolioView } from './components/PortfolioView';
import { ReadinessView } from './components/ReadinessView';
import { AssistantView } from './components/AssistantView';
import { EvaluationAuditView } from './components/EvaluationAuditView';
import { HumanEscalationModal } from './components/HumanEscalationModal';
import { KnowledgeBaseDrawer } from './components/KnowledgeBaseDrawer';
import { 
  UserProfile, 
  CareerRecommendation, 
  SkillGapAnalysisResult, 
  LearningRoadmap, 
  PortfolioProject, 
  ChatMessage 
} from './types';
import { PAKISTAN_PRESET_PERSONAS } from './data/pakistanPersonas';

export default function App() {
  // 1. Core Profile State (persisted with fallback to Zainab Farooq)
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read profile from localStorage', e);
    }
    const defaultPersona = PAKISTAN_PRESET_PERSONAS[0].profile;
    return {
      fullName: defaultPersona.fullName || 'Zainab Farooq',
      location: defaultPersona.location || 'Lahore, Punjab',
      education: defaultPersona.education || 'Bachelors (Graduated)',
      fieldOfStudy: defaultPersona.fieldOfStudy || 'Economics',
      experienceLevel: defaultPersona.experienceLevel || 'No Experience / Student',
      employmentStatus: defaultPersona.employmentStatus || 'Unemployed / Job Seeking',
      technicalSkills: defaultPersona.technicalSkills || ['MS Excel (VLOOKUP, Pivots)', 'Basic Statistics', 'Google Sheets'],
      softSkills: defaultPersona.softSkills || ['Analytical Thinking', 'Report Writing', 'English Communication'],
      interests: defaultPersona.interests || ['Data Analysis', 'FinTech', 'E-Commerce Analytics'],
      careerPreferences: defaultPersona.careerPreferences || ['Remote Work (International / Local)', 'Full-Time Employment (Local)'],
      weeklyHoursAvailable: defaultPersona.weeklyHoursAvailable || 12,
      budgetPreference: defaultPersona.budgetPreference || 'Free Only',
      deviceLimitations: defaultPersona.deviceLimitations || 'Core i3 Laptop, 8GB RAM, Mobile Broadband',
      languageMode: 'Bilingual (English / Urdu)'
    };
  });

  // 2. Workflow & Step State
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('profile');
  const [isEscalationOpen, setIsEscalationOpen] = useState<boolean>(false);
  const [isKnowledgeDrawerOpen, setIsKnowledgeDrawerOpen] = useState<boolean>(false);
  const [assessmentError, setAssessmentError] = useState<string | null>(null);

  // 3. AI Outputs State (persisted)
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_recommendations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_selected_career');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [skillGapResult, setSkillGapResult] = useState<SkillGapAnalysisResult | null>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_skill_gap');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_roadmap');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [completedWeeks, setCompletedWeeks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_completed_weeks');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [portfolioProject, setPortfolioProject] = useState<PortfolioProject | null>(() => {
    try {
      const saved = localStorage.getItem('rozgaar_portfolio_project');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: 'Assalam-o-Alaikum! Welcome to RozgaarAI Pakistan. I am your grounded career advisor. I can help map your academic background to local and remote employment, suggest DigiSkills & NAVTTC courses, or design proof-of-work portfolio projects. How can I guide you today?',
      citations: ['P@SHA IT Salary Survey', 'DigiSkills.pk', 'NAVTTC NVQF'],
      timestamp: new Date().toISOString()
    }
  ]);

  // 5. Loading States
  const [isAssessing, setIsAssessing] = useState<boolean>(false);
  const [isAnalyzingGap, setIsAnalyzingGap] = useState<boolean>(false);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);
  const [isGeneratingPortfolio, setIsGeneratingPortfolio] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Save profile explicitly to local storage and state
  const handleSaveProfile = (profileToSave: UserProfile): boolean => {
    try {
      setProfile(profileToSave);
      localStorage.setItem('rozgaar_profile', JSON.stringify(profileToSave));
      return true;
    } catch (e) {
      console.error('Failed to save profile:', e);
      return false;
    }
  };

  // Calculate Dynamic Readiness Score
  const calculateReadinessScores = () => {
    const totalWeeks = roadmap?.weeks?.length || 8;
    const completedWeeksCount = completedWeeks.length;
    const weekProgressBonus = Math.round((completedWeeksCount / totalWeeks) * 30);
    
    const baseTech = selectedCareer?.matchScore ? Math.min(85, selectedCareer.matchScore - 15 + weekProgressBonus) : 60;
    const baseSoft = 75;
    const basePortfolio = portfolioProject ? 70 + (completedWeeksCount > 2 ? 15 : 0) : 45;
    const baseInterview = 60 + (completedWeeksCount > 3 ? 20 : 5);

    const overall = Math.min(95, Math.round((baseTech * 0.35) + (baseSoft * 0.2) + (basePortfolio * 0.25) + (baseInterview * 0.2)));

    return {
      overall,
      technical: baseTech,
      soft: baseSoft,
      portfolio: basePortfolio,
      interview: baseInterview,
    };
  };

  const scores = calculateReadinessScores();

  // Run AI Assessment
  const handleRunAssessment = async () => {
    setIsAssessing(true);
    setAssessmentError(null);
    setCurrentStep('assessment');
    try {
      // Ensure latest profile in localStorage
      localStorage.setItem('rozgaar_profile', JSON.stringify(profile));

      const res = await fetch('/api/assess-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.recommendations && Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
        setSelectedCareer(data.recommendations[0]);
        localStorage.setItem('rozgaar_recommendations', JSON.stringify(data.recommendations));
        localStorage.setItem('rozgaar_selected_career', JSON.stringify(data.recommendations[0]));
        
        // Trigger initial background gap analysis for the primary career
        triggerGapAnalysis(data.recommendations[0]);
      } else {
        throw new Error(data.error || 'No recommendations returned from the assessment engine.');
      }
    } catch (e: any) {
      console.error('Assessment failed:', e);
      setAssessmentError(e?.message || 'Failed to generate assessment recommendations. Please try again.');
    } finally {
      setIsAssessing(false);
    }
  };

  // Trigger Skill Gap
  const triggerGapAnalysis = async (career: CareerRecommendation) => {
    setIsAnalyzingGap(true);
    try {
      const res = await fetch('/api/skill-gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, careerTitle: career.title, career }),
      });
      const data = await res.json();
      const result = data.skillGapResult || (data.skills ? data : null);
      if (result) {
        setSkillGapResult(result);
        localStorage.setItem('rozgaar_skill_gap', JSON.stringify(result));
      }
    } catch (e) {
      console.error('Skill gap analysis failed:', e);
    } finally {
      setIsAnalyzingGap(false);
    }
  };

  // Trigger Roadmap Generation
  const triggerRoadmap = async (career: CareerRecommendation) => {
    setIsGeneratingRoadmap(true);
    setCurrentStep('roadmap');
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, careerTitle: career.title, career, durationWeeks: 8 }),
      });
      const data = await res.json();
      const result = data.roadmap || (data.weeks ? data : null);
      if (result) {
        setRoadmap(result);
        localStorage.setItem('rozgaar_roadmap', JSON.stringify(result));
      }
    } catch (e) {
      console.error('Roadmap generation failed:', e);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // Trigger Portfolio Lab Generation
  const triggerPortfolio = async (career: CareerRecommendation) => {
    setIsGeneratingPortfolio(true);
    setCurrentStep('portfolio');
    try {
      const res = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, careerTitle: career.title, career }),
      });
      const data = await res.json();
      const result = data.portfolioProject || (data.problemStatement ? data : null);
      if (result) {
        setPortfolioProject(result);
        localStorage.setItem('rozgaar_portfolio_project', JSON.stringify(result));
      }
    } catch (e) {
      console.error('Portfolio generation failed:', e);
    } finally {
      setIsGeneratingPortfolio(false);
    }
  };

  // Toggle Week Completion
  const handleToggleWeek = (weekNumber: number) => {
    const updated = completedWeeks.includes(weekNumber)
      ? completedWeeks.filter((w) => w !== weekNumber)
      : [...completedWeeks, weekNumber];
    setCompletedWeeks(updated);
    try {
      localStorage.setItem('rozgaar_completed_weeks', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving completed weeks', e);
    }
  };

  // Send Chat Message to Assistant
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/career-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          profile,
          currentCareerTitle: selectedCareer?.title || 'Data Analyst',
          history: chatMessages.slice(-6),
        }),
      });
      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Guidance received.',
        citations: data.citations || ['P@SHA IT Report', 'DigiSkills.pk'],
        uncertaintyNote: data.uncertaintyNote,
        suggestedFollowUps: data.suggestedFollowUps,
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Chat failed:', e);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-white" id="rozgaar-ai-app">
      {/* Top Navbar & Ribbon */}
      <Navbar
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        profile={profile}
        hasAssessment={recommendations.length > 0}
        onOpenKnowledgeBase={() => setIsKnowledgeDrawerOpen(true)}
        onOpenEscalation={() => setIsEscalationOpen(true)}
        readinessScore={scores.overall}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentStep === 'profile' && (
          <ProfileView
            profile={profile}
            onUpdateProfile={setProfile}
            onSaveProfile={handleSaveProfile}
            onRunAssessment={handleRunAssessment}
            isLoading={isAssessing}
            assessmentError={assessmentError}
            onClearAssessmentError={() => setAssessmentError(null)}
          />
        )}

        {currentStep === 'assessment' && (
          <AssessmentView
            recommendations={recommendations}
            selectedCareer={selectedCareer}
            onSelectCareer={(career) => {
              setSelectedCareer(career);
              try {
                localStorage.setItem('rozgaar_selected_career', JSON.stringify(career));
              } catch {}
              triggerGapAnalysis(career);
            }}
            onGoToSkillGap={(career) => {
              setSelectedCareer(career);
              try {
                localStorage.setItem('rozgaar_selected_career', JSON.stringify(career));
              } catch {}
              triggerGapAnalysis(career);
              setCurrentStep('skill-gap');
            }}
            onGoToRoadmap={(career) => {
              setSelectedCareer(career);
              try {
                localStorage.setItem('rozgaar_selected_career', JSON.stringify(career));
              } catch {}
              triggerRoadmap(career);
            }}
            onGoToPortfolio={(career) => {
              setSelectedCareer(career);
              try {
                localStorage.setItem('rozgaar_selected_career', JSON.stringify(career));
              } catch {}
              triggerPortfolio(career);
            }}
            onGoBackToProfile={() => setCurrentStep('profile')}
            onRunAssessment={handleRunAssessment}
            profile={profile}
            isLoading={isAssessing}
            error={assessmentError}
          />
        )}

        {currentStep === 'skill-gap' && (
          <SkillGapView
            skillGapResult={skillGapResult}
            careerTitle={selectedCareer?.title || 'Selected Role'}
            onGenerateRoadmap={() => {
              if (selectedCareer) triggerRoadmap(selectedCareer);
            }}
            onRefreshGapAnalysis={() => {
              if (selectedCareer) triggerGapAnalysis(selectedCareer);
            }}
            isLoading={isAnalyzingGap}
          />
        )}

        {currentStep === 'roadmap' && (
          <RoadmapView
            roadmap={roadmap}
            careerTitle={selectedCareer?.title || 'Selected Role'}
            completedWeeks={completedWeeks}
            onToggleWeekCompletion={handleToggleWeek}
            onGoToPortfolio={() => {
              if (selectedCareer) triggerPortfolio(selectedCareer);
              else setCurrentStep('portfolio');
            }}
            onRegenerateRoadmap={() => {
              if (selectedCareer) triggerRoadmap(selectedCareer);
            }}
            isLoading={isGeneratingRoadmap}
            profile={profile}
          />
        )}

        {currentStep === 'portfolio' && (
          <PortfolioView
            portfolioProject={portfolioProject}
            careerTitle={selectedCareer?.title || 'Selected Role'}
            onRegeneratePortfolio={() => {
              if (selectedCareer) triggerPortfolio(selectedCareer);
            }}
            onGoToReadiness={() => setCurrentStep('readiness')}
            isLoading={isGeneratingPortfolio}
            profile={profile}
          />
        )}

        {currentStep === 'readiness' && (
          <ReadinessView
            overallScore={scores.overall}
            technicalScore={scores.technical}
            softSkillsScore={scores.soft}
            portfolioScore={scores.portfolio}
            interviewScore={scores.interview}
            selectedCareer={selectedCareer}
            completedWeeksCount={completedWeeks.length}
            totalWeeksCount={roadmap?.weeks?.length || 8}
            onGoToRoadmap={() => setCurrentStep('roadmap')}
            onGoToPortfolio={() => setCurrentStep('portfolio')}
            onGoToAssistant={() => setCurrentStep('assistant')}
            profile={profile}
          />
        )}

        {currentStep === 'assistant' && (
          <AssistantView
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            isLoading={isChatLoading}
            profile={profile}
            currentCareerTitle={selectedCareer?.title || 'Data Analyst'}
          />
        )}

        {currentStep === 'evaluation' && (
          <EvaluationAuditView
            onOpenEscalation={() => setIsEscalationOpen(true)}
          />
        )}
      </main>

      {/* Modals & Slide-out Drawers */}
      <HumanEscalationModal
        isOpen={isEscalationOpen}
        onClose={() => setIsEscalationOpen(false)}
        profile={profile}
      />

      <KnowledgeBaseDrawer
        isOpen={isKnowledgeDrawerOpen}
        onClose={() => setIsKnowledgeDrawerOpen(false)}
      />

      {/* Responsible AI Compliance Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">RozgaarAI Pakistan</span>
            <span>•</span>
            <span>Grounded Career Decision Support</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsKnowledgeDrawerOpen(true)}
              className="hover:text-slate-200 transition"
            >
              P@SHA / NAVTTC Sources
            </button>
            <button
              onClick={() => setCurrentStep('evaluation')}
              className="hover:text-slate-200 transition"
            >
              Safety Audit Suite
            </button>
            <button
              onClick={() => setIsEscalationOpen(true)}
              className="text-amber-400/90 hover:text-amber-300 transition"
            >
              Human Oversight
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

