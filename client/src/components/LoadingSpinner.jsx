import React from 'react';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`}
    />
  );
}

export function SchemeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-subtle">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}

export function SchemeDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="h-6 w-32 bg-slate-200 rounded" />
      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
        <div className="space-y-3">
          <div className="h-5 w-40 bg-slate-200 rounded-full" />
          <div className="h-8 w-2/3 bg-slate-200 rounded" />
          <div className="h-5 w-1/2 bg-slate-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-white rounded-2xl border border-slate-200 p-6" />
        <div className="h-64 bg-white rounded-2xl border border-slate-200 p-6" />
      </div>
    </div>
  );
}

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-950/20 border-t-brand-950 rounded-full animate-spin" />
        <div className="w-3 h-3 bg-amber-500 rounded-full absolute" />
      </div>
      {text && <p className="text-sm text-slate-500 font-medium tracking-wide">{text}</p>}
    </div>
  );
}
