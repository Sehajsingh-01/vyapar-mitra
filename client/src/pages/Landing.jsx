import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  UserCheck,
  Rocket,
  Compass,
  ArrowUpRight,
  Building,
  Coins
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';
import Badge from '../components/Badge';
import StatCounter from '../components/StatCounter';
import FeatureCard from '../components/FeatureCard';
import SchemeCard from '../components/SchemeCard';
import {
  MOCK_STATS,
  HOW_IT_WORKS_STEPS,
  BENTO_FEATURES,
  ALL_SCHEMES
} from '../lib/constants';

const STEP_ICONS = {
  UserCheck,
  Cpu,
  Rocket,
};

export default function Landing() {
  const { lang, t } = useLanguage();

  // Top 3 featured schemes for instant spotlight
  const featuredSchemes = ALL_SCHEMES.slice(0, 3).map(s => ({
    ...s,
    matchScore: 95
  }));

  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top subtle badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-semibold shadow-subtle mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{t('hero_badge')}</span>
            <span className="text-amber-400">|</span>
            <span className="text-slate-600">TinyFish AI</span>
          </motion.div>

          {/* Dual Language Dynamic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            {lang === 'hi' ? (
              <>
                <h2 className="text-base sm:text-lg font-bold text-slate-500 tracking-wide uppercase mb-2">
                  Government Schemes for Every Entrepreneur
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-950 font-hindi tracking-tight leading-[1.18]">
                  {t('hero_title_1')}{' '}
                  <span className="relative whitespace-nowrap text-brand-950 underline decoration-amber-500 decoration-wavy decoration-from-font underline-offset-8">
                    {t('hero_title_highlight')}
                  </span>
                </h1>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold font-hindi text-amber-600 tracking-tight mb-2">
                  हर उद्यमी के लिए सरकारी योजनाएं
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-950 font-heading tracking-tight leading-[1.08]">
                  {t('hero_title_1')}{' '}
                  <span className="relative whitespace-nowrap text-brand-950 underline decoration-amber-500 decoration-wavy decoration-from-font underline-offset-8">
                    {t('hero_title_highlight')}
                  </span>
                </h1>
              </>
            )}

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('hero_subtitle')}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto"
          >
            <Link to="/profile" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="w-full sm:w-auto shadow-md"
              >
                {t('hero_cta_primary')}
              </Button>
            </Link>

            <Link to="/schemes" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                iconLeft={Compass}
                className="w-full sm:w-auto"
              >
                {t('hero_cta_secondary')}
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof / Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-2 text-xs font-medium text-slate-500"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('hero_stats_trusted')}</span>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-12 bg-white/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {MOCK_STATS.map((stat, i) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                labelHi={stat.labelHi}
                currentLang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 font-heading tracking-tight mt-2">
              {t('how_it_works_title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              {t('how_it_works_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[step.icon] || UserCheck;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className="relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Step number badge & icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-950 border border-brand-200">
                        STEP {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-brand-950 font-heading mb-3">
                      {lang === 'hi' && step.titleHi ? step.titleHi : step.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {lang === 'hi' && step.descriptionHi ? step.descriptionHi : step.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-brand-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t('verified_gov_protocol')}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t('features_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-950 font-heading tracking-tight mt-3">
              {t('features_title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              {t('features_subtitle')}
            </p>
          </div>

          {/* Asymmetric Bento Layout */}
          <div className="grid grid-cols-12 gap-6">
            {BENTO_FEATURES.map((feature, idx) => (
              <FeatureCard key={feature.title} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR SCHEMES SPOTLIGHT */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                {t('featured_schemes_tag')}
              </span>
              <h2 className="text-3xl font-extrabold text-brand-950 font-heading tracking-tight mt-1">
                {t('featured_schemes_heading')}
              </h2>
            </div>
            <Link
              to="/schemes"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-950 hover:text-amber-600 transition-colors"
            >
              <span>{t('explore_all_schemes_link')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} showMatchScore={false} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-950 text-white p-8 sm:p-14 border border-brand-800 shadow-2xl relative overflow-hidden text-center">
            {/* Ambient saffron glow */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {t('cta_banner_sub')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading mt-3 mb-4">
              {t('cta_banner_heading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
              {t('cta_banner_text')}
            </p>

            <Link to="/profile">
              <Button
                variant="saffron"
                size="lg"
                iconRight={ArrowRight}
                className="font-bold text-brand-950 shadow-lg"
              >
                {t('hero_cta_primary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
