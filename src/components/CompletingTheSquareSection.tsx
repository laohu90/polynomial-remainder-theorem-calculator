import React, { useState, useMemo } from 'react';
import {
  solveCompletingTheSquare,
  CompletingSquareResult,
  parseQuadraticEquationString,
  formatFraction,
} from '../utils/mathEngine';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { Copy, Check, Grid, Sparkles, HelpCircle } from 'lucide-react';

interface CompletingTheSquareSectionProps {
  t: Translations;
}

export const CompletingTheSquareSection: React.FC<CompletingTheSquareSectionProps> = ({ t }) => {
  const [equationMode, setEquationMode] = useState<'equation' | 'coefficients'>('equation');
  const [equationInput, setEquationInput] = useState<string>("x^2 + 6x + 5 = 0");
  const [aInput, setAInput] = useState<string>("1");
  const [bInput, setBInput] = useState<string>("6");
  const [cInput, setCInput] = useState<string>("5");
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    { label: t.ctsPreset1, eq: "x^2 + 6x + 5 = 0", a: "1", b: "6", c: "5" },
    { label: t.ctsPreset2, eq: "2x^2 + 8x - 10 = 0", a: "2", b: "8", c: "-10" },
    { label: t.ctsPreset3, eq: "x^2 + 5x + 6 = 0", a: "1", b: "5", c: "6" },
    { label: t.ctsPreset4, eq: "x^2 - 4x + 13 = 0", a: "1", b: "-4", c: "13" },
    { label: t.ctsPreset5, eq: "3x^2 - 12x + 9 = 0", a: "3", b: "-12", c: "9" },
  ];

  const handlePreset = (p: typeof presets[0]) => {
    setEquationInput(p.eq);
    setAInput(p.a);
    setBInput(p.b);
    setCInput(p.c);
  };

  const solution = useMemo<CompletingSquareResult | { error: string }>(() => {
    let a = 1;
    let b = 0;
    let c = 0;

    if (equationMode === 'equation') {
      const parsed = parseQuadraticEquationString(equationInput);
      if (parsed.error) return { error: parsed.error };
      a = parsed.a;
      b = parsed.b;
      c = parsed.c;
    } else {
      a = parseFloat(aInput);
      b = parseFloat(bInput);
      c = parseFloat(cInput);
      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        return { error: "Please enter valid numeric coefficients for a, b, and c." };
      }
      if (Math.abs(a) < 1e-9) {
        return { error: "The leading coefficient 'a' cannot be 0 in a quadratic equation." };
      }
    }

    try {
      return solveCompletingTheSquare(a, b, c);
    } catch (e: any) {
      return { error: e.message || "Failed to solve completing the square." };
    }
  }, [equationMode, equationInput, aInput, bInput, cInput]);

  const hasResult = !('error' in solution);

  const handleCopySteps = () => {
    if (!hasResult) return;
    const res = solution as CompletingSquareResult;
    const text = `Completing the Square: ${res.a}x^2 + ${res.b}x + ${res.c} = 0
${res.steps.map((s) => `Step ${s.stepNumber}: ${s.explanation} => ${s.mathLatex}`).join('\n')}
Vertex Form: ${res.vertexFormLatex}
Roots: x1 = ${res.roots.root1Str}, x2 = ${res.roots.root2Str}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parabola graph data
  const graphData = useMemo(() => {
    if (!hasResult) return null;
    const res = solution as CompletingSquareResult;
    const h = res.vertexH;
    const k = res.vertexK;
    const a = res.a;

    const xSpan = 8;
    const minX = h - xSpan / 2;
    const maxX = h + xSpan / 2;
    const points: string[] = [];

    const width = 360;
    const height = 210;
    const margin = 25;

    const sampleY: number[] = [];
    for (let x = minX; x <= maxX; x += 0.2) {
      sampleY.push(a * Math.pow(x - h, 2) + k);
    }
    const minY = Math.min(-10, Math.min(...sampleY));
    const maxY = Math.max(10, Math.max(...sampleY));

    const scaleX = (x: number) => margin + ((x - minX) / (maxX - minX)) * (width - 2 * margin);
    const scaleY = (y: number) => height - margin - ((y - minY) / (maxY - minY)) * (height - 2 * margin);

    for (let x = minX; x <= maxX; x += 0.1) {
      const y = a * Math.pow(x - h, 2) + k;
      if (y >= minY && y <= maxY) {
        points.push(`${scaleX(x).toFixed(1)},${scaleY(y).toFixed(1)}`);
      }
    }

    const zeroX = scaleX(0);
    const zeroY = scaleY(0);
    const vertexSvgX = scaleX(h);
    const vertexSvgY = scaleY(k);

    return {
      points: points.join(' '),
      width,
      height,
      zeroX: zeroX >= 0 && zeroX <= width ? zeroX : null,
      zeroY: zeroY >= 0 && zeroY <= height ? zeroY : null,
      vertexSvgX,
      vertexSvgY,
      vertexH: h,
      vertexK: k,
    };
  }, [solution, hasResult]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      <div className="max-w-3xl mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {t.ctsHeading}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-1 leading-relaxed">
          {t.ctsSubheading}
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
              onClick={() => handlePreset(p)}
              className="text-xs font-medium px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors border border-slate-200 shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setEquationMode('equation')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
            equationMode === 'equation'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.ctsModeEquation}
        </button>
        <button
          onClick={() => setEquationMode('coefficients')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
            equationMode === 'coefficients'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.ctsModeCoeffs}
        </button>
      </div>

      {/* Input Fields */}
      {equationMode === 'equation' ? (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {t.ctsEquationLabel}
          </label>
          <input
            type="text"
            value={equationInput}
            onChange={(e) => setEquationInput(e.target.value)}
            placeholder={t.ctsEquationPlaceholder}
            className="w-full px-4 py-3 text-lg font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.ctsInputA}</label>
            <input
              type="number"
              value={aInput}
              onChange={(e) => setAInput(e.target.value)}
              className="w-full px-4 py-3 text-lg font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.ctsInputB}</label>
            <input
              type="number"
              value={bInput}
              onChange={(e) => setBInput(e.target.value)}
              className="w-full px-4 py-3 text-lg font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="6"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t.ctsInputC}</label>
            <input
              type="number"
              value={cInput}
              onChange={(e) => setCInput(e.target.value)}
              className="w-full px-4 py-3 text-lg font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="5"
            />
          </div>
        </div>
      )}

      {/* Current equation formatted */}
      {hasResult && (
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-800 block mb-0.5">
              {t.ctsStandardEqTitle}
            </span>
            <MathView
              math={`${(solution as CompletingSquareResult).a}x^2 ${(solution as CompletingSquareResult).b >= 0 ? `+ ${(solution as CompletingSquareResult).b}` : `- ${Math.abs((solution as CompletingSquareResult).b)}`}x ${(solution as CompletingSquareResult).c >= 0 ? `+ ${(solution as CompletingSquareResult).c}` : `- ${Math.abs((solution as CompletingSquareResult).c)}`} = 0`}
              className="text-xl font-bold text-indigo-950"
            />
          </div>

          <button
            onClick={handleCopySteps}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.stepsCopied : t.copySteps}</span>
          </button>
        </div>
      )}

      {/* Error state */}
      {!hasResult && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
          {(solution as { error: string }).error}
        </div>
      )}

      {/* Full 5-Step Breakdown */}
      {hasResult && (
        <div className="space-y-6">
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
            {(solution as CompletingSquareResult).steps.map((step) => {
              const titles = [
                t.ctsStep1Title,
                t.ctsStep2Title,
                t.ctsStep3Title,
                t.ctsStep4Title,
                t.ctsStep5Title,
              ];
              const stepTitle = titles[step.stepNumber - 1] || `Step ${step.stepNumber}`;

              return (
                <div key={step.stepNumber} className="p-5 sm:p-6 bg-white hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold">
                      {step.stepNumber}
                    </span>
                    <div className="grow">
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{stepTitle}</h4>
                      <p className="text-base text-slate-600 leading-relaxed mb-3">{step.explanation}</p>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center sm:text-left">
                        <MathView math={step.mathLatex} block={true} className="text-lg text-slate-900 font-semibold" />
                      </div>
                      {step.notes && (
                        <p className="text-xs sm:text-sm text-amber-800 mt-2 font-medium bg-amber-50 px-3 py-1.5 rounded-lg inline-block border border-amber-200/50">
                          💡 {step.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Geometric Area Model Box (US High School Common Core Signature Model) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Grid className="w-5 h-5 text-indigo-600" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                {t.ctsTilesTitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              {t.ctsTilesDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-white rounded-xl border border-slate-200">
              {/* Visual Box Diagram */}
              <div className="relative w-48 h-48 border-2 border-indigo-600 rounded-lg p-1 bg-indigo-50/30 flex flex-col justify-between">
                <div className="flex h-32 w-full gap-1">
                  <div className="w-32 h-full bg-indigo-200 rounded border border-indigo-400 flex items-center justify-center font-bold text-indigo-900 text-sm">
                    x²
                  </div>
                  <div className="grow h-full bg-blue-100 rounded border border-blue-300 flex items-center justify-center text-xs font-semibold text-blue-900 text-center p-1">
                    ({formatFraction((solution as CompletingSquareResult).halfBOverA)})x
                  </div>
                </div>
                <div className="flex h-12 w-full gap-1">
                  <div className="w-32 h-full bg-blue-100 rounded border border-blue-300 flex items-center justify-center text-xs font-semibold text-blue-900">
                    ({formatFraction((solution as CompletingSquareResult).halfBOverA)})x
                  </div>
                  <div className="grow h-full bg-amber-200 rounded border border-amber-400 flex items-center justify-center text-xs font-bold text-amber-900 text-center p-1">
                    +({formatFraction((solution as CompletingSquareResult).magicSquare)})
                  </div>
                </div>
              </div>

              {/* Explanatory side */}
              <div className="text-xs sm:text-sm text-slate-700 space-y-2 max-w-sm">
                <div>
                  <span className="font-bold text-indigo-900 block">{t.ctsTilesTotalArea}</span>
                  <MathView math={`\\left(x + ${formatFraction((solution as CompletingSquareResult).halfBOverA)}\\right)^2`} className="text-base" />
                </div>
                <div>
                  <span className="font-bold text-amber-800 block">{t.ctsTilesAddedCorner}</span>
                  <MathView math={`\\left(\\frac{b}{2a}\\right)^2 = ${formatFraction((solution as CompletingSquareResult).magicSquare)}`} className="text-base" />
                </div>
                <p className="text-xs text-slate-500">
                  {t.ctsTilesExpl}
                </p>
              </div>
            </div>
          </div>

          {/* Solution Summary & Parabola Vertex Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left: Vertex Form & Roots */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-3">{t.ctsVertexFormTitle}</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">{t.ctsVertexFormEquation}</span>
                  <MathView
                    math={(solution as CompletingSquareResult).vertexFormLatex}
                    block={true}
                    className="text-lg font-bold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">{t.ctsVertexCoordinates}</span>
                    <span className="font-mono font-bold text-base text-slate-800">
                      ({(solution as CompletingSquareResult).vertexH.toFixed(2)},{' '}
                      {(solution as CompletingSquareResult).vertexK.toFixed(2)})
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">{t.ctsDiscriminant}</span>
                    <span className="font-mono font-bold text-base text-slate-800">
                      {(solution as CompletingSquareResult).discriminant}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block mb-1">{t.ctsRootsFound}:</span>
                  <div className="flex flex-col gap-2 font-mono">
                    <div className="flex items-center justify-between text-base">
                      <span className="text-slate-600 font-sans text-xs">x₁:</span>
                      <MathView math={(solution as CompletingSquareResult).roots.root1Latex} />
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-slate-600 font-sans text-xs">x₂:</span>
                      <MathView math={(solution as CompletingSquareResult).roots.root2Latex} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Parabola Curve Plot */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-900">{t.ctsParabolaTitle}</h4>
                <span className="text-xs text-slate-500 font-mono">y = ax² + bx + c</span>
              </div>
              {graphData && (
                <div className="bg-white p-2 rounded-lg border border-slate-200 w-full flex justify-center">
                  <svg width={graphData.width} height={graphData.height} className="overflow-visible">
                    {/* Axes */}
                    {graphData.zeroY !== null && (
                      <line
                        x1="10"
                        y1={graphData.zeroY}
                        x2={graphData.width - 10}
                        y2={graphData.zeroY}
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                    )}
                    {graphData.zeroX !== null && (
                      <line
                        x1={graphData.zeroX}
                        y1="10"
                        x2={graphData.zeroX}
                        y2={graphData.height - 10}
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                    )}

                    {/* Parabola Curve */}
                    <polyline
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2.5"
                      points={graphData.points}
                    />

                    {/* Vertex point */}
                    <circle
                      cx={graphData.vertexSvgX}
                      cy={graphData.vertexSvgY}
                      r="5"
                      fill="#ef4444"
                    />
                    <text
                      x={graphData.vertexSvgX + 8}
                      y={graphData.vertexSvgY - 6}
                      fontSize="11"
                      fill="#1e293b"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {t.ctsVertexLabel} ({graphData.vertexH.toFixed(1)}, {graphData.vertexK.toFixed(1)})
                    </text>
                  </svg>
                </div>
              )}
              <p className="text-xs text-slate-500 text-center mt-2">
                {(solution as CompletingSquareResult).a > 0 ? t.ctsParabolaOpensUp : t.ctsParabolaOpensDown}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
