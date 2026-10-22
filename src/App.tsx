import React, { useState, useEffect } from 'react';
import { Language, translations } from './utils/i18n';
import { TopNavbar } from './components/TopNavbar';
import { RemainderCalculator } from './components/RemainderCalculator';
import { CompletingTheSquareSection } from './components/CompletingTheSquareSection';
import { PracticeQuizSection } from './components/PracticeQuizSection';
import { EducationalGuide } from './components/EducationalGuide';
import { Footer } from './components/Footer';
import { Calculator, SquareSlash, Award, CheckCircle2, Zap, Bookmark } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('calc_lang');
      if (saved && ['en', 'es', 'fr', 'pt', 'zh'].includes(saved)) {
        return saved as Language;
      }
      // Check user agent language
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('zh')) return 'zh';
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('fr')) return 'fr';
      if (navLang.startsWith('pt')) return 'pt';
    } catch {
      // ignore
    }
    return 'en';
  });

  const [activeTab, setActiveTab] = useState<'remainder' | 'completing' | 'practice'>('remainder');

  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('calc_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Top Navbar adhering to Top Bar Contract */}
      <TopNavbar
        currentLang={lang}
        onSelectLang={handleSelectLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        t={t}
      />

      {/* Main Content Container */}
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Value Kicker */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full mb-3 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>High School Algebra 2 & Precalculus Math Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-balance mb-3">
            {activeTab === 'remainder' && t.appName}
            {activeTab === 'completing' && t.ctsHeading}
            {activeTab === 'practice' && t.practiceHeading}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {t.appTagline}
          </p>

          {/* Value proposition badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Step-by-Step Solutions
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Synthetic Division Tables
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completing the Square Walkthrough
            </span>
          </div>
        </div>

        {/* Tab Switcher - Segmented Control */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveTab('remainder')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'remainder'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{t.tabRemainder}</span>
            </button>

            <button
              onClick={() => setActiveTab('completing')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'completing'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SquareSlash className="w-4 h-4" />
              <span>{t.tabCompletingSquare}</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'practice'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t.tabPractice}</span>
            </button>
          </div>
        </div>

        {/* Tab View Container */}
        <div className="transition-opacity duration-150">
          {activeTab === 'remainder' && <RemainderCalculator t={t} />}
          {activeTab === 'completing' && <CompletingTheSquareSection t={t} />}
          {activeTab === 'practice' && <PracticeQuizSection t={t} />}
        </div>

        {/* Educational Content & FAQ Anchor (Below the fold) */}
        <div id="guide">
          <EducationalGuide t={t} />
        </div>
      </main>

      {/* Footer */}
      <Footer t={t} onSelectTab={setActiveTab} />
    </div>
  );
}
