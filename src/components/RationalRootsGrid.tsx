import React from 'react';
import { Polynomial, computeRationalRootCandidates } from '../utils/mathEngine';
import { Translations } from '../utils/i18n';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface RationalRootsGridProps {
  poly: Polynomial;
  t: Translations;
  onSelectCandidate: (cStr: string) => void;
}

export const RationalRootsGrid: React.FC<RationalRootsGridProps> = ({ poly, t, onSelectCandidate }) => {
  const result = computeRationalRootCandidates(poly);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-5">
      <div className="mb-3">
        <h4 className="text-base font-bold text-slate-900">{t.rationalRootHeading}</h4>
        <p className="text-sm text-slate-600">{t.rationalRootSubheading}</p>
      </div>

      {/* Factors breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 mb-4 bg-white p-3 rounded-lg border border-slate-200">
        <div>
          <span className="font-semibold text-indigo-700">{t.factorsOfConstant} ({result.constantTerm}):</span>
          <span className="font-mono ml-2">p ∈ &#123;{result.pFactors.join(', ')}&#125;</span>
        </div>
        <div>
          <span className="font-semibold text-indigo-700">{t.factorsOfLeading} ({result.leadingCoeff}):</span>
          <span className="font-mono ml-2">q ∈ &#123;{result.qFactors.join(', ')}&#125;</span>
        </div>
      </div>

      {/* Candidate Badges */}
      <div className="flex flex-wrap gap-2">
        {result.candidates.map((cand, idx) => {
          const isActualRoot = cand.isRoot;
          return (
            <button
              key={idx}
              onClick={() => onSelectCandidate(cand.display)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border shadow-2xs ${
                isActualRoot
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold hover:bg-emerald-100 ring-2 ring-emerald-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={`P(${cand.display}) = ${cand.remainder}`}
            >
              <span>{cand.display}</span>
              {isActualRoot ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-60 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>{t.rationalGreenTip}</span>
      </p>
    </div>
  );
};
