import React, { useState } from 'react';
import { Bot, User, Copy, Check, Sparkles, ArrowRight, ExternalLink, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_SCHEMES } from '../lib/constants';

function renderFormattedText(text) {
  if (!text) return null;

  // Split into lines
  const lines = text.split('\n');

  return (
    <div className="space-y-2">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} className="h-1.5" />;
        }

        // Heading 3: ### Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={lIdx} className="font-bold text-slate-900 text-sm sm:text-base mt-2 mb-1 flex items-center gap-1.5">
              {formatInline(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }

        // Heading 2: ## Heading
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={lIdx} className="font-extrabold text-slate-950 text-base sm:text-lg mt-3 mb-1">
              {formatInline(trimmed.replace(/^##\s+/, ''))}
            </h2>
          );
        }

        // Unordered list item: * or -
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm pl-2">
              <span className="text-amber-500 font-bold select-none">•</span>
              <div className="flex-1">{formatInline(trimmed.replace(/^[\*\-]\s+/, ''))}</div>
            </div>
          );
        }

        // Numbered list item: 1. 2. etc.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm pl-2">
              <span className="font-bold text-brand-950 select-none shrink-0">{numMatch[1]}.</span>
              <div className="flex-1">{formatInline(numMatch[2])}</div>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={lIdx} className="text-xs sm:text-sm leading-relaxed break-words">
            {formatInline(line)}
          </p>
        );
      })}
    </div>
  );
}

// Parses inline **bold**, *italic*, and [link text](url)
function formatInline(text) {
  if (!text) return '';

  // Regex to match markdown links: [text](url) or bold **text**
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // It's a link: [text](url)
      parts.push(
        <a
          key={`link-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-brand-950 font-semibold underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-amber-600 transition-colors"
        >
          <span>{match[2]}</span>
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
    } else if (match[4]) {
      // It's bold: **text**
      parts.push(
        <strong key={`bold-${match.index}`} className="font-bold text-slate-900">
          {match[4]}
        </strong>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ChatBubble({ message, onSelectScheme, onSendQuickReply }) {
  const [copied, setCopied] = useState(false);
  const isAi = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Resolve suggested schemes (handles string IDs or rich objects)
  const schemeIds = (message.suggestedSchemes || []).map(s => (typeof s === 'string' ? s : s?.id));
  const suggestedSchemesList = ALL_SCHEMES.filter(s => schemeIds.includes(s.id));
  (message.suggestedSchemes || []).forEach(s => {
    if (typeof s === 'object' && s?.id && !suggestedSchemesList.some(item => item.id === s.id)) {
      suggestedSchemesList.push({
        id: s.id,
        name: s.name,
        nameHi: s.nameHi,
        maxBenefit: s.maxAmount || s.maxBenefit || 'Financial Assistance',
        category: s.category || 'Government Scheme'
      });
    }
  });

  return (
    <div className={`flex gap-3 sm:gap-4 my-4 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
          isAi
            ? 'bg-brand-950 text-amber-400 border border-brand-900'
            : 'bg-amber-500 text-brand-950 font-bold border border-amber-600/30'
        }`}
      >
        {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      {/* Bubble container */}
      <div className={`flex flex-col max-w-[90%] sm:max-w-[80%] ${isAi ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            {isAi ? (
              <>
                <span className="font-bold text-brand-950">Vyapar Mitra AI</span>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-bold rounded">Govt Advisory</span>
              </>
            ) : (
              'You'
            )}
          </span>
          <span className="text-[10px] text-slate-400">
            {message.time || 'Just now'}
          </span>
        </div>

        <div
          className={`relative group rounded-2xl p-4 sm:p-5 leading-relaxed break-words overflow-hidden ${
            isAi
              ? 'bg-white text-slate-800 border border-slate-200/90 shadow-card'
              : 'bg-brand-950 text-white shadow-sm'
          }`}
        >
          {/* Formatted Content */}
          {isAi ? (
            renderFormattedText(message.content)
          ) : (
            <div className="whitespace-pre-line text-xs sm:text-sm">{message.content}</div>
          )}

          {/* Copy button for AI replies */}
          {isAi && (
            <button
              onClick={handleCopy}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
              title="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Suggested Schemes inside chat if returned by AI */}
          {isAi && suggestedSchemesList.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-brand-950 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Recommended Official Schemes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedSchemesList.map(scheme => (
                  <Link
                    key={scheme.id}
                    to={`/schemes/${scheme.id}`}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-brand-500 bg-slate-50/70 hover:bg-white transition-all flex items-center justify-between text-left group/item"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold text-slate-900 group-hover/item:text-brand-950 truncate">
                        {scheme.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        Assistance: {scheme.maxBenefit}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-brand-950 transition-transform group-hover/item:translate-x-0.5 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Follow-Up Actions / Next Questions */}
          {isAi && message.quickReplies && message.quickReplies.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Suggested Next Steps:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {message.quickReplies.map((qr, qidx) => (
                  <button
                    key={qidx}
                    type="button"
                    onClick={() => onSendQuickReply && onSendQuickReply(qr)}
                    className="px-2.5 py-1 text-xs rounded-xl bg-amber-50/80 hover:bg-amber-100/90 text-brand-950 border border-amber-200/80 font-semibold transition-all text-left flex items-center gap-1 shadow-xs"
                  >
                    <span>{qr}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sources badge if any */}
          {isAi && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-500">
              <Globe className="w-3 h-3 text-brand-900" />
              <span>Verified against official portals via TinyFish Agent</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
