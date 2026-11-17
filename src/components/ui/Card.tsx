import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'surface';
}

export const Card: React.FC<CardProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const styles =
    variant === 'surface'
      ? 'bg-surface-light-card dark:bg-surface-dark-card border border-surface-light-border dark:border-surface-dark-border rounded-xl p-5 shadow-sm'
      : 'bg-white dark:bg-surface-dark-card border border-slate-200 dark:border-surface-dark-border rounded-xl p-5 shadow-sm';

  return (
    <div className={`${styles} ${className}`} {...props}>
      {children}
    </div>
  );
};

