import React, { useState, useEffect } from 'react';
import { AppLayout } from '../components/AppLayout';
import { HomePage } from '../pages/HomePage';
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

  // Match route
  const currentRoute = ROUTES[currentPath] || ROUTES['/'];

  return (
    <AppLayout currentPath={currentPath} onNavigate={handleNavigate}>
      {currentPath === '/' ? (
        <HomePage initialDuration={60} onNavigate={handleNavigate} />
      ) : (
        <GenericContentPage route={currentRoute} onNavigate={handleNavigate} />
      )}
    </AppLayout>
  );
};
