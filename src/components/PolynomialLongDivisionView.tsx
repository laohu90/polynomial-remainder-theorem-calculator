import React from 'react';
import { PolynomialLongDivisionResult } from '../utils/mathEngine';
import { MathView } from './MathView';
import { Translations } from '../utils/i18n';
import { Divide } from 'lucide-react';

interface PolynomialLongDivisionViewProps {
  result: PolynomialLongDivisionResult;
  t: Translations;
}

export const PolynomialLongDivisionView: React.FC<PolynomialLongDivisionViewProps> = ({ result, t }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 my-4 shadow-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
        <Divide className="w-5 h-5 text-indigo-700" />
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            Method 3: Polynomial Long Division (Detailed Algebraic Layout)
          </h4>
          <p className="text-xs sm:text-sm text-slate-600">
            Standard high school step-by-step long division format with quotient on top, line-by-line subtractions, and remainder.
          </p>
        </div>
      </div>

      {/* Visual Bracket Display */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 overflow-x-auto font-mono text-base">
        <div className="inline-block min-w-full">
          {/* Quotient Line */}
          <div className="pl-32 pb-1 text-indigo-800 font-bold border-b-2 border-slate-700">
            <MathView math={result.quotientPoly.degree >= 0 ? `Q(x) = ${result.steps.map(s => s.quotientTermLatex).join(' + ').replace(/\+ -/g, '- ')}` : '0'} />
          </div>

          {/* Divisor & Dividend with Left Bracket */}
          <div className="flex items-baseline pt-1">
            <div className="w-28 text-right pr-3 font-bold text-slate-700 border-r-2 border-slate-700">
              <MathView math={`${result.divisorPoly.coefficients[0] === 1 ? '' : result.divisorPoly.coefficients[0]}x ${result.divisorPoly.coefficients[1] >= 0 ? `+ ${result.divisorPoly.coefficients[1]}` : `- ${Math.abs(result.divisorPoly.coefficients[1])}`}`} />
            </div>
            <div className="pl-4 font-bold text-slate-900">
              <MathView math={result.steps[0]?.currentWorkingPolyLatex || ''} />
            </div>
          </div>

          {/* Subtraction steps */}
          <div className="pl-32 mt-3 space-y-3 text-sm">
            {result.steps.map((step, idx) => (
              <div key={idx} className="border-l-2 border-indigo-200 pl-4 py-1">
                <div className="text-xs font-sans text-indigo-600 font-semibold mb-1">
                  Step {step.stepNumber}: {step.explanation}
                </div>
                <div className="text-red-700 font-mono">
                  <span className="font-sans text-xs text-slate-500 mr-2">Subtract:</span>
                  <MathView math={`- \\left( ${step.multipliedDivisorLatex} \\right)`} />
                </div>
                <div className="w-48 h-px bg-slate-400 my-1"></div>
                <div className="text-slate-900 font-semibold font-mono">
                  <span className="font-sans text-xs text-slate-500 mr-2">Result:</span>
                  <MathView math={step.resultingRemainderLatex || '0'} />
                </div>
              </div>
            ))}
          </div>

          {/* Final Remainder */}
          <div className="mt-4 pt-3 border-t border-slate-300 pl-32 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-600 font-sans">
              Final Remainder:
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
