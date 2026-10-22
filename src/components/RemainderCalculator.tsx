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
      {/* Headings */}
      <div className="max-w-3xl mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {t.calcHeading}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-1 leading-relaxed">
          {t.calcSubheading}
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
          {t.examplesTitle}
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="text-xs font-medium px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors border border-slate-200 shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Dividend P(x) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {t.polyInputLabel}
          </label>
          <input
            type="text"
            value={polyInput}
            onChange={(e) => setPolyInput(e.target.value)}
            placeholder={t.polyInputPlaceholder}
            className="w-full px-4 py-3.5 text-lg sm:text-xl font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Divisor D(x) */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {t.divisorInputLabel}
          </label>
          <input
            type="text"
            value={divisorInput}
            onChange={(e) => setDivisorInput(e.target.value)}
            placeholder={t.divisorInputPlaceholder}
            className="w-full px-4 py-3.5 text-lg sm:text-xl font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Quick Math Keypad */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg">
        <span className="text-xs font-semibold text-slate-500 mr-1">{t.keypadTitle}:</span>
        {keypadTokens.map((tok, idx) => (
          <button
            key={idx}
            onClick={() => handleKeypadInsert(tok)}
            className="px-3 py-1.5 text-xs font-mono font-medium bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 rounded shadow-2xs transition-colors"
          >
            {tok}
          </button>
        ))}
      </div>

      {/* Error State */}
      {parsed.error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{t.inputSyntaxError}</p>
            <p>{parsed.error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {hasResult && (
        <div className="space-y-6 pt-2">
          {/* Solution Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500 mr-2">
                {t.viewLabel}
              </span>
              <button
                onClick={() => setActiveViewMode('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.viewAllMethods}
              </button>
              <button
                onClick={() => setActiveViewMode('direct')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'direct'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.viewDirect}
              </button>
              <button
                onClick={() => setActiveViewMode('synthetic')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'synthetic'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.viewSynthetic}
              </button>
              <button
                onClick={() => setActiveViewMode('longDivision')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeViewMode === 'longDivision'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.viewLongDivision}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopySteps}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
              >
                {copiedSteps ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSteps ? t.stepsCopied : t.copySteps}</span>
              </button>

              <button
                onClick={handleCopyLatex}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
              >
                {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedLatex ? t.latexCopied : t.copyLatex}</span>
              </button>

              <button
                onClick={handleShareLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? t.linkCopied : t.shareLink}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.printOrSave}</span>
              </button>
            </div>
          </div>

          {/* Primary High-Impact Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Remainder Badge Card */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border ${
                parsed.remResult!.isFactor
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider block text-slate-500 mb-1">
                {t.remainderBadge}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900">
                R = {parsed.remResult!.remainder}
              </div>
              <span className="text-xs sm:text-sm text-slate-600 mt-1 block">
                {t.evaluatedAtRoot} <span className="font-mono font-bold">c = {parsed.remResult!.c}</span>
              </span>
            </div>

            {/* Factor Theorem Status Card */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border sm:col-span-2 ${
                parsed.remResult!.isFactor
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {parsed.remResult!.isFactor ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                )}
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    parsed.remResult!.isFactor
                      ? 'bg-emerald-200/80 text-emerald-900'
                      : 'bg-amber-200/80 text-amber-900'
                  }`}
                >
                  {parsed.remResult!.isFactor ? t.isFactorBadge : t.isNotFactorBadge}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {parsed.remResult!.isFactor
                  ? `${t.factorTheoremTrue} (${parsed.divisor!.divisorString}) ${t.dividesWithZeroRemainder}`
                  : `${t.factorTheoremFalse} ${parsed.remResult!.remainder}.`}
              </p>

              {/* Complete Factorization Ribbon */}
              {parsed.fullFactorResult && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-indigo-800 uppercase">
                    {t.factoredFormLabel}:
                  </span>
                  <MathView
                    math={`P(x) = ${parsed.fullFactorResult.linearFactorsLatex}`}
                    className="text-base font-bold text-slate-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quotient Display Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {t.quotientLabel}
            </span>
            <MathView
              math={`Q(x) = ${formatPolynomialLatex(parsed.synthResult!.quotientPoly)}`}
              block={true}
              className="text-xl sm:text-2xl font-bold text-slate-900"
            />
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
                  <span className="text-xl font-bold font-mono text-slate-900">
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
