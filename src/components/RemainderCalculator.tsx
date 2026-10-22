import React, { useState, useEffect, useMemo } from 'react';
import {
  parsePolynomial,
  parseDivisor,
  evaluateRemainderTheorem,
  performSyntheticDivision,
  performPolynomialLongDivision,
  findFullPolynomialFactorization,
  formatPolynomial,
  formatPolynomialLatex,
  Polynomial,
  DivisorInfo,
  RemainderTheoremResult,
  SyntheticDivisionResult,
  solveCompletingTheSquare,
} from '../utils/mathEngine';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { SyntheticDivisionTable } from './SyntheticDivisionTable';
import { PolynomialLongDivisionView } from './PolynomialLongDivisionView';
import { RationalRootsGrid } from './RationalRootsGrid';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Share2,
  Printer,
  Sparkles,
  ArrowRight,
  Code,
  Divide,
  BookOpen,
} from 'lucide-react';

interface RemainderCalculatorProps {
  t: Translations;
  initialPoly?: string;
  initialDivisor?: string;
}

export const RemainderCalculator: React.FC<RemainderCalculatorProps> = ({
  t,
  initialPoly = '2x^3 - 4x^2 + 3x - 5',
  initialDivisor = 'x - 2',
}) => {
  const [polyInput, setPolyInput] = useState<string>(initialPoly);
  const [divisorInput, setDivisorInput] = useState<string>(initialDivisor);
  const [copiedSteps, setCopiedSteps] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'all' | 'direct' | 'synthetic' | 'longDivision'>('all');
  const [showKeypad, setShowKeypad] = useState<boolean>(false);

  // Sync with URL params on first mount if present
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('p');
      const d = params.get('d');
      if (p) setPolyInput(p);
      if (d) setDivisorInput(d);
    } catch {
      // ignore
    }
  }, []);

  const presets = [
    { label: t.example1, poly: '2x^3 - 4x^2 + 3x - 5', divisor: 'x - 2' },
    { label: t.example2, poly: 'x^3 - 3x^2 - 4x + 12', divisor: 'x - 3' },
    { label: t.example3, poly: '3x^3 + 5x^2 - 11x + 3', divisor: '2x - 1' },
    { label: t.example4, poly: 'x^3 - 8', divisor: 'x - 2' },
    { label: t.example5, poly: 'x^4 - 5x^2 + 4', divisor: 'x - 1' },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setPolyInput(p.poly);
    setDivisorInput(p.divisor);
  };

  const keypadTokens = ['x', 'x^2', 'x^3', 'x^4', '+', '-', '/', '^', '(x - 1)', '(x - 2)', '(x + 1)', '(2x - 1)'];

  const handleKeypadInsert = (token: string) => {
    if (token.startsWith('(x') || token.startsWith('(2x')) {
      setDivisorInput(token.replace(/[()]/g, ''));
    } else {
      setPolyInput((prev) => `${prev} ${token}`.trim());
    }
  };

  // Parse calculations
  const parsed = useMemo(() => {
    const polyRes = parsePolynomial(polyInput);
    const divRes = parseDivisor(divisorInput);

    if (polyRes.error) return { error: polyRes.error };
    if (divRes.error) return { error: divRes.error };

    const poly = polyRes.poly!;
    const divisor = divRes.divisor!;

    const remResult = evaluateRemainderTheorem(poly, divisor);
    const synthResult = performSyntheticDivision(poly, divisor);
    const longDivResult = performPolynomialLongDivision(poly, divisor);
    const fullFactorResult = findFullPolynomialFactorization(poly);

    return {
      poly,
      divisor,
      remResult,
      synthResult,
      longDivResult,
      fullFactorResult,
      error: null,
    };
  }, [polyInput, divisorInput]);

  const hasResult = !parsed.error && parsed.remResult && parsed.synthResult;

  const handleCopySteps = () => {
    if (!hasResult) return;
    const { poly, divisor, remResult, synthResult } = parsed;
    const text = `Polynomial Remainder Theorem Solution:
Dividend: P(x) = ${formatPolynomial(poly!)}
Divisor: D(x) = ${divisor!.divisorString} (Root c = ${remResult!.c})

Method 1: Direct Substitution (Remainder Theorem)
P(${remResult!.c}) = ${remResult!.directSubstitutionLatex}
P(${remResult!.c}) = ${remResult!.remainder}
Remainder R = ${remResult!.remainder}

Factor Theorem Conclusion:
${remResult!.isFactor ? 'Since R = 0, (x - c) is an EXACT FACTOR of P(x).' : `Since R = ${remResult!.remainder} ≠ 0, (x - c) is NOT a factor.`}

Method 2: Synthetic Division
Quotient Q(x) = ${formatPolynomial(synthResult!.quotientPoly)}
Remainder R = ${synthResult!.remainder}
Identity: ${synthResult!.summaryIdentityLatex}

Method 3: Complete Polynomial Factoring
${parsed.fullFactorResult?.linearFactorsLatex}`;

    navigator.clipboard.writeText(text);
    setCopiedSteps(true);
    setTimeout(() => setCopiedSteps(false), 2000);
  };

  const handleCopyLatex = () => {
    if (!hasResult) return;
    const { remResult, synthResult } = parsed;
    const latex = `P(${remResult!.c}) = ${remResult!.directSubstitutionLatex} = ${remResult!.remainder} \\\\
\\implies R = ${remResult!.remainder} \\\\
${synthResult!.summaryIdentityLatex}`;
    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleShareLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('p', polyInput);
      url.searchParams.set('d', divisorInput);
      navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      {/* Collapsible Presets & Keypad Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.examplesTitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.slice(0, 3).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="text-xs font-medium px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md transition-colors border border-slate-200 shadow-2xs"
              >
                {p.label.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            className="text-xs font-semibold px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md transition-colors shadow-2xs"
          >
            {showKeypad ? 'Hide Keypad' : '+ Math Keypad'}
          </button>
        </div>
      </div>

      {/* Quick Math Symbols (Collapsible) */}
      {showKeypad && (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2 text-xs text-slate-600 animate-fadeIn">
          <span className="font-semibold text-slate-700 mr-2">{t.keypadTitle}:</span>
          {keypadTokens.map((tok, idx) => (
            <button
              key={idx}
              onClick={() => handleKeypadInsert(tok)}
              className="px-3 py-1.5 font-mono font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200 rounded-md transition-colors shadow-2xs"
            >
              {tok}
            </button>
          ))}
        </div>
      )}

      {/* Error State */}
      {parsed.error && (
        <div className="p-4 mb-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{t.inputSyntaxError}</p>
            <p>{parsed.error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {hasResult && (
        <div className="space-y-6 pt-2">
          {/* Unified High-Impact Result Hero */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Stat 1: Remainder */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  {t.remainderBadge}
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tabular-nums">
                  R = {parsed.remResult!.remainder}
                </div>
                <p className="text-xs text-slate-500">
                  {t.evaluatedAtRoot} <span className="font-mono font-semibold text-slate-700">c = {parsed.remResult!.c}</span>
                </p>
              </div>

              {/* Stat 2: Factor Theorem Verdict */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  {t.factorTheoremHeading}
                </span>
                <div className="flex items-center gap-2">
                  {parsed.remResult!.isFactor ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span className={`text-base font-bold ${parsed.remResult!.isFactor ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {parsed.remResult!.isFactor ? t.isFactorBadge : t.isNotFactorBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  {parsed.remResult!.isFactor
                    ? `(${parsed.divisor!.divisorString}) ${t.dividesWithZeroRemainder}`
                    : `R = ${parsed.remResult!.remainder} ≠ 0`}
                </p>
              </div>

              {/* Stat 3: Quotient */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  {t.quotientLabel}
                </span>
                <div className="text-base sm:text-lg font-bold text-slate-900 overflow-x-auto py-0.5">
                  <MathView math={`Q(x) = ${formatPolynomialLatex(parsed.synthResult!.quotientPoly)}`} />
                </div>
              </div>
            </div>

            {/* Factored Form Banner (if factorable) */}
            {parsed.fullFactorResult && (
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                  {t.factoredFormLabel}:
                </span>
                <MathView
                  math={`P(x) = ${parsed.fullFactorResult.linearFactorsLatex}`}
                  className="font-semibold text-slate-900"
                />
              </div>
            )}
          </div>

          {/* Method Explorer & Utility Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* View Mode Tabs */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveViewMode('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'all'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.viewAllMethods}
              </button>
              <button
                onClick={() => setActiveViewMode('direct')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'direct'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.viewDirect}
              </button>
              <button
                onClick={() => setActiveViewMode('synthetic')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'synthetic'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.viewSynthetic}
              </button>
              <button
                onClick={() => setActiveViewMode('longDivision')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'longDivision'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.viewLongDivision}
              </button>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySteps}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
              >
                {copiedSteps ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedSteps ? t.stepsCopied : t.copySteps}</span>
              </button>

              <button
                onClick={handleCopyLatex}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
              >
                {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedLatex ? t.latexCopied : t.copyLatex}</span>
              </button>

              <button
                onClick={handleShareLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedLink ? t.linkCopied : t.shareLink}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.printOrSave}</span>
              </button>
            </div>
          </div>

          {/* Method 1: Direct Substitution (Remainder Theorem) */}
          {(activeViewMode === 'all' || activeViewMode === 'direct') && (
            <div className="border border-slate-200 rounded-xl p-5 md:p-6 bg-white shadow-2xs">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{t.method1Title}</h4>
              <p className="text-sm sm:text-base text-slate-600 mb-4">{t.method1Desc}</p>

              <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3">
                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1">{t.method1Step1}</span>
                  <MathView
                    math={`P(${parsed.remResult!.c}) = ${parsed.remResult!.directSubstitutionLatex}`}
                    block={true}
                    className="text-base sm:text-lg text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1">{t.method1Step2}</span>
                  <MathView
                    math={`P(${parsed.remResult!.c}) = ${parsed.remResult!.expandedCalculationLatex}`}
                    block={true}
                    className="text-base sm:text-lg text-slate-900 font-semibold"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 uppercase">{t.method1RemainderVal}</span>
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    R = P({parsed.remResult!.c}) = {parsed.remResult!.remainder}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Method 2: Synthetic Division Matrix */}
          {(activeViewMode === 'all' || activeViewMode === 'synthetic') && (
            <SyntheticDivisionTable result={parsed.synthResult!} t={t} />
          )}

          {/* Method 3: Polynomial Long Division Layout */}
          {(activeViewMode === 'all' || activeViewMode === 'longDivision') && (
            <PolynomialLongDivisionView result={parsed.longDivResult!} t={t} />
          )}

          {/* Rational Root Theorem Grid */}
          <RationalRootsGrid
            poly={parsed.poly!}
            t={t}
            onSelectCandidate={(cStr) => {
              setDivisorInput(cStr);
            }}
          />
        </div>
      )}
    </div>
  );
};
