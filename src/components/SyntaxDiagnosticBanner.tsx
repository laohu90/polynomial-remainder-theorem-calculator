import React from 'react';
import { ParseDiagnostic } from '../utils/mathEngine';
import { AlertCircle, Wrench, Lightbulb, Check } from 'lucide-react';

interface SyntaxDiagnosticBannerProps {
  diagnostic: ParseDiagnostic;
  rawInput: string;
  fieldLabel: string;
  onApplyQuickFix?: (fixedText: string) => void;
}

export const SyntaxDiagnosticBanner: React.FC<SyntaxDiagnosticBannerProps> = ({
  diagnostic,
  rawInput,
  fieldLabel,
  onApplyQuickFix,
}) => {
  const [fixedApplied, setFixedApplied] = React.useState(false);

  const handleFix = () => {
    if (diagnostic.quickFix && onApplyQuickFix) {
      onApplyQuickFix(diagnostic.quickFix);
      setFixedApplied(true);
      setTimeout(() => setFixedApplied(false), 2000);
    }
  };

  const pos = diagnostic.position ?? -1;
  const len = diagnostic.length ?? 1;

  // Split input into before, error, after for colored syntax highlighting
  let before = rawInput;
  let errorToken = '';
  let after = '';

  if (pos >= 0 && pos < rawInput.length) {
    before = rawInput.slice(0, pos);
    errorToken = rawInput.slice(pos, pos + len);
    after = rawInput.slice(pos + len);
  }

  return (
    <div className="mt-3 p-4 bg-rose-50/90 border border-rose-200/90 rounded-xl text-xs sm:text-sm text-rose-950 shadow-2xs transition-all animate-fadeIn">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>

        <div className="grow space-y-2">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-rose-900 tracking-tight flex items-center gap-1.5">
              <span>{fieldLabel}:</span>
              <span>{diagnostic.message}</span>
            </span>

            {diagnostic.quickFix && onApplyQuickFix && (
              <button
                type="button"
                onClick={handleFix}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-600 hover:bg-rose-700 text-white shadow-2xs transition-colors shrink-0"
              >
                {fixedApplied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>已应用 (Applied)</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-3.5 h-3.5" />
                    <span>一键修复 (Quick Fix)</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Pinpoint Monospace Visual Caret Display */}
          {pos >= 0 && (
            <div className="p-2.5 bg-white border border-rose-200 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
              <div className="text-slate-700 select-all whitespace-pre">
                <span>{before}</span>
                <span className="bg-rose-200 text-rose-950 font-bold px-0.5 rounded underline decoration-rose-500 decoration-2">
                  {errorToken || ' '}
                </span>
                <span>{after}</span>
              </div>
              <div className="text-rose-600 font-bold select-none whitespace-pre">
                {' '.repeat(pos)}
                {'▲'.repeat(Math.max(1, len))}
                <span className="ml-2 font-sans font-medium text-slate-500 text-[11px]">
                  位置 {pos + 1}
                </span>
              </div>
            </div>
          )}

          {/* Educational Explanation */}
          {diagnostic.detail && (
            <p className="text-xs text-rose-800 leading-normal">
              {diagnostic.detail}
            </p>
          )}

          {/* Suggestion */}
          {diagnostic.suggestion && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1 border-t border-rose-200/50">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                建议书写格式：<code className="bg-rose-100/70 px-1 py-0.5 rounded font-mono font-semibold text-rose-900">{diagnostic.suggestion}</code>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
