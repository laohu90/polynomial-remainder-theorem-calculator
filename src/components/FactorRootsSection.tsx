import React from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import {
  Polynomial,
  DivisorInfo,
  computeRationalRootCandidates,
  findFullPolynomialFactorization,
  formatPolynomialLatex,
  RationalCandidate,
} from '../utils/mathEngine';
import { Binary, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface FactorRootsSectionProps {
  poly: Polynomial;
  divisor: DivisorInfo;
  onSelectCandidate: (candidateStr: string) => void;
  t: Translations;
}

export const FactorRootsSection: React.FC<FactorRootsSectionProps> = ({
  poly,
  divisor,
  onSelectCandidate,
  t,
}) => {
  const rationalData = computeRationalRootCandidates(poly);
  const factorization = findFullPolynomialFactorization(poly);

  const isCurrentDivisorRoot = divisor.isLinear && Math.abs(divisor.c) !== undefined
    ? Math.abs(poly.coefficients.reduce((acc, c, idx) => acc + c * Math.pow(divisor.c, poly.degree - idx), 0)) < 1e-6
    : false;

  return (
    <div className="space-y-6">
      {/* Top Banner: Factor Theorem Statement */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200">
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-700">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.factorTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.factorDesc}
            </p>
          </div>
        </div>

        {/* Current Divisor Factor Verdict Card */}
        <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isCurrentDivisorRoot
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            {isCurrentDivisorRoot ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-slate-400 shrink-0" />
            )}
            <div>
              <div className="font-bold text-sm sm:text-base">
                当前除式 {divisor.divisorString} 的因式判定：
              </div>
              <div className="text-xs sm:text-sm opacity-80 mt-0.5 font-mono">
                P(c = {divisor.c}) = {isCurrentDivisorRoot ? '0' : '≠ 0'}
              </div>
            </div>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white shadow-2xs">
            {isCurrentDivisorRoot ? t.isFactorYes : t.isFactorNo}
          </div>
        </div>
      </div>

      {/* Rational Root Theorem Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {t.rationalRootHeading}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              整系数多项式的所有有理根必为常数项因数 p 与首项因数 q 之比：± (p / q)
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
            候选数: {rationalData.candidates.length}
          </span>
        </div>

        {/* Factor Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {t.constantFactors} (常数项 a_0 = {rationalData.constantTerm})
            </span>
            <div className="font-mono text-slate-800 font-semibold text-sm">
              p ∈ {'{'} {rationalData.pFactors.join(', ')} {'}'}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {t.leadingFactors} (首项系数 a_n = {rationalData.leadingCoeff})
            </span>
            <div className="font-mono text-slate-800 font-semibold text-sm">
              q ∈ {'{'} {rationalData.qFactors.join(', ')} {'}'}
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            {t.candidateList} (点击任意候选值即可填入除式直接检验)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {rationalData.candidates.map((cand, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCandidate(cand.display)}
                className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold transition-all border text-center flex flex-col items-center justify-center gap-0.5 ${
                  cand.isRoot
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/30 font-bold shadow-2xs hover:bg-emerald-100'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
                title={`P(${cand.display}) = ${cand.remainder}`}
              >
                <span>{cand.display}</span>
                <span className={`text-[10px] ${cand.isRoot ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  {cand.isRoot ? '✓ 是根' : `R=${cand.remainder}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Confirmed Real Rational Roots */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
          <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t.actualRootsFound}</span>
          </div>
          {rationalData.actualRoots.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {rationalData.actualRoots.map((root, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-900 font-mono text-sm font-bold shadow-2xs flex items-center gap-2"
                >
                  <span>x = {root.display}</span>
                  <span className="text-xs font-normal text-emerald-700">
                    因式: ({root.value >= 0 ? `x - ${root.display}` : `x + ${root.display.replace('-', '')}`})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-emerald-800">
              {t.noRationalRoots}
            </p>
          )}
        </div>
      </div>

      {/* Complete Factorization Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <h4 className="text-base font-bold text-slate-900 mb-1">
          {t.factorizationHeading}
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 mb-4">
          通过综合除法降次消元求得的实因式乘积表示：
        </p>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 text-center overflow-x-auto mb-4">
          <div className="text-lg sm:text-xl font-bold font-mono text-indigo-700">
            <MathView math={`P(x) = ${factorization.linearFactorsLatex}`} />
          </div>
        </div>

        <div className="text-xs text-slate-500 flex items-center justify-between">
          <span>{factorization.notes}</span>
          <span>根的总数：{factorization.roots.length} 个实数根</span>
        </div>
      </div>
    </div>
  );
};
