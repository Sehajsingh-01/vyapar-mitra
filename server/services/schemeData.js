/**
 * Curated In-Memory Database of 22 Real Indian Government Schemes
 * Tailored for Marginalized Entrepreneurs, Micro-enterprises, Rural Artisans, Women, SC/ST, and Street Vendors
 */

export const schemes = [
  {
    id: 'pm-svanidhi',
    name: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
    nameHi: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
    shortDescription: 'Collateral-free micro-credit working capital loan up to ₹50,000 for urban and peri-urban street vendors.',
    shortDescriptionHi: 'शहरी और अर्ध-शहरी रेहड़ी-पटरी विक्रेताओं के लिए ₹50,000 तक का संपार्श्विक-मुक्त कार्यशील पूंजी ऋण।',
    description: 'PM SVANidhi was launched by the Ministry of Housing and Urban Affairs to empower street vendors by facilitating collateral-free working capital loans. Initial loan starts at ₹10,000 (1st tranche), escalating to ₹20,000 (2nd tranche) and ₹50,000 (3rd tranche) upon timely repayment. Borrowers receive an interest subsidy of 7% per annum credited directly to their bank account and cashbacks up to ₹1,200/year for digital transactions.',
    descriptionHi: 'पीएम स्वनिधि आवास और शहरी मामलों के मंत्रालय द्वारा शुरू की गई है ताकि रेहड़ी-पटरी वालों को बिना किसी गारंटी के कार्यशील पूंजी ऋण प्रदान किया जा सके। समय पर पुनर्भुगतान करने पर पहला ऋण ₹10,000, दूसरा ₹20,000 और तीसरा ₹50,000 तक मिलता है। साथ ही 7% वार्षिक ब्याज सब्सिडी और डिजिटल लेनदेन पर ₹1200 तक कैशबैक मिलता है।',
    ministry: 'Ministry of Housing and Urban Affairs (MoHUA)',
    ministryHi: 'आवासन और शहरी कार्य मंत्रालय',
    category: 'Street Vendors',
    maxAmount: '₹50,000 (in 3 tranches: 10k, 20k, 50k)',
    maxAmountNumeric: 50000,
    interestRate: '7% Interest Subsidy via DBT',
    subsidyRate: '7% interest subvention + up to ₹1,200 annual digital cashback',
    applicationUrl: 'https://pmsvanidhi.mohua.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['street_vendor', 'hawker', 'food_stall', 'fruit_vegetable_vendor', 'artisan_vendor', 'chai_stall', 'retail'],
      annualIncomeLimit: 300000,
      location: ['Urban', 'Peri-Urban'],
      existingBusiness: 'existing_only',
      education: 'any'
    },
    benefits: [
      'Collateral-free working capital loan of ₹10,000 (1st tranche)',
      'Enhanced loan limit of ₹20,000 and ₹50,000 on timely repayments',
      '7% annual interest subsidy credited via Direct Benefit Transfer (DBT)',
      'Digital transaction incentive / monthly cashback up to ₹100 (₹1,200 annually)',
      'Socio-economic profiling under SVANidhi se Samriddhi for family welfare linkage'
    ],
    benefitsHi: [
      'बिना किसी जमानत के ₹10,000 का प्रारंभिक कार्यशील पूंजी ऋण',
      'समय पर भुगतान पर ₹20,000 और ₹50,000 का बढ़ा हुआ अगला ऋण',
      '7% वार्षिक ब्याज सब्सिडी सीधे बैंक खाते में',
      'डिजिटल लेनदेन पर ₹1,200 तक वार्षिक कैशबैक',
      'स्वनिधि से समृद्धि योजना के तहत सामाजिक सुरक्षा योजनाओं से जुड़ाव'
    ],
    documentsRequired: [
      'Aadhaar Card linked with active Mobile Number',
      'Voter ID Card or Proof of Identity',
      'Vending Certificate / Identity Card issued by Urban Local Body (ULB) / Town Vending Committee (TVC)',
      'Letter of Recommendation (LoR) from ULB (if certificate not yet issued)',
      'Bank Account Passbook / Statement',
      'UPI QR Code details (for digital cashback)'
    ],
    stepsToApply: [
      'Visit nearest Common Service Centre (CSC) or log in directly to pmsvanidhi.mohua.gov.in',
      'Verify mobile number via Aadhaar OTP authentication',
      'Check vending status using ULB Vending Certificate number or apply for Letter of Recommendation (LoR)',
      'Fill applicant profile, business type, and select preferred lending bank / MFI / NBFC',
      'Submit the loan application form online along with KYC documents',
      'Lender inspects application and disburses ₹10,000 directly into bank account within 7-10 days'
    ],
    stepsToApplyHi: [
      'नजदीकी सीएससी (CSC) केंद्र पर जाएं या pmsvanidhi.mohua.gov.in पर लॉगिन करें',
      'आधार से जुड़े मोबाइल नंबर पर ओटीपी (OTP) से सत्यापन करें',
      'शहरी निकाय का वेंडिंग सर्टिफिकेट या सिफारिश पत्र (LoR) दर्ज करें',
      'व्यापार विवरण भरें और पसंदीदा बैंक का चयन करें',
      'आवेदन पत्र ऑनलाइन जमा करें',
      'बैंक सत्यापन के बाद ऋण राशि सीधे खाते में हस्तांतरित कर दी जाएगी'
    ],
    tags: ['street vendor', 'thela', 'rehri', 'patari', 'svanidhi', 'micro loan', 'working capital', 'urban livelihood']
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Kaushal Samman Yojana',
    nameHi: 'पीएम विश्वकर्मा कौशल सम्मान योजना',
    shortDescription: 'Comprehensive support including ₹15,000 toolkit grant, 5% collateral-free loan up to ₹3,00,000, and stipend training for 18 traditional artisan trades.',
    shortDescriptionHi: '18 पारंपरिक दस्तकारों व कारीगरों के लिए ₹15,000 टूलकिट अनुदान, 5% ब्याज पर ₹3 लाख तक ऋण और प्रशिक्षण वजीफा।',
    description: 'Central sector scheme launched to provide end-to-end support to traditional artisans and craftspeople who work with their hands and tools. Covers 18 traditional family trades including Carpenters, Blacksmiths, Potters, Cobblers, Weavers, Tailors, and Barbers. Offers basic and advanced skill training with ₹500/day stipend, modern toolkit incentive of ₹15,000, and enterprise credit up to ₹3,00,000 (Tranche 1: ₹1 Lakh, Tranche 2: ₹2 Lakhs) at a concessional interest rate of 5% with government interest subvention of 8%.',
    descriptionHi: 'हाथ और औजारों से काम करने वाले 18 पारंपरिक व्यवसायों के कारीगरों और शिल्पकारों को समग्र सहायता देने हेतु योजना। इसमें 5 दिवसीय बुनियादी प्रशिक्षण (₹500/दिन वजीफा), ₹15,000 का आधुनिक टूलकिट ई-वाउचर और 5% रियायती ब्याज दर पर ₹3,00,000 तक बिना गारंटी ऋण मिलता है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME)',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
    category: 'Artisans & Crafts',
    maxAmount: '₹3,00,000 loan + ₹15,000 toolkit voucher',
    maxAmountNumeric: 315000,
    interestRate: '5% Fixed Concessional Interest Rate',
    subsidyRate: '₹15,000 Grant for modern tools + 8% Interest Subvention paid by Govt',
    applicationUrl: 'https://pmvishwakarma.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 75,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'OBC', 'SC', 'ST', 'General', 'Minority'],
      businessTypes: ['artisan', 'craftsperson', 'carpenter', 'blacksmith', 'potter', 'sculptor', 'cobbler', 'mason', 'basket_maker', 'toy_maker', 'barber', 'garland_maker', 'washerman', 'tailor', 'fishing_net_maker'],
      annualIncomeLimit: 500000,
      location: ['Rural', 'Urban'],
      existingBusiness: 'existing_only',
      education: 'any'
    },
    benefits: [
      'Official PM Vishwakarma Certificate and Digital ID Card',
      'Skill Upgradation: 5-7 days basic training and 15+ days advanced training with ₹500 daily stipend',
      'Toolkit Incentive: ₹15,000 digital e-voucher to purchase modern specialized tools',
      'Collateral-free Enterprise Credit: ₹1,00,000 (1st tranche) and ₹2,00,000 (2nd tranche) at only 5% interest',
      'Incentive for Digital Transactions: ₹1 per digital transaction up to 100 transactions/month',
      'Marketing Support: Quality certification, branding, onboarding on GeM and e-commerce portals'
    ],
    benefitsHi: [
      'पीएम विश्वकर्मा प्रमाण पत्र और डिजिटल पहचान पत्र',
      'कौशल प्रशिक्षण: ₹500 दैनिक भत्ते के साथ 5-7 दिनों का बुनियादी प्रशिक्षण',
      'टूलकिट प्रोत्साहन: आधुनिक औजार खरीदने के लिए ₹15,000 का ई-वाउचर',
      'ऋण सहायता: मात्र 5% ब्याज दर पर ₹3 लाख तक बिना गारंटी लोन',
      'डिजिटल लेनदेन पर प्रति माह ₹100 तक प्रोत्साहन',
      'राष्ट्रीय ई-कॉमर्स और GeM पोर्टल पर उत्पादों की बिक्री में मार्केटिंग सहायता'
    ],
    documentsRequired: [
      'Aadhaar Card of artisan (biometric authentication required)',
      'Active mobile number linked with Aadhaar',
      'Bank Account Passbook / Cancelled Cheque',
      'Ration Card / Family details (only one member per family is eligible)',
      'Trade proof / self-declaration of practicing one of 18 traditional trades'
    ],
    stepsToApply: [
      'Visit your nearest Common Service Centre (CSC) with Aadhaar and bank details',
      'Complete biometric e-KYC on the PM Vishwakarma portal (pmvishwakarma.gov.in)',
      'Select your specific trade from the 18 eligible traditional occupations',
      'Three-stage verification: Gram Panchayat / Urban Local Body check, District Implementation Committee, Screening Committee',
      'Upon approval, receive Vishwakarma ID, attend 5-day training with ₹500/day stipend, and claim ₹15,000 toolkit voucher',
      'Apply directly on the portal for the 1st loan tranche of ₹1,00,000 at 5% interest'
    ],
    stepsToApplyHi: [
      'अपने नजदीकी सीएससी (CSC) केंद्र पर आधार व बैंक पासबुक लेकर जाएं',
      'बायोमेट्रिक प्रमाणीकरण कराकर 18 व्यवसायों में से अपना व्यवसाय चुनें',
      'ग्राम पंचायत या नगर निकाय द्वारा आवेदन का सत्यापन होगा',
      'सत्यापन उपरांत प्रशिक्षण लें और ₹15,000 का टूलकिट वाउचर प्राप्त करें',
      '5% ब्याज पर ₹1 लाख का पहला ऋण प्राप्त करें'
    ],
    tags: ['vishwakarma', 'artisan', 'craftsman', 'carpenter', 'blacksmith', 'potter', 'tailor', 'barber', 'cobbler', 'traditional trade']
  },
  {
    id: 'mudra-yojana',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    nameHi: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)',
    shortDescription: 'Collateral-free institutional micro-finance loans up to ₹10 Lakhs (and up to ₹20 Lakhs for Tarun Plus) across Shishu, Kishore, and Tarun categories.',
    shortDescriptionHi: 'शिशु, किशोर और तरुण श्रेणियों के तहत गैर-कृषि सूक्ष्म उद्यमों के लिए ₹10 लाख तक संपार्श्विक-मुक्त संस्थागत ऋण।',
    description: 'PMMY facilitates micro-credits up to ₹10 Lakhs (extended up to ₹20 Lakhs under Tarun Plus in Budget 2024) to non-corporate, non-farm small/micro enterprises. Loans are classified into three categories: Shishu (up to ₹50,000 for startup units), Kishore (₹50,000 to ₹5 Lakhs for expanding units), and Tarun (₹5 Lakhs to ₹10 Lakhs for established businesses). Provided through Commercial Banks, RRBs, Small Finance Banks, and MFIs without any collateral or third-party guarantee.',
    descriptionHi: 'प्रधानमंत्री मुद्रा योजना गैर-कॉर्पोरेट और गैर-कृषि लघु/सूक्ष्म व्यवसायों को ₹10 लाख (तरुण प्लस में ₹20 लाख तक) तक ऋण प्रदान करती है। इसमें तीन श्रेणियां हैं: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख तक) और तरुण (₹5 से ₹10 लाख तक)। किसी गारंटी की आवश्यकता नहीं होती।',
    ministry: 'Ministry of Finance (MoF) / Department of Financial Services',
    ministryHi: 'वित्त मंत्रालय / वित्तीय सेवाएं विभाग',
    category: 'Micro Finance',
    maxAmount: '₹10,00,000 (up to ₹20,00,000 for Tarun Plus)',
    maxAmountNumeric: 1000000,
    interestRate: 'Bank Base Rate + 1% to 3% (typically 8.5% - 11.5%)',
    subsidyRate: 'Zero processing fee for Shishu; 100% guarantee by CGFMU',
    applicationUrl: 'https://www.mudra.org.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['manufacturing', 'retail', 'services', 'food_processing', 'repair_shop', 'small_trading', 'transport_vehicle', 'artisan', 'dairy'],
      annualIncomeLimit: 1200000,
      location: ['Urban', 'Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'No collateral or third-party guarantee required',
      'Flexible repayment tenure from 3 to 5 years',
      'MUDRA Debit Card provided for working capital withdrawal at ATMs',
      'Zero processing fee for Shishu category loans (up to ₹50,000)',
      'Subsidized credit guarantee backing through CGFMU (Credit Guarantee Fund for Micro Units)'
    ],
    benefitsHi: [
      'बिना किसी जमानत या थर्ड-पार्टी गारंटी के लोन',
      '3 से 5 वर्ष की लचीली पुनर्भुगतान अवधि',
      'कार्यशील पूंजी के आहरण के लिए विशेष मुद्रा डेबिट कार्ड',
      'शिशु ऋण पर शून्य प्रोसेसिंग शुल्क',
      'सरकारी क्रेडिट गारंटी फंड द्वारा समर्थित'
    ],
    documentsRequired: [
      'Proof of Identity (Aadhaar, Voter ID, PAN card)',
      'Proof of Residence (Electricity bill, Ration card, Aadhaar)',
      'Recent passport-size photographs of applicant/partners',
      'Quotation of machinery/items to be purchased or business project estimate',
      'Proof of business address and registration (Udyam Registration certificate)',
      'Bank statement for last 6 months (for Kishore & Tarun categories)'
    ],
    stepsToApply: [
      'Choose the appropriate MUDRA category: Shishu (<₹50k), Kishore (₹50k-₹5L), or Tarun (₹5L-₹10L)',
      'Prepare a simple project estimate / business plan with machinery or stock quotation',
      'Apply online via the JanSamarth portal (jansamarth.in) or visit nearest bank / MFI branch',
      'Submit the standard PMMY application form along with KYC, Udyam certificate, and bank statement',
      'Bank branch sanctions loan and issues sanction letter with MUDRA Card for working capital'
    ],
    stepsToApplyHi: [
      'अपनी जरूरत अनुसार शिशु, किशोर या तरुण श्रेणी चुनें',
      'सरल बिजनेस प्लान व मशीनरी/स्टॉक का कोटेशन तैयार करें',
      'जनसमर्थ पोर्टल (jansamarth.in) पर ऑनलाइन आवेदन करें या नजदीकी बैंक में जाएं',
      'मुद्रा आवेदन फॉर्म और केवाईसी दस्तावेज जमा करें',
      'बैंक ऋण स्वीकृत कर मुद्रा कार्ड प्रदान करेगा'
    ],
    tags: ['mudra', 'pmmy', 'shishu', 'kishore', 'tarun', 'business loan', 'collateral free', 'micro credit']
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme',
    nameHi: 'स्टैंड-अप इंडिया योजना',
    shortDescription: 'Bank loans between ₹10 Lakhs and ₹1 Crore for greenfield enterprises set up by SC, ST, and Women entrepreneurs.',
    shortDescriptionHi: 'अनुसूचित जाति (SC), अनुसूचित जनजाति (ST) और महिला उद्यमियों द्वारा नए उद्यमों के लिए ₹10 लाख से ₹1 करोड़ तक बैंक ऋण।',
    description: 'Launched to facilitate bank loans between ₹10 Lakhs and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise. The enterprise may be in manufacturing, services, agri-allied activities, or the trading sector. In non-individual enterprises, at least 51% of shareholding and controlling stake must be held by an SC/ST or woman entrepreneur.',
    descriptionHi: 'प्रत्येक बैंक शाखा से कम से कम एक एससी/एसटी और एक महिला उद्यमी को ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण उपलब्ध कराने की योजना। यह विनिर्माण, सेवा, कृषि-संबद्ध गतिविधियों या व्यापार क्षेत्र में नए उद्यम (ग्रीनफील्ड) स्थापित करने के लिए है।',
    ministry: 'Ministry of Finance / SIDBI',
    ministryHi: 'वित्त मंत्रालय / सिडबी',
    category: 'SC/ST & Women Empowerment',
    maxAmount: '₹1,00,00,000 (₹1 Crore)',
    maxAmountNumeric: 10000000,
    interestRate: 'Lowest applicable rate for that category (Tenor MCLR + 3% + Tenor Premium)',
    subsidyRate: 'Margin money requirement reduced to 15%; eligible for central/state convergence subsidies',
    applicationUrl: 'https://www.standupmitra.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['Female', 'All'],
      category: ['SC', 'ST', 'All'], // If SC/ST, any gender; if Women, any category
      businessTypes: ['manufacturing', 'services', 'trading', 'agri_allied', 'food_processing', 'healthcare', 'technology'],
      annualIncomeLimit: null, // No upper cap
      location: ['Urban', 'Rural'],
      existingBusiness: 'new_only', // Greenfield enterprise only
      education: 'any'
    },
    benefits: [
      'Composite loan covering both term loan and working capital up to ₹1 Crore',
      'Lower margin money requirement of only 15% (can be converged with state subsidies)',
      'RuPay Debit Card issued for convenient working capital drawdown up to ₹10 Lakhs',
      'Mentorship, handholding support, and financial literacy training through SIDBI Standup Mitra portal',
      'Credit guarantee coverage through Credit Guarantee Fund for Stand-Up India (CGFSI)'
    ],
    benefitsHi: [
      '₹1 करोड़ तक सावधि ऋण (टर्म लोन) और कार्यशील पूंजी का समग्र पैकेज',
      'मात्र 15% मार्जिन मनी (स्वयं का अंशदान)',
      'वर्किंग कैपिटल निकालने के लिए रूपे डेबिट कार्ड',
      'सिडबी स्टैंडअप मित्र पोर्टल द्वारा हैंडहोल्डिंग व मेंटरशिप सहायता',
      'बिना किसी थर्ड पार्टी गारंटी के सरकारी क्रेडिट गारंटी'
    ],
    documentsRequired: [
      'Proof of Identity and Residence (Aadhaar, Passport, PAN Card)',
      'Caste Certificate (for SC/ST applicants issued by competent revenue authority)',
      'Detailed Project Report (DPR) highlighting financial viability and cash flows',
      'Memorandum & Articles of Association / Partnership Deed (demonstrating 51%+ SC/ST/Woman ownership)',
      'Projected Balance Sheets for 3 years',
      'Lease Deed or Rent Agreement for proposed business premises'
    ],
    stepsToApply: [
      'Register on Stand-Up Mitra portal (standupmitra.in) as an SC, ST, or Woman entrepreneur',
      'Prepare a detailed Project Report (DPR) detailing capital expenditure and operational plans',
      'Select whether handholding support is needed or apply as a "Ready Borrower"',
      'Choose preferred Scheduled Commercial Bank branch through the portal',
      'Upload required documents and submit the online application form',
      'Bank branch invites applicant for project interview, sanctions loan, and sets up credit line'
    ],
    stepsToApplyHi: [
      'स्टैंड-अप मित्र पोर्टल (standupmitra.in) पर पंजीकरण करें',
      'परियोजना रिपोर्ट (DPR) तैयार करें',
      'हैंडहोल्डिंग सहायता चुनें या सीधे ऋण के लिए आवेदन करें',
      'पसंदीदा वाणिज्यिक बैंक शाखा का चयन करें',
      'दस्तावेज अपलोड करें और ऑनलाइन आवेदन जमा करें',
      'बैंक साक्षात्कार के बाद ₹10 लाख से ₹1 करोड़ का ऋण स्वीकृत करेगा'
    ],
    tags: ['stand up india', 'sc st loan', 'women entrepreneur', 'greenfield', 'crore loan', 'sidbi', 'female business']
  },
  {
    id: 'pmegp',
    name: 'Prime Minister\'s Employment Generation Programme (PMEGP)',
    nameHi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (पीएमईजीपी)',
    shortDescription: 'Credit-linked capital subsidy up to 35% on bank loans up to ₹50 Lakhs for manufacturing and ₹20 Lakhs for service micro-enterprises.',
    shortDescriptionHi: 'विनिर्माण में ₹50 लाख और सेवा क्षेत्र में ₹20 लाख तक के ऋण पर 35% तक भारी पूंजीगत सब्सिडी।',
    description: 'PMEGP is a premier credit-linked subsidy programme administered by the Ministry of MSME through KVIC at the national level and State KVIC Directorates, KVIBs, and DICs at state level. Aims to generate continuous sustainable employment in rural and urban areas. Subsidies range from 15% to 35% of the total project cost depending on location (Rural/Urban) and social category (General: 15-25%; Special categories including SC/ST/OBC/Women/Minorities/Ex-servicemen/PWD: 25-35%).',
    descriptionHi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय का प्रमुख कार्यक्रम जो नए सूक्ष्म उद्यम लगाने हेतु भारी सब्सिडी देता है। सामान्य वर्ग को 15-25% और विशेष वर्ग (महिला, एससी/एसटी, ओबीसी, अल्पसंख्यक) को ग्रामीण क्षेत्र में 35% तक सब्सिडी मिलती है। विनिर्माण में ₹50 लाख और सेवा क्षेत्र में ₹20 लाख तक परियोजना लागत मान्य है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / KVIC',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय / केवीआईसी',
    category: 'Employment Generation & MSME',
    maxAmount: '₹50,00,000 for Manufacturing / ₹20,00,000 for Service',
    maxAmountNumeric: 5000000,
    interestRate: 'Standard commercial bank lending rates (8.5% - 10.5%)',
    subsidyRate: '15% to 35% non-refundable capital subsidy (Margin Money Grant)',
    applicationUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'SC', 'ST', 'OBC', 'Minority', 'General'],
      businessTypes: ['manufacturing', 'services', 'food_processing', 'agro_based', 'textile', 'engineering', 'handicrafts', 'wood_paper', 'chemical_soap'],
      annualIncomeLimit: null, // No upper cap on family income
      location: ['Rural', 'Urban'],
      existingBusiness: 'new_only', // Only newly set up units
      education: '8th_pass' // 8th pass required for projects > ₹10 Lakh in manufacturing and > ₹5 Lakh in service
    },
    benefits: [
      'Huge capital subsidy: 25% for general category (rural), 35% for SC/ST/OBC/Women/Minorities (rural)',
      'Beneficiary own contribution is only 5% for special categories (10% for general)',
      'Subsidized loan up to ₹50 Lakhs for manufacturing sector and ₹20 Lakhs for service sector',
      'Subsidized 2nd loan up to ₹1 Crore (up to 20% subsidy) for existing well-performing PMEGP units',
      'Mandatory Entrepreneurship Development Programme (EDP) training provided free of cost'
    ],
    benefitsHi: [
      'ग्रामीण क्षेत्र में महिला, एससी/एसटी, ओबीसी को 35% तक नकद पूंजी सब्सिडी',
      'लाभार्थी का स्वयं का अंशदान मात्र 5% (विशेष वर्ग के लिए)',
      'विनिर्माण में ₹50 लाख और सेवा में ₹20 लाख तक की परियोजना लागत',
      'सफल इकाइयों को विस्तार के लिए ₹1 करोड़ तक का दूसरा ऋण',
      'निःशुल्क उद्यमिता विकास प्रशिक्षण (EDP)'
    ],
    documentsRequired: [
      'Aadhaar Card and PAN Card',
      'Educational qualification certificate (8th Pass Marksheet / TC if project > ₹10L/₹5L)',
      'Caste / Special category certificate (SC/ST/OBC/Disability/Ex-Servicemen)',
      'Rural Area Certificate issued by Gram Panchayat / Revenue Officer (for rural subsidy rate)',
      'Detailed Project Report (DPR) detailing cost of machinery, civil works, and working capital',
      'Bank Account passbook copy and passport photographs'
    ],
    stepsToApply: [
      'Visit the official KVIC PMEGP e-Portal (kviconline.gov.in)',
      'Click on "Application for New Unit" and fill basic personal and proposed business details',
      'Select sponsoring agency (KVIC / KVIB / DIC) and select your preferred financing bank branch',
      'Upload DPR, caste certificate, rural certificate, and qualification proof',
      'Task force committee under District Collector / DIC reviews application and forwards to bank',
      'Bank sanctions loan, releases capital, and claims the margin money subsidy from KVIC lock-in account'
    ],
    stepsToApplyHi: [
      'केवीआईसी (KVIC) के आधिकारिक पोर्टल kviconline.gov.in पर जाएं',
      'न्यू यूनिट आवेदन पर क्लिक करें और व्यक्तिगत व उद्योग का विवरण भरें',
      'जिला उद्योग केंद्र (DIC) या KVIC और बैंक शाखा का चयन करें',
      'प्रोजेक्ट रिपोर्ट (DPR), जाति प्रमाण पत्र व शैक्षणिक योग्यता अपलोड करें',
      'जिला टास्क फोर्स समिति द्वारा जांच के बाद बैंक लोन स्वीकृत करेगा',
      '3 वर्ष बाद 35% तक की सब्सिडी आपके ऋण खाते में स्थायी रूप से जमा हो जाएगी'
    ],
    tags: ['pmegp', 'kvic', 'subsidy', 'manufacturing loan', 'dic', 'rural employment', '35 percent subsidy']
  },
  {
    id: 'pm-fme',
    name: 'PM Formalisation of Micro food processing Enterprises (PMFME)',
    nameHi: 'प्रधानमंत्री सूक्ष्म खाद्य उद्योग उन्नयन योजना (पीएमएफएमई)',
    shortDescription: 'Credit-linked capital subsidy of 35% up to ₹10 Lakhs for individual micro food units and ₹40,000 seed capital per SHG member.',
    shortDescriptionHi: 'व्यक्तिगत सूक्ष्म खाद्य प्रसंस्करण इकाइयों के लिए ₹10 लाख तक 35% सब्सिडी और स्वयं सहायता समूह (SHG) सदस्यों को ₹40,000 बीज पूंजी।',
    description: 'Launched under the Aatmanirbhar Bharat Abhiyan by the Ministry of Food Processing Industries (MoFPI) with an outlay of ₹10,000 Crore. Aims to enhance competitiveness of existing individual micro-enterprises in the unorganized segment of the food processing industry and promote formalization. Adopts the One District One Product (ODOP) approach. Provides credit-linked capital subsidy @ 35% of eligible project cost with a maximum ceiling of ₹10 Lakh per unit, alongside seed capital of ₹40,000 for SHG members for working capital and small tools.',
    descriptionHi: 'खाद्य प्रसंस्करण उद्योग मंत्रालय द्वारा असंगठित खाद्य प्रसंस्करण इकाइयों को संगठित और आधुनिक बनाने के लिए योजना। एक जिला एक उत्पाद (ODOP) पर आधारित। पात्र परियोजना लागत का 35% (अधिकतम ₹10 लाख) क्रेडिट-लिंक्ड अनुदान दिया जाता है। एसएचजी (SHG) सदस्यों को ₹40,000 प्रति सदस्य कार्यशील पूंजी अनुदान भी मिलता है।',
    ministry: 'Ministry of Food Processing Industries (MoFPI)',
    ministryHi: 'खाद्य प्रसंस्करण उद्योग मंत्रालय',
    category: 'FoodTech & Agro-Processing',
    maxAmount: '₹10,00,000 subsidy (Project up to ₹28.5 Lakhs)',
    maxAmountNumeric: 1000000,
    interestRate: 'Commercial bank interest rates with 35% capital subsidy',
    subsidyRate: '35% capital subsidy up to ₹10 Lakh + ₹40,000 seed capital for SHG members',
    applicationUrl: 'https://pmfme.mofpi.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'OBC', 'SC', 'ST', 'General', 'Minority'],
      businessTypes: ['food_processing', 'spices_grinding', 'pickle_making', 'bakery', 'flour_mill', 'oil_expeller', 'dairy_products', 'fruit_pulp', 'snack_manufacturing'],
      annualIncomeLimit: 1500000,
      location: ['Rural', 'Urban'],
      existingBusiness: 'any',
      education: '8th_pass'
    },
    benefits: [
      '35% credit-linked capital subsidy up to maximum ₹10 Lakhs for individual units',
      'Seed capital of ₹40,000 per member for Self Help Group (SHG) workers in food processing',
      'Support for branding, professional packaging, FSSAI registration, and national marketing',
      'Access to common incubation centers, testing labs, and cold chain infrastructure',
      'Free technical training and handholding support by District Resource Persons (DRPs)'
    ],
    benefitsHi: [
      'व्यक्तिगत इकाई के लिए अधिकतम ₹10 लाख तक 35% पूंजीगत सब्सिडी',
      'स्वयं सहायता समूह की महिलाओं के लिए ₹40,000 प्रति सदस्य बीज पूंजी',
      'एफएसएसएआई (FSSAI) पंजीकरण, पैकेजिंग और ब्रांडिंग में पूरी सहायता',
      'कॉमन इन्क्यूबेशन सेंटर और लैब टेस्टिंग की सुविधा',
      'जिला रिसोर्स पर्सन (DRP) द्वारा निःशुल्क तकनीकी मार्गदर्शन'
    ],
    documentsRequired: [
      'Aadhaar Card and PAN Card',
      'Bank Passbook / statement for past 6 months',
      'Udyam Registration Certificate (can be assisted by DRP)',
      'Electricity Bill / Rent Agreement of food processing shed',
      'Basic Project Proposal with quotation of food processing machinery',
      'Existing FSSAI license (if available; otherwise DRP assists in registration)'
    ],
    stepsToApply: [
      'Visit the PMFME official portal (pmfme.mofpi.gov.in)',
      'Register as an individual entrepreneur, SHG, FPO, or Producer Cooperative',
      'Assign a free District Resource Person (DRP) mapped to your district for DPR preparation',
      'Submit the online application along with machinery quotations and KYC',
      'District Level Committee verifies the application and forwards to your chosen lending bank',
      'Bank sanctions loan, releases disbursement, and MoFPI deposits 35% subsidy into subsidy reserve fund'
    ],
    stepsToApplyHi: [
      'पीएमएफएमई पोर्टल (pmfme.mofpi.gov.in) पर जाएं',
      'पंजीकरण करें और अपने जिले के रिसोर्स पर्सन (DRP) से संपर्क करें',
      'डीआरपी की सहायता से प्रोजेक्ट रिपोर्ट (DPR) और मशीनरी का बिल तैयार करें',
      'ऑनलाइन आवेदन बैंक में जमा करें',
      'बैंक ऋण पास होने पर 35% सब्सिडी सरकार द्वारा खाते में जमा कराई जाएगी'
    ],
    tags: ['pmfme', 'food processing', 'bakery', 'pickle', 'spices', 'odop', 'agro industry', 'flour mill']
  },
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    nameHi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    shortDescription: 'Direct income support of ₹6,000 per year in 3 equal installments of ₹2,000 for all landholding farmer families.',
    shortDescriptionHi: 'सभी भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता (₹2,000 की 3 समान किस्तों में)।',
    description: 'PM-KISAN provides income support to all landholding farmer families in the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs. Under the scheme, ₹6,000 per year is transferred directly into the bank accounts of eligible farmer families in three four-monthly installments of ₹2,000 each through Direct Benefit Transfer (DBT).',
    descriptionHi: 'किसानों की वित्तीय जरूरतों को पूरा करने के लिए केंद्र सरकार द्वारा प्रति वर्ष ₹6,000 की प्रत्यक्ष सहायता दी जाती है। यह राशि ₹2,000-₹2,000 की तीन किस्तों में सीधे किसानों के आधार से जुड़े बैंक खातों में डीबीटी द्वारा भेजी जाती है।',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    ministryHi: 'कृषि एवं किसान कल्याण मंत्रालय',
    category: 'Agriculture & Farming',
    maxAmount: '₹6,000 / year (in perpetuity)',
    maxAmountNumeric: 6000,
    interestRate: '100% Direct Cash Grant (No repayment)',
    subsidyRate: '100% Central Government Grant via DBT',
    applicationUrl: 'https://pmkisan.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 99,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'OBC', 'SC', 'ST', 'General'],
      businessTypes: ['farmer', 'agriculture', 'small_farmer', 'marginal_farmer', 'horticulture', 'organic_farming'],
      annualIncomeLimit: null, // Exclusions apply (income tax payers, institutional landholders excluded)
      location: ['Rural', 'Peri-Urban'],
      existingBusiness: 'existing_only',
      education: 'any'
    },
    benefits: [
      'Guaranteed ₹6,000 annual direct cash transfer credited directly to Aadhaar-seeded bank account',
      'Three installments of ₹2,000 released every 4 months (April-July, August-November, December-March)',
      'Acts as proof of farming profile for simplified issuance of Kisan Credit Card (KCC) loans up to ₹3 Lakhs at 4% effective interest',
      'Eligible for PM Kisan Maandhan Yojana pension scheme linkage'
    ],
    benefitsHi: [
      'प्रति वर्ष ₹6,000 की निश्चित नकद सहायता सीधे आधार लिंक बैंक खाते में',
      'हर 4 महीने में ₹2,000 की तीन किस्तें',
      'किसान क्रेडिट कार्ड (KCC) पर मात्र 4% ब्याज पर ₹3 लाख तक का आसान ऋण',
      'पीएम किसान मानधन पेंशन योजना से आसानी से जुड़ने का अवसर'
    ],
    documentsRequired: [
      'Aadhaar Card (Mandatory with e-KYC)',
      'Proof of land ownership / Khasra-Khatauni / Jamabandi / Land Revenue Records',
      'Active bank account passbook seeded with Aadhaar and NPCI mapping',
      'Active mobile number linked with Aadhaar'
    ],
    stepsToApply: [
      'Visit the official PM-KISAN portal (pmkisan.gov.in) and click "New Farmer Registration"',
      'Enter Aadhaar number and select Rural or Urban Farmer',
      'Enter state, district, sub-district, block, and village details',
      'Provide land record details (Survey/Khata number, Khasra number, land area in hectares)',
      'Complete Aadhaar OTP or Biometric e-KYC at nearest CSC center',
      'State Nodal Officer approves verification and installments start crediting via DBT'
    ],
    stepsToApplyHi: [
      'पीएम-किसान पोर्टल (pmkisan.gov.in) पर जाएं और न्यू फार्मर रजिस्ट्रेशन चुनें',
      'आधार नंबर दर्ज कर ग्रामीण या शहरी किसान चुनें',
      'राज्य, जिला और गांव का चयन करें',
      'खसरा-खतौनी और भूमि का विवरण भरें',
      'आधार ओटीपी द्वारा ई-केवाईसी (e-KYC) पूर्ण करें',
      'सत्यापन के बाद राशि सीधे बैंक खाते में आने लगेगी'
    ],
    tags: ['pm kisan', 'farmer', 'kheti', 'agriculture', 'dbt', 'cash grant', 'kisan credit card', 'landholder']
  },
  {
    id: 'sfurti',
    name: 'Scheme of Fund for Regeneration of Traditional Industries (SFURTI)',
    nameHi: 'पारंपरिक उद्योगों के पुनरुद्धार के लिए निधि योजना (स्फूर्ति)',
    shortDescription: 'Grant assistance up to ₹5 Crore per cluster to organize traditional artisans into competitive collective clusters.',
    shortDescriptionHi: 'पारंपरिक कारीगरों और दस्तकारों को क्लस्टर में संगठित कर ₹5 करोड़ तक का सरकारी अनुदान।',
    description: 'SFURTI is implemented by the Ministry of MSME to organize traditional artisans and rural craftspeople into collective clusters to make them competitive and ensure long-term sustainability. Provides financial assistance up to ₹2.5 Crore for Regular Clusters (up to 500 artisans) and up to ₹5 Crore for Major Clusters (more than 500 artisans). Funds Common Facility Centres (CFC), modern machinery, product development, packaging, and market linkages.',
    descriptionHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय द्वारा पारंपरिक कारीगरों (हथकरघा, हस्तशिल्प, बांस, मिट्टी, खादी) को क्लस्टरों में संगठित करने के लिए योजना। 500 कारीगरों के क्लस्टर हेतु ₹2.5 करोड़ और उससे बड़े क्लस्टर हेतु ₹5 करोड़ तक का 100% सरकारी अनुदान कॉमन फैसिलिटी सेंटर (CFC) और आधुनिक मशीनों के लिए दिया जाता है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME)',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
    category: 'Artisans & Crafts Clusters',
    maxAmount: '₹5,00,000,000 (₹5 Crore per cluster)',
    maxAmountNumeric: 50000000,
    interestRate: '100% Non-refundable Grant',
    subsidyRate: 'Up to 90% to 100% grant assistance for Hard and Soft interventions',
    applicationUrl: 'https://sfurti.msme.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'SC', 'ST', 'OBC', 'General', 'Minority'],
      businessTypes: ['artisan', 'craftsperson', 'handloom', 'bamboo_craft', 'pottery', 'agro_processing', 'honey_beekeeping', 'khadi', 'leather_craft'],
      annualIncomeLimit: null,
      location: ['Rural', 'Semi-Urban'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Establishment of state-of-the-art Common Facility Centres (CFC) with modern machinery',
      'Artisans receive modernized toolkits and advanced design training from premier institutes (NID, NIFT)',
      'Substantial increase in artisan family incomes by 50% to 150%',
      'Elimination of exploitative middlemen through direct collective marketing and e-commerce tie-ups',
      '100% government grant funding for cluster infrastructure, product design, and brand building'
    ],
    benefitsHi: [
      'आधुनिक मशीनों से युक्त कॉमन फैसिलिटी सेंटर (CFC) की स्थापना',
      'एनआईडी (NID) व निफ्ट (NIFT) के विशेषज्ञों द्वारा डिजाइन व कौशल प्रशिक्षण',
      'कारीगरों की मासिक आय में 50% से 150% तक की भारी वृद्धि',
      'बिचौलियों की समाप्ति और सीधे ई-कॉमर्स व राष्ट्रीय बाजार से जुड़ाव',
      'क्लस्टर इंफ्रास्ट्रक्चर के लिए 100% सरकारी अनुदान'
    ],
    documentsRequired: [
      'Artisans cluster member list with Aadhaar numbers and artisan cards',
      'Registration certificate of Implementing Agency (NGO / Section 8 / Cooperative / SHG Federation)',
      'Land ownership or 15-year registered lease deed for Common Facility Centre',
      'Diagnostic Study Report (DSR) and Detailed Project Report (DPR)',
      'Audited balance sheets of Implementing Agency for past 3 years'
    ],
    stepsToApply: [
      'Form an artisan collective, cooperative society, or partner with a registered NGO/institution',
      'Submit a proposal and Preliminary Project Assessment through the SFURTI portal (sfurti.msme.gov.in)',
      'Nodal Agency evaluates and approves Diagnostic Study Report (DSR)',
      'Prepare and submit Detailed Project Report (DPR) detailing CFC machinery and budget',
      'Ministry Scheme Steering Committee (SSC) grants final approval and disburses grant in tranches',
      'CFC is built and artisans collectively run production and high-value value-addition'
    ],
    stepsToApplyHi: [
      'कारीगरों का समूह/सहकारी समिति या पंजीकृत संस्था के साथ जुड़ें',
      'स्फूर्ति पोर्टल (sfurti.msme.gov.in) पर क्लस्टर प्रस्ताव जमा करें',
      'नोडल एजेंसी द्वारा प्राथमिक रिपोर्ट (DSR) को मंजूरी दी जाती है',
      'मशीनरी और इंफ्रास्ट्रक्चर की विस्तृत प्रोजेक्ट रिपोर्ट (DPR) प्रस्तुत करें',
      'मंत्रालय की समिति द्वारा ₹5 करोड़ तक का अनुदान स्वीकृत किया जाता है'
    ],
    tags: ['sfurti', 'artisan cluster', 'handicrafts', 'handloom', 'grant', 'cfc', 'rural craft', 'khadi']
  },
  {
    id: 'nrlm-shg',
    name: 'DAY-NRLM (Aajeevika) - SHG Bank Linkage Scheme',
    nameHi: 'दीनदयाल अंत्योदय योजना - राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM)',
    shortDescription: 'Collateral-free subsidized bank loans up to ₹10 Lakhs (and up to ₹20 Lakhs) at 7% interest (subvented to 4% for prompt repayment) for women Self-Help Groups.',
    shortDescriptionHi: 'महिला स्वयं सहायता समूहों (SHG) के लिए 7% (समय पर भुगतान पर मात्र 4%) ब्याज पर ₹10 लाख से ₹20 लाख तक संपार्श्विक-मुक्त ऋण।',
    description: 'Under DAY-NRLM (Ministry of Rural Development), poor rural women are organized into Self-Help Groups (SHGs) and federated. SHGs are provided Revolving Funds (₹20,000-₹30,000), Community Investment Funds (₹1.5 Lakhs), and collateral-free bank loans up to ₹10 Lakhs (RBI limit increased to ₹20 Lakhs). All women SHGs are eligible for interest subvention to bring down interest rates to 7% per annum; prompt repaying groups in 250 identified districts receive additional 3% subvention, bringing effective interest to only 4%.',
    descriptionHi: 'ग्रामीण विकास मंत्रालय द्वारा ग्रामीण गरीब महिलाओं को स्वयं सहायता समूहों (SHG) में संगठित कर आजीविका संवर्धन। बिना किसी गारंटी के ₹10 लाख से ₹20 लाख तक का बैंक ऋण मात्र 7% ब्याज पर मिलता है। समय पर ऋण चुकाने वाले समूहों को 3% अतिरिक्त छूट मिलने से प्रभावी ब्याज केवल 4% रह जाता है।',
    ministry: 'Ministry of Rural Development (MoRD)',
    ministryHi: 'ग्रामीण विकास मंत्रालय',
    category: 'Women & Rural SHGs',
    maxAmount: '₹10,00,000 to ₹20,00,000 per SHG',
    maxAmountNumeric: 2000000,
    interestRate: '7% p.a. (reduced to 4% for prompt repayment)',
    subsidyRate: 'Interest subvention down to 4% + Revolving Fund & Community Investment Fund grants',
    applicationUrl: 'https://nrlm.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['Female'],
      category: ['All', 'SC', 'ST', 'OBC', 'Minority', 'General'],
      businessTypes: ['dairy', 'goat_rearing', 'poultry', 'handicrafts', 'tailoring', 'organic_farming', 'food_canteen', 'retail_shop', 'candle_agarbatti', 'detergent_making'],
      annualIncomeLimit: 250000,
      location: ['Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Zero collateral or third-party guarantee needed for loans up to ₹20 Lakhs (as per revised RBI norms)',
      'Subsidized interest rate of only 7% per annum, further reduced to 4% upon timely repayment',
      'Revolving Fund (RF) of ₹20,000 - ₹30,000 provided directly to the SHG',
      'Community Investment Support Fund (CIF) up to ₹1.50 Lakh per SHG from Village Organization',
      'Lakhpati Didi initiative: Training and handholding to ensure each woman earns at least ₹1,00,000 annually'
    ],
    benefitsHi: [
      '₹20 लाख तक के ऋण पर कोई जमानत या बंधक नहीं (आरबीआई दिशा-निर्देश)',
      'समय पर भुगतान करने पर मात्र 4% की न्यूनतम ब्याज दर',
      'समूह को ₹20,000 से ₹30,000 का रिवाल्विंग फंड अनुदान',
      'ग्राम संगठन से ₹1.50 लाख तक का सामुदायिक निवेश कोष (CIF)',
      'लखपति दीदी पहल के तहत प्रति वर्ष न्यूनतम ₹1 लाख आय सुनिश्चित करने की ट्रेनिंग'
    ],
    documentsRequired: [
      'SHG Resolution book signed by all members requesting bank loan',
      'SHG Bank Account Passbook (active for at least 6 months following Panchasutra)',
      'Aadhaar and Voter cards of office bearers (President, Secretary, Treasurer)',
      'Inter-se Agreement and loan application form signed by members',
      'Grading / Credit appraisal sheet verified by Community Resource Person (CRP)'
    ],
    stepsToApply: [
      'Form or join a 10-15 member women SHG adhering to Panchasutra (regular meetings, savings, internal lending, timely repayment, book-keeping)',
      'Pass internal group resolution for credit linkage after 3-6 months of regular functioning',
      'Village Organization (VO) and Community Resource Person (CRP) assess group grading',
      'Submit loan dossier to the local bank branch / Bank Sakhi',
      'Bank branch sanctions credit limit (Drawing Power) linked to SHG savings or multiple thereof',
      'Amount disbursed into SHG bank account for distribution among members as micro-enterprise loans'
    ],
    stepsToApplyHi: [
      '10-15 महिलाओं का स्वयं सहायता समूह बनाएं और पंचसूत्र का पालन करें',
      'नियमित बैठक और बचत के बाद ऋण के लिए समूह में प्रस्ताव पारित करें',
      'बैंक सखी या सीआरपी (CRP) द्वारा समूह का ग्रेडिंग सत्यापन कराएं',
      'स्थानीय बैंक शाखा में ऋण दस्तावेज जमा करें',
      'बैंक ऋण सीमा स्वीकृत कर समूह के खाते में राशि जारी करेगा'
    ],
    tags: ['nrlm', 'aajeevika', 'shg', 'women self help group', 'lakhpati didi', 'rural women', '4 percent loan', 'dairy', 'poultry']
  },
  {
    id: 'nssh-scheme',
    name: 'National SC-ST Hub (NSSH) Schemes',
    nameHi: 'राष्ट्रीय अनुसूचित जाति एवं अनुसूचित जनजाति हब (NSSH)',
    shortDescription: 'Up to 25% special capital subsidy (up to ₹25 Lakhs) and 100% subsidy for tender fees & exhibition stalls for SC/ST MSME entrepreneurs.',
    shortDescriptionHi: 'एससी/एसटी उद्यमियों के लिए ₹25 लाख तक 25% विशेष पूंजीगत सब्सिडी, टेंडर फीस व राष्ट्रीय प्रदर्शनियों पर 100% छूट।',
    description: 'Set up by the Ministry of MSME to provide professional support to Scheduled Caste and Scheduled Tribe entrepreneurs to fulfill the mandate of 4% public procurement by Central Ministries, Departments, and CPSEs. Provides Special Credit Linked Capital Subsidy Scheme (SCLCSS) offering 25% capital subsidy up to ₹25 Lakh for procurement of plant and machinery, 100% reimbursement of single point registration fees, tender fee waivers, and international exhibition subsidies.',
    descriptionHi: 'केंद्रीय मंत्रालयों और सार्वजनिक उपक्रमों (PSUs) द्वारा 4% अनिवार्य खरीद के लक्ष्य को पूरा करने हेतु एससी/एसटी उद्यमियों के लिए एमएसएमई मंत्रालय की पहल। प्लांट व मशीनरी की खरीद पर 25% (अधिकतम ₹25 लाख) की सीधी सब्सिडी, टेंडर फीस में छूट और निःशुल्क प्रशिक्षण दिया जाता है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / NSIC',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय / एनएसआईसी',
    category: 'SC/ST Empowerment',
    maxAmount: '₹25,00,000 Capital Subsidy',
    maxAmountNumeric: 2500000,
    interestRate: 'Subsidized loan via SIDBI / Public Sector Banks',
    subsidyRate: '25% upfront capital subsidy under SCLCSS + 100% reimbursement of tender/testing fees',
    applicationUrl: 'https://www.scsthub.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['SC', 'ST'], // Strictly SC and ST
      businessTypes: ['manufacturing', 'services', 'technology', 'engineering', 'electrical', 'construction', 'catering', 'logistics', 'security_services'],
      annualIncomeLimit: null,
      location: ['Urban', 'Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Special Credit Linked Capital Subsidy (SCLCSS): 25% capital subsidy up to ₹25 Lakhs for plant & machinery',
      '100% reimbursement of registration fees under NSIC Single Point Registration Scheme (SPRS)',
      'Free vendor development programs and direct matching with CPSE / Government procurement tenders',
      '100% reimbursement of stall charges in domestic exhibitions and up to ₹3 Lakh in international exhibitions',
      'Full fee reimbursement for obtaining ISO, BIS, and ZED quality certifications'
    ],
    benefitsHi: [
      'नई मशीनरी की खरीद पर 25% (अधिकतम ₹25 लाख) की नकद पूंजीगत सब्सिडी',
      'एनएसआईसी (NSIC) सिंगल पॉइंट रजिस्ट्रेशन शुल्क की 100% प्रतिपूर्ति',
      'सरकारी टेंडरों में भाग लेने के लिए मुफ्त ई-टेंडरिंग व बयाना राशि (EMD) छूट',
      'घरेलू प्रदर्शनियों में 100% स्टॉल किराया प्रतिपूर्ति',
      'आईएसओ (ISO) और जेडईडी (ZED) गुणवत्ता प्रमाणन शुल्क की पूर्ण वापसी'
    ],
    documentsRequired: [
      'Caste Certificate verifying SC or ST status issued by authorized revenue authority',
      'Udyam Registration Certificate indicating SC/ST ownership (min 51% equity)',
      'Aadhaar and PAN Card of the promoter(s)',
      'Bank sanction letter and term loan appraisal report for plant/machinery',
      'Invoices, payment receipts, and installation certificate for acquired machinery'
    ],
    stepsToApply: [
      'Obtain Udyam Registration with SC/ST category properly declared',
      'Register on the National SC-ST Hub portal (scsthub.in) or visit nearest NSSH Facilitation Centre',
      'Sanction a term loan for plant and machinery from any Scheduled Commercial Bank',
      'Apply online on the SCLCSS portal for 25% capital subsidy within prescribed timeline',
      'Nodal agency verifies purchase invoices and credits subsidy directly into loan account',
      'Register for tender notifications on GeM (Government e-Marketplace) to supply directly to PSUs'
    ],
    stepsToApplyHi: [
      'उद्यम रजिस्ट्रेशन में अपनी एससी/एसटी जाति दर्ज कराएं',
      'एनसीएसएच पोर्टल (scsthub.in) पर पंजीकरण करें',
      'बैंक से मशीनरी के लिए टर्म लोन स्वीकृत कराएं',
      '25% पूंजीगत सब्सिडी के लिए पोर्टल पर ऑनलाइन आवेदन करें',
      'जांच के बाद सब्सिडी सीधे बैंक खाते में जमा होगी',
      'GeM पोर्टल पर सरकारी टेंडरों में 4% आरक्षित कोटे का लाभ उठाएं'
    ],
    tags: ['sc st hub', 'nssh', 'sc st subsidy', 'sclcss', 'tender waiver', 'dalit entrepreneur', 'tribal business']
  },
  {
    id: 'pm-matsya-sampada',
    name: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    nameHi: 'प्रधानमंत्री मत्स्य संपदा योजना (पीएमएमएसवाई)',
    shortDescription: 'Up to 60% government subsidy for Women, SC, and ST beneficiaries (40% for others) for aquaculture, fish farming, biofloc, and motorized boats.',
    shortDescriptionHi: 'मत्स्य पालन, बायोफ्लोक, फिंगरलिंग हैचरी और नावों के लिए महिलाओं, एससी और एसटी को 60% तथा अन्य को 40% तक सरकारी सब्सिडी।',
    description: 'PMMSY is a flagship scheme of the Department of Fisheries to bring about the "Blue Revolution" through sustainable and responsible development of the fisheries sector in India with an investment of ₹20,050 Crores. Subsidizes inland aquaculture, biofloc units, recirculating aquaculture systems (RAS), backyard ornamental fish units, fish feed mills, cold storage vans, and deep-sea fishing vessels. Government subsidy is 40% for General category and 60% for SC, ST, and Women beneficiaries.',
    descriptionHi: 'मत्स्य पालन क्षेत्र के विकास हेतु ₹20,050 करोड़ की प्रमुख केंद्रीय योजना। मछली पालन के तालाब निर्माण, बायोफ्लोक, सजावटी मछली, कोल्ड वैन और मत्स्य आहार मिल के लिए भारी अनुदान। सामान्य वर्ग के लिए 40% और महिलाओं, अनुसूचित जाति (SC) व अनुसूचित जनजाति (ST) के लिए 60% सरकारी सब्सिडी दी जाती है।',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    ministryHi: 'मत्स्य पालन, पशुपालन और डेयरी मंत्रालय',
    category: 'Fisheries & Aquaculture',
    maxAmount: '₹60,00,000 (Subsidy 40% to 60% of project cost)',
    maxAmountNumeric: 6000000,
    interestRate: 'Subsidized bank loan with up to 60% capital grant',
    subsidyRate: '60% for SC/ST/Women beneficiaries; 40% for General beneficiaries',
    applicationUrl: 'https://pmmsy.dof.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'SC', 'ST', 'OBC', 'General', 'Minority'],
      businessTypes: ['fisheries', 'aquaculture', 'fish_farming', 'biofloc', 'fish_feed', 'cold_storage_transport', 'fish_retail', 'ornamental_fish'],
      annualIncomeLimit: null,
      location: ['Rural', 'Semi-Urban', 'Coastal'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Huge 60% capital subsidy for Women, Scheduled Caste, and Scheduled Tribe beneficiaries',
      '40% capital subsidy for General/OBC male entrepreneurs',
      'Supports high-yield modern technologies like Biofloc ponds, RAS (Recirculating Aquaculture), and Cage Culture',
      'Funding for insulated two-wheelers with ice-boxes, three-wheelers, and refrigerated transport vans',
      'Free technical training by State Fisheries Department and Krishi Vigyan Kendras (KVK)'
    ],
    benefitsHi: [
      'महिला, एससी और एसटी लाभार्थियों के लिए 60% की भारी पूंजीगत सब्सिडी',
      'सामान्य और ओबीसी पुरुष उद्यमियों के लिए 40% सब्सिडी',
      'बायोफ्लोक और आधुनिक मछली पालन तकनीकों पर सरकारी सहायता',
      'मछली बिक्री के लिए आइस-बॉक्स वाली बाइक, ऑटो और वैन पर अनुदान',
      'कृषि विज्ञान केंद्र (KVK) द्वारा मुफ्त व्यावहारिक प्रशिक्षण'
    ],
    documentsRequired: [
      'Aadhaar Card and Passport size photo',
      'Land ownership documents (Pattadhar) or registered lease deed for minimum 7-10 years for pond area',
      'Caste Certificate (for SC/ST applicants claiming 60% subsidy)',
      'Detailed Project Report (DPR) detailing pond dimension, civil construction, seed and feed budget',
      'Bank Account Passbook / Cancelled Cheque',
      'Self-declaration of not having availed duplicate subsidy from other government schemes'
    ],
    stepsToApply: [
      'Visit the PMMSY portal (pmmsy.dof.gov.in) or visit District Fisheries Development Officer (DFDO)',
      'Select scheme activity (e.g., Construction of New Ponds, Biofloc unit, or Fish Kiosk)',
      'Prepare project estimate with technical specifications approved by local fisheries officer',
      'Submit application online along with land documents and caste certificate',
      'District Level Committee (DLC) inspects land site and sanctions project',
      'Subsidy is released in stages directly into bank account linked via DBT as construction progresses'
    ],
    stepsToApplyHi: [
      'पीएमएमएसवाई पोर्टल (pmmsy.dof.gov.in) पर जाएं या जिला मत्स्य अधिकारी से मिलें',
      'मत्स्य गतिविधि (जैसे नया तालाब, बायोफ्लोक या फिश शॉप) का चयन करें',
      'जमीन के कागज और प्रोजेक्ट रिपोर्ट तैयार करें',
      'पोर्टल पर ऑनलाइन फॉर्म भरकर जरूरी दस्तावेज अपलोड करें',
      'जिला समिति द्वारा भूमि निरीक्षण के बाद प्रोजेक्ट पास किया जाएगा',
      'कार्य प्रगति के अनुसार 60% तक सब्सिडी सीधे बैंक खाते में आएगी'
    ],
    tags: ['pmmsy', 'fish farming', 'aquaculture', 'biofloc', 'fisheries', '60 percent subsidy', 'blue revolution', 'pond']
  },
  {
    id: 'startup-india-seed-fund',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    nameHi: 'स्टार्टअप इंडिया सीड फंड योजना (एसआईएसएफएस)',
    shortDescription: 'Financial assistance up to ₹20 Lakhs as grant for Proof of Concept / prototype, and up to ₹50 Lakhs for market entry via debt/convertible debentures.',
    shortDescriptionHi: 'प्रूफ ऑफ कॉन्सेप्ट/प्रोटोटाइप के लिए ₹20 लाख तक का अनुदान और बाजार प्रवेश के लिए ₹50 लाख तक का रियायती ऋण/इक्विटी।',
    description: 'SISFS provides financial assistance to early-stage DPIIT-recognized startups for proof of concept, prototype development, product trials, market entry, and commercialization through approved incubators across India. Offers grants of up to ₹20 Lakhs for validation of proof of concept or prototype development, and up to ₹50 Lakhs of investment for market entry, commercialization, or scaling up through convertible debentures or debt-linked instruments.',
    descriptionHi: 'डीपीआईआईटी (DPIIT) द्वारा मान्यता प्राप्त शुरुआती चरण के इनोवेटिव स्टार्टअप्स को सीड फंडिंग प्रदान करने की योजना। इसमें प्रोटोटाइप और ट्रायल के लिए ₹20 लाख तक का 100% सरकारी अनुदान और बाजार में विस्तार के लिए ₹50 लाख तक का रियायती ऋण या इक्विटी सहायता मिलती है।',
    ministry: 'Ministry of Commerce and Industry / DPIIT',
    ministryHi: 'वाणिज्य और उद्योग मंत्रालय / डीपीआईआईटी',
    category: 'Innovation & Startups',
    maxAmount: '₹20,00,000 (Grant) / ₹50,00,000 (Debt/Convertible)',
    maxAmountNumeric: 5000000,
    interestRate: 'Grant (0% interest) or Concessional Debt (<= repo rate)',
    subsidyRate: 'Up to ₹20 Lakhs 100% Non-dilutive Grant for Prototype',
    applicationUrl: 'https://seedfund.startupindia.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['technology', 'agritech', 'foodtech', 'healthtech', 'clean_energy', 'social_impact', 'hardware', 'ai_software', 'rural_innovation'],
      annualIncomeLimit: null,
      location: ['Urban', 'Rural'],
      existingBusiness: 'new_only', // Incorporated within last 2 years
      education: 'any'
    },
    benefits: [
      'Up to ₹20 Lakhs as 100% non-dilutive grant for proof of concept and prototype development',
      'Up to ₹50 Lakhs as low-interest debt or convertible debentures for market launch',
      'Direct incubation support, lab access, and mentorship from premier academic incubators (IITs, IIMs, NITs)',
      'Income Tax exemption under Section 80-IAC for 3 consecutive years for DPIIT startups',
      'Fast-track patent and trademark examination with up to 80% fee rebate'
    ],
    benefitsHi: [
      'प्रोटोटाइप और ट्रायल के लिए ₹20 लाख तक का बिना इक्विटी दिए सीधा अनुदान',
      'बाजार में उत्पाद लॉन्च के लिए ₹50 लाख तक का आसान ऋण',
      'आईआईटी (IIT) और एनआईटी (NIT) इनक्यूबेटरों में मुफ्त लैब और मेंटरशिप',
      'इनकम टैक्स में 3 वर्षों की पूर्ण छूट (धारा 80-IAC)',
      'पेटेंट और ट्रेडमार्क फाइलिंग शुल्क में 80% तक की छूट'
    ],
    documentsRequired: [
      'DPIIT Recognition Certificate (free and instant on startupindia.gov.in)',
      'Certificate of Incorporation / MCA Registration (Pvt Ltd or LLP incorporated < 2 years ago)',
      'Pitch deck and Prototype demonstration video / photos',
      'Business plan showing innovation, scalability, and social/commercial viability',
      'Promoter Aadhaar and PAN cards'
    ],
    stepsToApply: [
      'Incorporate entity as Private Limited or LLP and obtain free DPIIT Recognition Certificate',
      'Log on to Seed Fund Portal (seedfund.startupindia.gov.in)',
      'Fill startup profile and upload pitch deck highlighting problem statement and innovative solution',
      'Select up to 3 approved incubators in order of preference',
      'Incubator Seed Management Committee evaluates presentation and calls for virtual/in-person pitch',
      'Selected startups sign grant agreement and receive funds in milestone-based disbursements'
    ],
    stepsToApplyHi: [
      'कंपनी पंजीकृत करें और स्टार्टअप इंडिया पोर्टल से डीपीआईआईटी मान्यता प्राप्त करें',
      'सीड फंड पोर्टल (seedfund.startupindia.gov.in) पर लॉगिन करें',
      'अपना पिच डेक और आइडिया का विवरण भरें',
      'अपनी पसंद के 3 इनक्यूबेटर चुनें',
      'इनक्यूबेटर समिति के समक्ष ऑनलाइन प्रस्तुति दें',
      'चयन होने पर प्रोटोटाइप बनाने हेतु ₹20 लाख का अनुदान बैंक खाते में आएगा'
    ],
    tags: ['startup india', 'seed fund', 'sisfs', 'grant', 'prototype', 'dpiit', 'tech startup', 'agritech']
  },
  {
    id: 'cgtmse',
    name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    nameHi: 'सूक्ष्म और लघु उद्यम क्रेडिट गारंटी फंड ट्रस्ट (सीजीटीएमएसई)',
    shortDescription: 'Collateral-free bank loans up to ₹5 Crore for MSMEs with up to 85% credit guarantee coverage provided by Government.',
    shortDescriptionHi: 'एमएसएमई के लिए ₹5 करोड़ तक बिना किसी गारंटी के बैंक ऋण, जिसमें 85% तक सरकारी क्रेडिट गारंटी शामिल है।',
    description: 'CGTMSE was set up by Ministry of MSME and SIDBI to make collateral-free credit available to micro and small enterprises. Guarantees credit facilities (both term loan and working capital) up to ₹5 Crore per eligible borrower without requiring any third-party guarantee or tangible collateral. Guarantee coverage is up to 85% for loans up to ₹5 Lakh to micro-enterprises, women entrepreneurs, and units in North East Region, and 75% for other categories.',
    descriptionHi: 'सिडबी और एमएसएमई मंत्रालय द्वारा संचालित योजना जो उद्यमियों को बिना जमीन, मकान या सोना गिरवी रखे ₹5 करोड़ तक का बैंक ऋण दिलाती है। महिला उद्यमियों, एससी/एसटी और सूक्ष्म उद्यमियों के लिए सरकार बैंक को 85% तक गारंटी देती है, जिससे बैंक आसानी से लोन मंजूर करते हैं।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / SIDBI',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय / सिडबी',
    category: 'MSME Collateral-Free Credit',
    maxAmount: '₹5,00,00,000 (₹5 Crore)',
    maxAmountNumeric: 50000000,
    interestRate: 'Competitive bank interest rates (capped under CGTMSE guidelines)',
    subsidyRate: '75% to 85% default guarantee coverage; annual guarantee fee subsidized to 0.37%',
    applicationUrl: 'https://www.cgtmse.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['manufacturing', 'services', 'retail_trade', 'wholesale_trade', 'educational_institutions', 'healthcare', 'it_services'],
      annualIncomeLimit: null,
      location: ['Urban', 'Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Completely collateral-free loans up to ₹5 Crore: No real estate mortgage or third-party guarantee needed',
      '85% guarantee coverage for women-led enterprises and SC/ST owned units',
      'Covers both term loans (for factory/machinery) and cash credit/overdraft (working capital)',
      'Reduced annual guarantee fee of only 0.37% for loans up to ₹1 Crore for micro enterprises',
      'Supported across all Scheduled Commercial Banks, RRBs, and leading Small Finance Banks'
    ],
    benefitsHi: [
      '₹5 करोड़ तक बिना संपत्ति बंधक रखे लोन (कोई जमीन या मकान गिरवी नहीं)',
      'महिला और एससी/एसटी उद्यमियों के लिए 85% तक सरकारी गारंटी',
      'फैक्ट्री/मशीन खरीदने और रोजमर्रा के खर्च दोनों के लिए उपलब्ध',
      'मात्र 0.37% की न्यूनतम वार्षिक गारंटी फीस',
      'सभी सरकारी व निजी बैंकों द्वारा मान्य'
    ],
    documentsRequired: [
      'Udyam Registration Certificate',
      'KYC documents of borrower (Aadhaar, PAN Card)',
      'Detailed Project Report (DPR) or CMA data for working capital',
      'Audited / Proforma financial statements for past 2 years (for existing units)',
      'GST returns for last 12 months (if applicable)',
      'Bank statement for last 12 months'
    ],
    stepsToApply: [
      'Prepare business plan with DPR / CMA data showing viable projected cash flows',
      'Approach any Member Lending Institution (Public/Private Bank, SFB, or RRB)',
      'Apply for MSME loan specifically requesting coverage under CGTMSE collateral-free scheme',
      'Bank evaluates project viability and internal credit risk rating',
      'Upon loan sanction, bank enters details directly into CGTMSE portal to lock guarantee coverage',
      'Borrower pays nominal guarantee fee and funds are disbursed without requiring physical collateral'
    ],
    stepsToApplyHi: [
      'अपनी परियोजना रिपोर्ट (DPR) और वित्तीय आंकड़े तैयार करें',
      'किसी भी बैंक शाखा में जाएं और सीजीटीएमएसई के तहत बिना गारंटी लोन का आवेदन करें',
      'उद्यम प्रमाण पत्र और जीएसटी/केवाईसी जमा करें',
      'बैंक आपके प्रोजेक्ट की व्यावहारिकता देखकर लोन पास करेगा',
      'बैंक सीधे सीजीटीएमएसई पोर्टल पर गारंटी दर्ज करेगा',
      'बिना कोई संपत्ति गिरवी रखे लोन राशि खाते में जारी होगी'
    ],
    tags: ['cgtmse', 'collateral free', 'sidbi', 'msme loan', '5 crore loan', 'no mortgage', 'credit guarantee']
  },
  {
    id: 'mahila-coir-yojana',
    name: 'Mahila Coir Yojana (MCY)',
    nameHi: 'महिला कॉयर योजना (एमसीवाई)',
    shortDescription: '75% government subsidy on motorized ratts / spinning machines for rural women artisans in the coconut coir producing regions.',
    shortDescriptionHi: 'नारियल रेशा (कॉयर) उत्पादक क्षेत्रों की ग्रामीण महिला कारीगरों के लिए मोटराइज्ड चरखों/मशीनों पर 75% सरकारी सब्सिडी।',
    description: 'Mahila Coir Yojana is a women-oriented self-employment scheme of the Coir Board (Ministry of MSME). Aims to empower rural women in coconut producing states by providing motorized traditional ratts and motorized yarn spinning machines at a 75% government subsidy. Also includes two months of comprehensive technical training with a monthly stipend to build high-grade spun coir fiber manufacturing capabilities.',
    descriptionHi: 'कॉयर बोर्ड (एमएसएमई मंत्रालय) द्वारा नारियल रेशा उद्योग में ग्रामीण महिलाओं के लिए योजना। इसमें आधुनिक मोटर चालित चरखे और कताई मशीनें खरीदने हेतु 75% सरकारी अनुदान दिया जाता है। साथ ही 2 माह का निःशुल्क तकनीकी प्रशिक्षण वजीफे के साथ दिया जाता है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / Coir Board',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय / कॉयर बोर्ड',
    category: 'Women & Rural Crafts',
    maxAmount: '₹75,000 (75% equipment subsidy)',
    maxAmountNumeric: 75000,
    interestRate: '75% Non-refundable Capital Subsidy',
    subsidyRate: '75% cost of motorized ratts/machinery paid by Govt; 25% beneficiary share',
    applicationUrl: 'https://coirboard.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 60,
      gender: ['Female'],
      category: ['All', 'SC', 'ST', 'OBC', 'General', 'Minority'],
      businessTypes: ['coir', 'artisan', 'handicrafts', 'rope_making', 'mat_weaving', 'agro_waste', 'fiber_spinning'],
      annualIncomeLimit: 300000,
      location: ['Rural', 'Semi-Urban'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      '75% government subsidy on motorized traditional ratts / motorized spinning equipment',
      'Beneficiary pays only 25% of equipment cost (can be obtained through MUDRA / bank loan)',
      'Two months intensive training program in yarn spinning with stipend of ₹3,000/month',
      'Drastically reduces physical fatigue and triples daily yarn output compared to manual ratts',
      'Guaranteed buyback linkages through Coir Board registered cooperatives and exporters'
    ],
    benefitsHi: [
      'मोटर चालित कॉयर चरखे और कताई मशीन पर 75% की भारी छूट',
      'महिला लाभार्थी को मात्र 25% राशि देनी होती है (जो मुद्रा लोन से भी संभव है)',
      '₹3,000 मासिक वजीफे के साथ 2 महीने की मुफ्त ट्रेनिंग',
      'शारीरिक श्रम में कमी और उत्पादन क्षमता में 3 गुना वृद्धि',
      'तैयार माल को कॉयर बोर्ड के माध्यम से सीधे बेचने की व्यवस्था'
    ],
    documentsRequired: [
      'Aadhaar Card and Passport photo of woman applicant',
      'Residence proof / Ration Card from coconut producing district',
      'Bank Account passbook copy',
      'Training completion certificate from Coir Board Training Centre',
      'Caste certificate (for SC/ST beneficiaries)'
    ],
    stepsToApply: [
      'Enroll in the 2-month training program at the nearest Coir Board Sub-centre / Field Training Unit',
      'Complete training in motorized spinning and obtain passing certificate with monthly stipend',
      'Fill application form for Mahila Coir Yojana equipment subsidy',
      'Deposit 25% beneficiary margin money or present bank sanction letter',
      'Coir Board delivers inspected motorized spinning machine directly to the beneficiary residence',
      'Commence commercial production with support from local Coir Cooperative Society'
    ],
    stepsToApplyHi: [
      'नजदीकी कॉयर बोर्ड केंद्र में 2 महीने के प्रशिक्षण कार्यक्रम में दाखिला लें',
      'वजीफे के साथ प्रशिक्षण पूरा कर प्रमाण पत्र प्राप्त करें',
      'मशीन सब्सिडी के लिए आवेदन पत्र भरें',
      '25% अंशदान जमा करें या बैंक से लोन लें',
      'कॉयर बोर्ड सीधे आपके घर पर आधुनिक मशीन डिलीवर करेगा',
      'सहकारी समिति के माध्यम से धागा बेचकर अच्छी कमाई शुरू करें'
    ],
    tags: ['mahila coir', 'coir board', 'women subsidy', 'spinning ratt', 'rural woman', '75 percent subsidy', 'coconut fiber']
  },
  {
    id: 'ddu-gky',
    name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
    nameHi: 'दीनदयाल उपाध्याय ग्रामीण कौशल्या योजना (डीडीयू-जीकेवाई)',
    shortDescription: 'Free market-led skill training, placement support, and post-placement micro-enterprise support for poor rural youth.',
    shortDescriptionHi: 'गरीब ग्रामीण युवाओं के लिए निःशुल्क बाजार-उन्मुख कौशल प्रशिक्षण, नौकरी और स्वरोजगार सहायता।',
    description: 'DDU-GKY is the demand-driven placement-linked skill initiative of the Ministry of Rural Development for rural poor youth. It funds training partners to provide 100% free residential or non-residential skill training in high-demand trades, along with food, uniform, course books, digital tablets, and post-placement allowances. Trainees transitioning into self-employment receive dedicated entrepreneurship facilitation and seed linkage.',
    descriptionHi: 'ग्रामीण विकास मंत्रालय का प्रमुख कौशल कार्यक्रम जो गरीब ग्रामीण युवाओं को निःशुल्क भोजन, वर्दी और रहने की सुविधा के साथ उच्च-स्तरीय कौशल प्रशिक्षण प्रदान करता है। प्रशिक्षण के बाद नौकरी लगवाने तथा अपना काम शुरू करने के लिए मुद्रा व आजीविका लोन से जोड़ा जाता है।',
    ministry: 'Ministry of Rural Development (MoRD)',
    ministryHi: 'ग्रामीण विकास मंत्रालय',
    category: 'Skill & Rural Youth',
    maxAmount: '100% Free Training (~₹40,000 value per candidate) + Stipend',
    maxAmountNumeric: 40000,
    interestRate: '100% Free Government Funded Program',
    subsidyRate: '100% training, lodging, and boarding funded by Central/State Govt',
    applicationUrl: 'https://ddugky.gov.in/',
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 35, // Relaxed up to 45 for SC/ST/Women/PWD
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'SC', 'ST', 'OBC', 'Minority', 'General'],
      businessTypes: ['retail', 'hospitality', 'electrical', 'apparel_tailoring', 'healthcare_assistant', 'automotive_repair', 'solar_installation', 'it_helpdesk'],
      annualIncomeLimit: 250000, // Rural poor families / BPL / SECC
      location: ['Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      '100% free residential training with quality lodging, food, and uniform provided',
      'Sector Skill Council (SSC) certified assessment and globally recognized qualification',
      'Guaranteed placement assistance for at least 70% of trained candidates',
      'Post-placement financial support of ₹1,000 to ₹3,000 per month for up to 6 months',
      'Special facilitation for candidates opting for micro-enterprise entrepreneurship'
    ],
    benefitsHi: [
      'मुफ्त भोजन, रहने की व्यवस्था और वर्दी के साथ 100% निःशुल्क प्रशिक्षण',
      'राष्ट्रीय स्तर पर मान्यता प्राप्त स्किल सर्टिफिकेट',
      'कम से कम 70% प्रशिक्षित युवाओं को नौकरी की गारंटी',
      'नौकरी लगने के बाद 6 महीने तक ₹1,000 से ₹3,000 मासिक सहायता भत्ता',
      'स्वरोजगार शुरू करने हेतु विशेष मार्गदर्शन और आसान ऋण'
    ],
    documentsRequired: [
      'Aadhaar Card of candidate',
      'BPL Card / MGNREGA Job Card (minimum 15 days work of family) / SECC deprivation status',
      'Age proof / Birth certificate / School leaving certificate',
      'School / College Marksheet (5th, 8th, 10th or 12th as applicable to trade)',
      'Bank Account Passbook copy'
    ],
    stepsToApply: [
      'Visit nearest DDU-GKY Training Centre or register online on ddugky.gov.in',
      'Mobilizers verify rural BPL / SECC eligibility criteria',
      'Attend counseling session to choose trade (e.g. Electrical, Apparel, Retail, Healthcare)',
      'Join 3-to-9 month residential training batch with hands-on practical curriculum',
      'Clear Sector Skill Council assessment and receive certified diploma',
      'Get placed with reputed employer or obtain assistance for micro-enterprise setup'
    ],
    stepsToApplyHi: [
      'नजदीकी डीडीयू-जीकेवाई ट्रेनिंग सेंटर पर जाएं या ddugky.gov.in पर नाम दर्ज कराएं',
      'काउंसलिंग में अपनी रुचि का व्यवसाय (इलेक्ट्रीशियन, सिलाई, रिटेल आदि) चुनें',
      '3 से 9 महीने का आवासीय कोर्स पूरा करें',
      'परीक्षा पास कर सरकारी प्रमाण पत्र पाएं',
      'नौकरी पाएं या खुद की दुकान/काम शुरू करने हेतु लोन सहायता लें'
    ],
    tags: ['ddugky', 'rural youth', 'skill training', 'placement', 'free boarding', 'vocational training', 'rural employment']
  },
  {
    id: 'dairy-ahidf',
    name: 'Animal Husbandry Infrastructure Development Fund (AHIDF)',
    nameHi: 'पशुपालन अवसंरचना विकास निधि (एएचआईडीएफ)',
    shortDescription: '3% interest subvention and 90% bank loan for dairy processing, value addition, meat processing, and animal feed plants.',
    shortDescriptionHi: 'डेयरी प्रसंस्करण, मूल्य संवर्धन, चारा संयंत्रों और पशुपालन अवसंरचना के लिए 3% ब्याज छूट और 90% तक बैंक ऋण।',
    description: 'Under the Atmanirbhar Bharat package, the ₹15,000 Crore AHIDF scheme incentivizes investments by individual entrepreneurs, private companies, MSMEs, Farmer Producer Organizations (FPOs), and Section 8 companies in dairy processing and value-addition infrastructure, meat processing, animal feed plants, and breed multiplication farms. Beneficiaries receive a 3% interest subvention for 8 years and credit guarantee coverage up to 25% of loan from NABARD.',
    descriptionHi: 'पशुपालन और डेयरी विभाग द्वारा डेयरी प्रसंस्करण (दूध, पनीर, घी, मक्खन), पशु आहार संयंत्र और ब्रीड सुधार फार्म लगाने हेतु योजना। इसमें 90% तक बैंक लोन उपलब्ध कराया जाता है और सरकार द्वारा 8 वर्षों तक 3% ब्याज छूट (सबवेंशन) दी जाती है। नाबार्ड द्वारा 25% तक क्रेडिट गारंटी भी मिलती है।',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    ministryHi: 'मत्स्य पालन, पशुपालन और डेयरी मंत्रालय',
    category: 'Dairy & Livestock',
    maxAmount: 'Up to 90% of project cost (No upper limit)',
    maxAmountNumeric: 10000000,
    interestRate: 'Scheduled Bank lending rate minus 3% Interest Subvention',
    subsidyRate: '3% Interest Subvention for up to 8 years + 25% Credit Guarantee',
    applicationUrl: 'https://ahidf.udyamimitra.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['dairy', 'milk_processing', 'cattle_feed', 'meat_processing', 'veterinary_clinic', 'poultry_farm', 'fpo'],
      annualIncomeLimit: null,
      location: ['Rural', 'Peri-Urban'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Up to 90% loan component financed through Scheduled Banks and NABARD',
      'Promoter contribution is only 10% for MSMEs and 15% for medium enterprises',
      '3% interest subvention credited on prompt repayment for a period of up to 8 years',
      '2 years moratorium period on principal loan repayment',
      'Credit guarantee coverage up to 25% through Credit Guarantee Fund managed by NABARD'
    ],
    benefitsHi: [
      'परियोजना लागत का 90% तक बैंक लोन',
      'उद्यमी का अंशदान मात्र 10% (एमएसएमई के लिए)',
      '8 वर्षों तक 3% की भारी ब्याज छूट (सबवेंशन)',
      'शुरुआती 2 वर्षों तक मूलधन चुकाने से छूट (मोरेटोरियम)',
      'नाबार्ड द्वारा 25% तक की क्रेडिट गारंटी'
    ],
    documentsRequired: [
      'Detailed Project Report (DPR) highlighting technical parameters and financial viability',
      'Udyam Registration Certificate',
      'Land ownership or long-term lease deed for dairy processing unit',
      'Bank statement for last 12 months',
      'KYC documents of promoters (Aadhaar, PAN, Passport photo)',
      'FSSAI / Pollution Control Board consent to establish (if applicable)'
    ],
    stepsToApply: [
      'Prepare technical DPR for dairy processing plant or animal feed factory',
      'Log in to AHIDF portal via UdyamiMitra (ahidf.udyamimitra.in)',
      'Fill borrower details and upload DPR along with required machinery quotations',
      'Select preferred commercial lending bank from the integrated list',
      'Ministry of Animal Husbandry conducts desk appraisal and forwards to bank',
      'Bank sanctions loan with 3% interest subvention and 2-year moratorium'
    ],
    stepsToApplyHi: [
      'डेयरी या चारा संयंत्र की विस्तृत प्रोजेक्ट रिपोर्ट (DPR) बनाएं',
      'उद्यमीमित्र पोर्टल (ahidf.udyamimitra.in) पर आवेदन करें',
      'प्रोजेक्ट रिपोर्ट व मशीनरी के कोटेशन अपलोड करें',
      'ऋण देने वाले बैंक का चयन करें',
      'मंत्रालय द्वारा अनुमोदन के बाद बैंक लोन मंजूर करेगा',
      '3% ब्याज छूट का लाभ सीधे आपके ऋण खाते में मिलेगा'
    ],
    tags: ['ahidf', 'dairy', 'milk processing', 'cattle feed', 'livestock', 'interest subvention', 'nabard', 'ghee']
  },
  {
    id: 'udyam-sakhi',
    name: 'Udyam Sakhi Assistance for Women Entrepreneurs',
    nameHi: 'उद्यम सखी महिला उद्यमिता सहायता योजना',
    shortDescription: 'Dedicated business mentoring, business plan incubation, market linkages, and credit assistance for women micro-entrepreneurs.',
    shortDescriptionHi: 'महिला सूक्ष्म उद्यमियों के लिए समर्पित व्यावसायिक मेंटरशिप, इनक्यूबेशन, बाजार से जुड़ाव और ऋण सहायता।',
    description: 'Udyam Sakhi is an initiative launched by the Ministry of MSME to encourage, guide, and assist women entrepreneurs in creating and growing micro-enterprises. It provides free business model validation, technical project profiles, financial modeling, low-cost training, marketing avenues, and direct bridge connections to schemes like MUDRA, Stand-Up India, and PMEGP.',
    descriptionHi: 'एमएसएमई मंत्रालय द्वारा महिलाओं को सशक्त उद्यमी बनाने के लिए एक समग्र मंच। इसमें महिलाओं को व्यापार योजना बनाने, वित्तीय सहायता प्राप्त करने, मुद्रा और स्टैंड-अप इंडिया जैसी योजनाओं से जुड़ने, और सरकारी ई-मार्केटप्लेस (GeM) पर उत्पाद बेचने का पूरा मार्गदर्शन निःशुल्क मिलता है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME)',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
    category: 'Women Entrepreneurs',
    maxAmount: 'Linkage to loans up to ₹1 Crore + Free Incubation Services',
    maxAmountNumeric: 10000000,
    interestRate: 'Scheme specific (concessional rates for women)',
    subsidyRate: '100% free mentoring and business facilitation + convergence subsidies',
    applicationUrl: 'https://udyamsakhi.msme.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['Female'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['boutique_tailoring', 'beauty_wellness', 'food_catering', 'handicrafts', 'retail', 'services', 'coaching', 'soap_cosmetics', 'packaging'],
      annualIncomeLimit: null,
      location: ['Urban', 'Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Comprehensive step-by-step guidance on how to start a business from scratch',
      'Access to over 100+ ready-to-use business project profiles with financial templates',
      'Direct convergence with MUDRA, Stand-Up India, and PMEGP for seamless loan approval',
      'Assistance in onboarding products to Government e-Marketplace (GeM) and retail e-commerce',
      'Networking with successful women business leaders and MSME mentors'
    ],
    benefitsHi: [
      'शुरुआत से व्यवसाय स्थापित करने के लिए चरण-दर-चरण व्यक्तिगत मार्गदर्शन',
      '100 से अधिक पूर्व-निर्मित बिजनेस प्रोजेक्ट रिपोर्ट और वित्तीय मॉडल की मुफ्त पहुंच',
      'मुद्रा, स्टैंड-अप इंडिया और पीएमईजीपी योजनाओं से आसान ऋण जुड़ाव',
      'GeM पोर्टल और अमेजन/फ्लिपकार्ट पर सामान बेचने में मदद',
      'सफल महिला उद्यमियों और एमएसएमई विशेषज्ञों से मेंटरशिप'
    ],
    documentsRequired: [
      'Aadhaar Card and PAN Card of woman entrepreneur',
      'Udyam Registration Certificate (or portal assists in generating it free)',
      'Bank Account details',
      'Brief description of business idea or existing business photographs'
    ],
    stepsToApply: [
      'Register on the official portal (udyamsakhi.msme.gov.in)',
      'Create profile and select business sector of interest',
      'Download customized project reports and business templates',
      'Request virtual one-on-one mentoring session with MSME Development Institute advisor',
      'Apply for financial credit linkage directly mapped to nearest participating bank branch'
    ],
    stepsToApplyHi: [
      'उद्यम सखी पोर्टल (udyamsakhi.msme.gov.in) पर रजिस्टर करें',
      'अपनी रुचि का व्यवसाय क्षेत्र चुनें',
      'मुफ्त प्रोजेक्ट रिपोर्ट डाउनलोड करें',
      'एमएसएमई विशेषज्ञों के साथ मेंटरशिप सत्र में भाग लें',
      'अपने नजदीकी बैंक से ऋण हेतु आवेदन करें'
    ],
    tags: ['udyam sakhi', 'women business', 'female entrepreneur', 'mentorship', 'free dpr', 'boutique', 'beauty parlour']
  },
  {
    id: 'khadi-gramodyog',
    name: 'Khadi Gramodyog Vikas Yojana (KGVY)',
    nameHi: 'खादी ग्रामोद्योग विकास योजना (केजीवीवाई)',
    shortDescription: 'Free solar charkhas, modern looms, bee-boxes, pottery wheels, and financial support for village artisans and spinners.',
    shortDescriptionHi: 'ग्रामीण कारीगरों और कतवारों के लिए मुफ्त सोलर चरखे, आधुनिक करघे, बी-बॉक्स (मधुमक्खी पालन) और बिजली चालित कुम्हार चाक।',
    description: 'Under KVIC, the Khadi Gramodyog Vikas Yojana encompasses initiatives such as Honey Mission (free bee boxes and training), Kumbhar Sashaktikaran (electric pottery wheels), Leather Artisans Support, and Khadi Vikas. Focuses on introducing modern, motorized, and solar-operated equipment to drastically enhance the productivity and daily earnings of traditional village spinners, weavers, and rural artisans.',
    descriptionHi: 'केवीआईसी (KVIC) द्वारा ग्रामीण कारीगरों के कल्याण हेतु योजना। इसमें हनी मिशन के तहत 10 मधुमक्खी बॉक्स मुफ्त दिए जाते हैं, कुम्हार सशक्तिकरण में आधुनिक इलेक्ट्रिक चाक और चर्मकारों को आधुनिक टूलकिट व मशीनें प्रदान की जाती हैं। साथ ही सोलर चरखों से महिलाओं की कताई आय दोगुनी की जाती है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / KVIC',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय / केवीआईसी',
    category: 'Village Industries & Khadi',
    maxAmount: '₹1,00,000 Equipment Grant + Working Capital assistance',
    maxAmountNumeric: 100000,
    interestRate: '100% Free Equipment Grant / Subsidized Raw Material',
    subsidyRate: '100% free toolkits (Honey Mission, Kumbhar Sashaktikaran) + raw material bank subsidy',
    applicationUrl: 'https://www.kviconline.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'OBC', 'SC', 'ST', 'General', 'Minority'],
      businessTypes: ['khadi_spinner', 'weaver', 'potter', 'beekeeping', 'honey_production', 'leather_craft', 'bamboo_art', 'handmade_paper', 'village_soap'],
      annualIncomeLimit: 300000,
      location: ['Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      '100% free modern equipment distribution (Electric pottery wheels, Solar Charkhas, Bee-boxes)',
      '5-day comprehensive hands-on training with expert master craftsmen',
      'Immediate 2x to 3x increase in daily production output and family earnings',
      'Direct buyback linkage through KVIC state bhavans and Khadi India stores',
      'Access to interest-free raw material loans through Khadi institutions'
    ],
    benefitsHi: [
      'आधुनिक उपकरणों का 100% मुफ्त वितरण (इलेक्ट्रिक कुम्हार चाक, बी-बॉक्स, सोलर चरखा)',
      'विशेषज्ञों द्वारा 5 दिवसीय निःशुल्क व्यावहारिक प्रशिक्षण',
      'कारीगरों की दैनिक आय में 2 से 3 गुना तक सीधी बढ़ोतरी',
      'खादी इंडिया स्टोरों के माध्यम से तैयार उत्पाद की सुनिश्चित खरीद',
      'कच्चा माल खरीदने हेतु ब्याज-मुक्त सहायता'
    ],
    documentsRequired: [
      'Aadhaar Card of artisan',
      'Proof of practicing traditional village occupation (Gram Panchayat certificate)',
      'Active bank account passbook copy',
      'Passport size photograph'
    ],
    stepsToApply: [
      'Approach nearest KVIC State Office / Divisional Office / DIC',
      'Register for specific program (e.g. Kumbhar Sashaktikaran, Honey Mission, Solar Charkha)',
      'Undergo 5 to 10 days free residential/local training program',
      'Receive official certificate and free distribution of electric wheel or 10 live bee colonies',
      'Commence production and market through local village haats and KVIC outlets'
    ],
    stepsToApplyHi: [
      'नजदीकी केवीआईसी (KVIC) राज्य कार्यालय या जिला उद्योग केंद्र से संपर्क करें',
      'विशिष्ट कार्यक्रम (जैसे कुम्हार सशक्तिकरण, हनी मिशन आदि) के लिए पंजीकरण कराएं',
      '5-10 दिन की व्यावहारिक ट्रेनिंग पूरी करें',
      'मुफ्त इलेक्ट्रिक चाक या मधुमक्खी बॉक्स प्राप्त करें',
      'खादी इंडिया और स्थानीय हाटों में सामान बेचकर आय बढ़ाएं'
    ],
    tags: ['khadi', 'kvic', 'potter', 'beekeeping', 'honey mission', 'solar charkha', 'kumbhar', 'village industry']
  },
  {
    id: 'weaver-mudra',
    name: 'National Handloom Development Programme & Weaver Mudra Scheme',
    nameHi: 'राष्ट्रीय हथकरघा विकास कार्यक्रम एवं बुनकर मुद्रा योजना',
    shortDescription: 'Collateral-free loans up to ₹2 Lakhs with ₹10,000 to ₹25,000 margin money grant and 6% interest subvention for handloom weavers.',
    shortDescriptionHi: 'हथकरघा बुनकरों के लिए ₹2 लाख तक बिना गारंटी ऋण, ₹25,000 तक मार्जिन मनी अनुदान और 6% ब्याज सब्सिडी।',
    description: 'The Ministry of Textiles implements the Weaver Mudra Scheme to provide timely and adequate credit to handloom weavers for investments and working capital. Weavers receive loans up to ₹2 Lakhs at a concessional interest rate of 6% (interest subvention up to 7% borne by Government for 3 years) and margin money assistance of up to ₹25,000 per weaver to kickstart production without personal debt.',
    descriptionHi: 'वस्त्र मंत्रालय द्वारा हथकरघा बुनकरों के लिए विशेष योजना। इसमें मात्र 6% रियायती ब्याज दर पर ₹2 लाख तक का ऋण दिया जाता है। सरकार 3 वर्षों तक 7% तक ब्याज सब्सिडी वहन करती है और ₹25,000 तक मुफ्त मार्जिन मनी अनुदान देती है ताकि बुनकर को अपनी जेब से पैसा न लगाना पड़े।',
    ministry: 'Ministry of Textiles / Development Commissioner for Handlooms',
    ministryHi: 'वस्त्र मंत्रालय / विकास आयुक्त (हथकरघा)',
    category: 'Handloom & Textiles',
    maxAmount: '₹2,00,000 (Weaver Mudra Loan) + ₹25,000 Grant',
    maxAmountNumeric: 225000,
    interestRate: '6% Concessional Interest Rate',
    subsidyRate: 'Up to ₹25,000 margin money grant + 7% interest subvention for 3 years',
    applicationUrl: 'https://handlooms.nic.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'SC', 'ST', 'OBC', 'General', 'Minority'],
      businessTypes: ['handloom_weaver', 'textile_weaver', 'yarn_spinner', 'dyer', 'allied_handloom_worker', 'carpet_weaver', 'silk_weaver'],
      annualIncomeLimit: 400000,
      location: ['Rural', 'Semi-Urban', 'Urban'],
      existingBusiness: 'existing_only',
      education: 'any'
    },
    benefits: [
      'Weaver Mudra Card issued for flexible credit drawdown up to ₹2 Lakhs',
      'Concessional interest rate of only 6% for 3 years',
      'Direct margin money assistance of ₹10,000 to ₹25,000 credited to bank account',
      '100% guarantee coverage through CGTMSE without collateral or mortgage',
      'Subsidized raw material yarn supply via National Handloom Development Corporation (NHDC)'
    ],
    benefitsHi: [
      'कार्यशील पूंजी निकालने के लिए विशेष बुनकर मुद्रा कार्ड',
      '3 वर्षों तक मात्र 6% की न्यूनतम ब्याज दर',
      'सरकार द्वारा ₹25,000 तक का मुफ्त मार्जिन मनी अनुदान',
      'बिना किसी संपत्ति को गिरवी रखे 100% क्रेडिट गारंटी',
      'एनएचडीसी (NHDC) के माध्यम से सब्सिडी वाले रियायती धागे (यार्न) की आपूर्ति'
    ],
    documentsRequired: [
      'Weaver Photo Identity Card (issued by DC Handlooms / State Directorate)',
      'Aadhaar Card and PAN Card',
      'Active bank account passbook copy',
      'Passport size photographs'
    ],
    stepsToApply: [
      'Obtain Handloom Weaver Pehchan Identity Card from local Weavers\' Service Centre (WSC)',
      'Fill the simplified Weaver Mudra loan application form',
      'WSC official / District Assistant Director of Handlooms endorses application',
      'Submit to nearest participating Scheduled Commercial Bank / RRB branch',
      'Bank sanctions loan, claims margin money grant from Ministry, and issues Weaver Mudra Card'
    ],
    stepsToApplyHi: [
      'बुनकर सेवा केंद्र (WSC) से अपना बुनकर पहचान पत्र (पहचान कार्ड) बनवाएं',
      'बुनकर मुद्रा लोन का सरल फॉर्म भरें',
      'हथकरघा अधिकारी से फॉर्म सत्यापित कराकर बैंक में जमा करें',
      'बैंक लोन स्वीकृत कर मार्जिन मनी खाते में डालेगा और मुद्रा कार्ड देगा'
    ],
    tags: ['weaver mudra', 'handloom', 'bunkar', 'textiles', 'silk', 'carpet', 'margin money grant', '6 percent loan']
  },
  {
    id: 'rashtriya-mahila-kosh',
    name: 'Rashtriya Mahila Kosh (RMK) / Micro-finance for Women',
    nameHi: 'राष्ट्रीय महिला कोष (आरएमके) सूक्ष्म वित्त योजना',
    shortDescription: 'Collateral-free micro-credit loans up to ₹50,000 for income generating activities of poor women through intermediary organizations.',
    shortDescriptionHi: 'मध्यवर्ती संगठनों और गैर-सरकारी संस्थाओं के माध्यम से गरीब महिलाओं की आय-सृजन गतिविधियों के लिए ₹50,000 तक बिना गारंटी सूक्ष्म ऋण।',
    description: 'RMK (National Credit Fund for Women) under the Ministry of Women and Child Development provides micro-finance services to bring about socio-economic empowerment of women from the unorganized sector. Provides loans through NGOs, Women Development Corporations, and SHG federations for micro-enterprises, dairy, petty trade, and agriculture.',
    descriptionHi: 'महिला एवं बाल विकास मंत्रालय के अधीन राष्ट्रीय महिला कोष गरीब महिलाओं को आजीविका और स्वरोजगार के लिए सूक्ष्म ऋण प्रदान करता है। यह ऋण स्वयं सहायता समूहों और पंजीकृत संस्थाओं के माध्यम से बिना किसी गारंटी के उपलब्ध कराया जाता है।',
    ministry: 'Ministry of Women and Child Development (MoWCD)',
    ministryHi: 'महिला एवं बाल विकास मंत्रालय',
    category: 'Women Micro-Credit',
    maxAmount: '₹50,000 per woman borrower',
    maxAmountNumeric: 50000,
    interestRate: 'Low fixed interest rate (capped at 10-12% reducing via NGO)',
    subsidyRate: 'Collateral-free group lending structure',
    applicationUrl: 'https://wcd.nic.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['Female'],
      category: ['All', 'SC', 'ST', 'OBC', 'Minority', 'General'],
      businessTypes: ['petty_shop', 'vegetable_vending', 'dairy', 'goat_rearing', 'tailoring', 'handicrafts', 'tiffin_service'],
      annualIncomeLimit: 200000,
      location: ['Rural', 'Urban', 'Slum'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Simple doorstep delivery of credit without bank branch bureaucracy',
      'No physical collateral, property papers, or guarantor needed',
      'Flexible weekly or monthly repayment cycles aligned with daily cash flows',
      'Capacity building, financial literacy, and group leadership training'
    ],
    benefitsHi: [
      'बिना किसी बैंक चक्कर के आसान व त्वरित ऋण',
      'कोई जमीन, सोना या गारंटी की आवश्यकता नहीं',
      'दैनिक कमाई के अनुसार साप्ताहिक या मासिक किस्तों में भुगतान की सुविधा',
      'वित्तीय साक्षरता और नेतृत्व कौशल का विकास'
    ],
    documentsRequired: [
      'Aadhaar Card and Passport size photo',
      'Self-Help Group / Joint Liability Group membership proof',
      'Bank passbook copy'
    ],
    stepsToApply: [
      'Join a local Women Self-Help Group (SHG) or Joint Liability Group (JLG)',
      'Group submits micro-credit request through the registered intermediary organization',
      'Field officer verifies borrower home and proposed enterprise',
      'Loan amount disbursed in cash or direct bank transfer within 14 days'
    ],
    stepsToApplyHi: [
      'स्थानीय महिला स्वयं सहायता समूह या जेएलजी (JLG) से जुड़ें',
      'समूह के माध्यम से ऋण का प्रस्ताव प्रस्तुत करें',
      'संस्था के फील्ड ऑफिसर द्वारा सत्यापन कराया जाएगा',
      'ऋण राशि सीधे बैंक खाते में प्राप्त करें'
    ],
    tags: ['rashtriya mahila kosh', 'rmk', 'women loan', 'micro finance', 'shg microcredit', 'petty trade']
  },
  {
    id: 'svamitva-scheme',
    name: 'SVAMITVA Scheme (Survey of Villages and Mapping with Improvised Technology in Village Areas)',
    nameHi: 'स्वामित्व योजना (ग्रामीण आबादी सर्वेक्षण एवं संपत्ति कार्ड)',
    shortDescription: 'Drone-based rural property ownership cards enabling rural entrepreneurs to monetize residential property as financial collateral for business loans.',
    shortDescriptionHi: 'ग्रामीण आबादी का ड्रोन सर्वेक्षण कर कानूनी संपत्ति कार्ड (प्रॉपर्टी कार्ड) वितरण, जिससे ग्रामीण नागरिक बैंक से व्यवसाय हेतु लोन ले सकें।',
    description: 'SVAMITVA is a Central Sector Scheme of the Ministry of Panchayati Raj. Uses drone technology and Continuously Operating Reference Stations (CORS) to survey inhabited village lands (Abadi areas). Distributes official legal "Property Cards" (Sampatti Patrak) to rural homeowners, establishing clear title of ownership. Enables villagers to leverage their residential property as collateral to secure bank loans for setting up micro-enterprises and expanding agriculture.',
    descriptionHi: 'पंचायती राज मंत्रालय की ऐतिहासिक योजना जो ग्रामीण आबादी क्षेत्र में ड्रोन द्वारा पैमाइश कराकर ग्रामीणों को उनके मकानों का कानूनी "प्रॉपर्टी कार्ड" देती है। इस कार्ड के आधार पर ग्रामीण अपनी संपत्ति को बैंक में बंधक रखकर व्यापार, दुकान या उद्यम हेतु आसानी से लोन प्राप्त कर सकते हैं।',
    ministry: 'Ministry of Panchayati Raj',
    ministryHi: 'पंचायती राज मंत्रालय',
    category: 'Rural Property & Asset Monetization',
    maxAmount: 'Monetizes rural assets for bank loans up to ₹25 Lakhs+',
    maxAmountNumeric: 2500000,
    interestRate: 'Standard institutional bank loan rates against property',
    subsidyRate: '100% free digital drone survey and free legal property deed distribution',
    applicationUrl: 'https://svamitva.nic.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 80,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['rural_retail', 'agro_machinery', 'dairy', 'workshop', 'manufacturing', 'transport', 'any'],
      annualIncomeLimit: null,
      location: ['Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Clear, undisputed legal ownership title (Property Card / Sampatti Patrak) for rural home',
      'Direct eligibility to mortgage property for bank loans and business credit facilities',
      'Prevents property disputes, encroachment, and enables accurate local tax assessment',
      '100% free survey and digital map generation conducted by Survey of India'
    ],
    benefitsHi: [
      'ग्रामीण घर का कानूनी संपत्ति कार्ड (मालिक हक का पक्का सरकारी दस्तावेज)',
      'प्रॉपर्टी कार्ड दिखाकर बैंकों से बिजनेस लोन व कार्यशील पूंजी पाने की सुविधा',
      'जमीनी विवादों और अवैध कब्जों से स्थायी मुक्ति',
      'सर्वे ऑफ इंडिया द्वारा पूर्णतः निःशुल्क ड्रोन मैपिंग'
    ],
    documentsRequired: [
      'Aadhaar Card and Mobile Number',
      'Family ration card or local Gram Panchayat tax receipt',
      'Physical presence during drone survey ground truthing'
    ],
    stepsToApply: [
      'Drone survey is conducted village-wide by Survey of India and District Revenue Department',
      'Ground truthing and boundary marking carried out in presence of property owner and Gram Panchayat',
      'Draft digital maps displayed at Panchayat building for 15-30 days for any objections',
      'Resolution of claims, following which final digital Property Card is generated',
      'Property Card downloaded via SMS link or physically collected from Panchayat / Revenue Department',
      'Present Property Card at any bank branch to unlock loan against property (LAP) for micro-business'
    ],
    stepsToApplyHi: [
      'सर्वे ऑफ इंडिया और राजस्व विभाग द्वारा गांव में ड्रोन उड़ाकर पैमाइश की जाती है',
      'मालिक की मौजूदगी में घर की चौहद्दी तय होती है',
      'पंचायत भवन में नक्शा लगाकर आपत्तियां मांगी जाती हैं',
      'अंतिम रूप से डिजिटल संपत्ति कार्ड जारी किया जाता है',
      'संपत्ति कार्ड लेकर बैंक जाएं और अपने व्यापार के लिए आसानी से ऋण प्राप्त करें'
    ],
    tags: ['svamitva', 'property card', 'rural loan', 'sampatti patrak', 'drone mapping', 'panchayat', 'asset monetization']
  },
  {
    id: 'mukhyamantri-yuva-swarozgar',
    name: 'Mukhyamantri Yuva Swarozgar Yojana (State Youth Self-Employment)',
    nameHi: 'मुख्यमंत्री युवा स्वरोजगार योजना',
    shortDescription: 'State-sponsored 25% capital margin money subsidy on loans up to ₹25 Lakhs for industry and ₹10 Lakhs for service sector for youth.',
    shortDescriptionHi: 'युवाओं के लिए उद्योग क्षेत्र में ₹25 लाख और सेवा क्षेत्र में ₹10 लाख तक के ऋण पर 25% तक राज्य सरकार की मार्जिन मनी सब्सिडी।',
    description: 'A flagship state government initiative implemented through District Industries Centres (DIC) to provide quick financing to educated unemployed youth. Offers bank loans up to ₹25 Lakhs for setting up manufacturing enterprises and up to ₹10 Lakhs for service ventures. The state provides a 25% margin money capital subsidy (up to ₹6.25 Lakhs for manufacturing and ₹2.5 Lakhs for service) which gets converted to an outright grant after 2 years of successful unit operation.',
    descriptionHi: 'जिला उद्योग केंद्रों (DIC) के माध्यम से शिक्षित बेरोजगार युवाओं के लिए राज्य सरकार की योजना। विनिर्माण (उद्योग) के लिए ₹25 लाख और सेवा क्षेत्र के लिए ₹10 लाख तक ऋण पर 25% तक मार्जिन मनी सब्सिडी दी जाती है। 2 वर्ष इकाई सफलतापूर्वक चलने पर यह अनुदान स्थायी हो जाता है।',
    ministry: 'State Directorate of Industries / DIC',
    ministryHi: 'उद्योग निदेशालय एवं जिला उद्योग केंद्र (DIC)',
    category: 'State Specific Youth Schemes',
    maxAmount: '₹25,00,000 for Industry / ₹10,00,000 for Service',
    maxAmountNumeric: 2500000,
    interestRate: 'Standard bank commercial rates with state subsidy',
    subsidyRate: '25% capital subsidy (up to ₹6.25L for industry, ₹2.5L for service)',
    applicationUrl: 'https://diupmsme.upsdc.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 40,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['manufacturing', 'services', 'repair_workshop', 'packaging', 'retail_trade', 'digital_services', 'food_stall'],
      annualIncomeLimit: 500000,
      location: ['Urban', 'Rural'],
      existingBusiness: 'new_only',
      education: '10th_pass'
    },
    benefits: [
      '25% state margin money capital subsidy credited directly to loan reserve account',
      'Loans up to ₹25 Lakhs for industrial units and ₹10 Lakhs for service/shop businesses',
      'Low borrower margin: Beneficiary contributes only 10% (5% for SC/ST/OBC/Women)',
      'Fast-track single-window clearance through District Industries Centre (DIC)',
      'Entrepreneurship development training provided free of cost'
    ],
    benefitsHi: [
      'ऋण पर 25% की सीधी मार्जिन मनी सब्सिडी (अधिकतम ₹6.25 लाख)',
      'उद्योग के लिए ₹25 लाख और दुकान/सेवा के लिए ₹10 लाख तक का ऋण',
      'लाभार्थी का अंशदान मात्र 10% (महिला व एससी/एसटी हेतु 5%)',
      'जिला उद्योग केंद्र (DIC) द्वारा सिंगल विंडो त्वरित स्वीकृति',
      'मुफ्त उद्यमिता विकास प्रशिक्षण'
    ],
    documentsRequired: [
      'Aadhaar Card, PAN Card, and Domicile/Residence Certificate',
      'High School (10th Pass) marksheet / educational certificate',
      'Caste Certificate (if claiming special category margin concession)',
      'Detailed Project Report (DPR) with machinery quotations',
      'Affidavit of unemployment and no prior default with any bank'
    ],
    stepsToApply: [
      'Register on the State MSME / Single Window DIC portal',
      'Select Mukhyamantri Yuva Swarozgar Yojana and fill applicant biodata',
      'Upload 10th marksheet, DPR, quotation, and caste certificate',
      'District Selection Committee interviews applicants and recommends files to banks',
      'Financing bank sanctions loan and releases first installment for machinery',
      'State government deposits 25% margin money subsidy into beneficiary loan account'
    ],
    stepsToApplyHi: [
      'राज्य उद्योग/डीआईसी (DIC) के ऑनलाइन पोर्टल पर आवेदन करें',
      'व्यक्तिगत जानकारी और 10वीं की मार्कशीट अपलोड करें',
      'प्रोजेक्ट रिपोर्ट (DPR) और मशीनरी का बिल संलग्न करें',
      'जिला चयन समिति द्वारा साक्षात्कार के बाद फाइल बैंक को भेजी जाएगी',
      'बैंक लोन पास कर राशि जारी करेगा और 25% सब्सिडी खाते में आएगी'
    ],
    tags: ['mukhyamantri yuva swarozgar', 'mysy', 'dic', 'state scheme', 'youth loan', '25 percent subsidy', 'manufacturing']
  },
  {
    id: 'aspire-scheme',
    name: 'ASPIRE Scheme for Rural Innovation & Agro-Industry',
    nameHi: 'एस्पायर योजना - ग्रामीण नवाचार और कृषि-उद्योग संवर्धन',
    shortDescription: 'Up to ₹1 Crore grant for setting up Livelihood Business Incubators (LBIs) and ₹1 Crore for Technology Business Incubators (TBIs) in rural areas.',
    shortDescriptionHi: 'ग्रामीण क्षेत्रों में आजीविका बिजनेस इनक्यूबेटर (LBI) स्थापित करने हेतु ₹1 करोड़ तक का 100% सरकारी अनुदान।',
    description: 'ASPIRE (A Scheme for Promotion of Innovation, Rural Industries and Entrepreneurship) is spearheaded by the Ministry of MSME. It creates new jobs and reduces unemployment by promoting entrepreneurship culture in rural and agro-based sectors. Provides up to ₹1 Crore grant to government agencies (and up to ₹50 Lakhs to private partners) to set up Livelihood Business Incubators (LBIs) that train rural youth and craftspeople to become viable micro-entrepreneurs.',
    descriptionHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय की प्रमुख योजना जो ग्रामीण और कृषि आधारित क्षेत्रों में नवाचार और रोजगार सृजन को बढ़ावा देती है। इसमें ग्रामीण क्षेत्रों में लाइवलीहुड बिजनेस इनक्यूबेटर (LBI) लगाने के लिए ₹1 करोड़ तक का सरकारी अनुदान दिया जाता है जो युवाओं को व्यावहारिक उद्योग लगाना सिखाते हैं।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME)',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
    category: 'Rural Incubation & Innovation',
    maxAmount: '₹1,00,00,000 (₹1 Crore Grant for Incubators)',
    maxAmountNumeric: 10000000,
    interestRate: '100% Non-refundable Grant',
    subsidyRate: '100% capital grant for machinery and equipment in government-partnered LBIs',
    applicationUrl: 'https://aspire.msme.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['agro_processing', 'rural_innovation', 'solar_products', 'food_packaging', 'herbal_medicines', 'biomass_pellets', 'dairy_equipment', 'handicrafts_technology'],
      annualIncomeLimit: null,
      location: ['Rural', 'Semi-Urban'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      'Comprehensive hands-on training on industrial production machinery in rural hubs',
      'Free incubation facilities to test, refine, and commercially launch agro-rural products',
      'Direct linkage to SIDBI Aspire Fund of Funds for equity/debt scale-up',
      'Facilitation of bank credit linkages with zero collateral through CGTMSE'
    ],
    benefitsHi: [
      'ग्रामीण केंद्रों में वास्तविक औद्योगिक मशीनों पर प्रत्यक्ष व्यावहारिक प्रशिक्षण',
      'कृषि व ग्रामीण उत्पादों के परीक्षण और लॉन्च के लिए मुफ्त इनक्यूबेशन सुविधा',
      'सिडबी एस्पायर फंड से स्टार्टअप पूंजी प्राप्त करने का अवसर',
      'बिना किसी गारंटी के आसान बैंक लोन की सुविधा'
    ],
    documentsRequired: [
      'Entity Registration Certificate (for incubator) / Aadhaar & educational certificates (for incubated entrepreneur)',
      'Detailed Project Proposal on rural business or livelihood idea',
      'Machinery layout and financial feasibility roadmap'
    ],
    stepsToApply: [
      'Aspiring entrepreneurs apply to their nearest ASPIRE Livelihood Business Incubator (LBI)',
      'Undergo hands-on training program in chosen rural manufacturing trade (e.g. food packaging, herbal cosmetics, bio-fertilizer)',
      'LBI incubator assists entrepreneur in preparing DPR and obtaining FSSAI/Udyam certificates',
      'Pitch project to participating commercial banks for credit linkage with capital subsidy convergence'
    ],
    stepsToApplyHi: [
      'नजदीकी एस्पायर लाइवलीहुड इनक्यूबेटर (LBI) में आवेदन करें',
      'कृषि प्रसंस्करण, हर्बल उत्पाद या पैकेजिंग का व्यावहारिक प्रशिक्षण लें',
      'इनक्यूबेटर की मदद से प्रोजेक्ट रिपोर्ट और सरकारी लाइसेंस प्राप्त करें',
      'बैंक ऋण लेकर अपना खुद का ग्रामीण उद्योग शुरू करें'
    ],
    tags: ['aspire', 'rural innovation', 'incubation', 'lbi', 'agro processing', 'msme grant', 'rural enterprise']
  },
  {
    id: 'samarth-scheme',
    name: 'SAMARTH - Scheme for Capacity Building in Textile Sector',
    nameHi: 'समर्थ योजना - वस्त्र क्षेत्र में क्षमता निर्माण योजना',
    shortDescription: '100% free demand-driven skill training and guaranteed employment in spinning, weaving, garmenting, and handicrafts.',
    shortDescriptionHi: 'वस्त्र उद्योग, बुनाई, गारमेंटिंग और हस्तशिल्प में 100% मुफ्त मांग-आधारित कौशल प्रशिक्षण और 70% नौकरी की गारंटी।',
    description: 'SAMARTH is a flagship skill development initiative of the Ministry of Textiles under the Skill India Mission. It aims to train 10 Lakh youth (with a strong preference for women, SC, ST, and marginalized communities) in the organized textile and allied sectors. Provides biometric attendance-based free training, certified assessment, and guaranteed wage employment (minimum 70%) or organized micro-enterprise handholding.',
    descriptionHi: 'वस्त्र मंत्रालय की प्रमुख योजना जो कताई, बुनाई, वस्त्र निर्माण (गारमेंटिंग) और पारंपरिक हस्तशिल्प में युवाओं (विशेष रूप से महिलाओं, एससी और एसटी) को पूरी तरह निःशुल्क प्रशिक्षण देती है। 70% प्रशिक्षित उम्मीदवारों को संगठित वस्त्र उद्योग में सुनिश्चित रोजगार दिलाया जाता है।',
    ministry: 'Ministry of Textiles',
    ministryHi: 'वस्त्र मंत्रालय',
    category: 'Textiles & Garmenting',
    maxAmount: '100% Free Training (~₹18,000 per trainee value) + Guaranteed Placement',
    maxAmountNumeric: 18000,
    interestRate: '100% Free Government Funded Training',
    subsidyRate: '100% training, assessment, and certification costs borne by Govt',
    applicationUrl: 'https://samarth-textiles.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 45,
      gender: ['All', 'Female', 'Male', 'Transgender'],
      category: ['All', 'SC', 'ST', 'OBC', 'Minority', 'General'],
      businessTypes: ['textiles', 'garmenting', 'tailoring', 'embroidery', 'handloom', 'handicrafts', 'apparel', 'knitting'],
      annualIncomeLimit: 300000,
      location: ['Rural', 'Urban'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      '100% free certified training aligned with National Skills Qualification Framework (NSQF)',
      'Biometric attendance tracking and CCTV monitored modern training infrastructure',
      'Guaranteed wage placement (minimum 70%) in leading textile and apparel mills',
      'Micro-enterprise entrepreneurship support for candidates wanting to start boutique/tailoring units'
    ],
    benefitsHi: [
      'राष्ट्रीय कौशल योग्यता फ्रेमवर्क (NSQF) के तहत 100% निःशुल्क प्रमाणित प्रशिक्षण',
      'आधुनिक सिलाई व टेक्सटाइल मशीनों पर व्यावहारिक प्रशिक्षण',
      'प्रमुख गारमेंट व टेक्सटाइल कंपनियों में कम से कम 70% नौकरी की गारंटी',
      'अपना बुटीक या सिलाई सेंटर खोलने के लिए आसान ऋण सहायता'
    ],
    documentsRequired: [
      'Aadhaar Card (Mandatory for biometric tracking)',
      'Passport size photographs',
      'Age proof / School leaving certificate',
      'Caste certificate (for SC/ST candidates claiming priority batching)'
    ],
    stepsToApply: [
      'Register online at samarth-textiles.gov.in or visit authorized Samarth Training Partner centre',
      'Enroll in preferred course (e.g., Sewing Machine Operator, Fabric Checker, Hand Embroiderer)',
      'Complete 300 hours of practical training with biometric attendance',
      'Pass third-party assessment conducted by Textile Sector Skill Council',
      'Receive government certificate and join guaranteed placement drive'
    ],
    stepsToApplyHi: [
      'समर्थ पोर्टल (samarth-textiles.gov.in) पर रजिस्टर करें या नजदीकी केंद्र जाएं',
      'अपनी पसंद का कोर्स (जैसे सिलाई मशीन ऑपरेटर, कढ़ाई आदि) चुनें',
      '300 घंटे का व्यावहारिक कोर्स पूरा करें',
      'परीक्षा पास कर राष्ट्रीय प्रमाण पत्र प्राप्त करें',
      'वस्त्र उद्योग में नौकरी या अपना काम शुरू करें'
    ],
    tags: ['samarth', 'textile training', 'garmenting', 'tailoring', 'sewing', 'free skill', 'women employment']
  },
  {
    id: 'pmegp-second-loan',
    name: 'PMEGP 2nd Loan for Upgradation / Expansion of Existing Units',
    nameHi: 'पीएमईजीपी द्वितीय ऋण - स्थापित इकाइयों के उन्नयन एवं विस्तार हेतु',
    shortDescription: 'Up to ₹1 Crore loan for manufacturing and ₹25 Lakhs for service units with 15% to 20% capital subsidy for expanding successful PMEGP/MUDRA units.',
    shortDescriptionHi: 'सफल पुरानी इकाइयों के विस्तार हेतु विनिर्माण में ₹1 करोड़ और सेवा क्षेत्र में ₹25 लाख तक का ऋण, 20% तक की भारी सब्सिडी के साथ।',
    description: 'A special expansion window under PMEGP designed for entrepreneurs who have already availed and successfully repaid their first PMEGP or MUDRA loan. Maximum project cost is up to ₹1 Crore for manufacturing units and up to ₹25 Lakhs for service units. The government provides 15% capital subsidy (Margin Money) for all categories in urban areas and 20% in rural areas (with 20% in NER/Hilly areas).',
    descriptionHi: 'उन सफल उद्यमियों के लिए जिन्होंने पहले पीएमईजीपी या मुद्रा लोन समय पर चुका दिया है और अब अपने व्यवसाय का बड़े पैमाने पर आधुनिकीकरण या विस्तार करना चाहते हैं। विनिर्माण में ₹1 करोड़ और सेवा क्षेत्र में ₹25 लाख तक के प्रोजेक्ट पर 20% तक की नकद सब्सिडी मिलती है।',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / KVIC',
    ministryHi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय / केवीआईसी',
    category: 'MSME Business Expansion',
    maxAmount: '₹1,00,00,000 (Manufacturing) / ₹25,00,000 (Service)',
    maxAmountNumeric: 10000000,
    interestRate: 'Competitive bank commercial interest rate',
    subsidyRate: '15% to 20% capital subsidy on expanded project cost',
    applicationUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['manufacturing', 'services', 'food_processing', 'textile', 'engineering', 'agro_based', 'wood_craft', 'chemicals'],
      annualIncomeLimit: null,
      location: ['Urban', 'Rural'],
      existingBusiness: 'existing_only',
      education: '8th_pass'
    },
    benefits: [
      'Huge capital subsidy of up to ₹20 Lakhs (20% on ₹1 Crore manufacturing project in rural areas)',
      'Substantial credit ceiling up to ₹1 Crore enables automation, new plant setups, and bulk procurement',
      'Promoter own contribution is only 10%',
      'Strengthens existing balance sheets and generates local secondary employment'
    ],
    benefitsHi: [
      'ग्रामीण क्षेत्रों में ₹1 करोड़ के प्रोजेक्ट पर ₹20 लाख तक की भारी नकद सब्सिडी',
      'नई आधुनिक ऑटोमैटिक मशीनें लगाने और फैक्ट्री विस्तार के लिए बड़ा फंड',
      'उद्यमी का स्वयं का अंशदान मात्र 10%',
      'व्यापार को बड़े स्तर पर ले जाने का सुनहरा मौका'
    ],
    documentsRequired: [
      'First loan clearance / satisfaction certificate from previous financing bank',
      'Audited balance sheets and profit & loss statements for last 3 years showing continuous profit',
      'Udyam Registration Certificate',
      'Detailed Project Report (DPR) detailing planned technological expansion and machinery list',
      'Tax / GST returns for last 2 years'
    ],
    stepsToApply: [
      'Obtain No Due / Timely Repayment Certificate from the bank that financed the 1st loan',
      'Prepare comprehensive expansion DPR showing technological upgrade and market demand',
      'Apply online on the PMEGP e-Portal under "Second Loan for Existing Unit"',
      'Upload audited financials, IT returns, and machinery quotes',
      'Bank reviews past repayment track record and sanctions the enhanced credit limit',
      'KVIC releases the margin money subsidy directly into the subsidy reserve account'
    ],
    stepsToApplyHi: [
      'पहले ऋण का पूर्ण भुगतान प्रमाण पत्र बैंक से लें',
      'फैक्ट्री विस्तार व नई मशीनों की विस्तृत प्रोजेक्ट रिपोर्ट (DPR) तैयार करें',
      'पीएमईजीपी पोर्टल पर "सेकंड लोन" विकल्प चुनकर ऑनलाइन आवेदन करें',
      'ऑडिटेड बैलेंस शीट और जीएसटी रिटर्न अपलोड करें',
      'बैंक पिछला रिकॉर्ड देखकर ₹1 करोड़ तक का लोन मंजूर करेगा',
      '20% सब्सिडी सीधे खाते में जमा होगी'
    ],
    tags: ['pmegp second loan', 'business expansion', '1 crore loan', 'kvic', 'subsidy', 'manufacturing expansion']
  },
  {
    id: 'pm-suraksha-bima',
    name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY) & PMJJBY Social Security',
    nameHi: 'प्रधानमंत्री सुरक्षा बीमा एवं जीवन ज्योति योजना (सामाजिक सुरक्षा)',
    shortDescription: 'Accidental and life insurance coverage of ₹2 Lakhs at nominal premiums of ₹20/year and ₹436/year to secure vulnerable entrepreneurs.',
    shortDescriptionHi: 'रेहड़ी-पटरी वालों व छोटे उद्यमियों के लिए ₹20/वर्ष में ₹2 लाख का दुर्घटना बीमा और ₹436/वर्ष में ₹2 लाख का जीवन बीमा।',
    description: 'Providing essential social safety nets for marginalized entrepreneurs whose families are economically vulnerable to unforeseen accidents or death. PMSBY offers accidental death and full disability cover of ₹2 Lakh (and partial disability cover of ₹1 Lakh) for an annual premium of just ₹20 auto-debited from bank account. PMJJBY offers life insurance of ₹2 Lakhs for death due to any reason for an annual premium of ₹436.',
    descriptionHi: 'गरीब और हाशिए पर मौजूद छोटे उद्यमियों और उनके परिवारों को सामाजिक सुरक्षा प्रदान करने हेतु योजना। मात्र ₹20 वार्षिक प्रीमियम पर ₹2 लाख का दुर्घटना बीमा (PMSBY) और मात्र ₹436 वार्षिक पर ₹2 लाख का जीवन बीमा (PMJJBY) सीधे बैंक खाते से ऑटो-डेबिट होता है।',
    ministry: 'Ministry of Finance / Department of Financial Services',
    ministryHi: 'वित्त मंत्रालय / वित्तीय सेवाएं विभाग',
    category: 'Social Security & Insurance',
    maxAmount: '₹2,00,000 Insurance Cover per policy',
    maxAmountNumeric: 200000,
    interestRate: 'Insurance Policy (₹20/year for PMSBY, ₹436/year for PMJJBY)',
    subsidyRate: 'Government subsidized micro-insurance scheme',
    applicationUrl: 'https://www.jansuraksha.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70, // Up to 70 for PMSBY, up to 50 for PMJJBY
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['All', 'General', 'OBC', 'SC', 'ST', 'Minority'],
      businessTypes: ['street_vendor', 'artisan', 'farmer', 'retail', 'services', 'allied', 'any'],
      annualIncomeLimit: null,
      location: ['Urban', 'Rural'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      '₹2,00,000 financial coverage in case of accidental death or permanent total disability',
      '₹1,00,000 coverage in case of permanent partial disability under PMSBY',
      'Ultra-affordable premium of just ₹20 per year (less than ₹2 per month)',
      'Hassle-free automated annual renewal directly through savings bank account',
      'Protects micro-enterprise loans and family livelihood from sudden catastrophic loss'
    ],
    benefitsHi: [
      'दुर्घटना में मृत्यु या पूर्ण विकलांगता की स्थिति में ₹2,00,000 की तत्काल आर्थिक मदद',
      'आंशिक विकलांगता पर ₹1,00,000 की सुरक्षा',
      'मात्र ₹20 प्रति वर्ष (₹2 से भी कम प्रति माह) का न्यूनतम प्रीमियम',
      'बैंक खाते से स्वतः नवीनीकरण की सरल प्रक्रिया',
      'परिवार की आजीविका और व्यवसाय को सुरक्षित रखने की गारंटी'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Savings Bank Account Passbook with active mobile number',
      'Nominee details (Name, relationship, Aadhaar, and bank account)'
    ],
    stepsToApply: [
      'Visit your bank branch or activate through Net Banking / Mobile Banking app',
      'Fill single-page Jan Suraksha enrollment-cum-auto-debit consent form',
      'Designate nominee name and details',
      'Ensure account balance has at least ₹20 for PMSBY (and ₹436 for PMJJBY) on 31st May annually',
      'Instant policy receipt and Certificate of Insurance generated with policy number'
    ],
    stepsToApplyHi: [
      'अपने बचत बैंक खाते की शाखा में जाएं या नेट बैंकिंग से सक्रिय करें',
      'जन सुरक्षा सहमति पत्र भरें और नॉमिनी का नाम दर्ज करें',
      'वार्षिक प्रीमियम (₹20/₹436) बैंक खाते से कट जाएगा',
      'तत्काल बीमा रसीद व प्रमाण पत्र प्राप्त करें'
    ],
    tags: ['pmsby', 'pmjjby', 'insurance', 'social security', 'jan suraksha', 'street vendor insurance', 'accidental cover']
  },
  {
    id: 'pm-egp-tribal',
    name: 'Van Dhan Vikas Yojana (Tribal Entrepreneurship & Forest Produce)',
    nameHi: 'वन धन विकास योजना (जनजातीय उद्यमिता एवं वनोपज मूल्य संवर्धन)',
    shortDescription: '100% grant assistance up to ₹15 Lakhs per Van Dhan Vikas Kendra for tribal gathering collectives for value addition to Minor Forest Produce (MFP).',
    shortDescriptionHi: 'आदिवासी स्वयं सहायता समूहों के लिए लघु वनोपज के प्रसंस्करण व मूल्य संवर्धन हेतु ₹15 लाख तक का 100% सरकारी अनुदान।',
    description: 'Spearheaded by TRIFED under the Ministry of Tribal Affairs, the Van Dhan scheme transforms tribal gatherers into empowered entrepreneurs. Organizes ~300 tribal forest gatherers into 15-member SHGs grouped into a Van Dhan Vikas Kendra (VDVK). TRIFED provides ₹15 Lakhs 100% grant funding per Kendra for procurement, processing equipment, packaging, branding, and setting up primary processing facilities for products like wild honey, mahua, amla, tamarind, and lac.',
    descriptionHi: 'जनजातीय कार्य मंत्रालय (TRIFED) की प्रमुख योजना जो लघु वनोपज (शहद, आंवला, इमली, महुआ, लाख आदि) इकट्ठा करने वाले आदिवासी भाई-बहनों को उद्यमी बनाती है। 300 आदिवासियों के प्रत्येक वन धन केंद्र (VDVK) को प्राथमिक प्रसंस्करण केंद्र व मशीनों के लिए ₹15 लाख का 100% सरकारी अनुदान दिया जाता है।',
    ministry: 'Ministry of Tribal Affairs / TRIFED',
    ministryHi: 'जनजातीय कार्य मंत्रालय / ट्राइफेड',
    category: 'Tribal Entrepreneurship',
    maxAmount: '₹15,00,000 Grant per Van Dhan Kendra',
    maxAmountNumeric: 1500000,
    interestRate: '100% Non-refundable Grant',
    subsidyRate: '100% Central Government Grant via TRIFED',
    applicationUrl: 'https://trifed.tribal.gov.in/',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: ['All', 'Male', 'Female', 'Transgender'],
      category: ['ST'], // Exclusively Scheduled Tribes (ST)
      businessTypes: ['tribal_produce', 'minor_forest_produce', 'honey_collection', 'herbal_medicines', 'lac_cultivation', 'wild_fruits', 'artisan'],
      annualIncomeLimit: 250000,
      location: ['Rural', 'Forest Areas'],
      existingBusiness: 'any',
      education: 'any'
    },
    benefits: [
      '100% grant of ₹15 Lakhs per Van Dhan Kendra: zero loan burden or interest liability',
      'Value addition equipment provided: drying yards, honey filtration, pulping, and packaging machines',
      'Tribes India retail network and e-commerce platforms market the finished branded products',
      'Artisans and gatherers retain 100% of the sale profits through their collective bank accounts',
      'Substantial increase in income from raw gathering to processed consumer goods'
    ],
    benefitsHi: [
      'प्रति वन धन केंद्र ₹15 लाख का 100% सरकारी अनुदान (कोई कर्ज या ब्याज नहीं)',
      'शहद निष्कासन, पैकेजिंग और सुखाने के आधुनिक उपकरण मुफ्त',
      'ट्राइब्स इंडिया (Tribes India) के राष्ट्रीय शोरूम और ऑनलाइन पोर्टल पर बिक्री',
      'बिक्री का 100% मुनाफा सीधे जनजातीय संग्रहकर्ताओं के बैंक खातों में',
      'कच्चे माल की तुलना में उत्पाद का 3 से 5 गुना अधिक मूल्य'
    ],
    documentsRequired: [
      'ST Caste Certificate (Mandatory)',
      'Aadhaar Card and active bank account passbook',
      'Van Dhan SHG membership resolution',
      'Gram Sabha endorsement of the forest gatherer community'
    ],
    stepsToApply: [
      'Form or join a local Tribal Self-Help Group (15-20 forest gatherer members)',
      '15 SHGs unite to form a Van Dhan Vikas Kendra cluster with support from District Forest Officer / TRIFED',
      'Gram Sabha passes resolution endorsing the gatherers and Kendra formation',
      'State Nodal Agency submits proposal to TRIFED for sanction of ₹15 Lakh grant',
      'Grant is disbursed directly into VDVK joint bank account',
      'Procure processing tools, attend TRIFED training, and launch value-added packaged tribal products'
    ],
    stepsToApplyHi: [
      '15-20 आदिवासी सदस्यों का स्वयं सहायता समूह बनाएं',
      'जिला वन अधिकारी या ट्राइफेड (TRIFED) की सहायता से 15 समूहों को मिलाकर वन धन केंद्र बनाएं',
      'ग्राम सभा से प्रस्ताव पास कराएं',
      'ट्राइफेड द्वारा ₹15 लाख का अनुदान केंद्र के बैंक खाते में भेजा जाएगा',
      'मशीनें लगाएं, प्रशिक्षण लें और ट्राइब्स इंडिया के जरिए अपना ब्रांडेड सामान बेचें'
    ],
    tags: ['van dhan', 'trifed', 'tribal entrepreneurship', 'st scheme', 'minor forest produce', 'honey', 'forest gathering', '15 lakh grant']
  }
];

