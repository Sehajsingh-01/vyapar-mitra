// Constants for Vyapar Mitra platform

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const SOCIAL_CATEGORIES = [
  { value: "SC", label: "Scheduled Caste (SC)", labelHi: "अनुसूचित जाति (SC)" },
  { value: "ST", label: "Scheduled Tribe (ST)", labelHi: "अनुसूचित जनजाति (ST)" },
  { value: "OBC", label: "Other Backward Class (OBC)", labelHi: "अन्य पिछड़ा वर्ग (OBC)" },
  { value: "EWS", label: "Economically Weaker Section (EWS)", labelHi: "आर्थिक रूप से कमजोर (EWS)" },
  { value: "Minority", label: "Minority Community", labelHi: "अल्पसंख्यक समुदाय" },
  { value: "General", label: "General", labelHi: "सामान्य" }
];

export const GENDER_OPTIONS = [
  { value: "Female", label: "Female / महिला", labelHi: "महिला" },
  { value: "Male", label: "Male / पुरुष", labelHi: "पुरुष" },
  { value: "Other", label: "Other / अन्य", labelHi: "अन्य" }
];

export const SPECIAL_CATEGORIES = [
  { id: "woman", label: "Women Entrepreneur", labelHi: "महिला उद्यमी" },
  { id: "pwd", label: "Person with Disability (PwD)", labelHi: "दिव्यांग व्यक्ति" },
  { id: "ex_serviceman", label: "Ex-Serviceman", labelHi: "भूतपूर्व सैनिक" },
  { id: "rural", label: "Rural Location / Gramin", labelHi: "ग्रामीण क्षेत्र" },
  { id: "artisan", label: "Traditional Artisan / Craftsman", labelHi: "पारंपरिक कारीगर / शिल्पकार" }
];

export const BUSINESS_TYPES = [
  { value: "Manufacturing", label: "Manufacturing & Production", labelHi: "विनिर्माण एवं उत्पादन" },
  { value: "Retail", label: "Retail & Small Shopkeeper", labelHi: "खुदरा एवं छोटी दुकान" },
  { value: "Services", label: "Services & Repair", labelHi: "सेवाएं एवं मरम्मत" },
  { value: "Handicrafts", label: "Handicrafts & Handloom", labelHi: "हस्तशिल्प एवं हथकरघा" },
  { value: "FoodProcessing", label: "Food Processing & Dairy", labelHi: "खाद्य प्रसंस्करण एवं डेयरी" },
  { value: "StreetVendor", label: "Street Vendor / Hawkers", labelHi: "स्ट्रीट वेंडर / फेरीवाले" },
  { value: "AgriBusiness", label: "Agro-allied & Farming", labelHi: "कृषि-संबंधित व्यवसाय" },
  { value: "TechDigital", label: "Digital Services & Tech", labelHi: "डिजिटल सेवाएं" }
];

export const EDUCATION_LEVELS = [
  { value: "below_8th", label: "Below 8th Standard", labelHi: "8वीं से कम" },
  { value: "8th_pass", label: "8th Standard Pass", labelHi: "8वीं उत्तीर्ण" },
  { value: "10th_pass", label: "10th Standard Pass (Matric)", labelHi: "10वीं उत्तीर्ण" },
  { value: "12th_pass", label: "12th Standard Pass", labelHi: "12वीं उत्तीर्ण" },
  { value: "graduate", label: "Graduate / Degree Holder", labelHi: "स्नातक (Graduate)" },
  { value: "vocational", label: "ITI / Vocational Skill Certified", labelHi: "आईटीआई / व्यावसायिक प्रमाण पत्र" }
];

export const MINISTRIES = [
  "Ministry of MSME",
  "Ministry of Finance",
  "Ministry of Housing and Urban Affairs",
  "Ministry of Skill Development & Entrepreneurship",
  "Ministry of Rural Development",
  "Ministry of Social Justice and Empowerment",
  "Ministry of Tribal Affairs",
  "Ministry of Minority Affairs",
  "Ministry of Textiles"
];

