import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { Polynomial, evaluateBatchRemainder, formatPolynomialLatex } from '../utils/mathEngine';
import { Layers, Play, CheckCircle2, XCircle, FileSpreadsheet } from 'lucide-react';

interface BatchEvaluationSectionProps {
  poly: Polynomial;
  t: Translations;
  onSelectDivisor: (divStr: string) => void;
}

export const BatchEvaluationSection: React.FC<BatchEvaluationSectionProps> = ({
  poly,
  t,
  onSelectDivisor,
}) => {
  const [pointsInput, setPointsInput] = useState<string>('-3, -2, -1, 0, 1, 2, 3, 4, 1.5, 0.5');
  const [evaluatedRows, setEvaluatedRows] = useState<ReturnType<typeof evaluateBatchRemainder>>(() => {
    return evaluateBatchRemainder(poly, [-3, -2, -1, 0, 1, 2, 3, 4, 1.5, 0.5]);
  });

  const handleRunBatch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parts = pointsInput
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(s => parseFloat(s))
        .filter(n => !isNaN(n));
      const uniquePoints = Array.from(new Set(parts)).slice(0, 30);
      const rows = evaluateBatchRemainder(poly, uniquePoints);
      setEvaluatedRows(rows);
    } catch {
      // ignore
    }
  };

  const handleExportCSV = () => {
    const headers = ['Divisor (x-c)', 'Root (c)', 'Remainder (R)', 'Is Factor', 'Quotient Q(x)'];
    const rows = evaluatedRows.map(r => [
      r.divisorString,
      r.c,
      r.remainder,
      r.isFactor ? 'TRUE' : 'FALSE',
      `"${r.quotientLatex}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `polynomial_batch_evaluation_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-200/60 text-violet-700">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                批量求值与多点余数分析 (Batch Polynomial Evaluation)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                一次性计算多项式 P({poly.variable}) 在多个不同除式与根 c 下的余数、因式判定及商式
              </p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>导出 CSV 报告</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRunBatch} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              测试点与根集合 c (逗号或空格分隔)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={pointsInput}
                onChange={(e) => setPointsInput(e.target.value)}
                placeholder="-3, -2, -1, 0, 1, 2, 3, 1.5, 0.5"
                className="grow px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>运行批量计算 (Run Batch)</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              当前目标多项式：<span className="font-mono font-semibold text-slate-800">P({poly.variable}) = {formatPolynomialLatex(poly)}</span>
            </p>
          </div>
        </form>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          批量测试结果矩阵 ({evaluatedRows.length} 个测试点)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/80">
                <th className="py-3 px-4">除式 D(x)</th>
                <th className="py-3 px-4">代入根 c</th>
                <th className="py-3 px-4">余数 R = P(c)</th>
                <th className="py-3 px-4">因式定理判定</th>
                <th className="py-3 px-4">对应商式 Q(x)</th>
                <th className="py-3 px-4 text-right">快捷操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {evaluatedRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <MathView math={row.divisorLatex} />
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {row.c}
                  </td>
                  <td className={`py-3 px-4 font-bold ${Math.abs(row.remainder) < 1e-7 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {row.remainder}
                  </td>
                  <td className="py-3 px-4">
                    {Math.abs(row.remainder) < 1e-7 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>是因式 (R = 0)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>非因式 (R ≠ 0)</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-indigo-700">
                    <MathView math={row.quotientLatex} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectDivisor(row.divisorString)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/60 transition-colors font-sans"
                    >
                      加载到计算器
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
