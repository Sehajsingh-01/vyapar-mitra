import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, label, labelHi, currentLang = 'en', suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayedValue, setDisplayedValue] = useState(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all text-center flex flex-col items-center justify-center group overflow-hidden"
    >
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="text-3xl sm:text-4xl font-extrabold text-brand-950 font-heading tracking-tight mb-2">
        {value}
        {suffix}
      </div>

      <div className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
        {currentLang === 'hi' && labelHi ? labelHi : label}
      </div>
    </motion.div>
  );
}
