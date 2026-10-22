import React, { useState, useEffect } from 'react';
import { SyntheticDivisionResult, formatFraction } from '../utils/mathEngine';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { RotateCcw, ChevronRight } from 'lucide-react';

interface SyntheticDivisionTableProps {
  result: SyntheticDivisionResult;
  t: Translations;
}

export const SyntheticDivisionTable: React.FC<SyntheticDivisionTableProps> = ({ result, t }) => {
  const [currentStep, setCurrentStep] = useState<number>(result.topRow.length - 1);

  useEffect(() => {
    setCurrentStep(result.topRow.length - 1);
  }, [result]);

  const totalSteps = result.topRow.length;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleShowAll = () => {
    setCurrentStep(totalSteps - 1);
  };

  const cDisplay = result.cFraction.d !== 1 ? formatFraction(result.cFraction) : `${result.c}`;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 my-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div>
          <h4 className="text-base font-semibold text-slate-900">{t.method2Title}</h4>
          <p className="text-sm text-slate-600">{t.method2Desc}</p>
        </div>

        {/* Stepper controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
            title="Reset steps"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.synthReset}</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          >
            <span>{t.synthNext}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShowAll}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            {t.synthShowAll}
          </button>
        </div>
      </div>

      {/* Synthetic Division Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          <div className="font-mono text-sm sm:text-base tabular-nums">
            {/* Top row: Root c on left, coefficients on right */}
            <div className="flex items-center gap-3 py-2">
              <div className="w-16 sm:w-20 shrink-0 text-center font-bold text-indigo-700 bg-indigo-50 border-r-2 border-slate-300 py-1.5 rounded-l">
                c = {cDisplay}
              </div>
              <div className="flex items-center gap-4 sm:gap-6 px-3">
                {result.topRow.map((coeff, idx) => (
                  <div
                    key={`top-${idx}`}
                    className={`w-14 sm:w-16 text-center py-1 transition-all ${
                      idx <= currentStep ? 'opacity-100 font-semibold text-slate-800' : 'opacity-30 text-slate-400'
                    } ${idx === currentStep ? 'bg-slate-200/80 rounded' : ''}`}
                  >
                    {coeff}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle row: Multiplications */}
            <div className="flex items-center gap-3 py-2">
              <div className="w-16 sm:w-20 shrink-0 text-center font-bold text-slate-400 border-r-2 border-slate-300 py-1.5">
                +
              </div>
              <div className="flex items-center gap-4 sm:gap-6 px-3">
                {result.middleRow.map((val, idx) => (
                  <div
                    key={`mid-${idx}`}
                    className={`w-14 sm:w-16 text-center py-1 transition-all ${
                      idx === 0
                        ? 'text-slate-300'
                        : idx <= currentStep
                        ? 'opacity-100 font-medium text-emerald-700'
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

            {/* Bottom row: Quotient coefficients & Remainder */}
            <div className="flex items-center gap-3 py-2">
              <div className="w-16 sm:w-20 shrink-0 text-center text-xs font-semibold text-slate-500 border-r-2 border-slate-300 py-1">
                {t.synthColResult}
              </div>
              <div className="flex items-center gap-4 sm:gap-6 px-3">
                {result.bottomRow.map((val, idx) => {
                  const isRemainder = idx === result.bottomRow.length - 1;
                  const isVisible = idx <= currentStep;
                  return (
                    <div
                      key={`bottom-${idx}`}
                      className={`w-14 sm:w-16 text-center py-1.5 rounded transition-all ${
                        !isVisible
                          ? 'opacity-0'
                          : isRemainder
                          ? result.isFactor
                            ? 'font-bold bg-emerald-50 text-emerald-900 border border-emerald-300'
                            : 'font-bold bg-amber-50 text-amber-900 border border-amber-300'
                          : 'font-semibold bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column Label / Powers */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 font-sans">
              <div className="w-16 sm:w-20 shrink-0 text-center">{t.synthColPower}</div>
              <div className="flex items-center gap-4 sm:gap-6 px-3">
                {result.topRow.map((_, idx) => {
                  const p = result.topRow.length - 1 - idx;
                  const isRemainder = idx === result.topRow.length - 1;
                  return (
                    <div key={`power-${idx}`} className="w-14 sm:w-16 text-center font-mono">
                      {isRemainder ? (
                        <span className="font-bold text-indigo-700">{t.synthColRemainder}</span>
                      ) : (
                        <span>x^{p - 1 >= 0 ? p - 1 : 0}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Explanation Text */}
      {result.steps[currentStep] && (
        <div className="mt-4 p-3.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 flex items-start gap-2.5">
          <span className="shrink-0 font-semibold px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded">
            {t.synthStep} {currentStep + 1} {t.synthOf} {totalSteps}
          </span>
          <p className="leading-relaxed">
            {currentStep === 0
              ? `${t.bringDownStep}: ${result.topRow[0]}`
              : `${t.multiplyAndAdd}: ${result.steps[currentStep].bottomResult}`}
          </p>
        </div>
      )}

      {/* Non-monic divisor note (ax - b with a != 1) */}
      {result.divisorA !== 1 && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs sm:text-sm text-blue-900">
          <p className="font-semibold mb-1">{t.syntheticTableNote}</p>
          <p className="leading-relaxed font-mono">
            Q(x) = [{result.quotientCoefficients.join(', ')}]
          </p>
        </div>
      )}

      {/* Polynomial Identity */}
      <div className="mt-4 pt-4 border-t border-slate-200 text-center sm:text-left">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block mb-1">
          {t.synthDivisionIdentity}
        </span>
        <MathView math={result.summaryIdentityLatex} block={true} className="text-base sm:text-lg text-slate-900" />
      </div>
    </div>
  );
};
