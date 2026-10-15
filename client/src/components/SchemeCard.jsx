import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Landmark, ArrowUpRight, CheckCircle2, ShieldCheck, IndianRupee, Sparkles } from 'lucide-react';
import Badge from './Badge';
import { useLanguage } from '../hooks/useLanguage';

export default function SchemeCard({ scheme, showMatchScore = true }) {
  const { lang, t, loc } = useLanguage();

  const matchScore = scheme.matchScore;

  // Color code based on criteria: green >80%, yellow >50%, red <50%
  const getMatchBadge = (score) => {
    if (score >= 80) {
      return {
        variant: 'success',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
        label: `${score}% Match`,
        labelHi: `${score}% सटीक मिलान`,
      };
    } else if (score >= 50) {
      return {
        variant: 'warning',
        bg: 'bg-amber-50 text-amber-900 border-amber-300 font-bold',
        label: `${score}% Match`,
        labelHi: `${score}% मिलान`,
      };
    } else {
      return {
        variant: 'danger',
        bg: 'bg-rose-50 text-rose-800 border-rose-300 font-bold',
        label: `${score}% Match`,
        labelHi: `${score}% कम मिलान`,
      };
    }
  };

  const badgeInfo = matchScore !== undefined ? getMatchBadge(matchScore) : null;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 shadow-card hover:shadow-card-hover transition-all duration-200 hover:border-slate-300"
    >
      <div>
        {/* Top bar: Ministry & Match Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 truncate">
            <Landmark className="h-3.5 w-3.5 text-brand-700 shrink-0" />
            <span className="truncate">{scheme.ministry}</span>
          </div>

          {showMatchScore && badgeInfo && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border ${badgeInfo.bg}`}
            >
              <Sparkles className="h-3 w-3" />
              {lang === 'hi' ? badgeInfo.labelHi : badgeInfo.label}
            </span>
          )}

          {!showMatchScore && scheme.category && (
            <Badge variant="brand" size="sm">
              {scheme.category}
            </Badge>
          )}
        </div>

        {/* Scheme Title */}
        <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-800 leading-snug tracking-tight line-clamp-2">
          {scheme.name}
        </h3>

        {/* Hindi Translation Subtitle */}
        {scheme.nameHi && (
          <p className="text-xs font-hindi text-slate-500 mt-1 line-clamp-1 font-medium">
            {scheme.nameHi}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {lang === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
        </p>

        {/* AI Match Reason Pill (if matched) */}
        {scheme.matchReasons && scheme.matchReasons.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-emerald-800 bg-emerald-50/60 p-2 rounded-xl">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{scheme.matchReasons[0]}</span>
          </div>
        )}

        {/* Quick Highlights / Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {scheme.subsidyRate && (
            <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
              {scheme.subsidyRate}
            </span>
          )}
          {scheme.targetAudience && (
            <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {scheme.targetAudience.split(',')[0]}
            </span>
          )}
        </div>
      </div>

      {/* Footer info: Benefit amount + View Details button */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {t('max_benefit')}
          </span>
          <span className="text-base font-bold text-brand-950">
            {scheme.maxBenefit}
          </span>
        </div>

        <Link
          to={`/schemes/${scheme.id}`}
          className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-brand-950 bg-slate-100 hover:bg-brand-950 hover:text-white rounded-xl transition-all duration-150 active:scale-95 shadow-sm"
        >
          <span>{t('view_details')}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
