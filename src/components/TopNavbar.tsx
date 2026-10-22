import React from 'react';
import { Language, Translations } from '../utils/i18n';
import { Globe } from 'lucide-react';

interface TopNavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeTab: 'remainder' | 'completing' | 'practice';
  onSelectTab: (tab: 'remainder' | 'completing' | 'practice') => void;
  t: Translations;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  onSelectTab,
  t,
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English (US)' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' },
    { code: 'zh', label: '简体中文' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('remainder');
          }}
          className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
        >
          RemainderTheorem<span className="text-indigo-600">.pro</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('remainder')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              activeTab === 'remainder' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            {t.navCalculator}
          </button>
          <button
            onClick={() => onSelectTab('completing')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              activeTab === 'completing' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            {t.navCompletingSquare}
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
              activeTab === 'practice' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            {t.navPractice}
          </button>
          <a
            href="#guide"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900"
          >
            {t.navFaq}
          </a>
        </nav>

        {/* Zone 3: 1 primary action with Language switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-slate-500 absolute left-2.5 pointer-events-none" />
            <select
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as Language)}
              aria-label="Select Language"
              className="pl-8 pr-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onSelectTab('practice')}
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            {t.testYourKnowledge}
          </button>
        </div>
      </div>
    </header>
  );
};
