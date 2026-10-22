import React, { useState, useEffect } from 'react';
import { Language, translations } from './utils/i18n';
import { TopNavbar } from './components/TopNavbar';
import { RemainderCalculator } from './components/RemainderCalculator';
import { CompletingTheSquareSection } from './components/CompletingTheSquareSection';
import { PracticeQuizSection } from './components/PracticeQuizSection';
import { EducationalGuide } from './components/EducationalGuide';
import { Footer } from './components/Footer';
import { Calculator, SquareSlash, Award, CheckCircle2, Zap } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      // 1. Check URL query param ?lang=
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && ['en', 'es', 'fr', 'pt', 'zh'].includes(urlLang)) {
        return urlLang as Language;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem('calc_lang');
      if (saved && ['en', 'es', 'fr', 'pt', 'zh'].includes(saved)) {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'en'; // Strict default to English
  });

  const [activeTab, setActiveTab] = useState<'remainder' | 'completing' | 'practice'>('remainder');

  const t = translations[lang];

  // Dynamically update document title, description, and html lang attribute
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.title = t.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', t.metaDesc);
      }
    } catch {
      // ignore
    }
  }, [lang, t]);

  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('calc_lang', newLang);
      document.documentElement.lang = newLang;

      // Update URL search param ?lang= without full page reload
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

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
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Minimalist Subtitle */}
        <div className="mb-4 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-slate-600">
            {activeTab === 'remainder' && t.appTagline}
            {activeTab === 'completing' && t.ctsSubheading}
            {activeTab === 'practice' && t.practiceSubheading}
          </p>
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
