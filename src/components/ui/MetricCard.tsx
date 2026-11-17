import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  highlight = false,
}) => {
  return (
    <div
      className={`flex flex-col p-3 sm:p-4 rounded-xl border transition-all ${
        highlight
          ? 'bg-brand-50/50 dark:bg-brand-950/20 border-brand-500/30'
          : 'bg-white dark:bg-surface-dark-card border-slate-200 dark:border-surface-dark-border'
      }`}
    >
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-baseline gap-1 mt-1">
        <span
          className={`text-2xl sm:text-3xl font-bold font-mono ${
            highlight ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'
          }`}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{unit}</span>
        )}
      </div>
      {subtext && <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{subtext}</span>}
    </div>
  );
};

