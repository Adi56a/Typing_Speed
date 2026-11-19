import React from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentPath = '/',
  onNavigate,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100">
      <Header currentPath={currentPath} onNavigate={onNavigate} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

