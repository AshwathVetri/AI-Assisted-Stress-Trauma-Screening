import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DemoBar } from './components/common/DemoBar';
import { ToastContainer } from './components/common/ToastContainer';

// Victim flow components
import { LandingPage } from './components/victim/LandingPage';
import { ConsentScreen } from './components/victim/ConsentScreen';
import { MethodSelection } from './components/victim/MethodSelection';
import { TextAssessment } from './components/victim/TextAssessment';
import { VoiceAssessment } from './components/victim/VoiceAssessment';
import { QuestionnaireAssessment } from './components/victim/QuestionnaireAssessment';
import { ProcessingScreen } from './components/victim/ProcessingScreen';
import { ResultScreen } from './components/victim/ResultScreen';

// Staff flow components
import { StaffLogin } from './components/staff/StaffLogin';
import { StaffLayout } from './components/staff/StaffLayout';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { CaseDetails } from './components/staff/CaseDetails';
import { AnalyticsDashboard } from './components/staff/AnalyticsDashboard';
import { ExplainableAIView } from './components/staff/ExplainableAIView';
import { SecurityPrivacyView } from './components/staff/SecurityPrivacyView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const isStaffConsoleView = [
    'staff-dashboard',
    'case-details',
    'analytics',
    'explainability',
    'security'
  ].includes(currentView);

  if (isStaffConsoleView) {
    return (
      <StaffLayout>
        {currentView === 'staff-dashboard' && <StaffDashboard />}
        {currentView === 'case-details' && <CaseDetails />}
        {currentView === 'analytics' && <AnalyticsDashboard />}
        {currentView === 'explainability' && <ExplainableAIView />}
        {currentView === 'security' && <SecurityPrivacyView />}
      </StaffLayout>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'consent' && <ConsentScreen />}
        {currentView === 'methods' && <MethodSelection />}
        {currentView === 'assessment-text' && <TextAssessment />}
        {currentView === 'assessment-voice' && <VoiceAssessment />}
        {currentView === 'assessment-questionnaire' && <QuestionnaireAssessment />}
        {currentView === 'processing' && <ProcessingScreen />}
        {currentView === 'results' && <ResultScreen />}
        {currentView === 'staff-login' && <StaffLogin />}
      </main>
      {currentView !== 'processing' && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
      <ToastContainer />
      <DemoBar />
    </AppProvider>
  );
}

export default App;
