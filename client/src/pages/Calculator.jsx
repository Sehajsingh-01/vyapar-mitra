import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator as CalcIcon,
  IndianRupee,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Building2,
  Users,
  Info
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';
import Badge from '../components/Badge';

const SCHEME_CALC_PRESETS = [
  {
    id: 'pmegp',
    name: 'PMEGP Capital Subsidy',
    nameHi: 'PMEGP पूंजीगत सब्सिडी',
    maxProjectCost: 5000000,
    minProjectCost: 100000,
    defaultCost: 2500000,
    tenureYears: 5,
    interestRate: 8.5,
    calcSubsidy: (cost, category, area, gender) => {
      // PMEGP Rules:
      // Special Category (SC/ST/OBC/Women/Minority/PwD) OR Rural:
      // Rural Special = 35%, Urban Special = 25%
      // Rural General = 25%, Urban General = 15%
      const isSpecial = ['SC', 'ST', 'OBC', 'Women', 'Minority', 'PwD'].includes(category) || gender === 'Female';
      const isRural = area === 'rural';
      let subsidyRate = 0.15;
      let ownContributionRate = 0.10;

      if (isSpecial && isRural) {
        subsidyRate = 0.35;
        ownContributionRate = 0.05;
      } else if (isSpecial && !isRural) {
        subsidyRate = 0.25;
        ownContributionRate = 0.05;
      } else if (!isSpecial && isRural) {
        subsidyRate = 0.25;
        ownContributionRate = 0.10;
      } else {
        subsidyRate = 0.15;
        ownContributionRate = 0.10;
      }

      const subsidyAmount = Math.round(cost * subsidyRate);
      const ownContribution = Math.round(cost * ownContributionRate);
      const bankLoan = cost - ownContribution; // Bank disburses remaining, subsidy sits in escrow
      return {
        subsidyRatePercent: subsidyRate * 100,
        subsidyAmount,
        ownContributionRatePercent: ownContributionRate * 100,
        ownContribution,
        bankLoan
      };
    }
  },
  {
    id: 'pm-mudra',
    name: 'PM MUDRA Collateral-Free Loan',
    nameHi: 'पीएम मुद्रा संपार्श्विक-मुक्त ऋण',
    maxProjectCost: 2000000,
    minProjectCost: 20000,
    defaultCost: 500000,
    tenureYears: 5,
    interestRate: 8.0,
    calcSubsidy: (cost) => {
      // Mudra has 0% upfront capital subsidy, but 0% collateral, 0 margin on Shishu (<50k)
      const ownContributionRate = cost <= 50000 ? 0 : 0.10;
      const ownContribution = Math.round(cost * ownContributionRate);
      const bankLoan = cost - ownContribution;
      return {
        subsidyRatePercent: 0,
        subsidyAmount: 0,
        ownContributionRatePercent: ownContributionRate * 100,
        ownContribution,
        bankLoan
      };
    }
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Concessional Credit',
    nameHi: 'पीएम विश्वकर्मा रियायती ऋण',
    maxProjectCost: 300000,
    minProjectCost: 50000,
    defaultCost: 200000,
    tenureYears: 3,
    interestRate: 5.0, // Subsidized 5% interest
    calcSubsidy: (cost) => {
      // 8% interest subvention paid by MoMSME, beneficiary pays only 5%
      // plus ₹15,000 free toolkit e-voucher grant
      return {
        subsidyRatePercent: 8, // 8% interest subvention
        subsidyAmount: 15000, // Toolkit grant
        ownContributionRatePercent: 0,
        ownContribution: 0,
        bankLoan: cost
      };
    }
  },
  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi Street Vendor Loan',
    nameHi: 'पीएम स्वनिधि कार्यशील पूंजी ऋण',
    maxProjectCost: 50000,
    minProjectCost: 10000,
    defaultCost: 20000,
    tenureYears: 1.5,
    interestRate: 7.0, // Subsidized 7% via DBT
    calcSubsidy: (cost) => {
      // 7% interest subsidy directly credited + ₹1,200 cashback
      return {
        subsidyRatePercent: 7,
        subsidyAmount: 1200, // Annual cashback grant
        ownContributionRatePercent: 0,
        ownContribution: 0,
        bankLoan: cost
      };
    }
  }
];

