import React from 'react';
import { PolynomialLongDivisionResult, formatPolynomialLatex } from '../utils/mathEngine';
import { MathView } from './MathView';
import { Translations } from '../utils/i18n';
import { Divide } from 'lucide-react';

interface PolynomialLongDivisionViewProps {
  result: PolynomialLongDivisionResult;
  t: Translations;
}

export const PolynomialLongDivisionView: React.FC<PolynomialLongDivisionViewProps> = ({ result, t }) => {
  const quotientLatex = formatPolynomialLatex(result.quotientPoly);
  const divisorLatex = formatPolynomialLatex(result.divisorPoly);
  const dividendLatex = formatPolynomialLatex(result.dividendPoly);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 my-4 shadow-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
        <Divide className="w-5 h-5 text-indigo-700" />
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            {t.longDivTitle}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.longDivSub}
          </p>
        </div>
      </div>

      {/* Visual Bracket Display */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 overflow-x-auto font-mono text-base">
        <div className="inline-block min-w-full">
          {/* Quotient Line */}
          <div className="pl-32 pb-1 text-indigo-800 font-bold border-b-2 border-slate-700">
            <MathView math={`Q(x) = ${quotientLatex}`} />
          </div>

          {/* Divisor & Dividend with Left Bracket */}
          <div className="flex items-baseline pt-1">
            <div className="w-28 text-right pr-3 font-bold text-slate-700 border-r-2 border-slate-700">
              <MathView math={divisorLatex} />
            </div>
            <div className="pl-4 font-bold text-slate-900">
              <MathView math={result.steps[0]?.currentWorkingPolyLatex || dividendLatex} />
            </div>
          </div>

          {/* Subtraction steps */}
          {result.steps.length > 0 ? (
            <div className="pl-32 mt-3 space-y-2.5 text-sm">
              {result.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg">
                  <div className="text-xs font-sans text-indigo-700 font-semibold mb-1">
                    {t.synthStep} {step.stepNumber}
                  </div>
                  <div className="text-rose-700 font-mono">
                    <span className="font-sans text-xs text-slate-500 mr-2">{t.longDivSubtract}</span>
                    <MathView math={`- \\left( ${step.multipliedDivisorLatex} \\right)`} />
                  </div>
                  <div className="w-full max-w-xs border-b border-slate-300 my-1.5" />
                  <div className="text-slate-900 font-semibold font-mono">
                    <span className="font-sans text-xs text-slate-500 mr-2">{t.longDivResult}</span>
                    <MathView math={step.resultingRemainderLatex || '0'} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pl-32 mt-2 text-sm text-slate-500 font-sans">
              {t.longDivConstantNote}
            </div>
          )}

          {/* Final Remainder */}
          <div className="mt-4 pt-3 border-t border-slate-300 pl-32 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-600 font-sans">
              {t.longDivFinalRemainder}
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300">
              R = {result.remainder}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
