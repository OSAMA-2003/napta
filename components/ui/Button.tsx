import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'telemetry' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-primary text-on-primary hover:bg-primary-container shadow-sm hover:shadow active:scale-[0.99]',
      secondary:
        'bg-surface-container-lowest text-on-surface border border-slate-200 hover:bg-surface-container hover:border-slate-300',
      telemetry:
        'bg-[#0b1c30] text-[#10b981] border border-[#10b981]/30 hover:bg-[#132742] hover:border-[#10b981]/60 shadow-inner',
      ghost:
        'bg-transparent text-secondary hover:text-on-surface hover:bg-surface-container-low',
      danger:
        'bg-[#ef4444] text-white hover:bg-[#dc2626] shadow-sm',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5 font-medium',
      md: 'h-10 px-4 text-sm rounded-lg gap-2 font-semibold',
      lg: 'h-12 px-6 text-base rounded-xl gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
