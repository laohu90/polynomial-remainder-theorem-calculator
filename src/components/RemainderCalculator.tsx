import React, { useState, useMemo, useEffect } from 'react';
import { Translations } from '../utils/i18n';
import {
  parsePolynomial,
  parseDivisor,
  evaluateRemainderTheorem,
  performSyntheticDivision,
  performPolynomialLongDivision,
  Polynomial,
  DivisorInfo,
  RemainderTheoremResult,
  SyntheticDivisionResult,
  PolynomialLongDivisionResult,
} from '../utils/mathEngine';
import { ResultsHeroCard } from './ResultsHeroCard';
import { DirectEvaluationCard } from './DirectEvaluationCard';
import { SyntheticDivisionCard } from './SyntheticDivisionCard';
import { LongDivisionCard } from './LongDivisionCard';
import { PolynomialCurveVisualizer } from './PolynomialCurveVisualizer';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  AlertCircle,
  TrendingUp,
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
  const [viewMode, setViewMode] = useState<'all' | 'direct' | 'synthetic' | 'longDivision'>('all');
  const [showCurve, setShowCurve] = useState<boolean>(true);

  // Sync with URL query params if present
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
    { label: t.presetStandard, poly: '2x^3 - 4x^2 + 3x - 5', divisor: 'x - 2' },
    { label: t.presetFactor, poly: 'x^3 - 3x^2 - 4x + 12', divisor: 'x - 3' },
    { label: t.presetFraction, poly: '2x^3 + 3x^2 - 8x + 3', divisor: '2x - 1' },
    { label: t.presetMissingTerm, poly: 'x^3 - 8', divisor: 'x - 2' },
    { label: t.presetQuartic, poly: 'x^4 - 5x^2 + 4', divisor: 'x - 1' },
    { label: t.presetNegativeRoot, poly: '3x^3 + 7x^2 - 2x - 4', divisor: 'x + 2' },
    { label: t.presetQuadDivisor, poly: '2x^4 - x^3 + 3x^2 - 5x + 1', divisor: 'x^2 - x + 1' },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setPolyInput(p.poly);
    setDivisorInput(p.divisor);
  };

  const keypadTokens = ['x', 'x^2', 'x^3', 'x^4', '+', '-', '*', '/', '^', '(', ')'];

  const handleKeypadInsert = (token: string) => {
    setPolyInput(prev => `${prev} ${token}`.trim());
  };

  // Compute results
  const parsedData = useMemo(() => {
    const polyRes = parsePolynomial(polyInput);
    const divRes = parseDivisor(divisorInput);

    if (polyRes.error) return { error: polyRes.error, poly: null, divisor: null };
    if (divRes.error) return { error: divRes.error, poly: null, divisor: null };

    const poly = polyRes.poly!;
    const divisor = divRes.divisor!;

    let remResult: RemainderTheoremResult | null = null;
    let synthResult: SyntheticDivisionResult | null = null;

    if (divisor.isLinear) {
      remResult = evaluateRemainderTheorem(poly, divisor);
      synthResult = performSyntheticDivision(poly, divisor);
    }

    const longDivResult = performPolynomialLongDivision(poly, divisor);

    return {
      error: null,
      poly,
      divisor,
      remResult,
      synthResult,
      longDivResult,
    };
  }, [polyInput, divisorInput]);

  return (
    <div className="space-y-6">
      {/* Input Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 border border-indigo-200/60 rounded-xl text-indigo-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.inputSectionTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.inputSectionDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setPolyInput('2x^3 - 4x^2 + 3x - 5');
              setDivisorInput('x - 2');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetDefault}</span>
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          {/* Polynomial Input (8 cols) */}
          <div className="lg:col-span-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              {t.polyLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={polyInput}
                onChange={(e) => setPolyInput(e.target.value)}
                placeholder={t.polyPlaceholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm sm:text-base focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Quick Virtual Keypad */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[11px] text-slate-400 mr-1 select-none font-medium">{t.quickInsert}</span>
              {keypadTokens.map((token) => (
                <button
                  key={token}
                  onClick={() => handleKeypadInsert(token)}
                  className="px-2 py-1 text-xs font-mono font-medium rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70 transition-colors"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          {/* Divisor Input (4 cols) */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              {t.divisorLabel}
            </label>
            <input
              type="text"
              value={divisorInput}
              onChange={(e) => setDivisorInput(e.target.value)}
              placeholder={t.divisorPlaceholder}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm sm:text-base focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
            />
            <p className="text-[11px] text-slate-400 mt-2">
              {t.divisorHelp}
            </p>
          </div>
        </div>

        {/* Quick Presets Pills */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.presetsTitle}</span>
            </span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 text-slate-700 transition-all shadow-2xs"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error notification if parsing fails */}
        {parsedData.error && (
          <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{t.formatNotice}</p>
              <p className="mt-0.5 text-rose-700">{parsedData.error}</p>
            </div>
          </div>
        )}
      </div>

      {/* If input parsed successfully */}
      {parsedData.poly && parsedData.divisor && parsedData.longDivResult && (
        <>
          {/* Hero Summary Card */}
          <ResultsHeroCard
            poly={parsedData.poly}
            divisor={parsedData.divisor}
            remResult={parsedData.remResult || {
              c: 0,
              cFraction: { n: 0, d: 1 },
              remainder: parsedData.longDivResult.remainderVal,
              remainderFraction: { n: parsedData.longDivResult.remainderVal, d: 1 },
              steps: [],
              directSubstitutionLatex: '',
              expandedCalculationLatex: '',
              isFactor: parsedData.longDivResult.isFactor,
            }}
            synthResult={parsedData.synthResult || {
              c: 0,
              cFraction: { n: 0, d: 1 },
              divisorA: 1,
              topRow: parsedData.poly.coefficients,
              middleRow: [],
              bottomRow: [],
              quotientCoefficients: parsedData.longDivResult.quotientPoly.coefficients,
              quotientPoly: parsedData.longDivResult.quotientPoly,
              remainder: parsedData.longDivResult.remainderVal,
              steps: [],
              summaryIdentityLatex: parsedData.longDivResult.identityLatex,
              isFactor: parsedData.longDivResult.isFactor,
            }}
            longDivResult={parsedData.longDivResult}
            t={t}
          />

          {/* View Mode Selector Tabs & Visualizer Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  viewMode === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.viewAll}
              </button>
              {parsedData.divisor.isLinear && (
                <>
                  <button
                    onClick={() => setViewMode('direct')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      viewMode === 'direct'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {t.viewDirect}
                  </button>
                  <button
                    onClick={() => setViewMode('synthetic')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      viewMode === 'synthetic'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {t.viewSynthetic}
                  </button>
                </>
              )}
              <button
                onClick={() => setViewMode('longDivision')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  viewMode === 'longDivision'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.viewLongDivision}
              </button>
            </div>

            {/* Toggle Curve Visualizer */}
            {parsedData.divisor.isLinear && (
              <button
                onClick={() => setShowCurve(!showCurve)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  showCurve
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{showCurve ? t.hideCurve : t.showCurve}</span>
              </button>
            )}
          </div>

          {/* Interactive Curve Visualizer (if enabled and linear) */}
          {showCurve && parsedData.divisor.isLinear && (
            <PolynomialCurveVisualizer
              poly={parsedData.poly}
              divisor={parsedData.divisor}
              t={t}
            />
          )}

          {/* Method 1: Direct Evaluation */}
          {parsedData.divisor.isLinear && parsedData.remResult && (viewMode === 'all' || viewMode === 'direct') && (
            <DirectEvaluationCard
              poly={parsedData.poly}
              divisor={parsedData.divisor}
              result={parsedData.remResult}
              t={t}
            />
          )}

          {/* Method 2: Synthetic Division */}
          {parsedData.divisor.isLinear && parsedData.synthResult && (viewMode === 'all' || viewMode === 'synthetic') && (
            <SyntheticDivisionCard
              result={parsedData.synthResult}
              t={t}
            />
          )}

          {/* Method 3: Polynomial Long Division */}
          {(viewMode === 'all' || viewMode === 'longDivision' || !parsedData.divisor.isLinear) && (
            <LongDivisionCard
              result={parsedData.longDivResult}
              t={t}
            />
          )}
        </>
      )}
    </div>
  );
};
