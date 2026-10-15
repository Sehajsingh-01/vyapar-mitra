import express from 'express';
import { schemes } from '../services/schemeData.js';
import { matchSchemes } from '../services/schemeMatcher.js';
import tinyfish from '../services/tinyfish.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * Detects if the text is primarily Hindi or user requested Hindi / Hinglish
 */
function isHindiText(text = '', requestedLang = 'en') {
  if (requestedLang === 'hi') return true;
  if (!text) return false;
  const devanagariPattern = /[\u0900-\u097F]/;
  if (devanagariPattern.test(text)) return true;
  const hinglishWords = [
    'kaise', 'kya', 'chahiye', 'karo', 'batao', 'kitna', 'loan', 'milaga', 'milega', 'paisa',
    'madad', 'dukaan', 'mahila', 'yojana', 'dastavez', 'kagaz', 'kheti', 'kisan', 'namaste',
    'thela', 'rehri', 'bina', 'chhoot', 'subsidi', 'karz', 'vyapar', 'shuru'
  ];
  const words = text.toLowerCase().split(/\s+/);
  return words.some(w => hinglishWords.includes(w));
}

/**
 * Finds targeted scheme by checking scheme IDs, names, and explicit keywords
 */
function findTargetScheme(message = '', schemeId = '') {
  if (schemeId) {
    const found = schemes.find(s => s.id === schemeId);
    if (found) return found;
  }

  const lower = message.toLowerCase();

  // Explicit prioritized keywords to avoid false generic matches
  if (lower.includes('svanidhi') || lower.includes('स्वनिधि')) {
    return schemes.find(s => s.id === 'pm-svanidhi');
  }
  if (lower.includes('mudra') || lower.includes('मुद्रा') || lower.includes('pmmy')) {
    return schemes.find(s => s.id === 'mudra-yojana');
  }
  if (lower.includes('vishwakarma') || lower.includes('विश्वकर्मा')) {
    return schemes.find(s => s.id === 'pm-vishwakarma');
  }
  if (lower.includes('stand up') || lower.includes('standup') || lower.includes('स्टैंड अप')) {
    return schemes.find(s => s.id === 'stand-up-india');
  }
  if (lower.includes('pmegp') || lower.includes('रोजगार सृजन') || lower.includes('kvic')) {
    return schemes.find(s => s.id === 'pmegp');
  }
  if (lower.includes('lakhpati') || lower.includes('लखपति दीदी')) {
    return schemes.find(s => s.id === 'lakhpati-didi');
  }
  if (lower.includes('pmfme') || lower.includes('food processing') || lower.includes('खाद्य प्रसंस्करण')) {
    return schemes.find(s => s.id === 'pmfme');
  }
  if (lower.includes('cgtmse') || lower.includes('credit guarantee')) {
    return schemes.find(s => s.id === 'cgtmse');
  }
  if (lower.includes('van dhan') || lower.includes('वन धन') || lower.includes('trifed')) {
    return schemes.find(s => s.id === 'van-dhan-yojana');
  }

  return null;
}

/**
 * POST /api/assistant/chat
 * High-IQ Conversational Scheme Advisor tailored for Indian grassroots entrepreneurs
 */
