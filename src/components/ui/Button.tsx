import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs sm:text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const variantStyles = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-sm',
    secondary:
      'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-surface-dark-muted dark:hover:bg-slate-700 dark:text-slate-200',
    outline:
      'border border-slate-300 dark:border-surface-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark-muted',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark-muted',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
