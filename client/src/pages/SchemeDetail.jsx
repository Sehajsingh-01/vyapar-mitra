import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileText,
  Landmark,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Clock,
  IndianRupee,
  Share2,
  Check
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { SchemeDetailSkeleton } from '../components/LoadingSpinner';
import { ALL_SCHEMES } from '../lib/constants';
import { api } from '../lib/api';

export default function SchemeDetail() {
  const { id } = useParams();
  const { lang, t, loc } = useLanguage();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingLive, setFetchingLive] = useState(false);
  const [liveInfo, setLiveInfo] = useState(null);
  const [checkedDocs, setCheckedDocs] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchScheme();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchScheme = async () => {
    setLoading(true);
    try {
      const res = await api.getSchemeById(id);
      setScheme(res.data);
    } catch (err) {
      console.warn('Fallback finding scheme in local registry:', err);
      const found = ALL_SCHEMES.find((s) => s.id === id);
      setScheme(found || null);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchLiveUpdates = async () => {
    if (!scheme) return;
    setFetchingLive(true);
    try {
      const updates = await api.fetchLiveSchemeDetails(scheme.officialUrl, scheme.id);
      setLiveInfo(updates);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingLive(false);
    }
  };

  const toggleDocumentCheck = (docIndex) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docIndex]: !prev[docIndex]
    }));
  };

  const toggleAllDocuments = () => {
    const allDocs = scheme?.documentsRequired || [];
    const areAllChecked = allDocs.length > 0 && allDocs.every((_, idx) => checkedDocs[idx]);
    const updated = {};
    allDocs.forEach((_, idx) => {
      updated[idx] = !areAllChecked;
    });
    setCheckedDocs(updated);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-slate-50">
        <SchemeDetailSkeleton />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-card p-8 sm:p-10 space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-brand-950 font-heading">
              {t('scheme_not_found_title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t('scheme_not_found_desc')}
            </p>
          </div>
          <Link to="/schemes" className="inline-block w-full">
            <Button variant="primary" size="md" iconLeft={ArrowLeft} className="w-full justify-center">
              {t('scheme_back_link')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const allDocs = scheme.documentsRequired || [];
  const areAllDocsChecked = allDocs.length > 0 && allDocs.every((_, idx) => checkedDocs[idx]);

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation & Share Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('scheme_back_link')}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-subtle"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? t('link_copied_btn') : t('share_scheme_btn')}</span>
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-950 via-amber-500 to-brand-950" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                <Landmark className="w-3.5 h-3.5" />
                <span>{scheme.ministry}</span>
              </div>

              <Badge variant="saffron" size="sm">
                {scheme.category || 'Central Government Scheme'}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-950 font-heading tracking-tight leading-tight">
              {scheme.name}
            </h1>

            {scheme.nameHi && (
              <h2 className="text-base sm:text-lg font-hindi text-amber-700 font-semibold">
                {scheme.nameHi}
              </h2>
            )}

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {lang === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
            </p>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('max_benefit_card')}
                </span>
                <span className="text-xl font-extrabold text-brand-950 font-heading mt-1 block">
                  {scheme.maxBenefit || scheme.maxAmount || (lang === 'hi' ? 'वित्तीय सहायता' : 'Financial Support')}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <span className="block text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                  {t('subsidy_rate_card')}
                </span>
                <span className="text-sm font-bold text-amber-950 mt-1 block">
                  {scheme.subsidyRate || (lang === 'hi' ? 'ब्याज अनुदान एवं सब्सिडी' : 'Interest Subvention & Grant')}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('target_audience_card')}
                </span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block line-clamp-2">
                  {scheme.targetAudience || (lang === 'hi' ? 'सूक्ष्म एवं लघु उद्यम' : 'Micro & Small Enterprises')}
                </span>
              </div>
            </div>

            {/* Actions: Live Update & Apply Portal */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={scheme.officialUrl || scheme.applicationUrl || 'https://www.myscheme.gov.in/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold transition-all duration-150 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-brand-950 text-sm px-5 py-3 gap-2 shadow-md hover:shadow-lg active:scale-[0.99] border border-amber-600/20 w-full sm:w-auto"
              >
                <span>{t('apply_scheme') || 'Apply on Official Portal'}</span>
                <ExternalLink className="w-4 h-4 text-brand-950 shrink-0" />
              </a>

              <Button
                variant="secondary"
                size="md"
                iconLeft={RefreshCw}
                onClick={handleFetchLiveUpdates}
                loading={fetchingLive}
                className="w-full sm:w-auto font-semibold py-3"
              >
                {t('fetch_latest_info')}
              </Button>
            </div>

            {/* Direct Official Link Preview */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
              <span className="shrink-0">{lang === 'hi' ? 'आधिकारिक सरकारी पोर्टल:' : 'Official Government Portal:'}</span>
              <a
                href={scheme.officialUrl || scheme.applicationUrl || 'https://www.myscheme.gov.in/'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-800 underline font-semibold truncate max-w-sm sm:max-w-md"
              >
                {scheme.officialUrl || scheme.applicationUrl || 'https://www.myscheme.gov.in/'}
              </a>
            </div>
          </div>
        </div>

        {/* Live Gazette / TinyFish Fetch Card (if fetched) */}
        <AnimatePresence>
          {liveInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-brand-950 text-white rounded-3xl p-6 sm:p-8 border border-brand-800 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm sm:text-base font-bold font-heading">
                    Live Government Update Bulletin (TinyFish Engine)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-300 font-mono">
                  Fetched: {liveInfo.fetchedAt}
                </span>
              </div>

              <p className="text-xs text-amber-300 font-semibold">
                Status: {liveInfo.status}
              </p>

              <div className="space-y-2 text-xs text-slate-200">
                {liveInfo.notices?.map((n, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Two-Column Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* ELIGIBILITY CRITERIA */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-brand-950" />
              <h3 className="text-base font-bold text-brand-950 font-heading">
                {t('eligibility_heading')}
              </h3>
            </div>

            <div className="space-y-3">
              {scheme.eligibility?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SCHEME BENEFITS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-brand-950 font-heading">
                {t('benefits_heading')}
              </h3>
            </div>

            <div className="space-y-3">
              {scheme.benefits?.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs text-brand-950 leading-relaxed font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-brand-950 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* REQUIRED DOCUMENTS CHECKLIST */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-950" />
              <div>
                <h3 className="text-base font-bold text-brand-950 font-heading">
                  {t('documents_heading')}
                </h3>
                <span className="text-xs text-slate-400 font-normal">
                  {t('documents_sub_note')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAllDocuments}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
              >
                {areAllDocsChecked ? t('deselect_all_docs') : t('select_all_docs')}
              </button>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {Object.values(checkedDocs).filter(Boolean).length} / {scheme.documentsRequired?.length || 0} {t('ready_status')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {scheme.documentsRequired?.map((doc, idx) => {
              const isChecked = !!checkedDocs[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleDocumentCheck(idx)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-sm'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100/70'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-medium leading-relaxed">{doc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP-BY-STEP APPLICATION GUIDE */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-brand-950 font-heading">
              {t('application_guide_heading')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('application_steps_sub')}
            </p>
          </div>

          <div className="space-y-4">
            {scheme.applicationSteps?.map((stepText, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-950 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                  {idx + 1}
                </div>
                <div className="pt-1">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {stepText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Official Apply Footer Callout */}
          <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                {t('official_portal_head')}
              </span>
              <p className="text-xs text-amber-900">
                {t('official_portal_notice')}
              </p>
            </div>

            <a
              href={scheme.officialUrl || scheme.applicationUrl || 'https://www.myscheme.gov.in/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold transition-all duration-150 rounded-xl bg-brand-950 hover:bg-brand-900 active:bg-brand-950 text-white text-xs px-4 py-2.5 gap-1.5 shadow-sm active:scale-95 shrink-0 w-full sm:w-auto"
            >
              <span>{t('official_apply_footer')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
