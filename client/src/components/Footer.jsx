import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Heart, Sparkles, Building2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { lang, t } = useLanguage();

  const nationalPortals = [
    { name: "Jan Samarth Portal", url: "https://www.jansamarth.in/" },
    { name: "Udyam Registration", url: "https://udyamregistration.gov.in/" },
    { name: "KVIC PMEGP Portal", url: "https://www.kviconline.gov.in/" },
    { name: "MUDRA Mitra", url: "https://www.mudra.org.in/" },
    { name: "Stand-Up India Portal", url: "https://www.standupmitra.in/" },
    { name: "PM Vishwakarma Portal", url: "https://pmvishwakarma.gov.in/" }
  ];

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-950 flex items-center justify-center text-amber-400 font-bold shadow-md">
                <span className="font-heading text-lg">VM</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-brand-950 font-heading tracking-tight">
                  Vyapar<span className="text-amber-500 font-medium">Mitra</span>
                </span>
                <span className="block text-xs font-semibold text-slate-500">
                  व्यापार मित्र — वित्तीय समावेशन मंच
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {t('footer_desc')}
            </p>

            {/* Hackathon & TinyFish Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Powered by <strong>TinyFish Engine</strong></span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-950">
                <span>HackIIITD 2026</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-brand-950 transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-600 hover:text-brand-950 transition-colors">
                  {t('nav_find_schemes')}
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-slate-600 hover:text-brand-950 transition-colors">
                  {t('nav_all_schemes')}
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-slate-600 hover:text-brand-950 transition-colors">
                  {t('nav_assistant')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{t('footer_gov_links')}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {nationalPortals.map((portal) => (
                <a
                  key={portal.name}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-brand-950 transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{portal.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-brand-950 shrink-0 ml-1" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left max-w-xl">
            {t('disclaimer')}
          </p>

          <div className="flex items-center gap-1 text-slate-600">
            <span>Built with care for HackIIITD 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
