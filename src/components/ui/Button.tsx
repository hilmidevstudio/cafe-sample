import React, { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-accent text-accent-foreground hover:bg-accent/90': variant === 'secondary',
          'border border-border bg-transparent hover:bg-muted/50': variant === 'outline',
          'hover:bg-muted text-foreground': variant === 'ghost',
          'h-9 px-3 text-sm': size === 'sm',
          'h-12 px-6 text-base': size === 'md',
          'h-14 px-8 text-lg w-full': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
