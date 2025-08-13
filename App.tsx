import { useState } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LibraryUploadScreen } from "./components/LibraryUploadScreen";
import { HomeScreen } from "./components/HomeScreen";
import { CaseConfigScreen } from "./components/CaseConfigScreen";
import { CaseOpeningScreen } from "./components/CaseOpeningScreen";
import { CaseStructuringScreen } from "./components/CaseStructuringScreen";
import { CaseNavigationScreen } from "./components/CaseNavigationScreen";
import { CaseDrillDownScreen } from "./components/CaseDrillDownScreen";
import { CaseBrainstormingScreen } from "./components/CaseBrainstormingScreen";
import { CaseSynthesisScreen } from "./components/CaseSynthesisScreen";
import { CaseFeedbackMomentScreen } from "./components/CaseFeedbackMomentScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { AnalyticsScreen } from "./components/AnalyticsScreen";

type Screen = 
  | 'onboarding' 
  | 'library-upload' 
  | 'home' 
  | 'case-config' 
  | 'case-opening'
  | 'case-structuring'
  | 'case-navigation'
  | 'case-drill-down'
  | 'case-brainstorming'
  | 'case-synthesis'
  | 'case-feedback-moment'
  | 'feedback' 
  | 'analytics';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [caseData, setCaseData] = useState({
    phase: 'opening',
    drillDownRound: 1,
    maxDrillDowns: 3,
    scores: {
      structure: 0,
      math: 0,
      communication: 0,
      judgment: 0,
      synthesis: 0
    },
    clarifyingQuestions: 0,
    maxClarifyingQuestions: 3
  });

  const handleNavigate = (screen: Screen, data?: any) => {
    if (data) {
      setCaseData(prev => ({ ...prev, ...data }));
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onNavigate={handleNavigate} />;
      case 'library-upload':
        return <LibraryUploadScreen onNavigate={handleNavigate} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'case-config':
        return <CaseConfigScreen onNavigate={handleNavigate} />;
      case 'case-opening':
        return <CaseOpeningScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'case-structuring':
        return <CaseStructuringScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'case-navigation':
        return <CaseNavigationScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'case-drill-down':
        return <CaseDrillDownScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'case-brainstorming':
        return <CaseBrainstormingScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'case-synthesis':
        return <CaseSynthesisScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'case-feedback-moment':
        return <CaseFeedbackMomentScreen onNavigate={handleNavigate} caseData={caseData || {}} />;
      case 'feedback':
        return <FeedbackScreen onNavigate={handleNavigate} />;
      case 'analytics':
        return <AnalyticsScreen onNavigate={handleNavigate} />;
      default:
        return <OnboardingScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}