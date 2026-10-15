import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  Building,
  CreditCard,
  FileText,
  UserCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/Button';
import Badge from '../components/Badge';

const STATUTORY_DOCUMENTS = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card (Mobile OTP Linked)',
    titleHi: 'आधार कार्ड (सक्रिय मोबाइल नंबर से लिंक)',
    category: 'Identity',
    weight: 20,
    requiredFor: ['All Schemes', 'PMEGP', 'MUDRA', 'PM SVANidhi', 'PM Vishwakarma'],
    desc: 'Primary KYC document. Mobile must receive OTP for e-KYC and Direct Benefit Transfer (DBT).',
    descHi: 'प्राथमिक पहचान पत्र। ई-केवाईसी और डीबीटी सब्सिडी सत्यापन के लिए मोबाइल नंबर लिंक होना अनिवार्य है।',
    helpUrl: 'https://myaadhaar.uidai.gov.in/',
    helpText: 'Check or update Aadhaar mobile number on UIDAI Portal'
  },
  {
    id: 'pan',
    title: 'Permanent Account Number (PAN Card)',
    titleHi: 'पैन कार्ड (PAN Card)',
    category: 'Tax & Identity',
    weight: 15,
    requiredFor: ['PMEGP', 'MUDRA (Kishore & Tarun)', 'Stand-Up India', 'CGTMSE'],
    desc: 'Mandatory for bank loan disbursement above ₹50,000 and business entity opening.',
    descHi: '₹50,000 से अधिक के बैंक ऋण एवं व्यापारिक खाते के लिए अनिवार्य कर पहचान दस्तावेज।',
    helpUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    helpText: 'Apply for Instant e-PAN on NSDL Portal'
  },
  {
    id: 'bank_statement',
    title: 'Bank Passbook / 6 Months Account Statement',
    titleHi: 'बैंक पासबुक / पिछले 6 महीने का बैंक स्टेटमेंट',
    category: 'Financial',
    weight: 15,
    requiredFor: ['All Schemes', 'PMEGP', 'MUDRA', 'PM SVANidhi'],
    desc: 'Shows operational transaction history, IFSC code, account number, and creditworthiness.',
    descHi: 'खाता संख्या, आईएफएससी कोड और लेन-देन का इतिहास प्रमाणित करने के लिए आवश्यक।',
    helpUrl: null,
    helpText: 'Request a signed 6-month statement or stamped passbook from your bank branch'
  },
  {
    id: 'udyam',
    title: 'Udyam MSME Registration Certificate',
    titleHi: 'उद्यम पंजीकरण प्रमाण पत्र (Udyam MSME)',
    category: 'Business Proof',
    weight: 15,
    requiredFor: ['PMEGP', 'MUDRA', 'Stand-Up India', 'CGTMSE', 'ZED Scheme'],
    desc: 'Official Government of India MSME digital recognition certificate. 100% Free registration.',
    descHi: 'भारत सरकार का आधिकारिक एमएसएमई पहचान पत्र। शून्य शुल्क पर ऑनलाइन उपलब्ध।',
    helpUrl: 'https://udyamregistration.gov.in/',
    helpText: 'Register 100% Free on Official Udyam Portal (Takes 5 minutes)'
  },
  {
    id: 'caste_cert',
    title: 'Social Category / Caste Certificate (SC/ST/OBC/EWS)',
    titleHi: 'जाति / सामाजिक श्रेणी प्रमाण पत्र (SC/ST/OBC/EWS)',
    category: 'Affirmative Action',
    weight: 15,
    requiredFor: ['PMEGP (Higher 35% Subsidy)', 'Stand-Up India', 'NSFDC', 'NBCFDC'],
    desc: 'Unlocks maximum government capital subsidies (up to 35%) and affirmative quotas. Issued by Revenue Authority/Tehsildar.',
    descHi: 'PMEGP में 35% अधिकतम सब्सिडी और विशेष आरक्षण प्राप्त करने के लिए तहसीलदार या राजस्व विभाग द्वारा जारी प्रमाण पत्र।',
    helpUrl: 'https://serviceonline.gov.in/',
    helpText: 'Apply online via National e-District Service Portal'
  },
  {
    id: 'dpr',
    title: 'Detailed Project Report (DPR) / Machinery Quotation',
    titleHi: 'विस्तृत परियोजना रिपोर्ट (DPR) / मशीनरी कोटेशन',
    category: 'Project Viability',
    weight: 10,
    requiredFor: ['PMEGP (Mandatory)', 'Stand-Up India', 'MUDRA Tarun'],
    desc: 'Summarizes projected setup costs, machinery costs, working capital, and projected revenue for the bank manager.',
    descHi: 'परियोजना की अनुमानित लागत, मशीनरी खर्च और संभावित लाभ-हानि का औपचारिक विवरण।',
    helpUrl: '/assistant',
    helpText: 'Ask Vyapar Mitra AI Assistant to generate a sample DPR outline'
  },
  {
    id: 'education_cert',
    title: 'Educational Qualification Certificate (8th / 10th Pass)',
    titleHi: 'शैक्षणिक योग्यता प्रमाण पत्र (8वीं या 10वीं उत्तीर्ण)',
    category: 'Eligibility Proof',
    weight: 10,
    requiredFor: ['PMEGP (Projects > ₹10L Manufacturing / > ₹5L Service)'],
    desc: 'Statutory prerequisite for PMEGP projects with total cost exceeding ₹10 Lakhs (manufacturing) or ₹5 Lakhs (service).',
    descHi: 'PMEGP के अंतर्गत ₹10 लाख से अधिक की विनिर्माण और ₹5 लाख से अधिक की सेवा इकाइयों के लिए 8वीं पास होना अनिवार्य है।',
    helpUrl: null,
    helpText: 'School leaving certificate or mark sheet signed by headmaster/board'
  }
];

