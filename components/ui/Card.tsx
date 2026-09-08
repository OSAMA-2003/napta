import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'telemetry' | 'muted';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]',
    telemetry: 'bg-[#0b1c30] border border-slate-800 text-white shadow-xl',
    muted: 'bg-surface-container-low border border-slate-200/60',
  };

  return (
    <div
      className={cn('rounded-xl transition-all', variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-headline text-base font-semibold text-on-surface tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs text-secondary font-body', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between gap-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}
