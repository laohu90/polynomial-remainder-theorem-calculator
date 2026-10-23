import React, { useState, useEffect } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import {
  SyntheticDivisionResult,
  formatFraction,
  formatPolynomialLatex,
} from '../utils/mathEngine';
import {
  Grid,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Eye,
  Info,
} from 'lucide-react';

interface SyntheticDivisionCardProps {
  result: SyntheticDivisionResult;
  t: Translations;
}

export const SyntheticDivisionCard: React.FC<SyntheticDivisionCardProps> = ({
  result,
  t,
}) => {
  const totalSteps = result.topRow.length;
  const [currentStep, setCurrentStep] = useState<number>(totalSteps - 1);

  // Sync to end whenever result changes
  useEffect(() => {
    setCurrentStep(totalSteps - 1);
  }, [result, totalSteps]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleShowAll = () => {
    setCurrentStep(totalSteps - 1);
  };

  const cDisplay = result.cFraction.d !== 1
    ? formatFraction(result.cFraction)
    : `${result.c}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs mb-8">
      {/* Header & Step Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-50 border border-violet-200/60 text-violet-700">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.method2Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.method2Desc}
            </p>
          </div>
        </div>

        {/* Stepper controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all shadow-2xs"
            title={t.synthReset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStep <= 0}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs"
            title="上一步"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 text-xs font-semibold text-slate-700 tabular-nums">
            {currentStep + 1} / {totalSteps}
          </span>
          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps - 1}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
          >
            <span>{t.synthNext}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShowAll}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all shadow-2xs"
            title={t.synthShowAll}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Synthetic Division Diagram Table */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 overflow-x-auto mb-6">
        <div className="inline-block min-w-full font-mono text-sm sm:text-base tabular-nums select-none">
          {/* Row 1: Root c and Dividend Coefficients */}
          <div className="flex items-center gap-2 py-2">
            <div className="w-20 sm:w-24 shrink-0 text-center font-bold text-indigo-700 bg-indigo-50 border-r-2 border-b-2 border-indigo-400 py-2 rounded-tl-lg shadow-2xs">
              c = {cDisplay}
            </div>
            <div className="flex items-center gap-4 sm:gap-6 px-3">
              {result.topRow.map((coeff, idx) => (
                <div
                  key={`top-${idx}`}
                  className={`w-14 sm:w-16 text-center py-1 transition-all ${
                    idx <= currentStep
                      ? idx === currentStep
                        ? 'font-bold text-indigo-700 bg-indigo-100/70 rounded-lg'
                        : 'font-semibold text-slate-800'
                      : 'opacity-25 text-slate-400'
                  }`}
                >
                  {coeff}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Multiplication row (m_i = prevBottom * c) */}
          <div className="flex items-center gap-2 py-2">
            <div className="w-20 sm:w-24 shrink-0 text-center font-bold text-slate-400 border-r-2 border-slate-300 py-1.5">
              + (× c)
            </div>
            <div className="flex items-center gap-4 sm:gap-6 px-3">
              {result.middleRow.map((val, idx) => (
                <div
                  key={`mid-${idx}`}
                  className={`w-14 sm:w-16 text-center py-1 transition-all ${
                    idx === 0
                      ? 'text-slate-300'
                      : idx <= currentStep
                      ? 'font-medium text-emerald-600'
                      : 'opacity-0'
                  }`}
                >
                  {idx === 0 ? '—' : val > 0 ? `+${val}` : `${val}`}
                </div>
              ))}
            </div>
          </div>

          {/* Divider line */}
          <div className="h-0.5 bg-slate-300 w-full my-1 ml-1" />

          {/* Row 3: Bottom Row (Quotient coefficients and Remainder) */}
          <div className="flex items-center gap-2 py-2">
            <div className="w-20 sm:w-24 shrink-0 text-center text-xs font-semibold text-slate-500 border-r-2 border-slate-300 py-1.5">
              结果行
            </div>
            <div className="flex items-center gap-4 sm:gap-6 px-3">
              {result.bottomRow.map((val, idx) => {
                const isRemainder = idx === result.bottomRow.length - 1;
                const isVisible = idx <= currentStep;
                return (
                  <div
                    key={`bottom-${idx}`}
                    className={`w-14 sm:w-16 text-center py-1.5 rounded-lg transition-all ${
                      !isVisible
                        ? 'opacity-0'
                        : isRemainder
                        ? result.isFactor
                          ? 'font-bold bg-emerald-100 text-emerald-900 border-2 border-emerald-400 shadow-xs'
                          : 'font-bold bg-amber-100 text-amber-900 border-2 border-amber-400 shadow-xs'
                        : 'font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs'
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 4: Power indicator for quotient terms */}
          <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 font-sans">
            <div className="w-20 sm:w-24 shrink-0 text-center font-medium">项次指引</div>
            <div className="flex items-center gap-4 sm:gap-6 px-3">
              {result.topRow.map((_, idx) => {
                const p = result.topRow.length - 2 - idx;
                const isRemainder = idx === result.topRow.length - 1;
                return (
                  <div key={`power-${idx}`} className="w-14 sm:w-16 text-center font-mono">
                    {isRemainder ? (
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200/50">
                        余数 R
                      </span>
                    ) : (
                      <span>x^{p}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Current Step Explanation Box */}
      {result.steps[currentStep] && (
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700 flex items-start gap-3 mb-5">
          <span className="shrink-0 font-bold px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-md">
            {t.synthStep} {currentStep + 1} {t.synthOf} {totalSteps}
          </span>
          <p className="leading-relaxed">
            {result.steps[currentStep].explanation}
          </p>
        </div>
      )}

      {/* Non-monic note when divisor is ax - b (a != 1) */}
      {result.divisorA !== 1 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5 mb-5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold mb-1">{t.synthNonMonicNote}</p>
            <p className="font-mono text-xs text-amber-800">
              底行结果系数 [{result.bottomRow.slice(0, -1).join(', ')}] ÷ {result.divisorA} = [{result.quotientCoefficients.join(', ')}]
            </p>
          </div>
        </div>
      )}

      {/* Resulting Identity */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
          除法恒等式推导结果：
        </span>
        <div className="font-mono text-slate-900 font-semibold overflow-x-auto">
          <MathView math={result.summaryIdentityLatex} />
        </div>
      </div>
    </div>
  );
};
