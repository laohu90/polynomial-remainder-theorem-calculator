import React from 'react';
import { Translations } from '../utils/i18n';
import { GitBranch, ShieldCheck } from 'lucide-react';

interface FooterProps {
  t: Translations;
  onSelectTab: (tab: 'remainder' | 'completing' | 'practice') => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-12 text-slate-500 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="text-base font-bold text-slate-900 mb-1">
              Polynomial Remainder Theorem Calculator
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              {t.footerDisclaimer}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('remainder')}
              className="hover:text-slate-900 transition-colors"
            >
              {t.navCalculator}
            </button>
            <button
              onClick={() => onSelectTab('completing')}
              className="hover:text-slate-900 transition-colors"
            >
              {t.navCompletingSquare}
            </button>
            <button
              onClick={() => onSelectTab('practice')}
              className="hover:text-slate-900 transition-colors"
            >
              {t.navPractice}
            </button>
            <a href="#guide" className="hover:text-slate-900 transition-colors">
              {t.navFaq}
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free · Step-by-Step Solver · No Paywalls · Mobile Optimized</span>
          </div>

          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} RemainderTheorem.pro · {t.footerRights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
