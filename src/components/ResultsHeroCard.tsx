import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import {
  Polynomial,
  DivisorInfo,
  RemainderTheoremResult,
  SyntheticDivisionResult,
  PolynomialLongDivisionResult,
  formatPolynomialLatex,
  formatFraction,
} from '../utils/mathEngine';
import { CheckCircle2, XCircle, Copy, Check, Share2, Printer, Sparkles } from 'lucide-react';

interface ResultsHeroCardProps {
  poly: Polynomial;
  divisor: DivisorInfo;
  remResult: RemainderTheoremResult;
  synthResult: SyntheticDivisionResult;
  longDivResult: PolynomialLongDivisionResult;
  t: Translations;
}

export const ResultsHeroCard: React.FC<ResultsHeroCardProps> = ({
  poly,
  divisor,
  remResult,
  synthResult,
  longDivResult,
  t,
}) => {
  const [copiedType, setCopiedType] = useState<'steps' | 'latex' | 'share' | null>(null);

  const isFactor = divisor.isLinear ? remResult.isFactor : longDivResult.isFactor;
  const remainderVal = divisor.isLinear ? remResult.remainder : longDivResult.remainderVal;
  const quotientLatex = divisor.isLinear
    ? formatPolynomialLatex(synthResult.quotientPoly)
    : formatPolynomialLatex(longDivResult.quotientPoly);

  const remainderLatex = divisor.isLinear && remResult.remainderFraction.d !== 1
    ? formatFraction(remResult.remainderFraction)
    : `${remainderVal}`;

  const divisionIdentityLatex = divisor.isLinear
    ? synthResult.summaryIdentityLatex
    : longDivResult.identityLatex;

  const handleCopy = (text: string, type: 'steps' | 'latex' | 'share') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const generateStepByStepText = () => {
    if (divisor.isLinear) {
      return `[${t.appName}]
P(x) = ${formatPolynomialLatex(poly)}
D(x) = ${divisor.divisorString} (c = ${divisor.c})

1. P(c) = ${remResult.directSubstitutionLatex}
= ${remResult.expandedCalculationLatex}
= ${remainderVal}

2. ${t.factorVerdict}: ${isFactor ? t.isFactorYes : t.isFactorNo}

3. ${t.divisionIdentity}:
${synthResult.summaryIdentityLatex}
Q(x) = ${formatPolynomialLatex(synthResult.quotientPoly)}
R = ${remainderVal}`;
    } else {
      return `[${t.appName}]
P(x) = ${formatPolynomialLatex(poly)}
D(x) = ${divisor.divisorString}
Q(x) = ${formatPolynomialLatex(longDivResult.quotientPoly)}
R(x) = ${formatPolynomialLatex(longDivResult.remainderPoly)}
${t.divisionIdentity}: ${longDivResult.identityLatex}`;
    }
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('p', formatPolynomialLatex(poly));
    url.searchParams.set('d', divisor.divisorString);
    handleCopy(url.toString(), 'share');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-indigo-950/20 border border-indigo-500/20 mb-8">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/20 border border-indigo-400/30 rounded-lg text-indigo-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {t.resultSummaryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              P(x) = ({divisor.divisorString}) · Q(x) + R
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => handleCopy(generateStepByStepText(), 'steps')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all shadow-xs"
            title={t.copySteps}
          >
            {copiedType === 'steps' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'steps' ? t.copied : t.copySteps}</span>
          </button>
          <button
            onClick={() => handleCopy(divisionIdentityLatex, 'latex')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all shadow-xs"
            title={t.copyLatex}
          >
            {copiedType === 'latex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'latex' ? t.copied : t.copyLatex}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all shadow-xs"
            title={t.share}
          >
            {copiedType === 'share' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedType === 'share' ? t.copied : t.share}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all shadow-xs"
            title={t.print}
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.print}</span>
          </button>
        </div>
      </div>

      {/* Hero Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-6">
        {/* Stat 1: Remainder */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            {t.remainderLabel}
          </span>
          <div className="my-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              R = {remainderLatex}
            </span>
          </div>
          <span className="text-xs text-slate-300">
            {divisor.isLinear ? `P(c = ${divisor.c})` : t.polyDivRemainder}
          </span>
        </div>

        {/* Stat 2: Factor Theorem Verdict */}
        <div className={`backdrop-blur-sm border rounded-xl p-5 flex flex-col justify-between ${
          isFactor
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
            : 'bg-amber-950/40 border-amber-500/40 text-amber-100'
        }`}>
          <span className="text-xs uppercase font-bold tracking-wider opacity-80">
            {t.factorVerdict}
          </span>
          <div className="flex items-center gap-2.5 my-2">
            {isFactor ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-7 h-7 text-amber-400 shrink-0" />
            )}
            <span className="text-base sm:text-lg font-bold leading-snug">
              {isFactor ? t.isFactorYes : t.isFactorNo}
            </span>
          </div>
          <span className="text-xs opacity-75">
            {isFactor ? t.dividesPolynomial : t.hasRemainder}
          </span>
        </div>

        {/* Stat 3: Quotient */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 flex flex-col justify-between overflow-hidden">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            {t.quotientLabel}
          </span>
          <div className="my-2 overflow-x-auto text-indigo-200 font-semibold font-mono text-lg">
            <MathView math={`Q(x) = ${quotientLatex}`} />
          </div>
          <span className="text-xs text-slate-300">
            {t.quotientDegree} = {poly.degree - (divisor.rawPoly?.degree || 1)}
          </span>
        </div>
      </div>

      {/* Division Identity Footer */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/20 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-5 sm:px-8 rounded-b-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {t.divisionIdentity}:
        </span>
        <div className="overflow-x-auto max-w-full text-center text-sm sm:text-base font-mono text-indigo-300 font-semibold">
          <MathView math={divisionIdentityLatex} />
        </div>
      </div>
    </div>
  );
};