// Rich, accurate scheme registry of Indian Government schemes for entrepreneurs
export const ALL_SCHEMES = [
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    nameHi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    ministry: "Ministry of MSME",
    category: "Subsidy & Loan",
    maxBenefit: "₹50,00,000",
    maxBenefitNumeric: 5000000,
    subsidyRate: "15% - 35% Capital Subsidy",
    targetAudience: "Micro Enterprises, SC/ST, Women, Rural Entrepreneurs",
    description: "Credit-linked subsidy programme to generate self-employment opportunities through establishment of micro-enterprises in non-farm sector.",
    descriptionHi: "गैर-कृषि क्षेत्र में सूक्ष्म उद्यमों की स्थापना के माध्यम से स्व-रोजगार के अवसर पैदा करने के लिए ऋण-लिंक्ड सब्सिडी कार्यक्रम।",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    eligibility: [
      "Any individual above 18 years of age",
      "At least VIII standard pass for project cost above ₹10 Lakh in manufacturing and ₹5 Lakh in service",
      "Self Help Groups (SHGs) not availing other benefits",
      "Institutions registered under Societies Registration Act, 1860"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["Manufacturing", "Services", "Handicrafts", "FoodProcessing"]
    },
    benefits: [
      "Up to ₹50 Lakhs for Manufacturing units",
      "Up to ₹20 Lakhs for Service units",
      "Margin money subsidy: 25% (General, Urban), 35% (Special Category/SC/ST/OBC/Women/Rural)",
      "Bank loan covers the remaining project cost (60-75%)"
    ],
    documentsRequired: [
      "Aadhaar Card and PAN Card",
      "Detailed Project Report (DPR)",
      "Educational qualification certificate (8th pass or higher)",
      "Special category certificate (SC/ST/OBC/PH/Ex-servicemen if applicable)",
      "Rural area certificate (issued by Sarpanch/Panchayat Secretary)",
      "Passport size photos and bank passbook copy"
    ],
    applicationSteps: [
      "Prepare your Detailed Project Report (DPR) with estimated costs",
      "Register online at KVIC e-Portal (kviconline.gov.in)",
      "Fill online application form and upload scanned documents",
      "Application is forwarded by District Task Force to chosen bank branch",
      "Bank sanctions the term loan and KVIC releases margin money subsidy into an escrow account"
    ]
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    nameHi: "प्रधानमंत्री मुद्रा योजना (PMMY)",
    ministry: "Ministry of Finance",
    category: "Collateral-free Loan",
    maxBenefit: "₹20,00,000",
    maxBenefitNumeric: 2000000,
    subsidyRate: "No Collateral Required, Low Interest",
    targetAudience: "Micro Enterprises, Retailers, Artisans, Small Vendors",
    description: "Provides loans up to ₹20 Lakhs to non-corporate, non-farm small and micro enterprises across three tiers: Shishu, Kishore, and Tarun.",
    descriptionHi: "गैर-कॉरपोरेट, गैर-कृषि लघु एवं सूक्ष्म उद्यमों को शिशु, किशोर और तरुण श्रेणियों में ₹20 लाख तक का संपार्श्विक-मुक्त ऋण प्रदान करता है।",
    officialUrl: "https://www.mudra.org.in/",
    eligibility: [
      "Indian citizen with business proposal for non-farm income generating activity",
      "Manufacturing, trading, processing, and service sector activities",
      "No past default history with any commercial bank or NBFC",
      "Available for both new and existing business expansions"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["Retail", "Manufacturing", "Services", "Handicrafts", "FoodProcessing", "StreetVendor", "TechDigital"]
    },
    benefits: [
      "Shishu: Loans up to ₹50,000 (ideal for starters/street vendors)",
      "Kishore: Loans from ₹50,001 to ₹5,00,000",
      "Tarun: Loans from ₹5,00,001 to ₹10,00,000 (expanded to ₹20 Lakhs in 2024-2025)",
      "Zero collateral or third-party guarantee needed",
      "Nominal processing charges (waived for Shishu & Kishore)"
    ],
    documentsRequired: [
      "Identity Proof (Voter ID / Aadhaar / Driving License / Passport)",
      "Proof of Residence (Electricity bill / Ration card / Aadhaar)",
      "Business address and registration proof (Udyam Registration)",
      "Bank statements for the last 6 months",
      "Quotation of machinery or items to be purchased"
    ],
    applicationSteps: [
      "Choose the appropriate MUDRA tier (Shishu, Kishore, or Tarun)",
      "Prepare your business proposal and machinery quotations",
      "Apply through Udyamimitra portal (udyamimitra.in) or visit nearest PSU/Private bank",
      "Submit KYC and business documents",
      "Get Mudra Card for working capital flexibility"
    ]
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India Scheme",
    nameHi: "स्टैंड-अप इंडिया योजना",
    ministry: "Ministry of Finance",
    category: "Greenfield Enterprise Loan",
    maxBenefit: "₹1,00,00,000",
    maxBenefitNumeric: 10000000,
    subsidyRate: "Composite Loan up to 85% of Project Cost",
    targetAudience: "SC, ST, and Women Entrepreneurs",
    description: "Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    descriptionHi: "प्रत्येक बैंक शाखा से कम से कम एक एससी/एसटी और एक महिला उद्यमी को ग्रीनफील्ड उद्यम स्थापित करने के लिए ₹10 लाख से ₹1 करोड़ तक का ऋण।",
    officialUrl: "https://www.standupmitra.in/",
    eligibility: [
      "SC/ST and/or Woman entrepreneur above 18 years of age",
      "Loans available only for greenfield (first-time) ventures",
      "In non-individual enterprises, 51% shareholding & controlling stake must be held by SC/ST and/or woman",
      "Borrower should not be in default to any bank/financial institution"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["SC", "ST", "Women"],
      businessTypes: ["Manufacturing", "Services", "AgriBusiness", "Handicrafts", "FoodProcessing"]
    },
    benefits: [
      "Composite loan between ₹10 Lakhs and ₹1 Crore",
      "Covers up to 85% of total project cost (term loan + working capital)",
      "Repayable in 7 years with maximum moratorium period of 18 months",
      "Credit Guarantee Fund for Stand-Up India (CGFSI) support"
    ],
    documentsRequired: [
      "Proof of identity and address (Aadhaar, Passport)",
      "Category Certificate (SC/ST certificate issued by competent authority)",
      "Proof of business address and Project report",
      "Rent agreement or lease deed for business premises",
      "Partnership deed or Certificate of Incorporation (for entities)"
    ],
    applicationSteps: [
      "Visit standupmitra.in portal and register as 'Borrower'",
      "Select 'Handholding Support' or apply directly if handholding is not required",
      "Fill online application form and choose partner bank branches",
      "Connect with Lead District Manager (LDM) or SIDBI desk if needed",
      "Bank inspects project viability and sanctions composite loan"
    ]
  },
  {
    id: "pm-svanidhi",
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    nameHi: "पीएम स्वनिधि योजना (स्ट्रीट वेंडर्स आत्मनिर्भर निधि)",
    ministry: "Ministry of Housing and Urban Affairs",
    category: "Micro-Credit",
    maxBenefit: "₹50,000",
    maxBenefitNumeric: 50000,
    subsidyRate: "7% Interest Subsidy + ₹1200/yr Cashback",
    targetAudience: "Urban Street Vendors, Hawkers, Thela Walas",
    description: "Special micro-credit facility providing affordable collateral-free working capital loan to street vendors to resume and expand their livelihoods.",
    descriptionHi: "स्ट्रीट वेंडरों, रेहड़ी-पटरी वालों को अपना व्यवसाय फिर से शुरू करने और बढ़ाने के लिए किफायती संपार्श्विक-मुक्त कार्यशील पूंजी ऋण।",
    officialUrl: "https://pmsvanidhi.mohua.gov.in/",
    eligibility: [
      "Street vendors vending in urban areas on or before March 24, 2020",
      "Vendors in possession of Certificate of Vending or Identity Card issued by ULBs",
      "Vendors identified in the survey but not issued certificate/ID card",
      "Vendors left out of ULB-led survey who possess Letter of Recommendation (LoR)"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["StreetVendor", "Retail"]
    },
    benefits: [
      "1st Tranche: Initial working capital loan of ₹10,000 (repayable in 1 year)",
      "2nd Tranche: Enhanced loan of ₹20,000 on timely repayment of 1st loan",
      "3rd Tranche: Enhanced loan of ₹50,000 on timely repayment of 2nd loan",
      "7% annual interest subsidy credited directly to bank account",
      "Monthly cashback up to ₹100 on digital transactions (₹1,200/year)"
    ],
    documentsRequired: [
      "Aadhaar Card linked to mobile number",
      "Voter ID card or Ration card",
      "Certificate of Vending (CoV) or Letter of Recommendation (LoR) from Municipality",
      "Active bank savings account passbook",
      "QR Code / UPI ID for digital transactions"
    ],
    applicationSteps: [
      "Check vending survey list or get LoR from your local Urban Local Body (ULB)",
      "Log in to pmsvanidhi.mohua.gov.in with Aadhaar OTP",
      "Choose preferred Lending Institution (PSU Bank, Cooperative, MFI)",
      "Submit application and receive disbursement directly in bank account within 7 days",
      "Perform digital transactions via UPI to earn cashback"
    ]
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Yojana",
    nameHi: "पीएम विश्वकर्मा योजना",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    category: "Skilling & Concessional Credit",
    maxBenefit: "₹3,00,000",
    maxBenefitNumeric: 300000,
    subsidyRate: "5% Concessional Interest + ₹15k Toolkit",
    targetAudience: "Traditional Artisans, Carpenters, Blacksmiths, Potters, Cobblers",
    description: "End-to-end holistic support to artisans and craftspeople engaged in 18 traditional trades, including skill upgrade, toolkit incentive of ₹15,000, and collateral-free credit at 5%.",
    descriptionHi: "18 पारंपरिक व्यवसायों में लगे कारीगरों और शिल्पकारों को कौशल विकास, ₹15,000 टूलकिट प्रोत्साहन और 5% पर संपार्श्विक-मुक्त ऋण।",
    officialUrl: "https://pmvishwakarma.gov.in/",
    eligibility: [
      "Artisan or craftsman working in one of the 18 traditional trades on self-employment basis",
      "Minimum age 18 years on date of application",
      "Engagement in trade should be verified through three-tier validation (Gram Panchayat / ULB, District, State)",
      "Registration limited to one member per family",
      "Beneficiary should not have availed credit under PMEGP or PM SVANidhi in the past 5 years"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["Handicrafts", "Manufacturing", "Services"]
    },
    benefits: [
      "Recognition: PM Vishwakarma Certificate and ID Card",
      "Basic Skilling (5-7 days) with ₹500/day stipend",
      "Advanced Skilling (15 days or more) with ₹500/day stipend",
      "₹15,000 e-voucher toolkit incentive upon basic skill verification",
      "Credit Support: 1st Tranche up to ₹1 Lakh (18 months), 2nd Tranche up to ₹2 Lakhs (30 months) at fixed 5% interest",
      "Digital Transaction incentive: ₹1 per transaction up to 100 transactions/month"
    ],
    documentsRequired: [
      "Aadhaar Card with linked biometric/mobile",
      "Ration Card for family validation",
      "Bank account details (Passbook / Cancelled Cheque)",
      "Proof of trade activity / photographs of craftsmanship"
    ],
    applicationSteps: [
      "Visit any Common Services Centre (CSC) with Aadhaar and mobile",
      "Complete biometric verification and trade declaration",
      "Undergo Stage-1 Gram Panchayat/ULB verification",
      "Stage-2 District Implementation Committee verification",
      "Receive digital certificate, undergo 5-day training, and get toolkit voucher"
    ]
  },
  {
    id: "lakhpati-didi",
    name: "Lakhpati Didi Initiative",
    nameHi: "लखपति दीदी योजना",
    ministry: "Ministry of Rural Development",
    category: "Livelihood & Training",
    maxBenefit: "₹5,00,000",
    maxBenefitNumeric: 500000,
    subsidyRate: "Interest Subvention + Capital Support via SHG",
    targetAudience: "Rural Women Entrepreneurs, SHG Members",
    description: "National mission empowering Self-Help Group (SHG) women across rural India to earn sustainable annual incomes exceeding ₹1,00,000 through diversified micro-enterprises.",
    descriptionHi: "ग्रामीण स्वयं सहायता समूह (SHG) की महिलाओं को प्रति वर्ष ₹1 लाख से अधिक की स्थायी आय अर्जित करने में सक्षम बनाने हेतु राष्ट्रीय मिशन।",
    officialUrl: "https://aajeevika.gov.in/",
    eligibility: [
      "Woman active member of a registered Deendayal Antyodaya Yojana - NRLM SHG",
      "Resident of rural/semi-urban village community",
      "Commitment to adopt micro-enterprise activity (poultry, dairy, handloom, retail, etc.)"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["Women", "General", "OBC", "SC", "ST"],
      businessTypes: ["AgriBusiness", "FoodProcessing", "Handicrafts", "Retail", "Services"]
    },
    benefits: [
      "Access to Community Investment Fund (CIF) and Revolving Fund via SHG",
      "Bank linkage loans up to ₹5-10 Lakhs at subsidized interest (interest subvention to 7% or lower)",
      "Technical training in modern farming, drone operation (Drone Didi), processing, and marketing",
      "Direct market linkage via ONDC and Government e-Marketplace (GeM)"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "SHG membership passbook / Unique SHG member code",
      "Bank Account details",
      "Proof of residence in Gram Panchayat"
    ],
    applicationSteps: [
      "Contact your local Village Organization (VO) or Cluster Level Federation (CLF)",
      "Submit individual livelihood business plan during SHG weekly meetings",
      "Participate in entrepreneurship bootcamps organized by NRLM / KVK",
      "Avail credit from bank linkage or revolving fund",
      "Track production and market through local NRLM marts"
    ]
  },
  {
    id: "cgtmse",
    name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    nameHi: "क्रेडिट गारंटी फंड ट्रस्ट (CGTMSE)",
    ministry: "Ministry of MSME",
    category: "Credit Guarantee",
    maxBenefit: "₹5,00,00,000",
    maxBenefitNumeric: 50000000,
    subsidyRate: "Up to 85% Guarantee Coverage",
    targetAudience: "Micro & Small Enterprises, Innovators, Exporters",
    description: "Enables financial institutions to provide collateral-free credit facilities (term loans and working capital) up to ₹5 Crore to micro and small enterprises with guarantee cover up to 85%.",
    descriptionHi: "वित्तीय संस्थानों को सूक्ष्म और लघु उद्यमों को 85% तक गारंटी कवर के साथ ₹5 करोड़ तक संपार्श्विक-मुक्त ऋण प्रदान करने में सक्षम बनाता है।",
    officialUrl: "https://www.cgtmse.in/",
    eligibility: [
      "New and existing Micro and Small Enterprises engaged in manufacturing or service activities",
      "Valid Udyam Registration number",
      "Educational institutions, training institutions, and SHGs are also covered"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["Manufacturing", "Services", "TechDigital", "FoodProcessing"]
    },
    benefits: [
      "Collateral-free loans up to ₹500 Lakhs (₹5 Crore)",
      "85% guarantee cover for micro-enterprises up to ₹5 Lakhs",
      "85% guarantee cover for women-led enterprises and SC/ST entrepreneurs across India",
      "Reduced annual guarantee fee of only 0.37% for loans up to ₹1 Crore"
    ],
    documentsRequired: [
      "Udyam Registration Certificate",
      "Audited Financial statements / IT returns for last 2 years (for existing units)",
      "Project feasibility report (for new units)",
      "GST registration certificate and bank statements"
    ],
    applicationSteps: [
      "Approach any scheduled commercial bank or eligible NBFC with project proposal",
      "Bank appraises proposal based on commercial viability without asking for third-party collateral",
      "Bank applies directly to CGTMSE trust for guarantee cover",
      "Loan is sanctioned and disbursed directly"
    ]
  },
  {
    id: "nsfdc-term-loan",
    name: "NSFDC Term Loan Scheme for Scheduled Castes",
    nameHi: "एनएसएफडीसी मियादी ऋण योजना (अनुसूचित जातियों के लिए)",
    ministry: "Ministry of Social Justice and Empowerment",
    category: "Concessional Loan",
    maxBenefit: "₹50,00,000",
    maxBenefitNumeric: 5000000,
    subsidyRate: "Interest rate as low as 6% p.a.",
    targetAudience: "Scheduled Caste Entrepreneurs living below double poverty line",
    description: "Concessional financial assistance to individuals belonging to Scheduled Castes for setting up viable income-generating business ventures.",
    descriptionHi: "व्यवहार्य आय-सृजन व्यवसाय शुरू करने के लिए अनुसूचित जाति के उद्यमियों को रियायती वित्तीय सहायता (6% ब्याज दर)।",
    officialUrl: "https://nsfdc.nic.in/",
    eligibility: [
      "Applicant must belong to Scheduled Caste community",
      "Annual family income up to ₹3,00,000 for rural and urban areas",
      "Age between 18 and 60 years",
      "Prior skill certification or relevant trade experience preferred"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["SC"],
      businessTypes: ["Manufacturing", "Retail", "Services", "AgriBusiness", "Handicrafts"]
    },
    benefits: [
      "Loan up to 90% of project cost (max ₹50 Lakhs)",
      "Highly concessional interest rate: 6% per annum for loans up to ₹5 Lakhs, 8% for higher amounts",
      "Repayment period up to 10 years including moratorium of up to 12 months",
      "Subsidy component routed through State Channelizing Agencies (SCAs)"
    ],
    documentsRequired: [
      "Caste Certificate issued by Revenue Authority (Tehsildar/SDM)",
      "Income Certificate proving annual family income under limit",
      "Aadhaar and Voter ID cards",
      "Quotation / Detailed Project Cost sheet"
    ],
    applicationSteps: [
      "Visit the State Channelizing Agency (SCA) office in your district (e.g., DSCSC)",
      "Submit physical or online application form with verified caste and income certificates",
      "Interview and spot verification by district officer",
      "SCA forwards approved dossier to NSFDC headquarters for fund sanction",
      "Disbursement through bank branch"
    ]
  },
  {
    id: "trifed-van-dhan",
    name: "TRIFED Pradhan Mantri Van Dhan Vikas Yojana",
    nameHi: "ट्राइफेड प्रधानमंत्री वन धन विकास योजना",
    ministry: "Ministry of Tribal Affairs",
    category: "Tribal Value Addition",
    maxBenefit: "₹15,00,000",
    maxBenefitNumeric: 1500000,
    subsidyRate: "100% Grant-in-aid for Kendra Setup",
    targetAudience: "Scheduled Tribes, Forest Dwellers, Non-Timber Forest Produce gatherers",
    description: "Livelihood generation initiative for tribal gatherers to transform Non-Timber Forest Produce (NTFP) into high-value products through community clusters (Van Dhan Vikas Kendras).",
    descriptionHi: "आदिवासी वनोपज संग्राहकों के लिए वनोपज का मूल्यवर्धन करने और सीधे बाजार में बेचने हेतु 100% सरकारी सहायता।",
    officialUrl: "https://trifed.tribal.gov.in/",
    eligibility: [
      "Belong to Scheduled Tribe (ST) category and forest dwelling communities",
      "Organized into Self Help Groups of ~20 members each",
      "15 SHGs form one Van Dhan Vikas Kendra cluster (approx 300 gatherers)"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["ST"],
      businessTypes: ["AgriBusiness", "FoodProcessing", "Handicrafts"]
    },
    benefits: [
      "₹15 Lakhs capital grant per Van Dhan Vikas Kendra for equipment and setup",
      "Comprehensive training in processing, packaging, and branding",
      "Direct marketing linkage via Tribes India outlets and online ecommerce channels",
      "Fair Minimum Support Price (MSP) protection for 87 forest commodities"
    ],
    documentsRequired: [
      "ST Certificate",
      "Forest Dwellers Rights recognition / Gram Sabha recommendation",
      "Aadhaar card and bank account linked with Jan Dhan"
    ],
    applicationSteps: [
      "Join or form a local tribal SHG with forest-gathering neighbors",
      "Gram Sabha passes resolution endorsing the formation of Van Dhan Kendra",
      "District Nodal Officer submits cluster proposal to State Tribal Development Department",
      "TRIFED releases central grant to Kendra bank account"
    ]
  },
  {
    id: "day-nulm",
    name: "DAY-NULM Self Employment Programme (SEP)",
    nameHi: "दीनदयाल अंत्योदय योजना - राष्ट्रीय शहरी आजीविका मिशन (DAY-NULM)",
    ministry: "Ministry of Housing and Urban Affairs",
    category: "Subsidized Micro-Enterprise",
    maxBenefit: "₹10,00,000",
    maxBenefitNumeric: 1000000,
    subsidyRate: "Interest Subvention over 7% Bank Rate",
    targetAudience: "Urban Poor, Street Vendors, Ragpickers, Slum Dwellers",
    description: "Focuses on financial assistance to individual urban poor (up to ₹2 Lakhs) and groups of urban poor (up to ₹10 Lakhs) for setting up self-employment ventures.",
    descriptionHi: "शहरी गरीबों को व्यक्तिगत उद्यम (₹2 लाख तक) या समूह उद्यम (₹10 लाख तक) स्थापित करने हेतु 7% ब्याज पर वित्तीय सहायता।",
    officialUrl: "https://nulm.gov.in/",
    eligibility: [
      "Urban poor individuals or Self Help Groups",
      "Urban residency verified by BPL list or ULB household survey",
      "Minimum 18 years old",
      "No educational bar for starting small service or manufacturing units"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["Retail", "Services", "Manufacturing", "StreetVendor"]
    },
    benefits: [
      "Individual enterprises: Loan up to ₹2,00,000",
      "Group enterprises: Loan up to ₹10,00,000 (minimum 3 members)",
      "Interest subsidy: Entire difference between bank rate and 7% p.a. is subsidized by government",
      "No collateral needed for loans up to ₹10 Lakhs under RBI guidelines"
    ],
    documentsRequired: [
      "Identity and Urban residence proof",
      "BPL card / EWS certificate or City Livelihood Centre (CLC) registration",
      "Project brief with equipment quotation",
      "Bank account details"
    ],
    applicationSteps: [
      "Visit the Community Organizer (CO) or City Mission Management Unit (CMMU) at your Municipal Corporation",
      "Fill SEP application form with task force assistance",
      "Task Force conducts interview and recommends file to nearby bank",
      "Loan disbursed and interest subsidy auto-credited quarterly"
    ]
  },
  {
    id: "pmfme",
    name: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    nameHi: "पीएम सूक्ष्म खाद्य प्रसंस्करण उद्यम औपचारिकीकरण (PMFME)",
    ministry: "Ministry of Food Processing Industries",
    category: "Capital Subsidy",
    maxBenefit: "₹10,00,000",
    maxBenefitNumeric: 1000000,
    subsidyRate: "35% Credit-linked Capital Subsidy",
    targetAudience: "Pickle, spice, bakery, oil mill, flour mill, dairy & snack processors",
    description: "Provides financial, technical and business support for upgradation of micro food processing enterprises under One District One Product (ODOP) framework.",
    descriptionHi: "एक जिला एक उत्पाद (ODOP) के तहत सूक्ष्म खाद्य प्रसंस्करण उद्यमों के उन्नयन हेतु 35% क्रेडिट-लिंक्ड सब्सिडी (अधिकतम ₹10 लाख)।",
    officialUrl: "https://pmfme.mofpi.gov.in/",
    eligibility: [
      "Existing micro food processing units or new units following One District One Product (ODOP)",
      "Enterprise must be micro enterprise with investment under ₹1 Crore",
      "Ownership can be individual proprietorship, partnership, FPO, or SHG"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["FoodProcessing", "AgriBusiness"]
    },
    benefits: [
      "35% credit-linked capital subsidy on eligible project cost up to max ₹10 Lakhs",
      "Seed capital of ₹40,000 per SHG member for working capital and small tools",
      "Support for FSSAI registration, Udyam, and GST compliance",
      "Common Infrastructure support up to ₹3 Crore (35% subsidy) for shared processing facilities"
    ],
    documentsRequired: [
      "Aadhaar, PAN, and Electricity bill of premise",
      "Udyam Registration and FSSAI basic license (or application)",
      "Quotations for food machinery and civil work",
      "Bank statements for 6 months"
    ],
    applicationSteps: [
      "Register at pmfme.mofpi.gov.in portal",
      "Select your district's designated ODOP or non-ODOP category",
      "District Resource Person (DRP) assists free of cost with DPR preparation",
      "Bank sanctions the term loan and subsidy is deposited into borrower's subsidy reserve account"
    ]
  },
  {
    id: "nhfdc-divyang",
    name: "NHFDC Concessional Loan for Differently-Abled Entrepreneurs",
    nameHi: "एनएचएफडीसी दिव्यांग उद्यमी रियायती ऋण योजना",
    ministry: "Ministry of Social Justice and Empowerment",
    category: "Concessional Finance",
    maxBenefit: "₹25,00,000",
    maxBenefitNumeric: 2500000,
    subsidyRate: "Interest rate 4% to 8% p.a. + Special Rebate",
    targetAudience: "Persons with Disabilities (PwD) with 40%+ benchmark disability",
    description: "Financial assistance to Divyangjan entrepreneurs for setting up small business, commercial vehicles, service centers, and computer kiosks.",
    descriptionHi: "दिव्यांग उद्यमियों को अपना व्यवसाय, दुकान, सेवा केंद्र या वाहन खरीदने के लिए 4% से 8% ब्याज दर पर ₹25 लाख तक का रियायती ऋण।",
    officialUrl: "http://www.nhfdc.nic.in/",
    eligibility: [
      "Indian citizen with 40% or more disability (UDID card or Medical Certificate)",
      "Age above 18 years",
      "Educational qualification relevant to proposed project"
    ],
    eligibilityCriteria: {
      minAge: 18,
      categories: ["General", "OBC", "SC", "ST", "Minority", "EWS"],
      businessTypes: ["Retail", "Services", "Handicrafts", "TechDigital", "Manufacturing"]
    },
    benefits: [
      "Loan up to ₹25 Lakhs for service / trading / manufacturing sectors",
      "Interest rate: 4% (loans up to ₹50k), 5% (up to ₹5 Lakhs), 6% (above ₹5 Lakhs)",
      "Special 1% interest rebate for women entrepreneurs with disabilities",
      "Repayment tenure up to 10 years"
    ],
    documentsRequired: [
      "Unique Disability ID (UDID) Card or Disability Certificate from Govt Hospital",
      "Aadhaar Card and age proof",
      "Project cost estimate",
      "Bank account details"
    ],
    applicationSteps: [
      "Apply through State Channelizing Agency or partner Regional Rural Banks (RRBs)",
      "Submit disability certificate and business project report",
      "Sanctioned by SCA and NHFDC under automated disbursal channel",
      "Free entrepreneurship skill development training provided"
    ]
  }
];

