import React from 'react';
import { RouteMeta } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TypingWorkspaceShell } from '../components/typing/TypingWorkspaceShell';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface GenericContentPageProps {
  route: RouteMeta;
  onNavigate?: (path: string) => void;
}

export const GenericContentPage: React.FC<GenericContentPageProps> = ({ route, onNavigate }) => {
  const isTypingTestRoute = route.presetDuration !== undefined || route.path.includes('typing-speed-test');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <a
          href="/"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('/');
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Typing Test</span>
        </a>
      </div>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="brand" className="mb-2">
          {route.presetDuration ? `${route.presetDuration}s Timed Test` : 'Typing Resource'}
        </Badge>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          {route.heading}
        </h1>
        {route.subheading && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {route.subheading}
          </p>
        )}
      </div>

      {/* Interactive module if timed test */}
      {isTypingTestRoute && (
        <div className="mb-12">
          <TypingWorkspaceShell
            initialDuration={route.presetDuration || 60}
            initialMode={route.presetMode || 'words'}
          />
        </div>
      )}

      {/* Explanatory Content Card */}
      <Card className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          About this {route.heading}
        </h2>
        <p>{route.description}</p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white pt-2">
          Key Benefits & How It Works
        </h3>
        <ul className="space-y-2 list-none p-0">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Accurate Monotonic Clock:</strong> Eliminates browser tab throttle drift and calculates precise characters per minute (CPM).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Standardized 5-Char Formula:</strong> Calculates gross WPM and net WPM using international touch-typing measurement standards.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>100% Privacy Guarantee:</strong> No text or keystrokes leave your device.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
