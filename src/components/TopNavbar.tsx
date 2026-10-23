import React from 'react';
import { Language, Translations } from '../utils/i18n';
import { Calculator, Binary, TrendingUp, HelpCircle, BookOpen, Globe } from 'lucide-react';

interface TopNavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeTab: 'calculator' | 'factor' | 'graph' | 'quiz' | 'guide';
  onSelectTab: (tab: 'calculator' | 'factor' | 'graph' | 'quiz' | 'guide') => void;
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
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語' },
  ];

  const navItems = [
    { id: 'calculator' as const, label: t.tabCalculator, icon: Calculator },
    { id: 'factor' as const, label: t.tabFactor, icon: Binary },
    { id: 'graph' as const, label: t.tabGraph, icon: TrendingUp },
    { id: 'quiz' as const, label: t.tabQuiz, icon: HelpCircle },
    { id: 'guide' as const, label: t.tabGuide, icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  {t.appName}
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                P(c) = R · P(x) = D(x)Q(x) + R
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 transition-colors">
              <Globe className="w-4 h-4 text-indigo-600 mr-1.5 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as Language)}
                aria-label="Select Language"
                className="bg-transparent border-none outline-none font-semibold text-slate-800 cursor-pointer pr-1"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Horizontal Scroll Tabs */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
