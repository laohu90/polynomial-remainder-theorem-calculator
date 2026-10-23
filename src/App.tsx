/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Language, translations } from './utils/i18n';
import { TopNavbar } from './components/TopNavbar';
import { RemainderCalculator } from './components/RemainderCalculator';
import { FactorRootsSection } from './components/FactorRootsSection';
import { PolynomialCurveVisualizer } from './components/PolynomialCurveVisualizer';
import { PracticeQuizSection } from './components/PracticeQuizSection';
import { EducationalGuideSection } from './components/EducationalGuideSection';
import { Footer } from './components/Footer';
import { parsePolynomial, parseDivisor } from './utils/mathEngine';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const supportedLangs: Language[] = ['zh', 'en', 'es', 'fr', 'pt', 'de', 'ja'];
      if (urlLang && supportedLangs.includes(urlLang as Language)) {
        return urlLang as Language;
      }
      const saved = localStorage.getItem('remainder_calc_lang');
      if (saved && supportedLangs.includes(saved as Language)) {
        return saved as Language;
      }

      // Auto-detect browser language
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('en')) return 'en';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('pt')) return 'pt';
      if (browserLang.startsWith('de')) return 'de';
      if (browserLang.startsWith('ja')) return 'ja';
      if (browserLang.startsWith('zh')) return 'zh';
    } catch {
      // ignore
    }
    return 'zh'; // Default
  });

  const [activeTab, setActiveTab] = useState<'calculator' | 'factor' | 'graph' | 'quiz' | 'guide'>('calculator');
  const [currentPolyStr, setCurrentPolyStr] = useState<string>('2x^3 - 4x^2 + 3x - 5');
  const [currentDivisorStr, setCurrentDivisorStr] = useState<string>('x - 2');

  const t = translations[lang] || translations.zh;

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.title = `${t.appName} | ${t.appSubtitle}`;
    } catch {
      // ignore
    }
  }, [lang, t]);

  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('remainder_calc_lang', newLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  const handleApplyProblemToCalculator = (poly: string, divisor: string) => {
    setCurrentPolyStr(poly);
    setCurrentDivisorStr(divisor);
    setActiveTab('calculator');
  };

  const handleSelectCandidate = (candidateStr: string) => {
    setCurrentDivisorStr(candidateStr);
    setActiveTab('calculator');
  };

  const parsed = useMemo(() => {
    const pRes = parsePolynomial(currentPolyStr);
    const dRes = parseDivisor(currentDivisorStr);
    return {
      poly: pRes.poly,
      divisor: dRes.divisor,
    };
  }, [currentPolyStr, currentDivisorStr]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Top Navigation Bar */}
      <TopNavbar
        currentLang={lang}
        onSelectLang={handleSelectLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        t={t}
      />

      {/* Main Content Area */}
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 w-full">
        {/* Subtle Tagline */}
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            {t.appSubtitle}
          </p>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-150">
          {activeTab === 'calculator' && (
            <RemainderCalculator
              t={t}
              initialPoly={currentPolyStr}
              initialDivisor={currentDivisorStr}
            />
          )}

          {activeTab === 'factor' && (
            parsed.poly && parsed.divisor ? (
              <FactorRootsSection
                poly={parsed.poly}
                divisor={parsed.divisor}
                onSelectCandidate={handleSelectCandidate}
                t={t}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
                {t.enterPolyPrompt}
              </div>
            )
          )}

          {activeTab === 'graph' && (
            parsed.poly && parsed.divisor ? (
              <PolynomialCurveVisualizer
                poly={parsed.poly}
                divisor={parsed.divisor}
                t={t}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
                {t.enterPolyPrompt}
              </div>
            )
          )}

          {activeTab === 'quiz' && (
            <PracticeQuizSection
              t={t}
              onApplyProblemToCalculator={handleApplyProblemToCalculator}
            />
          )}

          {activeTab === 'guide' && (
            <EducationalGuideSection t={t} />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer t={t} onSelectTab={setActiveTab} />
    </div>
  );
}
