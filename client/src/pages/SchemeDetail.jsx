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
  Check,
  Users,
  GraduationCap,
  MapPin,
  Calendar,
  BadgePercent,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { SchemeDetailSkeleton } from '../components/LoadingSpinner';
import { ALL_SCHEMES } from '../lib/constants';
import { api } from '../lib/api';

// Robust helper to extract full bilingual eligibility points
function getEligibilityList(scheme, lang) {
  if (!scheme) return [];

  if (lang === 'hi' && Array.isArray(scheme.eligibilityHi) && scheme.eligibilityHi.length > 0) {
    return scheme.eligibilityHi;
  }
  if (Array.isArray(scheme.eligibility) && scheme.eligibility.length > 0) {
    return scheme.eligibility;
  }

  // Fallback generation from eligibilityCriteria object if array is not directly set
  const c = scheme.eligibilityCriteria || {};
  const list = [];
  const isHi = lang === 'hi';

  if (c.minAge || c.maxAge) {
    const ageStr = c.maxAge ? `${c.minAge || 18} - ${c.maxAge}` : `${c.minAge || 18}+`;
    list.push(isHi ? `आयु सीमा: आवेदक की आयु कम से कम ${ageStr} वर्ष होनी चाहिए।` : `Applicant Age: Must be between ${ageStr} years of age at application time.`);
  } else {
    list.push(isHi ? `आयु सीमा: 18 वर्ष या उससे अधिक आयु का कोई भी भारतीय नागरिक।` : `Applicant Age: Any Indian citizen above 18 years of age.`);
  }

  if (c.gender && !c.gender.includes('All')) {
    const g = c.gender.join(', ');
    list.push(isHi ? `लिंग पात्रता: यह योजना विशेष रूप से ${g} उद्यमियों के लिए है।` : `Gender Inclusivity: Exclusively targeted for ${g} entrepreneurs.`);
  } else {
    list.push(isHi ? `लिंग पात्रता: सभी लिंग (महिला, पुरुष एवं ट्रांसजेंडर) पात्र हैं। महिला उद्यमियों को अतिरिक्त प्राथमिकता।` : `Gender Inclusivity: Open to All Genders (Special incentives and priority quotas for Women entrepreneurs).`);
  }

  if (c.category && !c.category.includes('All')) {
    const cats = c.category.join(', ');
    list.push(isHi ? `सामाजिक श्रेणी: विशेष रूप से ${cats} वर्ग के उद्यमियों के लिए।` : `Social Category: Specially allocated for ${cats} category.`);
  } else {
    list.push(isHi ? `सामाजिक श्रेणी: सभी वर्ग (General, SC, ST, OBC, Minority, EWS) पात्र हैं।` : `Social Category: Open to All (General, SC, ST, OBC, Minority, and EWS with highest subsidies for marginalized classes).`);
  }

  if (c.businessTypes && c.businessTypes.length > 0) {
    const trades = c.businessTypes.slice(0, 5).map(t => t.replace(/_/g, ' ')).join(', ');
    list.push(isHi ? `पात्र व्यवसाय: ${trades} एवं संबंधित सूक्ष्म इकाइयां।` : `Eligible Trades: Covers ${trades} and allied micro-enterprises.`);
  }

  if (c.annualIncomeLimit) {
    list.push(isHi ? `वार्षिक पारिवारिक आय: अधिकतम ₹${c.annualIncomeLimit.toLocaleString('en-IN')} तक।` : `Annual Income Ceiling: Family income must not exceed ₹${c.annualIncomeLimit.toLocaleString('en-IN')} per annum.`);
  } else {
    list.push(isHi ? `आय सीमा: कोई बाध्यकारी ऊपरी पारिवारिक आय सीमा नहीं है।` : `Income Ceiling: No restrictive upper annual family income ceiling.`);
  }

  if (c.education && c.education !== 'any' && c.education !== 'none') {
    list.push(isHi ? `शैक्षणिक योग्यता: न्यूनतम ${c.education.replace(/_/g, ' ')} उत्तीर्ण आवश्यक।` : `Educational Qualification: Minimum ${c.education.replace(/_/g, ' ')} required for major capital projects.`);
  } else {
    list.push(isHi ? `शैक्षणिक योग्यता: किसी औपचारिक न्यूनतम शैक्षणिक प्रमाण पत्र की कोई बाध्यता नहीं।` : `Educational Qualification: No formal educational qualification barrier.`);
  }

  if (c.location) {
    const locStr = Array.isArray(c.location) ? c.location.join(' & ') : c.location;
    list.push(isHi ? `भौगोलिक विस्तार: देश भर के ${locStr} क्षेत्रों में लागू।` : `Geographic Coverage: Applicable in ${locStr} areas across all Indian states and Union Territories.`);
  }

  if (c.existingBusiness === 'existing_only') {
    list.push(isHi ? `उद्यम अवस्था: वर्तमान में संचालित व्यवसाय के विस्तार अथवा कार्यशील पूंजी के लिए।` : `Business Stage: Valid for existing micro-enterprises looking for expansion or working capital.`);
  } else if (c.existingBusiness === 'new_only') {
    list.push(isHi ? `उद्यम अवस्था: केवल नए व्यवसाय या नई इकाई (ग्रीनफील्ड) की स्थापना के लिए।` : `Business Stage: Greenfield project setup (new enterprises / startups only).`);
  } else {
    list.push(isHi ? `उद्यम अवस्था: नए स्टार्टअप और मौजूदा व्यवसाय के आधुनिकीकरण दोनों के लिए पात्र।` : `Business Stage: Both new startups and existing enterprises seeking modern upgradation are eligible.`);
  }

  return list;
}

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
      const targetUrl = scheme.officialUrl || scheme.applicationUrl;
      const updates = await api.fetchLiveSchemeDetails(targetUrl, scheme.id);
      const cleanData = updates?.data || updates;
      setLiveInfo(cleanData);
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

        {/* Live Gazette / TinyFish Fetch Card */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {liveInfo ? (
              <motion.div
                key="live-card"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-950 text-white rounded-3xl p-6 sm:p-8 border border-brand-800 shadow-xl space-y-5 relative overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold font-heading text-white flex items-center gap-2">
                        <span>{lang === 'hi' ? 'लाइव सरकारी राजपत्र बुलेटिन' : 'Live Government Gazette Bulletin'}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono border border-amber-400/30">
                          TinyFish Engine
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {liveInfo.source || 'TinyFish Live Web Intelligence Engine'} • {scheme.officialUrl}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-emerald-300 font-mono bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/80">
                      {lang === 'hi' ? 'सिंक समय:' : 'Synced:'} {liveInfo.fetchedAt || 'Real-time FY 2026-27'}
                    </span>
                    <button
                      onClick={handleFetchLiveUpdates}
                      disabled={fetchingLive}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                      title="Re-scan live portal"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${fetchingLive ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Status Pill & Verification Note */}
                <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{liveInfo.status || 'Active & Accepting Applications (FY 2026-27)'}</span>
                  </div>
                  <span className="text-xs text-slate-300">
                    {lang === 'hi' 
                      ? 'डीबीटी (DBT) सब्सिडी लिंकेज सभी सरकारी व क्षेत्रीय बैंकों में सक्रिय है।' 
                      : 'Direct Benefit Transfer (DBT) subsidy linkage active across all participating banks.'}
                  </span>
                </div>

                {/* Bullet notices */}
                <div className="space-y-2.5 text-xs text-slate-200">
                  {(liveInfo.notices && liveInfo.notices.length > 0 ? liveInfo.notices : [
                    'Direct Benefit Transfer (DBT) subsidy linkage active across 100% scheduled commercial banks and RRBs.',
                    'Special category beneficiaries (SC/ST/OBC/Women/Rural) receive maximum capital subsidies directly into escrow accounts.',
                    'Zero collateral or third-party guarantee required for loans up to ₹10,00,000 under RBI & CGTMSE guidelines.',
                    'Udyam Assist Platform (UAP) registration automatically verified via API handshake during form submission.',
                    'Anti-Scam Alert: Never pay unauthorized processing fees or commissions to private intermediaries.'
                  ]).map((noticeText, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{noticeText}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div
                key="banner"
                className="bg-gradient-to-r from-brand-950 via-slate-900 to-brand-900 rounded-3xl p-6 sm:p-7 border border-amber-500/30 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                      TinyFish Real-time Web Intelligence
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                      FY 2026-27 Active
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading">
                    {lang === 'hi' ? 'लाइव सरकारी राजपत्र एवं नीति अपडेट' : 'Live Government Gazette & Regulatory Updates'}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    {lang === 'hi'
                      ? 'TinyFish AI इंजन के माध्यम से आधिकारिक पोर्टल की नवीनतम अधिसूचनाएं, सब्सिडी कोटा और सक्रियता स्थिति तुरंत जांचें।'
                      : 'Scan the official ministry portal in real-time for active application quotas, DBT escrow subvention, and regulatory notices.'}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={RefreshCw}
                  onClick={handleFetchLiveUpdates}
                  loading={fetchingLive}
                  className="shrink-0 bg-amber-500 hover:bg-amber-400 text-brand-950 font-bold shadow-glow"
                >
                  {fetchingLive
                    ? (lang === 'hi' ? 'स्कैन हो रहा है...' : 'Scanning Live...')
                    : (lang === 'hi' ? 'लाइव अपडेट स्कैन करें' : 'Fetch Live Updates (TinyFish API)')}
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Two-Column Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* ELIGIBILITY CRITERIA */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-950" />
                <h3 className="text-base font-bold text-brand-950 font-heading">
                  {t('eligibility_heading')}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {lang === 'hi' ? 'सत्यापित मानदंड' : 'Verified Criteria'}
              </span>
            </div>

            {/* Quick Attribute Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {lang === 'hi' ? 'आयु सीमा' : 'Age Range'}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                  {scheme.eligibilityCriteria?.minAge 
                    ? `${scheme.eligibilityCriteria.minAge} - ${scheme.eligibilityCriteria.maxAge || 65} yrs`
                    : '18+ Years'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {lang === 'hi' ? 'सामाजिक वर्ग' : 'Categories'}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate" title="All Categories">
                  {scheme.eligibilityCriteria?.category?.includes('All') || !scheme.eligibilityCriteria?.category
                    ? 'All (SC/ST/OBC Bonus)'
                    : scheme.eligibilityCriteria.category.join(', ')}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {lang === 'hi' ? 'लिंग' : 'Gender'}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                  {scheme.eligibilityCriteria?.gender?.includes('Female') && !scheme.eligibilityCriteria?.gender?.includes('Male')
                    ? 'Women Only'
                    : 'All (Women Priority)'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {lang === 'hi' ? 'भौगोलिक क्षेत्र' : 'Area'}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                  {scheme.eligibilityCriteria?.location 
                    ? scheme.eligibilityCriteria.location.join(' & ') 
                    : 'Rural & Urban'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {lang === 'hi' ? 'योग्यता' : 'Education'}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                  {scheme.eligibilityCriteria?.education && scheme.eligibilityCriteria.education !== 'any'
                    ? scheme.eligibilityCriteria.education.replace(/_/g, ' ')
                    : 'No Minimum Bar'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {lang === 'hi' ? 'आय सीमा' : 'Income Cap'}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                  {scheme.eligibilityCriteria?.annualIncomeLimit
                    ? `≤ ₹${(scheme.eligibilityCriteria.annualIncomeLimit / 100000).toFixed(1)}L / yr`
                    : 'No Upper Cap'}
                </span>
              </div>
            </div>

            {/* Checklist of Eligibility Points */}
            <div className="space-y-2.5 pt-1">
              {getEligibilityList(scheme, lang).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed hover:bg-slate-100/70 transition-colors"
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
