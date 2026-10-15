import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';

export default function NotFound() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center relative z-10 space-y-6"
      >
        {/* 404 Visual Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold tracking-wider uppercase shadow-subtle">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>{t('not_found_code')} • {lang === 'hi' ? 'त्रुटि' : 'Error'}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-brand-950 font-heading tracking-tight">
            {t('not_found_title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm mx-auto">
            {t('not_found_desc')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              iconLeft={Home}
              className="w-full sm:w-auto font-semibold"
            >
              {t('not_found_btn_home')}
            </Button>
          </Link>

          <Link to="/schemes" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              iconLeft={Compass}
              className="w-full sm:w-auto font-semibold"
            >
              {t('not_found_btn_schemes')}
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-slate-200/80 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Vyapar Mitra Official MSME Scheme Gateway</span>
        </div>
      </motion.div>
    </div>
  );
}
