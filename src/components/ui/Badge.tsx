import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'neutral' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  const variantStyles = {
    brand: 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800',
    neutral:
      'bg-slate-100 text-slate-700 dark:bg-surface-dark-muted dark:text-slate-300 border border-slate-200 dark:border-surface-dark-border',
    outline: 'border border-slate-300 dark:border-surface-dark-border text-slate-600 dark:text-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