export const MOCK_STATS = [
  { value: "500+", label: "Schemes Analyzed", labelHi: "योजनाओं का विश्लेषण", suffix: "" },
  { value: "10L+", label: "Entrepreneurs Benefited", labelHi: "लाभान्वित उद्यमी", suffix: "" },
  { value: "28", label: "States & 8 UTs Covered", labelHi: "राज्यों और केंद्र शासित प्रदेश", suffix: "" },
  { value: "₹4,200 Cr", label: "Subsidies Unlocked", labelHi: "सब्सिडी और ऋण स्वीकृत", suffix: "" }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Create Entrepreneur Profile",
    titleHi: "अपनी प्रोफ़ाइल बनाएं",
    description: "Tell us about your social category, business sector, state, and funding needs in 2 quick minutes.",
    descriptionHi: "केवल 2 मिनट में अपनी सामाजिक श्रेणी, व्यवसाय क्षेत्र, राज्य और ऋण आवश्यकता दर्ज करें।",
    icon: "UserCheck"
  },
  {
    step: "02",
    title: "AI Scheme Matching",
    titleHi: "एआई द्वारा सटीक मिलान",
    description: "Our intelligent engine matches your exact eligibility criteria against hundreds of central and state schemes.",
    descriptionHi: "हमारा इंटेलिजेंट इंजन सैकड़ों सरकारी नियमों के अनुसार आपकी पात्रता का तत्काल मिलान करता है।",
    icon: "Cpu"
  },
  {
    step: "03",
    title: "Direct Guidance & Apply",
    titleHi: "आवेदन करें और मार्गदर्शन पाएं",
    description: "Access tailored document checklists, step-by-step guides, and apply directly to official portals with zero middlemen.",
    descriptionHi: "दस्तावेज़ चेकलिस्ट, चरण-दर-चरण आवेदन गाइड और बिना किसी बिचौलिये के सीधे आधिकारिक पोर्टल पर आवेदन करें।",
    icon: "Rocket"
  }
];

