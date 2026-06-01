'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#D85A30] text-white hover:bg-[#993C1D] border border-[#D85A30]': variant === 'primary',
            'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-secondary)] hover:bg-[var(--color-background-secondary)]': variant === 'outline',
            'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-background-secondary)] border border-transparent': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600 border border-red-500': variant === 'danger',
          },
          {
            'text-xs px-3 py-1.5 rounded-[6px]': size === 'sm',
            'text-sm px-4 py-2 rounded-[8px]': size === 'md',
            'text-sm px-5 py-3 rounded-[8px]': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
