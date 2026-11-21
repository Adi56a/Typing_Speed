import React, { useState, useEffect } from 'react';
import { AppLayout } from '../components/AppLayout';
import { HomePage } from '../pages/HomePage';
import { TimedTestPage } from '../pages/TimedTestPage';
import { WpmCalculatorPage } from '../pages/WpmCalculatorPage';
import { TypingPracticePage } from '../pages/TypingPracticePage';
import { TypingGamesPage } from '../pages/TypingGamesPage';
import { HowWpmIsCalculatedPage } from '../pages/HowWpmIsCalculatedPage';
import { TypingLessonsPage } from '../pages/TypingLessonsPage';
import { TouchTypingGuidePage } from '../pages/TouchTypingGuidePage';
import { SscTypingTestPage } from '../pages/SscTypingTestPage';
import { TypingSpeedChartPage } from '../pages/TypingSpeedChartPage';
import { AboutPage } from '../pages/AboutPage';
import { MethodologyPage } from '../pages/MethodologyPage';
import { ContactPage } from '../pages/ContactPage';
import { LegalPage } from '../pages/LegalPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { GenericContentPage } from '../pages/GenericContentPage';
import { ROUTES } from '../seo/routes';

interface AppProps {
  initialPath?: string;
}

export const App: React.FC<AppProps> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
  };

  const currentRoute = ROUTES[currentPath] || ROUTES['/'];

  const renderCurrentPage = () => {
    if (currentPath === '/') {
      return <HomePage initialDuration={60} onNavigate={handleNavigate} />;
    }
    if (currentPath === '/ssc-typing-test/') {
      return <SscTypingTestPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/typing-lessons/') {
      return <TypingLessonsPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/touch-typing/') {
      return <TouchTypingGuidePage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/typing-speed-chart/') {
      return <TypingSpeedChartPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/wpm-calculator/') {
      return <WpmCalculatorPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/typing-practice/') {
      return <TypingPracticePage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/typing-games/') {
      return <TypingGamesPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/how-wpm-is-calculated/') {
      return <HowWpmIsCalculatedPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/about/') {
      return <AboutPage />;
    }
    if (currentPath === '/methodology/') {
      return <MethodologyPage />;
    }
    if (currentPath === '/contact/') {
      return <ContactPage />;
    }
    if (currentPath === '/privacy/') {
      return <LegalPage type="privacy" />;
    }
    if (currentPath === '/terms/') {
      return <LegalPage type="terms" />;
    }
    if (currentPath.startsWith('/typing-test/') || currentPath.includes('typing-speed-test')) {
      return <TimedTestPage route={currentRoute} onNavigate={handleNavigate} />;
    }
    if (currentPath === '/404/' || !ROUTES[currentPath]) {
      return <NotFoundPage onNavigate={handleNavigate} />;
    }
    return <GenericContentPage route={currentRoute} onNavigate={handleNavigate} />;
  };

  return (
    <AppLayout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderCurrentPage()}
    </AppLayout>
  );
};
