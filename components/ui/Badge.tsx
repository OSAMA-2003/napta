import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'mint' | 'slate' | 'amber' | 'crimson' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'slate',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  const variantStyles = {
    emerald: 'bg-primary-container/10 text-primary-container border-primary-container/20',
    mint: 'bg-[#10b981]/15 text-[#004f34] border-[#10b981]/30',
    slate: 'bg-surface-container-high text-secondary border-[#e2e8f0]',
    amber: 'bg-[#f59e0b]/15 text-[#92400e] border-[#f59e0b]/30',
    crimson: 'bg-[#ef4444]/15 text-[#991b1b] border-[#ef4444]/30',
    outline: 'bg-transparent text-secondary border-outline-variant',
  };

  const dotColors = {
    emerald: 'bg-primary-container',
    mint: 'bg-[#10b981]',
    slate: 'bg-secondary',
    amber: 'bg-[#f59e0b]',
    crimson: 'bg-[#ef4444]',
    outline: 'bg-secondary',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-semibold',
    md: 'text-xs px-2.5 py-1 tracking-wide font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            dotColors[variant],
            variant === 'mint' || variant === 'emerald' ? 'animate-pulse' : ''
          )}
        />
      )}
      {children}
    </span>
  );
}
