import React from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import {
  Polynomial,
  DivisorInfo,
  RemainderTheoremResult,
  formatPolynomialLatex,
  formatFraction,
} from '../utils/mathEngine';
import { Calculator, ArrowRight } from 'lucide-react';

interface DirectEvaluationCardProps {
  poly: Polynomial;
  divisor: DivisorInfo;
  result: RemainderTheoremResult;
  t: Translations;
}

export const DirectEvaluationCard: React.FC<DirectEvaluationCardProps> = ({
  poly,
  divisor,
  result,
  t,
}) => {
  const c = divisor.c;
  const cDisplay = divisor.cFraction.d !== 1 ? formatFraction(divisor.cFraction) : `${c}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs mb-8">
      {/* Title */}
      <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-200">
        <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-700">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {t.method1Title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.method1Desc}
          </p>
        </div>
      </div>

      {/* Main Formula Highlight */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {t.evalFormula}
        </div>
        <div className="text-base sm:text-lg text-slate-900 font-bold overflow-x-auto">
          <MathView
            math={`R = P(c) = P(${cDisplay}) = ${result.directSubstitutionLatex}`}
          />
        </div>
      </div>

      {/* Step Breakdown Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/60">
              <th className="py-2.5 px-3">项次 (Degree)</th>
              <th className="py-2.5 px-3">系数 (a_k)</th>
              <th className="py-2.5 px-3">代入计算 a_k · c^k</th>
              <th className="py-2.5 px-3 text-right">项乘积结果</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {result.steps.map((step, idx) => {
              const absProd = Math.abs(step.termProduct);
              const prodStr = Number.isInteger(absProd) ? absProd.toString() : absProd.toFixed(3).replace(/\.?0+$/, '');
              return (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-600">
                    x^{step.power}
                  </td>
                  <td className="py-2.5 px-3 text-slate-800">
                    {step.coeff}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    <MathView math={step.latexTerm} />
                  </td>
                  <td className={`py-2.5 px-3 text-right font-bold ${
                    step.termProduct < 0 ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {step.termProduct < 0 ? `-${prodStr}` : `${prodStr}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summation calculation line */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-indigo-900 font-medium">
          <span>各项累加和：</span>
          <span className="font-mono">{result.expandedCalculationLatex}</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-indigo-600 hidden sm:block" />
          <span className="font-mono text-base font-bold text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-2xs">
            P({cDisplay}) = {result.remainderFraction.d !== 1 ? formatFraction(result.remainderFraction) : result.remainder}
          </span>
        </div>
      </div>
    </div>
  );
};
