import React, { useState, useMemo } from 'react';
import { Translations } from '../utils/i18n';
import {
  Polynomial,
  DivisorInfo,
  generatePolynomialCurvePoints,
  formatPolynomialLatex,
} from '../utils/mathEngine';
import { MathView } from './MathView';
import { TrendingUp, Crosshair, Sparkles } from 'lucide-react';

interface PolynomialCurveVisualizerProps {
  poly: Polynomial;
  divisor: DivisorInfo;
  t: Translations;
}

export const PolynomialCurveVisualizer: React.FC<PolynomialCurveVisualizerProps> = ({
  poly,
  divisor,
  t,
}) => {
  const cVal = divisor.c;
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null);

  // Generate curve data
  const curveData = useMemo(() => {
    return generatePolynomialCurvePoints(poly, cVal, 160);
  }, [poly, cVal]);

  const { points, minX, maxX, minY, maxY, pOfC } = curveData;

  // SVG coordinate transformation
  const svgWidth = 720;
  const svgHeight = 400;
  const pad = 40;

  const toSvgX = (x: number) => {
    return pad + ((x - minX) / (maxX - minX)) * (svgWidth - 2 * pad);
  };

  const toSvgY = (y: number) => {
    return svgHeight - pad - ((y - minY) / (maxY - minY)) * (svgHeight - 2 * pad);
  };

  const polyPathD = useMemo(() => {
    if (points.length === 0) return '';
    const start = `M ${toSvgX(points[0].x)} ${toSvgY(points[0].y)}`;
    const rest = points
      .slice(1)
      .map(p => `L ${toSvgX(p.x)} ${toSvgY(p.y)}`)
      .join(' ');
    return `${start} ${rest}`;
  }, [points, minX, maxX, minY, maxY]);

  const cSvgX = toSvgX(cVal);
  const cSvgY = toSvgY(pOfC);
  const zeroSvgY = toSvgY(0);
  const zeroSvgX = toSvgX(0);

  const isRoot = Math.abs(pOfC) < 1e-5;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs mb-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.graphTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.graphDesc}
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-xs text-slate-400 block font-mono">y = P(x)</span>
          <span className="text-xs font-semibold text-indigo-700 font-mono">
            P({cVal}) = {Math.round(pOfC * 1000) / 1000}
          </span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="bg-slate-950 rounded-xl p-3 sm:p-4 border border-slate-800 shadow-inner overflow-hidden relative">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width;
            const mathX = minX + relX * (maxX - minX);
            let mathY = 0;
            for (let j = 0; j < poly.coefficients.length; j++) {
              mathY += poly.coefficients[j] * Math.pow(mathX, poly.degree - j);
            }
            setHoveredPoint({ x: mathX, y: mathY });
          }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={svgWidth} height={svgHeight} fill="url(#grid)" />

          {/* Coordinate Axes */}
          {/* X Axis */}
          {zeroSvgY >= pad && zeroSvgY <= svgHeight - pad && (
            <g>
              <line
                x1={pad}
                y1={zeroSvgY}
                x2={svgWidth - pad}
                y2={zeroSvgY}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text
                x={svgWidth - pad + 6}
                y={zeroSvgY + 4}
                fill="#94a3b8"
                fontSize="11"
                fontFamily="monospace"
              >
                x
              </text>
            </g>
          )}

          {/* Y Axis */}
          {zeroSvgX >= pad && zeroSvgX <= svgWidth - pad && (
            <g>
              <line
                x1={zeroSvgX}
                y1={pad}
                x2={zeroSvgX}
                y2={svgHeight - pad}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text
                x={zeroSvgX + 4}
                y={pad - 6}
                fill="#94a3b8"
                fontSize="11"
                fontFamily="monospace"
              >
                y
              </text>
            </g>
          )}

          {/* Vertical dashed guideline at x = c */}
          <line
            x1={cSvgX}
            y1={pad}
            x2={cSvgX}
            y2={svgHeight - pad}
            stroke="#818cf8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Horizontal line from point to y axis representing remainder R */}
          {zeroSvgY >= pad && zeroSvgY <= svgHeight - pad && (
            <line
              x1={cSvgX}
              y1={cSvgY}
              x2={cSvgX}
              y2={zeroSvgY}
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          )}

          {/* The Polynomial Curve */}
          <path
            d={polyPathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Point (c, P(c)) */}
          <circle
            cx={cSvgX}
            cy={cSvgY}
            r="7"
            fill={isRoot ? '#10b981' : '#f59e0b'}
            stroke="#ffffff"
            strokeWidth="2.5"
            className="animate-pulse"
          />

          {/* Text indicator for target point */}
          <text
            x={cSvgX + 10}
            y={cSvgY - 10}
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
            fontFamily="monospace"
          >
            (c={cVal}, R={Math.round(pOfC * 100) / 100})
          </text>

          {/* Mouse Hover Indicator */}
          {hoveredPoint && (
            <g>
              <circle
                cx={toSvgX(hoveredPoint.x)}
                cy={toSvgY(hoveredPoint.y)}
                r="4"
                fill="#38bdf8"
              />
            </g>
          )}
        </svg>

        {/* Hover Coordinate Overlay */}
        {hoveredPoint && (
          <div className="absolute bottom-4 left-6 bg-slate-900/90 text-white border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono shadow-md flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-sky-400" />
            <span>
              x = {hoveredPoint.x.toFixed(2)}, y = {hoveredPoint.y.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Geometric Insight Explanation */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-semibold text-slate-900 mb-1">
            余数定理的函数几何意义：
          </p>
          <p>
            多项式 P(x) 在输入 x = c 时的图像纵坐标高度恰好是余数 R。
            {isRoot ? (
              <span className="font-bold text-emerald-700 ml-1">
                此时 R = 0，目标点位于 x 轴上，代表 (c, 0) 是函数的零点（实根），故 (x - c) 能够整除 P(x)！
              </span>
            ) : (
              <span className="text-slate-600 ml-1">
                此时 R ≠ 0，曲线偏离 x 轴，高度差即为除法剩余的值。
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