router.post('/chat', async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw AppError.badRequest('Request body must be a JSON object');
    }

    const {
      message,
      language = 'en',
      profile = null,
      schemeId = null
    } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw AppError.badRequest('A non-empty "message" string is required');
    }

    const trimmedMsg = message.trim();
    const lowerMsg = trimmedMsg.toLowerCase();
    const isHindi = isHindiText(trimmedMsg, language);
    const targetScheme = findTargetScheme(trimmedMsg, schemeId);

    let responseText = '';
    let suggestedSchemes = [];
    let sources = [];
    let quickReplies = [];

    // Check for live search intent (recent year, budget, rules, portal news, or complex research)
    const liveKeywords = ['news', 'latest', 'budget', '2026', 'update', 'status', 'portal', 'website', 'form link', 'rbi circular'];
    const needsLiveSearch = liveKeywords.some(k => lowerMsg.includes(k));

    let liveSearchResult = null;
    if (needsLiveSearch) {
      try {
        liveSearchResult = await tinyfish.searchSchemes(trimmedMsg);
        if (liveSearchResult?.results?.length > 0) {
          sources = liveSearchResult.results.slice(0, 3).map(r => ({
            title: r.title,
            url: r.url,
            site: r.siteName || 'Government of India'
          }));
        }
      } catch (err) {
        console.warn('[TinyFish Search] Fallback to internal policy knowledge base:', err.message);
      }
    }

    // -------------------------------------------------------------
    // INTENT 1: CASUAL GREETINGS & INTRODUCTIONS
    // -------------------------------------------------------------
    const greetingWords = ['hy', 'hello', 'hi', 'hey', 'namaste', 'kaise ho', 'kya haal', 'pranam', 'who are you', 'kya kar sakte ho'];
    const isGreeting = greetingWords.some(w => lowerMsg === w || lowerMsg.startsWith(w + ' '));

    if (isGreeting && !targetScheme) {
      const topFlagship = schemes.filter(s => ['pm-svanidhi', 'mudra-yojana', 'pmegp', 'pm-vishwakarma'].includes(s.id));
      suggestedSchemes = topFlagship;

      if (isHindi) {
        responseText = `नमस्ते! 🙏 **व्यापार मित्र एआई** में आपका स्वागत है।\n\nमैं भारत सरकार की सूक्ष्म, लघु एवं ग्रामीण उद्यम कल्याण योजनाओं का डिजिटल सहायक हूँ। मैं आपको बिना किसी बिचौलिए या कमीशन के:\n\n1. 💸 **बिना गारंटी (Collateral-Free) ऋण** — जैसे मुद्रा एवं पीएम स्वनिधि योजना।\n2. 🏷️ **15% से 35% सरकारी सब्सिडी** — जैसे PMEGP मार्जिन मनी ग्रांट।\n3. 🛠️ **पारंपरिक कारीगर व महिला उद्यमी सहायता** — स्टैंड-अप इंडिया एवं विश्वकर्मा योजना।\n4. 📄 **आवश्यक दस्तावेज़ और ऑनलाइन आवेदन प्रक्रिया** समझाने में मदद कर सकता हूँ।\n\n👉 **बताइए, आप किस व्यवसाय (जैसे दुकान, ठेला/रेहड़ी, सिलाई, डेयरी, वर्कशॉप) के लिए योजना खोज रहे हैं?**`;
        quickReplies = ['रेहड़ी-पटरी वालों के लिए ऋण', 'मुद्रा योजना में बिना गारंटी लोन', '35% PMEGP सब्सिडी कैसे मिलती है?', 'कारीगरों के लिए विश्वकर्मा योजना'];
      } else {
        responseText = `Namaste! 🙏 Welcome to **Vyapar Mitra AI** — your verified guide to Indian Government Enterprise Schemes & Subsidies.\n\nI help grassroots entrepreneurs access institutional funding without paying illegal commissions to middlemen:\n\n1. 💸 **Collateral-Free Loans** — MUDRA (up to ₹20 Lakhs) & PM SVANidhi (up to ₹50,000).\n2. 🏷️ **15% to 35% Capital Subsidies** — PMEGP margin money grants.\n3. 👩 **Affirmative Support** — Stand-Up India (for Women & SC/ST) & PM Vishwakarma (for artisans).\n4. 📄 **Direct Portal Guidance** — Step-by-step paperwork without red tape.\n\n👉 **What kind of business or enterprise are you planning to fund?**`;
        quickReplies = ['Loans without collateral', 'How to get 35% PMEGP subsidy?', 'Schemes for Women Entrepreneurs', 'PM SVANidhi for Street Vendors'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 2: COLLATERAL-FREE / GUARANTEE-FREE LOAN INQUIRIES
    // -------------------------------------------------------------
    else if (lowerMsg.includes('collateral') || lowerMsg.includes('guarantee') || lowerMsg.includes('girvi') || lowerMsg.includes('bina guarantee') || lowerMsg.includes('security')) {
      const colSchemes = schemes.filter(s => ['mudra-yojana', 'pm-svanidhi', 'cgtmse'].includes(s.id));
      suggestedSchemes = colSchemes;

      if (isHindi) {
        responseText = `### 🛡️ बिना किसी गारंटी या गिरवी (Collateral-Free) के सरकारी ऋण:\n\nभारत सरकार के नियमों के अनुसार छोटे उद्यमियों को अपनी संपत्ति गिरवी रखे बिना निम्नलिखित 3 प्रमुख योजनाओं में ऋण मिलता है:\n\n1. **प्रधानमंत्री मुद्रा योजना (PMMY)**:\n   * **शिशु ऋण**: ₹50,000 तक (शुरुआती व्यापार/दुकान के लिए, शून्य प्रोसेसिंग शुल्क)।\n   * **किशोर ऋण**: ₹50,000 से ₹5 लाख तक।\n   * **तरुण ऋण**: ₹5 लाख से ₹20 लाख तक।\n   * **कोई गारंटी नहीं**: क्रेडिट गारंटी फंड (CGFMU) द्वारा 100% समर्थित।\n\n2. **पीएम स्वनिधि (PM SVANidhi)**:\n   * रेहड़ी-पटरी और छोटे फेरीवालों के लिए ₹10,000 से ₹50,000 तक बिना किसी गारंटी का वर्किंग कैपिटल ऋण।\n   * 7% ब्याज सब्सिडी और ₹1,200/वर्ष का यूपीआई कैशबैक।\n\n3. **CGTMSE योजना**:\n   * विनिर्माण और सेवा इकाइयों के लिए ₹5 करोड़ तक का बैंक ऋण, जिसमें 75% से 85% गारंटी भारत सरकार देती है।\n\n💡 **आवेदन करने के लिए**: आपको केवल आधार कार्ड, पैन कार्ड, बैंक खाता और निःशुल्क **उद्यम पंजीकरण (Udyam Registration)** की आवश्यकता है।`;
        quickReplies = ['मुद्रा योजना में आवेदन कैसे करें?', 'पीएम स्वनिधि के नियम', 'उद्यम पंजीकरण कैसे कराएं?'];
      } else {
        responseText = `### 🛡️ Collateral-Free & Zero-Guarantor Government Schemes:\n\nUnder Government of India guidelines, small entrepreneurs do not need to pledge land, gold, or third-party guarantees to access institutional loans:\n\n1. **Pradhan Mantri MUDRA Yojana (PMMY)**:\n   * **Shishu**: Loans up to ₹50,000 (ideal for micro-trades, zero processing fee).\n   * **Kishore**: ₹50,001 to ₹5 Lakhs (for equipment and inventory expansion).\n   * **Tarun / Tarun Plus**: ₹5 Lakhs to ₹20 Lakhs.\n   * **Collateral**: Zero. Guaranteed by Credit Guarantee Fund for Micro Units (CGFMU).\n\n2. **PM SVANidhi**:\n   * Collateral-free working capital from ₹10,000 up to ₹50,000 for street vendors and small stall owners.\n   * Comes with 7% annual interest subsidy via DBT.\n\n3. **CGTMSE (Credit Guarantee Trust for Micro & Small Enterprises)**:\n   * Credit facilities up to ₹5 Crore without third-party guarantee for manufacturing and service MSMEs.\n\n💡 **To get started**: Register your business for free on the official government Udyam portal (udyamregistration.gov.in).`;
        quickReplies = ['How to apply for MUDRA loan?', 'PM SVANidhi details', 'What documents are required?'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 3: WOMEN ENTREPRENEURS & SHGs
    // -------------------------------------------------------------
    else if (lowerMsg.includes('women') || lowerMsg.includes('mahila') || lowerMsg.includes('female') || lowerMsg.includes('aurat') || lowerMsg.includes('shg') || lowerMsg.includes('lakhpati') || lowerMsg.includes('sakhi')) {
      const womenSchemes = schemes.filter(s => ['stand-up-india', 'lakhpati-didi', 'pmegp', 'udyam-sakhi'].includes(s.id));
      suggestedSchemes = womenSchemes;

      if (isHindi) {
        responseText = `### 👩 महिला उद्यमियों के लिए विशेष सरकारी योजनाएं एवं भारी सब्सिडी:\n\nमहिला सशक्तिकरण हेतु केंद्र सरकार की सबसे लाभदायक योजनाएं:\n\n1. **स्टैंड-अप इंडिया (Stand-Up India)**:\n   * प्रत्येक बैंक शाखा से कम से कम एक महिला उद्यमी को **₹10 लाख से ₹1 करोड़** तक का बैंक ऋण।\n   * नए व्यवसाय (ग्रीनफील्ड) हेतु मात्र 15% स्वयं का अंशदान।\n\n2. **PMEGP में 35% महिला सब्सिडी**:\n   * ग्रामीण क्षेत्र में नया उद्योग शुरू करने पर परियोजना लागत की **35% गैर-वापसी योग्य सब्सिडी (Margin Money Grant)** मिलती है (शहरी क्षेत्र में 25%)।\n   * विनिर्माण में ₹50 लाख और सेवा क्षेत्र में ₹20 लाख तक की परियोजना।\n\n3. **लखपति दीदी पहल (Lakhpati Didi)**:\n   * स्वयं सहायता समूह (SHG) की दीदियों को ₹1 लाख से ₹5 लाख तक का रियायती ऋण, डिजिटल ट्रेनिंग और बाजार लिंकेज।\n\n4. **उद्यम सखी पोर्टल**:\n   * सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय द्वारा महिलाओं को प्रोजेक्ट रिपोर्ट बनाने और मुफ्त मेंटरशिप देने की विशेष सुविधा।`;
        quickReplies = ['PMEGP 35% सब्सिडी का फॉर्म', 'स्टैंड-अप इंडिया के नियम', 'लखपति दीदी योजना'];
      } else {
        responseText = `### 👩 Prime Government Schemes for Women Entrepreneurs:\n\nThe Government of India provides dedicated quotas and higher subsidy brackets for women-led enterprises:\n\n1. **Stand-Up India Scheme**:\n   * Bank loans between **₹10 Lakhs and ₹1 Crore** sanctioned to at least one woman entrepreneur per bank branch.\n   * Tailored for greenfield (brand new) ventures in manufacturing, trading, or services.\n\n2. **PMEGP 35% Capital Subsidy**:\n   * Women entrepreneurs in rural areas receive the **maximum 35% non-refundable capital subsidy** on project costs up to ₹50 Lakhs (25% in urban areas).\n\n3. **Lakhpati Didi Initiative**:\n   * Empowers Self-Help Group (SHG) women with up to ₹5 Lakhs capital linkage, financial literacy, and supply-chain integration.\n\n4. **Udyam Sakhi Portal**:\n   * Free government business incubation, mentorship, and DPR drafting support for women.`;
        quickReplies = ['How to apply for Stand-Up India?', 'Calculate 35% PMEGP Subsidy', 'Lakhpati Didi requirements'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 4: STREET VENDORS, HAWKERS, THELA WALAS
    // -------------------------------------------------------------
    else if (lowerMsg.includes('vendor') || lowerMsg.includes('thela') || lowerMsg.includes('rehri') || lowerMsg.includes('patri') || lowerMsg.includes('hawker') || lowerMsg.includes('feriwale') || lowerMsg.includes('chai') || lowerMsg.includes('stall')) {
      const vendorSchemes = schemes.filter(s => ['pm-svanidhi', 'mudra-yojana', 'day-nulm'].includes(s.id));
      suggestedSchemes = vendorSchemes;

      if (isHindi) {
        responseText = `### 🛒 रेहड़ी-पटरी एवं छोटे फेरीवालों के लिए विशेष सहायता:\n\n**प्रधानमंत्री स्ट्रीट वेंडर्स आत्मनिर्भर निधि (PM SVANidhi)**:\n\n* **1st किस्त**: **₹10,000** (1 साल में आसान किस्तों में चुकाएं)।\n* **2nd किस्त**: समय पर भुगतान करने पर **₹20,000** का अगला ऋण।\n* **3rd किस्त**: बेहतर क्रेडिट हिस्ट्री पर **₹50,000** तक का ऋण।\n* **ब्याज सब्सिडी**: 7% प्रति वर्ष की ब्याज सब्सिडी सीधे आपके बैंक खाते में जमा होती है।\n* **कैशबैक**: क्यूआर कोड (UPI) से डिजिटल भुगतान लेने पर हर साल **₹1,200** तक का कैशबैक मिलता है।\n\n📌 **दस्तावेज़**: आधार कार्ड, बैंक पासबुक, और नगर निगम/नगर पालिका का वेंडिंग सर्टिफिकेट या सिफारिश पत्र (LoR)।`;
        quickReplies = ['स्वनिधि में ऑनलाइन आवेदन कैसे करें?', 'सिफारिश पत्र (LoR) कैसे पाएं?', 'मुद्रा शिशु ऋण'];
      } else {
        responseText = `### 🛒 Dedicated Welfare for Street Vendors & Hawkers:\n\n**PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)**:\n\n* **Tranche 1**: **₹10,000** working capital loan with zero collateral.\n* **Tranche 2**: Upgraded to **₹20,000** on timely repayment of 1st tranche.\n* **Tranche 3**: Enhanced to **₹50,000** for enterprise expansion.\n* **7% Interest Subsidy**: Credited directly to your bank account via Direct Benefit Transfer (DBT).\n* **Digital Cashbacks**: Earn up to ₹1,200 annually for accepting UPI payments.\n\n📌 **Paperwork**: Aadhaar card, mobile number linked to bank, and Municipal Vending Card / Letter of Recommendation (LoR).`;
        quickReplies = ['Apply for PM SVANidhi', 'How to get LoR from municipality?', 'Explore MUDRA Shishu'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 5: TRADITIONAL ARTISANS, CRAFTSMEN, VISHWAKARMA
    // -------------------------------------------------------------
    else if (lowerMsg.includes('artisan') || lowerMsg.includes('craft') || lowerMsg.includes('vishwakarma') || lowerMsg.includes('darzi') || lowerMsg.includes('tailor') || lowerMsg.includes('carpenter') || lowerMsg.includes('badhai') || lowerMsg.includes('kumhar') || lowerMsg.includes('lohar') || lowerMsg.includes('weaver') || lowerMsg.includes('bunkar') || lowerMsg.includes('mistry')) {
      const artSchemes = schemes.filter(s => ['pm-vishwakarma', 'mudra-yojana', 'pmegp'].includes(s.id));
      suggestedSchemes = artSchemes;

      if (isHindi) {
        responseText = `### 🔨 पारंपरिक कारीगरों एवं दस्तकारों के लिए पीएम विश्वकर्मा योजना:\n\nयह योजना 18 पारंपरिक व्यवसायों (बढ़ई, लोहार, कुम्हार, दर्जी, राजमिस्त्री, मोची, मूर्तिकार, आदि) के लिए शुरू की गई है:\n\n1. **निःशुल्क प्रमाण पत्र**: पीएम विश्वकर्मा प्रमाण पत्र और डिजिटल आईडी कार्ड।\n2. **कौशल प्रशिक्षण**: 5-7 दिनों का बुनियादी प्रशिक्षण + **₹500 प्रतिदिन वजीफा (Stipend)**।\n3. **₹15,000 टूलकिट अनुदान**: आधुनिक औजार खरीदने के लिए ₹15,000 का ई-वाउचर।\n4. **रियायती ऋण**: मात्र **5% ब्याज दर** पर पहले ₹1 लाख और फिर ₹2 लाख का बिना गारंटी ऋण।\n\n📌 **आवेदन कैसे करें**: नजदीकी कॉमन सर्विस सेंटर (CSC) पर बायोमेट्रिक प्रमाणीकरण कराकर ऑनलाइन पंजीकरण कराएं।`;
        quickReplies = ['विश्वकर्मा में 18 ट्रेड कौन से हैं?', '₹15,000 टूलकिट वाउचर कैसे मिलेगा?', 'CSC सेंटर पर क्या ले जाना है?'];
      } else {
        responseText = `### 🔨 PM Vishwakarma Yojana for Traditional Artisans & Craftspeople:\n\nSpecially crafted for 18 traditional family trades (carpenters, blacksmiths, potters, cobblers, tailors, masons, sculptors, etc.):\n\n1. **Official Recognition**: Free PM Vishwakarma Digital Certificate and ID.\n2. **Skill Training**: 5-7 days hands-on training with **₹500/day daily allowance**.\n3. **₹15,000 Free Toolkit Grant**: Direct digital e-voucher for modern power tools.\n4. **Subsidized Credit**: Collateral-free enterprise loan up to **₹3 Lakhs at only 5% interest rate** (Tranche 1: ₹1 Lakh; Tranche 2: ₹2 Lakhs).\n\n📌 **How to Apply**: Visit your nearest Common Service Centre (CSC) with your Aadhaar and bank details for biometric verification.`;
        quickReplies = ['Eligible 18 trades list', 'How to claim ₹15k toolkit?', 'Apply at CSC centre'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 6: SUBSIDIES, MARGIN MONEY & INTEREST RATES
    // -------------------------------------------------------------
    else if (lowerMsg.includes('subsidy') || lowerMsg.includes('margin money') || lowerMsg.includes('interest') || lowerMsg.includes('rate') || lowerMsg.includes('chhoot') || lowerMsg.includes('paisa kitna') || lowerMsg.includes('grant')) {
      const subSchemes = schemes.filter(s => ['pmegp', 'pm-vishwakarma', 'mudra-yojana'].includes(s.id));
      suggestedSchemes = subSchemes;

      if (isHindi) {
        responseText = `### 💰 सरकारी सब्सिडी और ब्याज दरों की वास्तविक गणना:\n\n1. **PMEGP मार्जिन मनी सब्सिडी (सबसे बड़ी सरकारी सब्सिडी)**:\n   * **सामान्य वर्ग (शहरी)**: 15% सब्सिडी (10% खुद का पैसा लगाना होगा)।\n   * **सामान्य वर्ग (ग्रामीण)**: 25% सब्सिडी (10% खुद का पैसा)।\n   * **विशेष वर्ग (SC/ST/OBC/महिला/ग्रामीण/दिव्यांग)**: **35% सीधी सरकारी सब्सिडी** (मात्र 5% खुद का अंशदान)।\n   * *उदाहरण*: ₹10 लाख के ग्रामीण प्रोजेक्ट पर सरकार **₹3,50,000 की सब्सिडी** देती है जो वापस नहीं लौटानी होती!\n\n2. **पीएम विश्वकर्मा**: बाजार में 11-14% ब्याज के मुकाबले मात्र **5% ब्याज दर** (बाकी ब्याज सरकार वहन करती है)।\n\n3. **पीएम स्वनिधि**: समय पर भुगतान पर **7% ब्याज अनुदान** सीधे खाते में।`;
        quickReplies = ['PMEGP 35% सब्सिडी का फॉर्म', 'खुद का अंशदान कितना लगेगा?', 'डीपीआर (Project Report) कैसे बनाएं?'];
      } else {
        responseText = `### 💰 Subsidy Rates & Real Financial Computations:\n\n1. **PMEGP Margin Money Subsidy (Largest Capital Grant in India)**:\n   * **General Category (Urban)**: 15% subsidy (10% personal contribution).\n   * **General Category (Rural)**: 25% subsidy (10% personal contribution).\n   * **Special Categories (SC/ST/OBC/Women/Rural/Minority/PwD)**: **35% Non-refundable Capital Subsidy** (only 5% personal contribution required).\n   * *Case Study*: On a ₹10,00,000 rural manufacturing venture, the Government deposits a **₹3,50,000 non-repayable subsidy** into your bank escrow account!\n\n2. **PM Vishwakarma**: Concessional loan rate of only **5% per annum** (balance interest subvented by Ministry of MSME).\n\n3. **PM SVANidhi**: **7% annual interest subsidy** credited directly to your bank account.`;
        quickReplies = ['How to prepare DPR for PMEGP?', 'Check exact subsidy for my category', 'MUDRA loan rates'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 7: DOCUMENTS & PAPERWORK CHECKLIST
    // -------------------------------------------------------------
    else if (lowerMsg.includes('document') || lowerMsg.includes('dastavez') || lowerMsg.includes('kagaz') || lowerMsg.includes('paper') || lowerMsg.includes('udyam') || lowerMsg.includes('pan') || lowerMsg.includes('aadhaar')) {
      if (targetScheme) {
        suggestedSchemes = [targetScheme];
        const docs = targetScheme.documentsRequired || [];
        if (isHindi) {
          responseText = `### 📄 ${targetScheme.nameHi} के लिए आवश्यक दस्तावेज़:\n\n${targetScheme.nameHi} में आवेदन करने हेतु निम्नलिखित आधिकारिक कागजात तैयार रखें:\n\n${docs.map((d, i) => `${i + 1}. **${d}**`).join('\n')}\n\n* **अधिकतम वित्तीय सहायता**: ${targetScheme.maxAmount}\n* **ब्याज दर / छूट**: ${targetScheme.interestRate}\n\n🔗 **आधिकारिक आवेदन पोर्टल**: [${targetScheme.applicationUrl}](${targetScheme.applicationUrl})`;
          quickReplies = [`${targetScheme.name.slice(0, 20)} के लाभ`, 'आवेदन की प्रक्रिया', 'अन्य योजनाएं देखें'];
        } else {
          responseText = `### 📄 Required Documents for ${targetScheme.name}:\n\nTo apply for ${targetScheme.name}, ensure you have the following official paperwork ready:\n\n${docs.map((d, i) => `${i + 1}. **${d}**`).join('\n')}\n\n* **Maximum Benefit Ceiling**: ${targetScheme.maxAmount}\n* **Interest Rate / Terms**: ${targetScheme.interestRate}\n\n🔗 **Official Application Portal**: [${targetScheme.applicationUrl}](${targetScheme.applicationUrl})`;
          quickReplies = [`Key benefits of ${targetScheme.name.slice(0, 20)}`, 'Step-by-step application guide', 'Explore related schemes'];
        }
      } else {
        const docSchemes = schemes.filter(s => ['pmegp', 'mudra-yojana'].includes(s.id));
        suggestedSchemes = docSchemes;

        if (isHindi) {
          responseText = `### 📄 सरकारी योजनाओं के लिए आवश्यक संपूर्ण दस्तावेज़ सूची:\n\nकिसी भी एमएसएमई ऋण या सब्सिडी के लिए निम्नलिखित दस्तावेज़ तैयार रखें:\n\n1. **पहचान एवं निवास प्रमाण**: आधार कार्ड (सक्रिय मोबाइल लिंक अनिवार्य), पैन कार्ड, वोटर आईडी / राशन कार्ड।\n2. **उद्यम पंजीकरण (Udyam Registration Certificate)**: यह udyamregistration.gov.in पर 10 मिनट में 100% मुफ्त बनता है।\n3. **बैंक खाता विवरण**: चालू या बचत खाते का पिछले 6 महीने का बैंक स्टेटमेंट।\n4. **जाति प्रमाण पत्र (Caste Certificate)**: SC, ST, या OBC वर्ग के लिए (35% तक सब्सिडी क्लेम करने हेतु आवश्यक)।\n5. **परियोजना रिपोर्ट (DPR)**: खरीदी जाने वाली मशीनरी, कच्चा माल या दुकान के सामान का अधिकृत कोटेशन (Quotation)।\n6. **शिक्षा प्रमाण पत्र**: 8वीं या 10वीं पास की मार्कशीट (PMEGP में ₹10 लाख से ऊपर की परियोजना के लिए अनिवार्य)।`;
          quickReplies = ['उद्यम सर्टिफिकेट कैसे बनाएं?', 'प्रोजेक्ट रिपोर्ट (DPR) कैसे बनाएं?', 'बिना जाति प्रमाण पत्र के क्या लाभ हैं?'];
        } else {
          responseText = `### 📄 Complete Master Document Checklist for MSME Schemes:\n\nKeep the following standard paperwork ready for seamless approvals without broker delays:\n\n1. **KYC Verification**: Aadhaar Card (OTP linked to active mobile), PAN Card, Voter Card / Passport.\n2. **Udyam Registration Certificate**: Free 10-minute online registration at official udyamregistration.gov.in.\n3. **Banking Records**: Last 6 months bank statement showing regular transactions.\n4. **Social Category Certificate**: SC / ST / OBC / EWS certificate issued by revenue authority (for 35% subsidies).\n5. **Detailed Project Report (DPR)**: Itemized quotation of machinery, equipment, or working inventory from GST-registered vendors.\n6. **Educational Proof**: 8th or 10th pass certificate (mandatory for PMEGP project costs exceeding ₹10 Lakhs in manufacturing).`;
          quickReplies = ['How to create free Udyam certificate?', 'DPR project report format', 'Check bank requirements'];
        }
      }
    }

    // -------------------------------------------------------------
    // INTENT 8: SPECIFIC SCHEME INQUIRY (MUDRA, PMEGP, SVANidhi, etc.)
    // -------------------------------------------------------------
    else if (targetScheme) {
      suggestedSchemes = [targetScheme];

      if (isHindi) {
        responseText = `### 🏛️ ${targetScheme.nameHi}\n\n${targetScheme.descriptionHi}\n\n* **अधिकतम वित्तीय सहायता**: **${targetScheme.maxAmount}**\n* **ब्याज दर / छूट**: **${targetScheme.interestRate}**\n* **सब्सिडी**: **${targetScheme.subsidyRate}**\n* **मंत्रालय**: ${targetScheme.ministryHi}\n\n#### 🌟 मुख्य लाभ:\n${targetScheme.benefitsHi.slice(0, 4).map(b => `* ${b}`).join('\n')}\n\n🔗 **आधिकारिक आवेदन लिंक**: [${targetScheme.applicationUrl}](${targetScheme.applicationUrl})`;
        quickReplies = [`${targetScheme.name.slice(0, 20)} के दस्तावेज़`, 'आवेदन के चरण', 'अन्य योजनाएं दिखाएं'];
      } else {
        responseText = `### 🏛️ ${targetScheme.name}\n\n${targetScheme.description}\n\n* **Maximum Benefit**: **${targetScheme.maxAmount}**\n* **Interest Rate**: **${targetScheme.interestRate}**\n* **Subsidy Support**: **${targetScheme.subsidyRate}**\n* **Administering Ministry**: ${targetScheme.ministry}\n\n#### 🌟 Key Advantages:\n${targetScheme.benefits.slice(0, 4).map(b => `* ${b}`).join('\n')}\n\n🔗 **Official Application Link**: [${targetScheme.applicationUrl}](${targetScheme.applicationUrl})`;
        quickReplies = [`Required documents for ${targetScheme.name.slice(0, 20)}`, 'Step-by-step application guide', 'Explore related schemes'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 9: PROFILE-BASED DIRECT SCORING
    // -------------------------------------------------------------
    else if (profile && typeof profile === 'object' && profile.businessType) {
      const matches = matchSchemes(profile);
      const top3 = matches.slice(0, 3);
      suggestedSchemes = top3.map(m => m.scheme);

      if (isHindi) {
        responseText = `नमस्ते **${profile.name || 'उद्यमी साथी'}**! आपके प्रोफाइल (**${profile.businessType}**, वर्ग: **${profile.category || 'General'}**, राज्य: **${profile.state || 'भारत'}**) के आधार पर आपकी सर्वोच्च योजनाएं:\n\n`;
        top3.forEach((m, idx) => {
          responseText += `${idx + 1}. **${m.scheme.nameHi}** — **${m.matchScore}% अनुकूलता** (${m.eligibilityStatusHi})\n   * **अधिकतम लाभ**: ${m.scheme.maxAmount}\n   * **पात्रता का मुख्य कारण**: ${m.matchReasons.slice(0, 2).join('; ')}\n\n`;
        });
        responseText += `💡 किसी भी योजना की विस्तृत चेकलिस्ट देखने के लिए नीचे दिए गए कार्ड पर क्लिक करें।`;
        quickReplies = ['दस्तावेज़ों की सूची', 'आवेदन की प्रक्रिया', 'अन्य योजनाएं देखें'];
      } else {
        responseText = `Hello **${profile.name || 'Entrepreneur'}**! Based on your profile (**${profile.businessType}**, Category: **${profile.category || 'General'}**, State: **${profile.state || 'India'}**), here are your top matches:\n\n`;
        top3.forEach((m, idx) => {
          responseText += `${idx + 1}. **${m.scheme.name}** — **${m.matchScore}% Match** (${m.eligibilityStatus})\n   * **Ceiling**: ${m.scheme.maxAmount}\n   * **Key Qualification**: ${m.matchReasons.slice(0, 2).join('; ')}\n\n`;
        });
        quickReplies = ['View detailed document checklist', 'How to apply', 'Explore all schemes'];
      }
    }

    // -------------------------------------------------------------
    // INTENT 10: DYNAMIC NATURAL LANGUAGE SEARCH VIA TINYFISH
    // -------------------------------------------------------------
    else {
      // Intelligently find relevant schemes from keywords
      const matched = schemes.filter(s => {
        const full = `${s.name} ${s.nameHi} ${s.description} ${s.category} ${s.tags.join(' ')}`.toLowerCase();
        return lowerMsg.split(/\s+/).some(word => word.length >= 3 && full.includes(word));
      });

      const displaySchemes = (matched.length > 0 ? matched : schemes).slice(0, 3);
      suggestedSchemes = displaySchemes;

      if (isHindi) {
        responseText = `आपके प्रश्न (**"${trimmedMsg}"**) के संबंध में भारत सरकार के आधिकारिक दिशा-निर्देश:\n\n`;
        if (liveSearchResult?.results?.length > 0) {
          responseText += `🔎 **लाइव सरकारी वेब सर्च परिणाम (TinyFish Web Agent):**\n${liveSearchResult.results.slice(0, 2).map(r => `* [${r.title}](${r.url})\n  ${r.snippet}`).join('\n\n')}\n\n`;
        }
        responseText += `📌 **इस विषय से संबंधित सर्वाधिक उपयुक्त सरकारी योजनाएं:**\n\n`;
        displaySchemes.forEach((s, idx) => {
          responseText += `${idx + 1}. **${s.nameHi}** (${s.category})\n   * **अधिकतम सहायता**: ${s.maxAmount}\n   * ${s.shortDescriptionHi}\n\n`;
        });
        responseText += `💡 अपनी सटीक पात्रता और सब्सिडी प्रतिशत जानने के लिए अपना व्यवसाय (जैसे दुकान, सिलाई, ठेला, कारखाना), आयु और जाति बताएं।`;
        quickReplies = ['आवेदन करने के लिए आवश्यक दस्तावेज़', 'मुद्रा लोन के नियम', '35% PMEGP सब्सिडी'];
      } else {
        responseText = `Regarding your inquiry (**"${trimmedMsg}"**), here is the verified regulatory guidance under Government of India MSME norms:\n\n`;
        if (liveSearchResult?.results?.length > 0) {
          responseText += `🔎 **Live Web Intelligence (TinyFish Search API):**\n${liveSearchResult.results.slice(0, 2).map(r => `* [${r.title}](${r.url})\n  ${r.snippet}`).join('\n\n')}\n\n`;
        }
        responseText += `📌 **Most Relevant Government Schemes for your Query:**\n\n`;
        displaySchemes.forEach((s, idx) => {
          responseText += `${idx + 1}. **${s.name}** (${s.category})\n   * **Maximum Limit**: ${s.maxAmount}\n   * ${s.shortDescription}\n\n`;
        });
        responseText += `💡 Share your trade (e.g. retail shop, tailoring, carpentry, street vending), age, and social category to calculate your exact 0-100% eligibility score!`;
        quickReplies = ['Check documents required', 'How to apply without collateral', 'Explore all 27 schemes'];
      }
    }

    res.json({
      success: true,
      query: trimmedMsg,
      language: isHindi ? 'hi' : 'en',
      response: responseText,
      reply: responseText,
      suggestedSchemes,
      sources,
      quickReplies
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/assistant/guide
 * Generates an end-to-end actionable application dossier and checklist for a scheme
 */
router.post('/guide', (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw AppError.badRequest('Request body must be a JSON object');
    }

    const { schemeId, profile = null, language = 'en' } = req.body;

    if (!schemeId || typeof schemeId !== 'string') {
      throw AppError.badRequest('"schemeId" string is required');
    }

    const scheme = schemes.find(s => s.id === schemeId);
    if (!scheme) {
      throw AppError.notFound(`Scheme with id "${schemeId}" not found`);
    }

    const isHindi = language === 'hi';
    const warningText = isHindi
      ? '⚠️ चेतावनी: सरकारी योजनाओं में आवेदन के लिए किसी भी निजी बिचौलिए या दलाल को नकद राशि न दें। ऑनलाइन आवेदन जनसमर्थ पोर्टल या अधिकृत सीएससी पर ही करें।'
      : '⚠️ Caution / Anti-Scam Notice: Government schemes do not charge unauthorized commissions. Apply only via official ministry portals (JanSamarth, KVIC, Udyam) or certified Common Service Centres (CSCs).';

    const guidance = {
      schemeId: scheme.id,
      schemeName: isHindi ? scheme.nameHi : scheme.name,
      ministry: isHindi ? scheme.ministryHi : scheme.ministry,
      maxAmount: scheme.maxAmount,
      interestRate: scheme.interestRate,
      applicationUrl: scheme.applicationUrl,
      documentChecklist: scheme.documentsRequired.map((doc, idx) => ({
        step: idx + 1,
        document: doc,
        status: 'required',
        notes: isHindi ? 'मूल प्रति एवं स्व-प्रमाणित फोटोकॉपी साथ रखें' : 'Carry original and self-attested photocopy'
      })),
      onlineSteps: (isHindi ? scheme.stepsToApplyHi : scheme.stepsToApply).map((step, idx) => ({
        stepNumber: idx + 1,
        instruction: step
      })),
      offlineSupportCenters: [
        {
          name: isHindi ? 'कॉमन सर्विस सेंटर (CSC / जन सेवा केंद्र)' : 'Common Service Centre (CSC / Digital Seva)',
          role: isHindi ? 'बायोमेट्रिक प्रमाणीकरण एवं ऑनलाइन फॉर्म भरने में सहायता (शुल्क मात्र ₹30-50)' : 'Biometric authentication and online application submission assistance (Nominal fee ₹30-50)'
        },
        {
          name: isHindi ? 'जिला उद्योग केंद्र (DIC)' : 'District Industries Centre (DIC)',
          role: isHindi ? 'परियोजना रिपोर्ट (DPR), सरकारी सब्सिडी अनुमोदन व ऋण संस्तुति' : 'DPR preparation, subsidy recommendation, and single-window clearance'
        },
        {
          name: isHindi ? 'अग्रणी जिला बैंक (Lead District Bank Branch)' : 'Lead District Bank Branch / KVIC Office',
          role: isHindi ? 'ऋण स्वीकृति, क्रेडिट गारंटी नामांकन और सब्सिडी एस्क्रो खाता खोलना' : 'Loan sanction, credit guarantee underwriting, and subsidy escrow management'
        }
      ],
      scamWarning: warningText,
      antiScamWarning: warningText
    };

    res.json({
      success: true,
      data: guidance,
      guidance
    });
  } catch (error) {
    next(error);
  }
});

export default router;