export default function Calculator() {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';

  const [selectedSchemeId, setSelectedSchemeId] = useState('pmegp');
  const [projectCost, setProjectCost] = useState(1500000);
  const [category, setCategory] = useState('OBC');
  const [gender, setGender] = useState('Female');
  const [area, setArea] = useState('rural');
  const [tenureYears, setTenureYears] = useState(5);
  const [customInterestRate, setCustomInterestRate] = useState(8.5);

  const activePreset = useMemo(() => {
    return SCHEME_CALC_PRESETS.find((s) => s.id === selectedSchemeId) || SCHEME_CALC_PRESETS[0];
  }, [selectedSchemeId]);

  const handleSchemeChange = (schemeId) => {
    setSelectedSchemeId(schemeId);
    const preset = SCHEME_CALC_PRESETS.find((s) => s.id === schemeId);
    if (preset) {
      setProjectCost(Math.min(projectCost, preset.maxProjectCost));
      setTenureYears(preset.tenureYears);
      setCustomInterestRate(preset.interestRate);
    }
  };

  // Calculations
  const financialResult = useMemo(() => {
    const { subsidyRatePercent, subsidyAmount, ownContributionRatePercent, ownContribution, bankLoan } =
      activePreset.calcSubsidy(projectCost, category, area, gender);

    // Monthly EMI calculation: [P * R * (1+R)^N] / [(1+R)^N - 1]
    const principal = bankLoan;
    const monthlyRate = customInterestRate / 12 / 100;
    const numberOfMonths = tenureYears * 12;

    let monthlyEmi = 0;
    let totalInterest = 0;
    let totalRepayable = 0;

    if (principal > 0 && monthlyRate > 0 && numberOfMonths > 0) {
      const emiFactor = Math.pow(1 + monthlyRate, numberOfMonths);
      monthlyEmi = Math.round((principal * monthlyRate * emiFactor) / (emiFactor - 1));
      totalRepayable = monthlyEmi * numberOfMonths;
      totalInterest = Math.max(0, totalRepayable - principal);
    }

    return {
      subsidyRatePercent,
      subsidyAmount,
      ownContributionRatePercent,
      ownContribution,
      bankLoan,
      monthlyEmi,
      totalInterest,
      totalRepayable
    };
  }, [activePreset, projectCost, category, area, gender, customInterestRate, tenureYears]);

  const formatCurrency = (val) => {
    return `₹${Number(val || 0).toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold">
            <CalcIcon className="w-4 h-4 text-amber-600" />
            <span>{isHi ? 'सरकारी सब्सिडी एवं ऋण ईएमआई सिमुलेटर' : 'Government Subsidy & Loan EMI Simulator'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-950 font-heading tracking-tight">
            {isHi ? 'अपनी सब्सिडी और मासिक EMI की गणना करें' : 'Calculate Your Government Subsidy & Monthly EMI'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isHi
              ? 'PMEGP में 35% तक गैर-वापसी योग्य सरकारी पूंजी सब्सिडी, स्वयं का अंशदान, और बैंकों द्वारा स्वीकृत ऋण का रीयल-टाइम पारदर्शी विवरण।'
              : 'Estimate upfront government margin money capital subsidies up to 35%, required promoter margin, and net bank monthly EMI in real-time.'}
          </p>
        </div>

        {/* Scheme Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {SCHEME_CALC_PRESETS.map((p) => {
            const isSelected = selectedSchemeId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSchemeChange(p.id)}
                className={`relative px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-colors duration-200 flex items-center gap-2 border select-none ${
                  isSelected
                    ? 'text-white border-brand-950 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="calc-active-preset"
                    className="absolute inset-0 bg-brand-950 rounded-2xl"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{isHi ? p.nameHi : p.name}</span>
                {p.id === 'pmegp' && (
                  <span className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-brand-950 font-extrabold">
                    Up to 35% Free
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-brand-950 font-heading flex items-center gap-2">
                <CalcIcon className="w-5 h-5 text-amber-500" />
                <span>{isHi ? 'परियोजना पैरामीटर सेट करें' : 'Configure Project Parameters'}</span>
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                {activePreset.name}
              </span>
            </div>

            {/* Project Cost Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  {isHi ? 'अनुमानित परियोजना लागत / मशीनरी व्यय' : 'Estimated Project Cost / Machinery Investment'}
                </label>
                <span className="text-lg sm:text-xl font-extrabold text-brand-950 font-mono bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/80">
                  {formatCurrency(projectCost)}
                </span>
              </div>

              <input
                type="range"
                min={activePreset.minProjectCost}
                max={activePreset.maxProjectCost}
                step={activePreset.maxProjectCost > 1000000 ? 50000 : 5000}
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[11px] font-semibold text-slate-400 font-mono">
                <span>{formatCurrency(activePreset.minProjectCost)}</span>
                <span>Max {formatCurrency(activePreset.maxProjectCost)}</span>
              </div>

              {/* Quick cost buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[100000, 500000, 1000000, 2500000, 5000000].filter(c => c <= activePreset.maxProjectCost).map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setProjectCost(amt)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                      projectCost === amt
                        ? 'bg-brand-950 text-white border-brand-950'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category & Gender selection for Affirmative Subsidies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isHi ? 'सामाजिक श्रेणी (सब्सिडी दर हेतु)' : 'Social Category (Determines Subsidy)'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="General">General / सामान्य</option>
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="Minority">Minority Community</option>
                  <option value="PwD">Person with Disability (PwD)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isHi ? 'उद्यमी का लिंग' : 'Entrepreneur Gender'}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Female">Female / महिला (Higher Subsidy)</option>
                  <option value="Male">Male / पुरुष</option>
                  <option value="Other">Other / अन्य</option>
                </select>
              </div>
            </div>

            {/* Area Type selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {isHi ? 'इकाई का स्थान (ग्रामीण क्षेत्रों में 10% अधिक सब्सिडी मिलती है)' : 'Project Location (Rural units receive +10% higher subsidy under PMEGP)'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setArea('rural')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    area === 'rural'
                      ? 'bg-amber-500/10 border-amber-500 text-brand-950 font-bold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>{isHi ? 'ग्रामीण (Gramin)' : 'Rural Location'}</span>
                    <Badge variant="success" size="sm">35% Subsidy</Badge>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {isHi ? 'ग्राम पंचायत क्षेत्र' : 'Village / Panchayat areas'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setArea('urban')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    area === 'urban'
                      ? 'bg-amber-500/10 border-amber-500 text-brand-950 font-bold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>{isHi ? 'शहरी (Urban)' : 'Urban Location'}</span>
                    <Badge variant="outline" size="sm">25% Subsidy</Badge>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {isHi ? 'नगर निगम / पालिका क्षेत्र' : 'Municipal / Town area'}
                  </span>
                </button>
              </div>
            </div>

            {/* Loan Tenure & Interest Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{isHi ? 'ऋण पुनर्भुगतान अवधि' : 'Loan Tenure'}</span>
                  <span className="font-mono text-brand-950">{tenureYears} Years ({tenureYears * 12} Months)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={0.5}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-950"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{isHi ? 'अनुमानित बैंक ब्याज दर' : 'Interest Rate'}</span>
                  <span className="font-mono text-brand-950">{customInterestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={0.25}
                  value={customInterestRate}
                  onChange={(e) => setCustomInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-950"
                />
              </div>
            </div>

          </div>

          {/* Results Summary Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-950 text-white rounded-3xl p-6 sm:p-8 border border-brand-900 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="pb-4 border-b border-white/10">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {isHi ? 'वित्तीय विश्लेषण एवं सहायता' : 'Financial Aid & Repayment Breakdown'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white mt-1">
                  {formatCurrency(financialResult.monthlyEmi)}
                  <span className="text-xs font-normal text-slate-400 font-sans ml-1.5">
                    {isHi ? '/ माह अनुमानित EMI' : '/ month estimated EMI'}
                  </span>
                </h3>
              </div>

              {/* Stacked Proportional Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                  <span>{isHi ? 'पूंजी संरचना' : 'Capital Composition'}</span>
                  <span>100% Total Project</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                  {financialResult.subsidyAmount > 0 && (
                    <div
                      style={{ width: `${(financialResult.subsidyAmount / projectCost) * 100}%` }}
                      className="bg-emerald-500 h-full transition-all duration-300"
                      title={`Subsidy Grant: ${formatCurrency(financialResult.subsidyAmount)}`}
                    />
                  )}
                  {financialResult.ownContribution > 0 && (
                    <div
                      style={{ width: `${(financialResult.ownContribution / projectCost) * 100}%` }}
                      className="bg-amber-400 h-full transition-all duration-300"
                      title={`Own Margin: ${formatCurrency(financialResult.ownContribution)}`}
                    />
                  )}
                  <div
                    style={{ width: `${(financialResult.bankLoan / projectCost) * 100}%` }}
                    className="bg-sky-500 h-full transition-all duration-300"
                    title={`Bank Loan: ${formatCurrency(financialResult.bankLoan)}`}
                  />
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                    <span>Govt Subsidy ({financialResult.subsidyRatePercent}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                    <span>Your Margin ({financialResult.ownContributionRatePercent}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
                    <span>Bank Loan</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 pt-2 text-xs">
                {/* Subsidy */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
                  <div className="space-y-0.5">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isHi ? 'सरकारी पूंजीगत अनुदान (सब्सिडी)' : 'Government Capital Subsidy Grant'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {isHi ? 'गैर-वापसी योग्य सरकारी सहायता' : 'Non-refundable direct benefit (escrow)'}
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-emerald-300 font-mono">
                    {formatCurrency(financialResult.subsidyAmount)}
                  </span>
                </div>

                {/* Own Contribution */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-200">
                      {isHi ? 'उद्यमी का स्वयं का अंशदान' : 'Beneficiary Own Contribution'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {financialResult.ownContributionRatePercent}% {isHi ? 'प्रवर्तक पूंजी' : 'promoter margin'}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-100 font-mono">
                    {formatCurrency(financialResult.ownContribution)}
                  </span>
                </div>

                {/* Bank Loan */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-200">
                      {isHi ? 'बैंक सावधि ऋण (Term Loan)' : 'Net Bank Term Loan Required'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {customInterestRate}% p.a. for {tenureYears} yrs
                    </span>
                  </div>
                  <span className="text-sm font-bold text-amber-400 font-mono">
                    {formatCurrency(financialResult.bankLoan)}
                  </span>
                </div>

                {/* Total Interest */}
                <div className="flex items-center justify-between px-3 py-2 text-[11px] text-slate-400">
                  <span>{isHi ? 'कुल ब्याज देयता' : 'Total Interest Payable over Tenure'}</span>
                  <span className="font-mono text-slate-300">{formatCurrency(financialResult.totalInterest)}</span>
                </div>
              </div>

              {/* Action Link to Scheme */}
              <div className="pt-2">
                <Link to={`/schemes/${selectedSchemeId}`} className="block">
                  <Button
                    variant="primary"
                    size="md"
                    iconRight={ArrowRight}
                    className="w-full justify-center bg-amber-500 hover:bg-amber-400 text-brand-950 font-bold shadow-glow"
                  >
                    {isHi ? 'इस योजना के लिए आवेदन करें' : `Apply for ${activePreset.name}`}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Note box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {isHi
                  ? 'यह गणना भारत सरकार के सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय के PMEGP/मुद्रा नियमों के अनुरूप सांकेतिक है। अंतिम स्वीकृति बैंक द्वारा परियोजना व्यवहार्यता जांच पर निर्भर करती है।'
                  : 'Calculations strictly follow Ministry of MSME guidelines. Capital subsidies under PMEGP are released into a 3-year locked escrow account and adjusted against final term loan closure.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
