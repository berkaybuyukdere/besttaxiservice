import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'orange' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full',
        {
          'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]': variant === 'default',
          'bg-[rgba(216,90,48,0.15)] border border-[rgba(216,90,48,0.3)] text-[#F0997B]': variant === 'orange',
          'bg-[var(--color-background-success)] text-[var(--color-text-success)]': variant === 'success',
          'bg-[var(--color-warning-bg)] text-[#854F0B] border border-[var(--color-warning)]': variant === 'warning',
          'bg-red-100 text-red-700': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
