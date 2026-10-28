import React, { useState } from 'react';
import { generateAcademicCitations } from '../utils/academicCitation';
import { Copy, Check, X, Share2, BookOpen, ExternalLink, Link2, FileCode } from 'lucide-react';

interface ShareAndCiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  polyStr: string;
  divisorStr: string;
  variable: string;
  remainderVal: number | string;
  quotientStr: string;
}

export const ShareAndCiteModal: React.FC<ShareAndCiteModalProps> = ({
  isOpen,
  onClose,
  polyStr,
  divisorStr,
  variable,
  remainderVal,
  quotientStr,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCiteFormat, setActiveCiteFormat] = useState<'bibtex' | 'apa' | 'mla' | 'chicago'>('bibtex');

  if (!isOpen) return null;

  // Build canonical URL
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('p', polyStr);
  url.searchParams.set('d', divisorStr);
  url.searchParams.set('var', variable);
  const shareableUrl = url.toString();

  const citations = generateAcademicCitations(shareableUrl);
  const activeCitation = citations.find(c => c.format === activeCiteFormat)?.citationText || '';

  const markdownLink = `[Polynomial Remainder Solution: $(${polyStr}) \\div (${divisorStr})$](${shareableUrl})`;
  const latexSnippet = `P(${variable}) = ${polyStr}, \\quad D(${variable}) = ${divisorStr} \\implies R = ${remainderVal}`;

  const copyToClipboard = (text: string, key: string) => {
    // Ensure URL updates in browser bar synchronously
    try {
      window.history.replaceState({}, '', shareableUrl);
    } catch {
      // ignore
    }

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5 text-slate-900">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                分享题目与学术引用 (Share & Academic Citation)
              </h3>
              <p className="text-xs text-slate-500">
                永久固定链接与教材/论文标准引用格式
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Direct Share Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>题目的唯一永久链接 (Permanent Problem URL)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="grow px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none select-all"
              />
              <button
                onClick={() => copyToClipboard(shareableUrl, 'url')}
                className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors shrink-0"
              >
                {copiedKey === 'url' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>已复制链接</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制链接</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              任何人打开此链接都将直接载入该多项式、除式、自变量及全部解题步骤。
            </p>
          </div>

          {/* Section 2: Quick Math Snippets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700">Markdown 链接</span>
                <button
                  onClick={() => copyToClipboard(markdownLink, 'md')}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  {copiedKey === 'md' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'md' ? '已复制' : '复制'}</span>
                </button>
              </div>
              <p className="font-mono text-[11px] text-slate-600 truncate bg-white p-1.5 rounded border border-slate-200">
                {markdownLink}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700">LaTeX 算式代码</span>
                <button
                  onClick={() => copyToClipboard(latexSnippet, 'latex')}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  {copiedKey === 'latex' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'latex' ? '已复制' : '复制'}</span>
                </button>
              </div>
              <p className="font-mono text-[11px] text-slate-600 truncate bg-white p-1.5 rounded border border-slate-200">
                {latexSnippet}
              </p>
            </div>
          </div>

          {/* Section 3: Academic Citation Generator */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>文献/教材引用格式 (Academic Citation)</span>
              </label>

              {/* Format Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {(['bibtex', 'apa', 'mla', 'chicago'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setActiveCiteFormat(fmt)}
                    className={`px-2 py-0.5 text-xs font-semibold rounded uppercase transition-colors ${
                      activeCiteFormat === fmt
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                {activeCitation}
              </pre>
              <button
                onClick={() => copyToClipboard(activeCitation, 'cite')}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'cite' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>复制引用</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              适用于高中数学课件、IB/AP 课程学术作业、大学高等代数实验报告及文献索引。
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Polynomial Algebra Laboratory · 开放学术标准
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
          >
            完成 (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
