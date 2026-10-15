import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
  Landmark,
  Layers,
  ArrowUpDown,
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import SchemeCard from '../components/SchemeCard';
import { SchemeCardSkeleton } from '../components/LoadingSpinner';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { ALL_SCHEMES, MINISTRIES } from '../lib/constants';
import { api } from '../lib/api';

export default function Schemes() {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();

  const [allSchemes, setAllSchemes] = useState([]);
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'matched' or 'all'
  const [loading, setLoading] = useState(true);
  const [matchedProfile, setMatchedProfile] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAmountRange, setSelectedAmountRange] = useState('All');
  const [sortBy, setSortBy] = useState('match'); // 'match', 'amount', 'name'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Check if user came from profile match or has stored profile
    const storedMatches = sessionStorage.getItem('vm_matched_schemes');
    const storedProfile = sessionStorage.getItem('vm_user_profile');

    if (storedProfile) {
      try {
        setMatchedProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error(e);
      }
    }

    if (storedMatches) {
      try {
        const parsed = JSON.parse(storedMatches);
        setMatchedSchemes(parsed);
        setActiveTab('matched');
      } catch (e) {
        console.error(e);
      }
    }

    loadAllSchemes();
  }, []);

  const loadAllSchemes = async () => {
    setLoading(true);
    try {
      const res = await api.getSchemes();
      // Attach default baseline scores if not matched yet
      const list = (res.data || ALL_SCHEMES).map((s, idx) => ({
        ...s,
        matchScore: s.matchScore !== undefined ? s.matchScore : 90 - idx * 4
      }));
      setAllSchemes(list);
    } catch (err) {
      setAllSchemes(ALL_SCHEMES);
    } finally {
      setLoading(false);
    }
  };

  // Determine active source list based on active tab
  const activeSourceList = useMemo(() => {
    if (activeTab === 'matched' && matchedSchemes.length > 0) {
      return matchedSchemes;
    }
    return allSchemes.length > 0 ? allSchemes : ALL_SCHEMES;
  }, [activeTab, matchedSchemes, allSchemes]);

  // Filter & Sort Logic
  const filteredSchemes = useMemo(() => {
    let result = [...activeSourceList];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          (s.nameHi && s.nameHi.toLowerCase().includes(q)) ||
          s.ministry.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.targetAudience && s.targetAudience.toLowerCase().includes(q))
      );
    }

    // Ministry filter
    if (selectedMinistry !== 'All') {
      result = result.filter(s => s.ministry === selectedMinistry);
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    // Amount Range filter
    if (selectedAmountRange === 'micro') {
      result = result.filter(s => s.maxBenefitNumeric <= 100000);
    } else if (selectedAmountRange === 'medium') {
      result = result.filter(s => s.maxBenefitNumeric > 100000 && s.maxBenefitNumeric <= 2000000);
    } else if (selectedAmountRange === 'large') {
      result = result.filter(s => s.maxBenefitNumeric > 2000000);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'match') {
        return (b.matchScore || 0) - (a.matchScore || 0);
      } else if (sortBy === 'amount') {
        return (b.maxBenefitNumeric || 0) - (a.maxBenefitNumeric || 0);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [activeSourceList, searchQuery, selectedMinistry, selectedCategory, selectedAmountRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMinistry('All');
    setSelectedCategory('All');
    setSelectedAmountRange('All');
    setSortBy('match');
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Personalized Match Banner (if user matched their profile) */}
        {matchedProfile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl bg-brand-950 text-white p-5 sm:p-6 border border-brand-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-brand-950 flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-heading">
                    {t('ai_matched_banner_title')} {matchedProfile.fullName || (lang === 'hi' ? 'आप' : 'You')}
                  </h3>
                  <Badge variant="saffron" size="sm">
                    {matchedProfile.category} • {matchedProfile.areaType || 'Rural'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {t('sector_label')}: {matchedProfile.businessType} • {t('target_label')}: ₹{(matchedProfile.fundingNeeded / 100000).toFixed(1)} {lang === 'hi' ? 'लाख' : 'Lakhs'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link to="/profile" className="w-full md:w-auto">
                <button className="w-full md:w-auto text-xs px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/20">
                  {t('update_profile_btn')}
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* View Switcher Tabs (My Matched vs All Schemes) */}
        {matchedSchemes.length > 0 && (
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl w-fit mb-6 shadow-xs">
            <button
              onClick={() => setActiveTab('matched')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'matched'
                  ? 'bg-brand-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-950 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('tab_matched_schemes')} ({matchedSchemes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-brand-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-950 hover:bg-white/60'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('tab_all_schemes')} ({allSchemes.length || ALL_SCHEMES.length})</span>
            </button>
          </div>
        )}

        {/* Page Title & Search Bar Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-950 font-heading tracking-tight">
              {t('schemes_title')}
            </h1>
            <p className="text-sm text-slate-600 mt-1.5">
              {t('schemes_subtitle')}
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm shadow-subtle focus:outline-none focus:ring-2 focus:ring-brand-950/20 focus:border-brand-950 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex lg:hidden items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-brand-950"
          >
            <Filter className="w-4 h-4 text-amber-500" />
            <span>{t('mobile_filter_btn')}</span>
          </button>
          <span className="text-xs text-slate-500">
            {filteredSchemes.length} {lang === 'hi' ? 'योजनाएं' : 'schemes found'}
          </span>
        </div>

        {/* Main Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FILTER SIDEBAR (Desktop + Mobile Drawer) */}
          <div
            className={`lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-6 ${
              mobileFilterOpen ? 'block mb-6' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-950" />
                <h3 className="text-sm font-bold text-brand-950 uppercase tracking-wider">
                  {t('mobile_filter_btn')}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-amber-700 hover:text-amber-800"
                >
                  {t('reset_filters')}
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title={t('close_filters')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('sort_by')}</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-950/20"
              >
                <option value="match">{t('sort_match')}</option>
                <option value="amount">{t('sort_amount_desc')}</option>
                <option value="name">{t('sort_name')}</option>
              </select>
            </div>

            {/* Category / Support Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('filter_support_type')}
              </label>
              <div className="space-y-1">
                {[
                  { id: 'All', label: t('filter_all_support') },
                  { id: 'Loan', label: lang === 'hi' ? 'ऋण (Loan)' : 'Loan' },
                  { id: 'Subsidy', label: lang === 'hi' ? 'सब्सिडी (Subsidy)' : 'Subsidy' },
                  { id: 'Credit', label: lang === 'hi' ? 'क्रेडिट गारंटी (Credit)' : 'Credit Guarantee' },
                  { id: 'Skilling', label: lang === 'hi' ? 'कौशल एवं टूलकिट (Skilling)' : 'Skilling & Toolkit' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-brand-950 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Benefit Amount Range Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('filter_loan_amount')}
              </label>
              <div className="space-y-1">
                {[
                  { id: 'All', label: t('filter_any_amount') },
                  { id: 'micro', label: lang === 'hi' ? 'सूक्ष्म (₹1 लाख तक)' : 'Micro (Up to ₹1 Lakh)' },
                  { id: 'medium', label: lang === 'hi' ? 'लघु (₹1 लाख - ₹20 लाख)' : 'Small (₹1L - ₹20 Lakhs)' },
                  { id: 'large', label: lang === 'hi' ? 'उद्यम (₹20 लाख - ₹5 करोड़)' : 'Enterprise (₹20L - ₹5 Cr)' },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedAmountRange(range.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedAmountRange === range.id
                        ? 'bg-brand-950 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ministry Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('ministry_label')}</span>
              </label>
              <select
                value={selectedMinistry}
                onChange={(e) => setSelectedMinistry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-950/20"
              >
                <option value="All">{t('filter_ministry')}</option>
                {MINISTRIES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* TinyFish API Verification Note */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
              <strong>TinyFish AI Verified:</strong> {lang === 'hi' ? 'योजनाएं सीधे आधिकारिक राजपत्र अधिसूचनाओं और आरबीआई एमएसएमई दिशानिर्देशों से अद्यतन हैं।' : 'Schemes updated directly from official Gazette notifications and RBI MSME lending guidelines.'}
            </div>
          </div>

          {/* SCHEMES GRID */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Results Counter & Active Pills */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                {lang === 'hi' ? (
                  <>कुल <strong>{filteredSchemes.length}</strong> {t('showing_schemes_count')}</>
                ) : (
                  <>Showing <strong>{filteredSchemes.length}</strong> {t('showing_schemes_count')}</>
                )}
              </span>
              {(selectedMinistry !== 'All' || selectedCategory !== 'All' || selectedAmountRange !== 'All' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-amber-700 hover:underline font-semibold"
                >
                  {t('clear_all_filters')}
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SchemeCardSkeleton />
                <SchemeCardSkeleton />
                <SchemeCardSkeleton />
                <SchemeCardSkeleton />
              </div>
            ) : filteredSchemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    showMatchScore={true}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {t('no_schemes_found')}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {lang === 'hi' ? 'कृपया कुछ फिल्टर हटाएं या सामान्य शब्द जैसे "ऋण", "महिला" या "कारीगर" से खोजें।' : 'Try clearing some filters or searching with broader keywords like "loan", "women", or "artisan".'}
                </p>
                <Button variant="secondary" size="sm" onClick={resetFilters}>
                  {t('reset_filters')}
                </Button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
