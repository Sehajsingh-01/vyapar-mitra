import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        {/* Continuous background line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
        
        {/* Active progress bar filling */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-brand-950 z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: (currentStep - 1) / (steps.length - 1)
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ width: '100%', transformOrigin: '0% 50%' }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isClickable = onStepClick && stepNumber < currentStep;

          return (
            <div
              key={step.id || index}
              className="relative z-10 flex flex-col items-center group cursor-default"
              onClick={() => isClickable && onStepClick(stepNumber)}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  isCompleted
                    ? 'bg-brand-950 border-brand-950 text-white'
                    : isCurrent
                    ? 'bg-white border-amber-500 text-brand-950 shadow-md ring-4 ring-amber-100'
                    : 'bg-white border-slate-300 text-slate-400'
                } ${isClickable ? 'cursor-pointer hover:scale-105' : ''}`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>

              <div className="hidden sm:block absolute top-11 text-center whitespace-nowrap">
                <span
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? 'text-brand-950 font-bold'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
                {step.subtitle && (
                  <span className="block text-[10px] text-slate-400 font-normal">
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-6 sm:h-8" />
    </div>
  );
}
