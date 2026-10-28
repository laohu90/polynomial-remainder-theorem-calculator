import React from 'react';
import { Translations } from '../utils/i18n';
import { Calculator } from 'lucide-react';

interface FooterProps {
  t: Translations;
  onSelectTab: (tab: 'calculator' | 'factor' | 'graph' | 'batch' | 'quiz' | 'guide') => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>{t.appName}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => onSelectTab('calculator')}
              className="hover:text-white transition-colors"
            >
              {t.tabCalculator}
            </button>
            <button
              onClick={() => onSelectTab('factor')}
              className="hover:text-white transition-colors"
            >
              {t.tabFactor}
            </button>
            <button
              onClick={() => onSelectTab('graph')}
              className="hover:text-white transition-colors"
            >
              {t.tabGraph}
            </button>
            <button
              onClick={() => onSelectTab('batch')}
              className="hover:text-white transition-colors"
            >
              {t.tabBatch}
            </button>
            <button
              onClick={() => onSelectTab('quiz')}
              className="hover:text-white transition-colors"
            >
              {t.tabQuiz}
            </button>
            <button
              onClick={() => onSelectTab('guide')}
              className="hover:text-white transition-colors"
            >
              {t.tabGuide}
            </button>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
            P(x) = D(x) · Q(x) + R · 高中代数与微积分预备
          </div>
        </div>
      </div>
    </footer>
  );
};
