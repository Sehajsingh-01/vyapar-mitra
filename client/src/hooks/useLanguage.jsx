import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const TRANSLATIONS = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_find_schemes: "Find Schemes",
    nav_all_schemes: "All Schemes",
    nav_assistant: "AI Assistant",
    nav_apply_now: "Check Eligibility",
    brand_tagline: "Empowering Marginalized Entrepreneurs",

    // Hero
    hero_badge: "Government of India Schemes Simplified",
    hero_title_1: "Government Schemes for",
    hero_title_highlight: "Every Entrepreneur",
    hero_subtitle: "AI-powered eligibility matching for SC, ST, OBC, Women, and grassroots micro-enterprises across India. Collateral-free loans, up to 35% subsidies, zero middlemen.",
    hero_cta_primary: "Find Your Eligible Schemes",
    hero_cta_secondary: "Browse All Schemes",
    hero_stats_trusted: "Trusted by over 1,00,000+ MSMEs and self-help groups nationwide",

    // How it works
    how_it_works_title: "How Vyapar Mitra Works",
    how_it_works_subtitle: "From discovery to sanction in 3 transparent, middleman-free steps",

    // Bento Features
    features_badge: "Intelligent Platform",
    features_title: "Designed specifically for India's grassroots entrepreneurs",
    features_subtitle: "Bridging the gap between complex government policies and the entrepreneurs who need them most.",

    // Stats section
    stats_badge: "National Impact",
    stats_title: "Transforming MSME scheme access across Bharat",

    // Scheme directory & Dashboard
    schemes_title: "Explore Government Schemes",
    schemes_subtitle: "Filter through verified central and state schemes tailored to micro-enterprises and marginalized entrepreneurs.",
    search_placeholder: "Search schemes by name, ministry, loan type, keyword...",
    filter_all: "All Categories",
    filter_ministry: "All Ministries",
    filter_loan_amount: "Loan / Benefit Amount",
    sort_by: "Sort by",
    sort_match: "Highest Match %",
    sort_amount_desc: "Highest Benefit Amount",
    sort_name: "Scheme Name (A-Z)",
    no_schemes_found: "No schemes match your criteria.",
    reset_filters: "Reset all filters",
    match_score: "Match Score",
    view_details: "View Scheme Details",
    apply_scheme: "Apply on Official Portal",
    max_benefit: "Max Benefit",
    ministry_label: "Ministry",
    eligibility_title: "Key Eligibility",

    // Profile Form
    profile_title: "Entrepreneur Eligibility Matcher",
    profile_subtitle: "Fill in your profile details to discover the exact government grants, subsidies, and credit schemes you qualify for.",
    step_1_title: "Personal Information",
    step_1_desc: "Basic background and social category",
    step_2_title: "Location & Residence",
    step_2_desc: "State and region classification",
    step_3_title: "Business Details",
    step_3_desc: "Sector, stage, and capital requirements",
    
    // Form Fields
    field_full_name: "Full Name",
    field_full_name_placeholder: "Enter full name (as on Aadhaar)",
    field_age: "Age (Years)",
    field_gender: "Gender",
    field_social_category: "Social Category",
    field_special_category: "Special Characteristics",
    field_state: "State / UT",
    field_district: "District / City",
    field_district_placeholder: "Enter district name",
    field_area_type: "Area Type",
    area_rural: "Rural / Gramin",
    area_urban: "Urban / Shehari",
    field_business_type: "Business Sector",
    field_existing_business: "Are you already running this business?",
    business_status_new: "New Venture (Greenfield)",
    business_status_existing: "Existing Business (Expansion)",
    field_annual_income: "Annual Household Income",
    field_funding_needed: "Estimated Loan / Grant Required",
    field_education: "Highest Education Level",
    
    // Buttons
    btn_back: "Back",
    btn_next: "Next Step",
    btn_submit_match: "Find Matched Schemes",
    btn_submitting: "Analyzing with AI...",

    // Match Results
    matched_congrats: "Schemes Matched For You",
    matched_subtitle: "Based on your entrepreneur profile, our AI matching engine found these top opportunities.",
    high_match: "High Eligibility Match",
    moderate_match: "Moderate Eligibility Match",

    // Scheme Detail
    scheme_back_link: "Back to Schemes",
    benefits_heading: "Scheme Benefits & Financial Assistance",
    eligibility_heading: "Eligibility Criteria",
    documents_heading: "Required Documents Checklist",
    application_guide_heading: "Step-by-Step Application Guide",
    fetch_latest_info: "Fetch Live Updates (TinyFish API)",
    fetching_info: "Fetching live government bulletin...",
    official_portal_notice: "You will be directed to the official government portal for direct application.",
    
    // Assistant
    assistant_title: "Vyapar Mitra AI Assistant",
    assistant_subtitle: "Ask any question regarding subsidies, eligibility, required forms, or bank procedures in English or Hindi.",
    assistant_placeholder: "Ask a question (e.g. 'Can I get a loan without collateral for a tailoring shop?')...",
    assistant_send: "Ask AI",
    quick_prompts_title: "Suggested Questions:",
    typing_indicator: "Vyapar Mitra AI is searching official guidelines...",
    powered_by_badge: "Powered by TinyFish & Gov-India MSME Datasets",

    // Footer
    footer_desc: "Vyapar Mitra is an open AI-driven initiative dedicated to financial inclusion for marginalized micro-entrepreneurs in India. HackIIITD 2026 Innovation.",
    footer_quick_links: "Quick Links",
    footer_gov_links: "National Portals",
    footer_rights: "All rights reserved. Designed with pride for Indian Entrepreneurs.",
    disclaimer: "Vyapar Mitra provides informational and automated eligibility assistance. Official approvals are subject to ministry and bank scrutiny.",

    // 404 & Edge Cases
    not_found_code: "404",
    not_found_title: "Page Not Found",
    not_found_desc: "The page or scheme you are looking for might have been moved, updated, or does not exist.",
    not_found_btn_home: "Back to Home",
    not_found_btn_schemes: "Explore Schemes",

    // Schemes Directory Extra
    tab_matched_schemes: "My AI Matched Schemes",
    tab_all_schemes: "All Government Schemes",
    showing_schemes_count: "verified government schemes",
    clear_all_filters: "Clear all filters",
    filter_support_type: "Support Type",
    filter_all_support: "All Support Types",
    filter_any_amount: "Any Amount",
    update_profile_btn: "Update Profile",
    ai_matched_banner_title: "AI Matched Schemes for",
    sector_label: "Sector",
    target_label: "Funding Target",
    close_filters: "Close Filters",
    mobile_filter_btn: "Filters & Sort",

    // Profile Extra
    validation_name_required: "Full name is required",
    validation_age_range: "Age must be between 18 and 80",
    validation_category_required: "Social category is required",
    validation_state_required: "Please select your state",
    validation_district_required: "District / City name is required",
    validation_sector_required: "Please select a business sector",
    select_all_apply: "(Select all that apply)",
    rural_bonus_note: "Note: Rural area enterprises typically receive 10% higher government capital subsidies under PMEGP.",
    category_sub_note: "Crucial for unlocking up to 35% subsidies under PMEGP, Stand-Up India, and NSFDC.",

    // Scheme Detail Extra
    share_scheme_btn: "Share Scheme",
    link_copied_btn: "Link Copied!",
    max_benefit_card: "Maximum Benefit",
    subsidy_rate_card: "Subsidy / Incentive",
    target_audience_card: "Target Beneficiaries",
    documents_sub_note: "Check off the documents you already possess:",
    ready_status: "Ready",
    application_steps_sub: "Follow these official steps to obtain approval without paying any commission to brokers.",
    official_apply_footer: "Go to Official Portal",
    official_portal_head: "Official Ministry Application",
    select_all_docs: "Check All",
    deselect_all_docs: "Uncheck All",
    scheme_not_found_title: "Scheme Not Found",
    scheme_not_found_desc: "The requested scheme ID does not exist in the official national registry.",

    // Assistant Extra
    reset_chat_btn: "Reset Chat",
    voice_input_listening: "Listening... Speak now",
    voice_input_tooltip: "Voice search (Hindi / English)",
    voice_not_supported: "Voice input is not supported in this browser. Please type your query.",
    assistant_shortcut_hint: "Press Enter to send. Supports English & हिंदी voice input.",

    // Landing Extra
    featured_schemes_tag: "National Scheme Registry",
    featured_schemes_heading: "Featured Flagship Schemes",
    explore_all_schemes_link: "Explore all 20+ schemes",
    cta_banner_sub: "Zero Cost • 100% Free Public Service",
    cta_banner_heading: "Unlock Subsidies and Loans Tailored to Your Business",
    cta_banner_text: "Take 2 minutes to fill your entrepreneur profile. Stop missing out on government benefits you are legally entitled to.",
    verified_gov_protocol: "Verified Government Protocol"
  },
  hi: {
    // Navigation
    nav_home: "होम",
    nav_find_schemes: "योजनाएं खोजें",
    nav_all_schemes: "सभी योजनाएं",
    nav_assistant: "एआई सहायक",
    nav_apply_now: "पात्रता जांचें",
    brand_tagline: "वंचित एवं लघु उद्यमियों का सशक्तिकरण",

    // Hero
    hero_badge: "भारत सरकार की योजनाएं — अब सरल और सुलभ",
    hero_title_1: "हर उद्यमी के लिए",
    hero_title_highlight: "सरकारी योजनाएं",
    hero_subtitle: "एससी, एसटी, ओबीसी, महिला और जमीनी स्तर के सूक्ष्म उद्यमियों के लिए एआई-संचालित पात्रता मिलान। संपार्श्विक-मुक्त ऋण, 35% तक सरकारी सब्सिडी, शून्य बिचौलिया।",
    hero_cta_primary: "अपनी पात्र योजनाएं खोजें",
    hero_cta_secondary: "सभी योजनाएं देखें",
    hero_stats_trusted: "देश भर के 1,00,000+ एमएसएमई और स्वयं सहायता समूहों द्वारा विश्वसनीय",

    // How it works
    how_it_works_title: "व्यापार मित्र कैसे काम करता है?",
    how_it_works_subtitle: "खोज से लेकर ऋण स्वीकृति तक 3 पारदर्शी, बिचौलिया-मुक्त चरण",

    // Bento Features
    features_badge: "इंटेलिजेंट प्लेटफॉर्म",
    features_title: "भारत के जमीनी उद्यमियों के लिए विशेष रूप से डिज़ाइन किया गया",
    features_subtitle: "जटिल सरकारी नियमों और जरूरतमंद उद्यमियों के बीच की दूरी को समाप्त करना।",

    // Stats section
    stats_badge: "राष्ट्रीय प्रभाव",
    stats_title: "पूरे भारत में एमएसएमई योजनाओं की पहुंच को सुगम बनाना",

    // Scheme directory & Dashboard
    schemes_title: "सरकारी योजनाएं देखें",
    schemes_subtitle: "सूक्ष्म उद्यमों और वंचित उद्यमियों के लिए सत्यापित केंद्रीय और राज्य योजनाओं को फिल्टर करें।",
    search_placeholder: "योजना का नाम, मंत्रालय, ऋण राशि या कीवर्ड खोजें...",
    filter_all: "सभी श्रेणियां",
    filter_ministry: "सभी मंत्रालय",
    filter_loan_amount: "ऋण / सब्सिडी राशि",
    sort_by: "क्रमबद्ध करें",
    sort_match: "अधिकतम मिलान %",
    sort_amount_desc: "अधिकतम लाभ राशि",
    sort_name: "योजना का नाम (A-Z)",
    no_schemes_found: "आपकी खोज के अनुसार कोई योजना नहीं मिली।",
    reset_filters: "सभी फिल्टर हटाएं",
    match_score: "पात्रता स्कोर",
    view_details: "विस्तार से देखें",
    apply_scheme: "आधिकारिक पोर्टल पर आवेदन करें",
    max_benefit: "अधिकतम लाभ",
    ministry_label: "मंत्रालय",
    eligibility_title: "मुख्य पात्रता",

    // Profile Form
    profile_title: "उद्यमी पात्रता मिलान फॉर्म",
    profile_subtitle: "अपनी जानकारी भरें और तुरंत जानें कि आप किन-किन सरकारी अनुदान, सब्सिडी और ऋण योजनाओं के पात्र हैं।",
    step_1_title: "व्यक्तिगत जानकारी",
    step_1_desc: "बुनियादी विवरण और सामाजिक वर्ग",
    step_2_title: "स्थान एवं निवास",
    step_2_desc: "राज्य और क्षेत्रीय वर्गीकरण",
    step_3_title: "व्यवसाय विवरण",
    step_3_desc: "उद्योग क्षेत्र, चरण और आवश्यक पूंजी",

    // Form Fields
    field_full_name: "पूरा नाम",
    field_full_name_placeholder: "आधार कार्ड के अनुसार नाम दर्ज करें",
    field_age: "आयु (वर्ष)",
    field_gender: "लिंग",
    field_social_category: "सामाजिक श्रेणी / वर्ग",
    field_special_category: "विशेष विशेषताएं",
    field_state: "राज्य / केंद्र शासित प्रदेश",
    field_district: "ज़िला / शहर",
    field_district_placeholder: "ज़िले का नाम दर्ज करें",
    field_area_type: "क्षेत्र का प्रकार",
    area_rural: "ग्रामीण (गांव)",
    area_urban: "शहरी (नगर)",
    field_business_type: "व्यवसाय का क्षेत्र",
    field_existing_business: "क्या आप पहले से यह व्यवसाय चला रहे हैं?",
    business_status_new: "नया व्यवसाय (Greenfield)",
    business_status_existing: "मौजूदा व्यवसाय (विस्तार)",
    field_annual_income: "वार्षिक पारिवारिक आय",
    field_funding_needed: "आवश्यक ऋण / सहायता राशि",
    field_education: "उच्चतम शैक्षणिक योग्यता",

    // Buttons
    btn_back: "पीछे जाएं",
    btn_next: "अगला चरण",
    btn_submit_match: "पात्र योजनाएं खोजें",
    btn_submitting: "एआई विश्लेषण जारी है...",

    // Match Results
    matched_congrats: "आपके लिए सर्वश्रेष्ठ योजनाएं",
    matched_subtitle: "आपकी प्रोफ़ाइल के आधार पर एआई इंजन ने इन शीर्ष योजनाओं की पहचान की है।",
    high_match: "उच्च पात्रता मिलान",
    moderate_match: "मध्यम पात्रता मिलान",

    // Scheme Detail
    scheme_back_link: "योजनाओं की सूची पर लौटें",
    benefits_heading: "योजना के लाभ एवं वित्तीय सहायता",
    eligibility_heading: "पात्रता शर्तें",
    documents_heading: "आवश्यक दस्तावेजों की चेकलिस्ट",
    application_guide_heading: "चरण-दर-चरण आवेदन प्रक्रिया",
    fetch_latest_info: "ताज़ा अपडेट प्राप्त करें (TinyFish API)",
    fetching_info: "लाइव सरकारी पोर्टल डेटा लाया जा रहा है...",
    official_portal_notice: "सीधे आवेदन करने के लिए आपको आधिकारिक सरकारी पोर्टल पर भेजा जाएगा।",

    // Assistant
    assistant_title: "व्यापार मित्र एआई सहायक",
    assistant_subtitle: "सब्सिडी, पात्रता, आवश्यक प्रपत्रों या बैंक प्रक्रियाओं के बारे में हिंदी या अंग्रेजी में कोई भी प्रश्न पूछें।",
    assistant_placeholder: "प्रश्न पूछें (जैसे: 'सिलाई की दुकान के लिए बिना गारंटी लोन कैसे मिलेगा?')...",
    assistant_send: "पूछें",
    quick_prompts_title: "सुझाए गए प्रश्न:",
    typing_indicator: "व्यापार मित्र एआई सरकारी नियमों में खोज रहा है...",
    powered_by_badge: "TinyFish एवं भारत सरकार MSME डेटासेट द्वारा संचालित",

    // Footer
    footer_desc: "व्यापार मित्र भारत में वंचित सूक्ष्म उद्यमियों के वित्तीय समावेशन हेतु समर्पित एक खुला एआई-संचालित मंच है। HackIIITD 2026 नवाचार।",
    footer_quick_links: "त्वरित लिंक",
    footer_gov_links: "राष्ट्रीय पोर्टल",
    footer_rights: "सर्वाधिकार सुरक्षित। भारतीय उद्यमियों के लिए गर्व से निर्मित।",
    disclaimer: "व्यापार मित्र सूचनात्मक एवं स्वचालित पात्रता सहायता प्रदान करता है। आधिकारिक स्वीकृति संबंधित मंत्रालय एवं बैंक के सत्यापन पर निर्भर है।",

    // 404 & Edge Cases
    not_found_code: "404",
    not_found_title: "पृष्ठ नहीं मिला",
    not_found_desc: "जो पृष्ठ या योजना आप खोज रहे हैं वह उपलब्ध नहीं है अथवा हटा दी गई है।",
    not_found_btn_home: "होमपेज पर जाएं",
    not_found_btn_schemes: "सभी योजनाएं देखें",

    // Schemes Directory Extra
    tab_matched_schemes: "मेरे लिए पहचानी गई योजनाएं",
    tab_all_schemes: "सभी सरकारी योजनाएं",
    showing_schemes_count: "सत्यापित सरकारी योजनाएं",
    clear_all_filters: "सभी फिल्टर हटाएं",
    filter_support_type: "सहायता का प्रकार",
    filter_all_support: "सभी सहायता प्रकार",
    filter_any_amount: "कोई भी राशि",
    update_profile_btn: "प्रोफ़ाइल बदलें",
    ai_matched_banner_title: "आपके लिए एआई द्वारा पहचानी गई योजनाएं:",
    sector_label: "उद्योग क्षेत्र",
    target_label: "आवश्यक राशि",
    close_filters: "फिल्टर बंद करें",
    mobile_filter_btn: "फिल्टर और क्रम",

    // Profile Extra
    validation_name_required: "कृपया अपना नाम दर्ज करें",
    validation_age_range: "आयु 18 से 80 वर्ष के बीच होनी चाहिए",
    validation_category_required: "कृपया अपनी सामाजिक श्रेणी चुनें",
    validation_state_required: "कृपया अपना राज्य चुनें",
    validation_district_required: "कृपया ज़िले का नाम दर्ज करें",
    validation_sector_required: "कृपया व्यवसाय का क्षेत्र चुनें",
    select_all_apply: "(लागू होने वाले सभी विकल्प चुनें)",
    rural_bonus_note: "नोट: ग्रामीण उद्यमों को PMEGP के तहत 10% अधिक सरकारी पूंजी सब्सिडी मिलती है।",
    category_sub_note: "PMEGP, स्टैंड-अप इंडिया और NSFDC के तहत 35% तक सब्सिडी प्राप्त करने हेतु महत्वपूर्ण।",

    // Scheme Detail Extra
    share_scheme_btn: "योजना साझा करें",
    link_copied_btn: "लिंक कॉपी हो गया!",
    max_benefit_card: "अधिकतम वित्तीय लाभ",
    subsidy_rate_card: "सब्सिडी / प्रोत्साहन",
    target_audience_card: "लक्षित लाभार्थी",
    documents_sub_note: "जो दस्तावेज आपके पास उपलब्ध हैं उन पर टिक करें:",
    ready_status: "तैयार",
    application_steps_sub: "बिना किसी दलाल या बिचौलिये को कमीशन दिए सीधे स्वीकृति पाने हेतु इन चरणों का पालन करें।",
    official_apply_footer: "आधिकारिक पोर्टल पर जाएं",
    official_portal_head: "आधिकारिक मंत्रालय पोर्टल आवेदन",
    select_all_docs: "सभी चुनें",
    deselect_all_docs: "सभी हटाएं",
    scheme_not_found_title: "योजना नहीं मिली",
    scheme_not_found_desc: "यह योजना आईडी सरकारी राष्ट्रीय रजिस्ट्री में उपलब्ध नहीं है।" ,

    // Assistant Extra
    reset_chat_btn: "बातचीत रीसेट करें",
    voice_input_listening: "सुन रहे हैं... बोलिए",
    voice_input_tooltip: "बोलकर खोजें (हिन्दी / English)",
    voice_not_supported: "आपके ब्राउज़र में बोलकर खोजने की सुविधा उपलब्ध नहीं है। कृपया टाइप करें।",
    assistant_shortcut_hint: "भेजने के लिए Enter दबाएं। हिन्दी एवं अंग्रेजी वॉइस इनपुट समर्थित।",

    // Landing Extra
    featured_schemes_tag: "राष्ट्रीय योजना रजिस्ट्री",
    featured_schemes_heading: "प्रमुख सरकारी योजनाएं",
    explore_all_schemes_link: "सभी 20+ योजनाएं देखें",
    cta_banner_sub: "निःशुल्क सेवा • 100% पारदर्शी जनहित पहल",
    cta_banner_heading: "अपने व्यवसाय के लिए उपयुक्त सरकारी सब्सिडी और ऋण प्राप्त करें",
    cta_banner_text: "केवल 2 मिनट में अपनी उद्यमी प्रोफ़ाइल भरें और उन सभी सरकारी लाभों को जानें जिनके आप कानूनी रूप से हकदार हैं।",
    verified_gov_protocol: "सत्यापित सरकारी प्रक्रिया"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('vm_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('vm_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key, fallback = '') => {
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      return TRANSLATIONS[lang][key];
    }
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };

  // Helper for localized text fields on data items
  const loc = (item, propName) => {
    if (!item) return '';
    if (lang === 'hi') {
      const hiProp = `${propName}Hi`;
      if (item[hiProp]) return item[hiProp];
    }
    return item[propName] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, loc }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
