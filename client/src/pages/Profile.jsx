import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building,
  MapPin,
  Briefcase,
  User,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';
import StepIndicator from '../components/StepIndicator';
import {
  INDIAN_STATES,
  SOCIAL_CATEGORIES,
  GENDER_OPTIONS,
  SPECIAL_CATEGORIES,
  BUSINESS_TYPES,
  EDUCATION_LEVELS
} from '../lib/constants';
import { api } from '../lib/api';

export default function Profile() {
  const { lang, t, loc } = useLanguage();
  const navigate = useNavigate();

  // Multi-step state: 1, 2, 3
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');

  // Form State with Session Storage Rehydration
  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('vm_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved profile:', e);
    }
    return {
      fullName: '',
      age: 28,
      gender: 'Female',
      category: 'OBC',
      specialCategories: ['woman'],
      state: 'Uttar Pradesh',
      district: '',
      areaType: 'Rural',
      businessType: 'Manufacturing',
      isExistingBusiness: false,
      annualIncome: 240000,
      fundingNeeded: 500000,
      education: '10th_pass'
    };
  });

  // Inline Validation Errors
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: t('step_1_title'), subtitle: t('step_1_desc') },
    { id: 2, title: t('step_2_title'), subtitle: t('step_2_desc') },
    { id: 3, title: t('step_3_title'), subtitle: t('step_3_desc') },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for that field if present
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSpecialCategoryToggle = (id) => {
    setFormData(prev => {
      const exists = prev.specialCategories.includes(id);
      const updated = exists
        ? prev.specialCategories.filter(item => item !== id)
        : [...prev.specialCategories, id];
      return { ...prev, specialCategories: updated };
    });
  };

  // Step Validation with full bilingual error strings
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = t('validation_name_required');
      }
      if (!formData.age || formData.age < 18 || formData.age > 80) {
        newErrors.age = t('validation_age_range');
      }
      if (!formData.category) {
        newErrors.category = t('validation_category_required');
      }
    } else if (step === 2) {
      if (!formData.state) {
        newErrors.state = t('validation_state_required');
      }
      if (!formData.district.trim()) {
        newErrors.district = t('validation_district_required');
      }
    } else if (step === 3) {
      if (!formData.businessType) {
        newErrors.businessType = t('validation_sector_required');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(3, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);

    // Simulated multi-stage AI reasoning steps for high polish
    setAnalysisStep(lang === 'hi' ? 'केंद्रीय एवं राज्य नियमों का मिलान...' : 'Analyzing Central & State MSME datasets...');
    await new Promise(r => setTimeout(r, 600));

    setAnalysisStep(lang === 'hi' ? 'आरक्षण एवं सब्सिडी मार्जिन की गणना...' : 'Evaluating category subsidies & margin grants...');
    await new Promise(r => setTimeout(r, 700));

    setAnalysisStep(lang === 'hi' ? 'पात्रता स्कोर तैयार किए जा रहे हैं...' : 'Generating personalized scheme eligibility scores...');

    try {
      const res = await api.matchSchemes(formData);
      // Store matched result and profile in sessionStorage for persistence
      sessionStorage.setItem('vm_user_profile', JSON.stringify(formData));
      sessionStorage.setItem('vm_matched_schemes', JSON.stringify(res.data || []));

      // Redirect to /schemes with match view enabled
      navigate('/schemes?matched=true');
    } catch (err) {
      console.error('Error during scheme matching:', err);
      // Fallback redirect
      navigate('/schemes');
    } finally {
      setSubmitting(false);
    }
  };

  // Format currency helpers
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Eligibility Matcher</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-950 font-heading tracking-tight">
            {t('profile_title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t('profile_subtitle')}
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => {
            if (step < currentStep) setCurrentStep(step);
          }}
        />

        {/* Form Card Container */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep < 3) handleNext();
            else handleSubmit(e);
          }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 relative overflow-hidden"
        >
          
          {/* Subtle accent border line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-950 via-amber-500 to-brand-950" />

          {/* Form Step Animated Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-brand-950 font-heading">
                    {t('step_1_title')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('step_1_desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_full_name')} *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder={t('field_full_name_placeholder')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-950/20 ${
                        errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 focus:border-brand-950'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_age')} *
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="85"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-950/20 ${
                        errors.age ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 focus:border-brand-950'
                      }`}
                    />
                    {errors.age && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.age}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_gender')} *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {GENDER_OPTIONS.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => handleInputChange('gender', g.value)}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                            formData.gender === g.value
                              ? 'bg-brand-950 text-white border-brand-950 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {lang === 'hi' ? g.labelHi : g.value}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Social Category */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_social_category')} *
                    </label>
                    <p className="text-xs text-slate-500">
                      {t('category_sub_note')}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SOCIAL_CATEGORIES.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => handleInputChange('category', cat.value)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            formData.category === cat.value
                              ? 'bg-amber-500/10 border-amber-500 text-brand-950 ring-2 ring-amber-500/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs font-bold">
                            {lang === 'hi' ? cat.labelHi : cat.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Characteristics */}
                  <div className="sm:col-span-2 space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_special_category')} {t('select_all_apply')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SPECIAL_CATEGORIES.map((sc) => {
                        const isSelected = formData.specialCategories.includes(sc.id);
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => handleSpecialCategoryToggle(sc.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-brand-950 text-white border-brand-950 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                            <span>{lang === 'hi' ? sc.labelHi : sc.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-brand-950 font-heading">
                    {t('step_2_title')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('step_2_desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* State Select */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_state')} *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-950/20 focus:border-brand-950"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_district')} *
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder={t('field_district_placeholder')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-950/20 ${
                        errors.district ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 focus:border-brand-950'
                      }`}
                    />
                    {errors.district && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.district}
                      </p>
                    )}
                  </div>

                  {/* Area Type: Rural vs Urban */}
                  <div className="sm:col-span-2 space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_area_type')} *
                    </label>
                    <p className="text-xs text-slate-500">
                      {t('rural_bonus_note')}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('areaType', 'Rural');
                          if (!formData.specialCategories.includes('rural')) {
                            handleSpecialCategoryToggle('rural');
                          }
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.areaType === 'Rural'
                            ? 'bg-emerald-50/60 border-emerald-500 text-brand-950 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-emerald-950">
                          {t('area_rural')}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {lang === 'hi' ? '35% तक अधिक सरकारी सब्सिडी' : 'Higher subsidies (up to 35% margin money)'}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange('areaType', 'Urban');
                          if (formData.specialCategories.includes('rural')) {
                            handleSpecialCategoryToggle('rural');
                          }
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.areaType === 'Urban'
                            ? 'bg-brand-50/60 border-brand-500 text-brand-950 ring-2 ring-brand-500/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-brand-950">
                          {t('area_urban')}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {lang === 'hi' ? 'दुकानदारों, फेरीवालों और सेवा उद्यमों के लिए उत्तम' : 'Ideal for street vendors, tech & shopkeepers'}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-brand-950 font-heading">
                    {t('step_3_title')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('step_3_desc')}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_business_type')} *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-950/20 focus:border-brand-950"
                    >
                      {BUSINESS_TYPES.map((bt) => (
                        <option key={bt.value} value={bt.value}>
                          {lang === 'hi' ? bt.labelHi : bt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stage: New vs Existing */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_existing_business')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange('isExistingBusiness', false)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          !formData.isExistingBusiness
                            ? 'bg-brand-950 text-white border-brand-950 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {t('business_status_new')}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${!formData.isExistingBusiness ? 'text-amber-300' : 'text-slate-500'}`}>
                          {lang === 'hi' ? 'स्टैंड-अप इंडिया और PMEGP के लिए उपयुक्त' : 'Ideal for Stand-Up India & PMEGP'}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange('isExistingBusiness', true)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          formData.isExistingBusiness
                            ? 'bg-brand-950 text-white border-brand-950 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {t('business_status_existing')}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${formData.isExistingBusiness ? 'text-amber-300' : 'text-slate-500'}`}>
                          {lang === 'hi' ? 'मुद्रा तरुण और CGTMSE के लिए उपयुक्त' : 'Ideal for MUDRA Tarun & CGTMSE'}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Funding Requirement Slider */}
                  <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t('field_funding_needed')}
                      </label>
                      <span className="text-base font-extrabold text-brand-950 font-heading">
                        {formatINR(formData.fundingNeeded)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="10000000"
                      step="50000"
                      value={formData.fundingNeeded}
                      onChange={(e) => handleInputChange('fundingNeeded', Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-950"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>{lang === 'hi' ? '₹50,000 (सूक्ष्म)' : '₹50,000 (Micro)'}</span>
                      <span>{lang === 'hi' ? '₹50 लाख (PMEGP)' : '₹50 Lakhs (PMEGP Max)'}</span>
                      <span>{lang === 'hi' ? '₹1 करोड़ (स्टैंड-अप)' : '₹1 Crore (Stand-Up)'}</span>
                    </div>
                  </div>

                  {/* Education level */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t('field_education')}
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-950/20 focus:border-brand-950"
                    >
                      {EDUCATION_LEVELS.map((ed) => (
                        <option key={ed.value} value={ed.value}>
                          {lang === 'hi' ? ed.labelHi : ed.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Analysis Overlay when submitting */}
          <AnimatePresence>
            {submitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                  <Sparkles className="w-6 h-6 text-brand-950 absolute inset-0 m-auto" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-950 font-heading">
                    {t('btn_submitting')}
                  </h4>
                  <p className="text-sm text-amber-700 font-medium mt-1 animate-pulse">
                    {analysisStep}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="secondary"
                iconLeft={ArrowLeft}
                onClick={handleBack}
                disabled={submitting}
              >
                {t('btn_back')}
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                variant="primary"
                iconRight={ArrowRight}
                onClick={handleNext}
                disabled={submitting}
              >
                {t('btn_next')}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="saffron"
                iconRight={Sparkles}
                onClick={handleSubmit}
                loading={submitting}
                className="font-bold text-brand-950 shadow-md"
              >
                {t('btn_submit_match')}
              </Button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
