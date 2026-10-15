import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  CornerDownLeft,
  ShieldCheck,
  Languages,
  Mic,
  MicOff
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import ChatBubble from '../components/ChatBubble';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { api } from '../lib/api';

export default function Assistant() {
  const { lang, t } = useLanguage();
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const initialGreetingEn = "Namaste! I am your Vyapar Mitra AI Assistant powered by TinyFish. I can help you understand Government of India loan schemes, capital subsidies, eligibility conditions for SC/ST/OBC/Women, and required documentation. How can I assist your business today?";
  const initialGreetingHi = "नमस्ते! मैं व्यापार मित्र एआई सहायक हूँ (TinyFish द्वारा संचालित)। मैं भारत सरकार की ऋण योजनाओं, पूंजी सब्सिडी, एससी/एसटी/ओबीसी/महिला पात्रता शर्तों और आवश्यक दस्तावेजों को समझने में आपकी सहायता कर सकता हूँ। आज मैं आपके व्यवसाय की क्या मदद कर सकता हूँ?";

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      role: 'assistant',
      content: lang === 'hi' ? initialGreetingHi : initialGreetingEn,
      time: 'Just now',
      suggestedSchemes: ['pm-svanidhi', 'mudra-yojana', 'pmegp', 'pm-vishwakarma'],
      quickReplies: lang === 'hi'
        ? ['रेहड़ी-पटरी वालों के लिए ऋण', 'मुद्रा योजना में बिना गारंटी लोन', '35% PMEGP सब्सिडी कैसे मिलती है?', 'कारीगरों के लिए विश्वकर्मा योजना']
        : ['Loans without collateral', 'How to get 35% PMEGP subsidy?', 'Schemes for Women Entrepreneurs', 'PM SVANidhi for Street Vendors']
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Initialize Web Speech API for Hindi & English Voice Input
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        setInputMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
      recognitionRef.current = null;
    }
  }, [lang]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(t('voice_not_supported'));
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start exception:', err);
      }
    }
  };

  const quickQuestions = [
    {
      en: "How to apply for MUDRA loan without collateral?",
      hi: "मुद्रा योजना में बिना गारंटी ऋण के लिए आवेदन कैसे करें?"
    },
    {
      en: "What are the benefits for women entrepreneurs?",
      hi: "महिला उद्यमियों के लिए सरकारी योजनाओं के क्या लाभ हैं?"
    },
    {
      en: "What documents are needed for PM SVANidhi?",
      hi: "पीएम स्वनिधि योजना के लिए कौन से दस्तावेज चाहिए?"
    },
    {
      en: "How does the 35% PMEGP subsidy work?",
      hi: "PMEGP में 35% सरकारी सब्सिडी कैसे मिलती है?"
    },
    {
      en: "Which schemes are available for traditional artisans?",
      hi: "पारंपरिक कारीगरों के लिए कौन सी योजनाएं उपलब्ध हैं?"
    }
  ];

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current && messages.length > 1) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (userText) => {
    const textToSend = userText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessageObj = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessageObj]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await api.chatWithAssistant(textToSend, lang, messages);
      const aiReplyObj = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.reply || response.response || response.message || (lang === 'hi' ? "नमस्ते! मैं आपकी क्या सहायता कर सकता हूँ?" : "Hello! How can I assist your enterprise today?"),
        suggestedSchemes: response.suggestedSchemes || [],
        quickReplies: response.quickReplies || [],
        sources: response.sources || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReplyObj]);
    } catch (err) {
      console.error(err);
      const errorObj = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: lang === 'hi'
          ? "माफ़ कीजिए, उत्तर प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।"
          : "Sorry, I had trouble retrieving the official guidelines. Please try again.",
        time: 'Just now'
      };
      setMessages(prev => [...prev, errorObj]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: lang === 'hi' ? initialGreetingHi : initialGreetingEn,
        time: 'Just now',
        suggestedSchemes: ['pm-svanidhi', 'pm-mudra', 'pmegp', 'pm-vishwakarma'],
        quickReplies: lang === 'hi'
          ? ['रेहड़ी-पटरी वालों के लिए ऋण', 'मुद्रा योजना में बिना गारंटी लोन', '35% PMEGP सब्सिडी कैसे मिलती है?', 'कारीगरों के लिए विश्वकर्मा योजना']
          : ['Loans without collateral', 'How to get 35% PMEGP subsidy?', 'Schemes for Women Entrepreneurs', 'PM SVANidhi for Street Vendors']
      }
    ]);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 font-heading tracking-tight">
                {t('assistant_title')}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-950 text-xs font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>TinyFish AI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('assistant_subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 shadow-subtle transition-all"
              title={t('reset_chat_btn')}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('reset_chat_btn')}</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="py-4">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {t('quick_prompts_title')}
          </span>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => {
              const text = lang === 'hi' ? q.hi : q.en;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(text)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-xs text-slate-700 hover:text-brand-950 font-medium transition-all shadow-subtle text-left"
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat History Panel */}
        <div ref={chatContainerRef} className="flex-1 bg-slate-100/60 rounded-3xl border border-slate-200 p-4 sm:p-6 overflow-y-auto max-h-[520px] shadow-inner space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              onSendQuickReply={handleSendMessage}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 my-4"
            >
              <div className="w-9 h-9 rounded-2xl bg-brand-950 text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-sm flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  {t('typing_indicator')}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="mt-4 pt-2">
          {/* Active Voice Listening Feedback Bar */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mb-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-semibold text-amber-900"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <span>{t('voice_input_listening')}</span>
                </div>
                <button
                  onClick={toggleVoiceInput}
                  className="text-xs text-rose-700 hover:underline font-bold"
                >
                  {lang === 'hi' ? 'रोकें' : 'Stop'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-center bg-white rounded-2xl border border-slate-300 shadow-card focus-within:border-brand-950 focus-within:ring-2 focus-within:ring-brand-950/20 transition-all p-1.5 gap-1.5">
            <textarea
              rows={inputMessage.length > 80 ? 2 : 1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('assistant_placeholder')}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent border-0 focus:outline-none resize-none text-slate-800 placeholder-slate-400 max-h-32"
            />

            {/* Voice Input Mic Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              title={t('voice_input_tooltip')}
              className={`p-2.5 rounded-xl transition-all shrink-0 flex items-center justify-center ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:text-brand-950 hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <Button
              variant="primary"
              size="sm"
              disabled={!inputMessage.trim() || isTyping}
              onClick={() => handleSendMessage()}
              iconRight={Send}
              className="rounded-xl px-4 shrink-0 font-semibold"
            >
              <span className="hidden sm:inline">{t('assistant_send')}</span>
            </Button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-2">
            <span>{t('assistant_shortcut_hint')}</span>
            <span className="flex items-center gap-1 text-brand-950 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t('powered_by_badge')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
