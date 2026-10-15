import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Landmark, Languages, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const ICON_MAP = {
  Sparkles,
  Landmark,
  Languages,
  ShieldCheck,
};

export default function FeatureCard({ feature, index }) {
  const { lang, loc } = useLanguage();
  const Icon = ICON_MAP[feature.icon] || Sparkles;
  const isDark = feature.color?.includes('brand-950') || feature.color?.includes('slate-900');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl p-7 sm:p-9 border transition-all duration-300 ${feature.span} ${
        isDark
          ? 'bg-brand-950 text-white border-brand-800 shadow-xl'
          : 'bg-white text-slate-900 border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-slate-300'
      }`}
    >
      {/* Decorative ambient subtle radial highlight */}
      <div
        className={`absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isDark ? 'bg-amber-400' : 'bg-brand-500'
        }`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div>
          {/* Top header: Icon & Tag */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div
              className={`p-3 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${
                isDark
                  ? 'bg-white/10 text-amber-400 border border-white/10'
                  : 'bg-brand-50 text-brand-900 border border-brand-100'
              }`}
            >
              <Icon className="w-6 h-6 stroke-[2]" />
            </div>

            {feature.tag && (
              <span
                className={`text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border ${
                  isDark
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {feature.tag}
              </span>
            )}
          </div>

          {/* Heading */}
          <h3
            className={`text-xl sm:text-2xl font-bold font-heading tracking-tight leading-snug mb-3 ${
              isDark ? 'text-white' : 'text-brand-950'
            }`}
          >
            {lang === 'hi' && feature.titleHi ? feature.titleHi : feature.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {lang === 'hi' && feature.descriptionHi ? feature.descriptionHi : feature.description}
          </p>
        </div>

        {/* Micro-detail indicator at bottom */}
        <div className="pt-2 flex items-center gap-2 text-xs font-semibold">
          <span
            className={`transition-colors flex items-center gap-1 ${
              isDark
                ? 'text-amber-400 group-hover:text-amber-300'
                : 'text-brand-700 group-hover:text-brand-900'
            }`}
          >
            <span>{lang === 'hi' ? 'विस्तार से जानें' : 'Learn more'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