export default function DocumentReadiness() {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';

  const [checkedDocs, setCheckedDocs] = useState({
    aadhaar: true,
    pan: true,
    bank_statement: true
  });

  const toggleDoc = (id) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = (select) => {
    const updated = {};
    STATUTORY_DOCUMENTS.forEach((d) => {
      updated[d.id] = select;
    });
    setCheckedDocs(updated);
  };

  // Score calculation
  const score = useMemo(() => {
    return STATUTORY_DOCUMENTS.reduce((total, doc) => {
      return total + (checkedDocs[doc.id] ? doc.weight : 0);
    }, 0);
  }, [checkedDocs]);

  const readinessStatus = useMemo(() => {
    if (score >= 90) {
      return {
        label: isHi ? 'पूर्ण बैंक-रेडी (उत्कृष्ट)' : 'Bank Sanction Ready (Excellent)',
        color: 'emerald',
        badge: 'Fully Prepared',
        message: isHi
          ? 'आपके पास सभी आवश्यक सरकारी दस्तावेज तैयार हैं! आप सीधे पोर्टल या बैंक शाखा में बिना किसी बाधा के ऋण/सब्सिडी आवेदन कर सकते हैं।'
          : 'You hold all core statutory documents! Banks and portal task forces can process your application without document deficiency delays.'
      };
    }
    if (score >= 60) {
      return {
        label: isHi ? 'मध्यम तैयारी (मुद्रा व स्वनिधि हेतु पात्र)' : 'Moderate Readiness (MUDRA / SVANidhi Ready)',
        color: 'amber',
        badge: 'Partially Prepared',
        message: isHi
          ? 'आपके बुनियादी दस्तावेज तैयार हैं। PMEGP में 35% सब्सिडी या बड़े सावधि ऋण के लिए बची हुई औपचारिकताएं पूरी करें।'
          : 'You are eligible for MUDRA and PM SVANidhi loans immediately. Obtain your Udyam and DPR to unlock full PMEGP 35% subsidies.'
      };
    }
    return {
      label: isHi ? 'अधूरी तैयारी (दस्तावेज बनवाएं)' : 'Action Required (Documents Missing)',
      color: 'rose',
      badge: 'Action Needed',
      message: isHi
        ? 'कुछ महत्वपूर्ण सरकारी दस्तावेज अभी तैयार नहीं हैं। नीचे दिए गए आधिकारिक लिंक से उन्हें निःशुल्क बनवाएं ताकि आवेदन रद्द न हो।'
        : 'Crucial documents are missing. Check the direct portal links below to generate them free of cost before applying.'
    };
  }, [score, isHi]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isHi ? 'सरकारी दस्तावेज तैयारी ऑडिट' : 'Government Document Readiness Audit'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 font-heading">
              {isHi ? 'ऋण एवं सब्सिडी दस्तावेज पात्रता मीटर' : 'Loan & Subsidy Document Readiness Meter'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {isHi
                ? 'सरकारी योजनाओं में 60% आवेदन सिर्फ दस्तावेजों की कमी के कारण रद्द होते हैं। आवेदन करने से पहले अपनी तैयारी जांचें।'
                : 'Audit your compliance before visiting bank branches. Prevent delays or rejections due to document discrepancies.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-subtle"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{isHi ? 'प्रिंट सारांश' : 'Print Checklist'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Score Card Banner */}
        <div className="bg-brand-950 text-white rounded-3xl p-6 sm:p-8 border border-brand-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score Ring / Dial (4 Cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * score) / 100}
                    strokeLinecap="round"
                    className={`transition-all duration-700 ${
                      score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'
                    }`}
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {score}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {isHi ? 'तैयारी स्कोर' : 'Readiness'}
                  </span>
                </div>
              </div>

              <span className="mt-3 text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200">
                {Object.values(checkedDocs).filter(Boolean).length} / {STATUTORY_DOCUMENTS.length} {isHi ? 'दस्तावेज तैयार' : 'Documents Ready'}
              </span>
            </div>

            {/* Status Breakdown (8 Cols) */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    score >= 80
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : score >= 50
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {readinessStatus.label}
                </span>
                <span className="text-xs text-slate-400">
                  • {isHi ? 'आरबीआई एवं एमएसएमई दिशानिर्देश' : 'RBI & MoMSME Compliance Audit'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {readinessStatus.message}
              </p>

              {/* Compatible schemes unlocked */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">{isHi ? 'अनलॉक योजनाएं:' : 'Unlocked Schemes:'}</span>
                {checkedDocs.aadhaar && checkedDocs.bank_statement && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-medium">
                    PM SVANidhi
                  </span>
                )}
                {checkedDocs.aadhaar && checkedDocs.pan && checkedDocs.bank_statement && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-medium">
                    PM MUDRA (Shishu & Kishore)
                  </span>
                )}
                {checkedDocs.aadhaar && checkedDocs.pan && checkedDocs.dpr && checkedDocs.udyam && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold">
                    PMEGP 35% Capital Subsidy
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & Checklist */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-brand-950 font-heading">
                {isHi ? 'दस्तावेज सत्यापन सूची' : 'Statutory Document Checklist'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isHi ? 'जो दस्तावेज आपके पास उपलब्ध हैं उन पर सही का निशान लगाएं:' : 'Mark the documents you already possess:'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectAll(true)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
              >
                {isHi ? 'सभी चुनें' : 'Check All'}
              </button>
              <button
                type="button"
                onClick={() => handleSelectAll(false)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
              >
                {isHi ? 'सभी हटाएं' : 'Uncheck All'}
              </button>
            </div>
          </div>

          {/* List of 7 Documents */}
          <div className="space-y-4">
            {STATUTORY_DOCUMENTS.map((doc, idx) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200/80 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 cursor-pointer flex-1" onClick={() => toggleDoc(doc.id)}>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 bg-white'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xs sm:text-sm font-bold text-brand-950">
                            {isHi ? doc.titleHi : doc.title}
                          </h3>
                          <Badge variant="outline" size="sm">
                            {doc.category}
                          </Badge>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">
                            +{doc.weight}% Weight
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {isHi ? doc.descHi : doc.desc}
                        </p>
                      </div>
                    </div>

                    {/* Missing helper link */}
                    {doc.helpUrl && !isChecked && (
                      <a
                        href={doc.helpUrl}
                        target={doc.helpUrl.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1.5 rounded-xl border border-amber-300 transition-colors"
                        title={doc.helpText}
                      >
                        <span>{isHi ? 'ऑनलाइन बनवाएं' : 'Get Online'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Required for tags */}
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold">{isHi ? 'अनिवार्य:' : 'Required for:'}</span>
                    {doc.requiredFor.map((schemeTag, sIdx) => (
                      <span key={sIdx} className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 text-[10px] font-medium">
                        {schemeTag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
            <Link to="/schemes" className="inline-block">
              <Button variant="secondary" size="md" iconLeft={Compass}>
                {isHi ? 'सभी योजनाएं देखें' : 'Browse All Schemes'}
              </Button>
            </Link>

            <Link to="/profile" className="inline-block">
              <Button variant="primary" size="md" iconRight={ArrowRight} className="bg-amber-500 hover:bg-amber-400 text-brand-950 font-bold">
                {isHi ? 'मेरी प्रोफ़ाइल के अनुसार योजनाएं देखें' : 'Match Schemes with My Documents'}
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
