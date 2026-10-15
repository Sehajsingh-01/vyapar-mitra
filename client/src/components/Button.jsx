import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  iconLeft: IconLeft = null,
  iconRight: IconRight = null,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl';

  const variants = {
    primary:
      'bg-brand-950 text-white hover:bg-brand-900 active:bg-brand-950 border border-brand-900/80 shadow-sm focus-visible:ring-brand-950 active:scale-[0.99]',
    saffron:
      'bg-amber-500 text-brand-950 font-semibold hover:bg-amber-400 active:bg-amber-600 border border-amber-600/20 shadow-sm focus-visible:ring-amber-500 active:scale-[0.99]',
    secondary:
      'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 border border-slate-300 shadow-sm focus-visible:ring-brand-500 active:scale-[0.99]',
    outline:
      'bg-transparent text-brand-950 border border-brand-950/30 hover:border-brand-950 hover:bg-brand-950/5 focus-visible:ring-brand-950 active:scale-[0.99]',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-brand-500',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus-visible:ring-rose-600',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
    icon: 'p-2',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {IconLeft && <IconLeft className="h-4 w-4 shrink-0" />}
          {children}
          {IconRight && <IconRight className="h-4 w-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