function generateEligibilityPoints(s) {
  const c = s.eligibilityCriteria || {};
  const en = [];
  const hi = [];

  // 1. Age
  if (c.minAge || c.maxAge) {
    const min = c.minAge || 18;
    const max = c.maxAge || 70;
    en.push(`Applicant Age: Must be between ${min} and ${max} years of age at application time.`);
    hi.push(`आयु सीमा: आवेदन के समय आवेदक की आयु ${min} से ${max} वर्ष के बीच होनी चाहिए।`);
  }

  // 2. Gender
  if (c.gender) {
    if (c.gender.includes('All') || (c.gender.includes('Male') && c.gender.includes('Female'))) {
      en.push(`Gender Inclusivity: Open to All Genders (Special incentives and priority quotas for Women entrepreneurs).`);
      hi.push(`लिंग पात्रता: सभी लिंग (महिला, पुरुष एवं अन्य) पात्र हैं। महिला उद्यमियों को विशेष सब्सिडी प्राथमिकता।`);
    } else if (c.gender.includes('Female')) {
      en.push(`Gender Requirement: Exclusively dedicated to Female Applicants and Women-led SHGs/Enterprises.`);
      hi.push(`लिंग पात्रता: विशेष रूप से केवल महिला उद्यमियों एवं महिला स्वयं सहायता समूहों के लिए आरक्षित।`);
    }
  }

  // 3. Social Category
  if (c.category) {
    const isExclusivelyMarginalized = !c.category.includes('All') && !c.category.includes('General');
    if (isExclusivelyMarginalized) {
      const cats = c.category.join(' / ');
      en.push(`Social Category: Strictly reserved for ${cats} affirmative category entrepreneurs.`);
      hi.push(`सामाजिक वर्ग: विशेष रूप से ${cats} वर्ग के पात्र उद्यमियों के लिए आरक्षित।`);
    } else {
      en.push(`Social Category: Open to All (General, SC, ST, OBC, Minority, and EWS with highest subsidies for marginalized classes).`);
      hi.push(`सामाजिक वर्ग: सभी वर्गों (सामान्य, एससी, एसटी, ओबीसी, अल्पसंख्यक) के लिए खुला। वंचित वर्गों को उच्चतम सब्सिडी।`);
    }
  }

  // 4. Business Types
  if (c.businessTypes && c.businessTypes.length > 0) {
    const formattedTypes = c.businessTypes.slice(0, 5).map(t => t.replace(/_/g, ' ')).join(', ');
    en.push(`Eligible Trades & Sectors: Covers ${formattedTypes}${c.businessTypes.length > 5 ? ' and allied micro-enterprises' : ''}.`);
    hi.push(`पात्र व्यवसाय क्षेत्र: ${formattedTypes} और संबंधित सूक्ष्म उद्यम शामिल हैं।`);
  }

  // 5. Income Limit
  if (c.annualIncomeLimit) {
    en.push(`Annual Income Ceiling: Family income must not exceed ₹${c.annualIncomeLimit.toLocaleString('en-IN')} per annum.`);
    hi.push(`पारिवारिक आय सीमा: वार्षिक पारिवारिक आय अधिकतम ₹${c.annualIncomeLimit.toLocaleString('en-IN')} तक होनी चाहिए।`);
  } else {
    en.push(`Income Ceiling: No restrictive upper annual family income ceiling.`);
    hi.push(`आय सीमा: कोई बाध्यकारी ऊपरी पारिवारिक आय सीमा नहीं है।`);
  }

  // 6. Education
  if (c.education && c.education !== 'any' && c.education !== 'none') {
    en.push(`Educational Qualification: Minimum ${c.education.replace(/_/g, ' ')} required for major capital projects.`);
    hi.push(`शैक्षिक योग्यता: प्रमुख परियोजनाओं के लिए कम से कम ${c.education.replace(/_/g, ' ')} आवश्यक है।`);
  } else {
    en.push(`Educational Qualification: No formal educational qualification barrier.`);
    hi.push(`शैक्षिक योग्यता: किसी औपचारिक न्यूनतम शैक्षणिक प्रमाण पत्र की कोई बाध्यता नहीं है।`);
  }

  // 7. Location & Stage
  if (c.location) {
    en.push(`Geographic Coverage: Applicable in ${c.location.join(' & ')} areas across all Indian states and Union Territories.`);
    hi.push(`भौगोलिक विस्तार: देश भर के ${c.location.join(' एवं ')} क्षेत्रों में लागू।`);
  }

  if (c.existingBusiness === 'existing_only') {
    en.push(`Business Stage: Valid for existing micro-enterprises looking for expansion or working capital.`);
    hi.push(`उद्यम अवस्था: वर्तमान में संचालित व्यवसाय के विस्तार अथवा कार्यशील पूंजी के लिए।`);
  } else if (c.existingBusiness === 'new_only') {
    en.push(`Business Stage: Greenfield project setup (new enterprises / startups only).`);
    hi.push(`उद्यम अवस्था: केवल नए व्यवसाय या नई इकाई (ग्रीनफील्ड) की स्थापना के लिए।`);
  } else {
    en.push(`Business Stage: Both new startups and existing enterprises seeking modern upgradation are eligible.`);
    hi.push(`उद्यम अवस्था: नए स्टार्टअप और मौजूदा व्यवसाय के आधुनिकीकरण दोनों के लिए पात्र।`);
  }

  return { en, hi };
}

// Ensure backwards and frontend interoperability aliases
schemes.forEach(s => {
  if (!s.maxBenefit) s.maxBenefit = s.maxAmount;
  if (!s.maxBenefitNumeric) s.maxBenefitNumeric = s.maxAmountNumeric;
  if (!s.officialUrl) s.officialUrl = s.applicationUrl;

  const points = generateEligibilityPoints(s);
  s.eligibility = points.en;
  s.eligibilityHi = points.hi;
});

export default schemes;

