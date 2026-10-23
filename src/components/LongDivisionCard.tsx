import React from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import {
  PolynomialLongDivisionResult,
  formatPolynomialLatex,
} from '../utils/mathEngine';
import { Divide, ArrowDown } from 'lucide-react';

interface LongDivisionCardProps {
  result: PolynomialLongDivisionResult;
  t: Translations;
}

export const LongDivisionCard: React.FC<LongDivisionCardProps> = ({ result, t }) => {
  const quotientLatex = formatPolynomialLatex(result.quotientPoly);
  const divisorLatex = formatPolynomialLatex(result.divisorPoly);
  const dividendLatex = formatPolynomialLatex(result.dividendPoly);
  const remainderLatex = formatPolynomialLatex(result.remainderPoly);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs mb-8">
      {/* Title */}
      <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-200">
        <div className="p-2 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-700">
          <Divide className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {t.method3Title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.method3Desc}
          </p>
        </div>
      </div>

      {/* Classic Long Division Bracket Box */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-6 overflow-x-auto mb-6">
        <div className="inline-block min-w-full font-mono text-base select-none">
          {/* Top Line: Quotient Q(x) */}
          <div className="flex items-center pl-28 sm:pl-36 pb-1.5 border-b-2 border-slate-800 text-indigo-700 font-bold">
            <span className="text-xs font-sans text-slate-500 mr-3">商式 Q(x) =</span>
            <MathView math={quotientLatex} />
          </div>

          {/* Divisor | Dividend */}
          <div className="flex items-baseline pt-2">
            <div className="w-24 sm:w-32 text-right pr-4 font-bold text-slate-700 border-r-2 border-slate-800">
              <MathView math={divisorLatex} />
            </div>
            <div className="pl-4 font-bold text-slate-900">
              <MathView math={dividendLatex} />
            </div>
          </div>

          {/* Subtraction Steps in Bracket */}
          {result.steps.length > 0 && (
            <div className="pl-28 sm:pl-36 mt-3 space-y-3">
              {result.steps.map((step) => (
                <div key={step.stepNumber} className="relative">
                  {/* Subtracted row */}
                  <div className="text-rose-600 font-medium flex items-center gap-2">
                    <span className="text-xs text-rose-500 font-sans font-semibold">相减:</span>
                    <span>-</span>
                    <span>(</span>
                    <MathView math={step.multipliedDivisorLatex} />
                    <span>)</span>
                  </div>
                  {/* Divider line under subtraction */}
                  <div className="h-px bg-slate-300 w-full max-w-md my-1" />
                  {/* Result remainder */}
                  <div className="text-slate-800 font-semibold flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-sans">余项:</span>
                    <MathView math={step.resultingRemainderLatex || '0'} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Final Remainder Output */}
          <div className="mt-5 pt-3 border-t border-slate-200 pl-28 sm:pl-36 flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-slate-500 font-sans">
              最终余数 R:
            </span>
            <span className={`px-3 py-1 rounded-lg font-bold font-mono text-sm border shadow-2xs ${
              result.isFactor
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              <MathView math={`R = ${remainderLatex}`} />
            </span>
          </div>
        </div>
      </div>

      {/* Step Explanation Cards */}
      <div className="space-y-3 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          竖式逐步推导解析
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs sm:text-sm text-slate-700"
            >
              <div className="flex items-center justify-between font-semibold text-indigo-700 mb-1.5 pb-1 border-b border-slate-200/60">
                <span>步骤 {step.stepNumber}</span>
                <span className="font-mono bg-indigo-100/70 text-indigo-800 px-1.5 py-0.5 rounded text-xs">
                  商项 + <MathView math={step.quotientTermLatex} />
                </span>
              </div>
              <p className="leading-relaxed text-slate-600">
                {step.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Identity */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
          除法恒等式：
        </span>
        <div className="font-mono text-slate-900 font-semibold overflow-x-auto">
          <MathView math={result.identityLatex} />
        </div>
      </div>
    </div>
  );
};