export const BENTO_FEATURES = [
  {
    title: "AI-Powered Eligibility Engine",
    titleHi: "एआई संचालित पात्रता इंजन",
    description: "Natural language scheme matching tailored specifically for SC, ST, OBC, women, and marginalized artisans across India.",
    descriptionHi: "एससी, एसटी, ओबीसी, महिला और पारंपरिक कारीगरों के लिए अनुकूलित उन्नत एआई मिलान प्रणाली।",
    tag: "98% Match Precision",
    icon: "Sparkles",
    span: "col-span-12 md:col-span-7",
    color: "from-brand-950 via-brand-900 to-indigo-950 text-white"
  },
  {
    title: "20+ Active Central & State Schemes",
    titleHi: "20+ केंद्रीय एवं राज्य योजनाएं",
    description: "Direct real-time subsidy rules from MSME, MUDRA, Stand-Up India, PM Vishwakarma, and Lakhpati Didi.",
    descriptionHi: "एमएसएमई, मुद्रा, स्टैंड-अप इंडिया, विश्वकर्मा और लखपति दीदी से सीधे सत्यापित योजना डेटा।",
    tag: "Always Updated",
    icon: "Landmark",
    span: "col-span-12 md:col-span-5",
    color: "from-amber-500/10 via-amber-500/5 to-transparent text-slate-900 border-amber-200"
  },
  {
    title: "Bilingual: Hindi & English",
    titleHi: "द्विभाषी: हिंदी और अंग्रेजी",
    description: "Fully localized interface designed for grassroots accessibility without bureaucratic jargon.",
    descriptionHi: "जटिल सरकारी शब्दावली के बिना जमीनी स्तर पर आसान पहुंच के लिए पूर्ण द्विभाषी इंटरफ़ेस।",
    tag: "Grassroots First",
    icon: "Languages",
    span: "col-span-12 md:col-span-5",
    color: "from-indigo-50/60 to-white text-slate-900 border-slate-200"
  },
  {
    title: "Step-by-Step Middleman-Free Guide",
    titleHi: "बिचौलिया-मुक्त चरणबद्ध गाइड",
    description: "Instant document readiness checklist, official portal links, and direct subsidy calculations to stop agent exploitation.",
    descriptionHi: "दस्तावेज़ चेकलिस्ट, आधिकारिक लिंक और एजेंटों के शोषण को समाप्त करने के लिए सीधी सब्सिडी गणना।",
    tag: "Zero Commission",
    icon: "ShieldCheck",
    span: "col-span-12 md:col-span-7",
    color: "from-slate-900 to-brand-950 text-white"
  }
];
