import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { parsePolynomial, parseDivisor, evaluateRemainderTheorem, performSyntheticDivision } from '../utils/mathEngine';
import { MathView } from './MathView';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { SyntheticDivisionTable } from './SyntheticDivisionTable';

interface PracticeProblem {
  id: number;
  polyStr: string;
  divisorStr: string;
  questionText: string;
  correctRemainder: number;
  isFactor: boolean;
}

const practiceSet: PracticeProblem[] = [
  {
    id: 1,
    polyStr: "2x^3 - 4x^2 + 3x - 5",
    divisorStr: "x - 2",
    questionText: "Find the remainder when P(x) = 2x³ - 4x² + 3x - 5 is divided by (x - 2).",
    correctRemainder: 1,
    isFactor: false,
  },
  {
    id: 2,
    polyStr: "x^3 - 3x^2 - 4x + 12",
    divisorStr: "x - 3",
    questionText: "Use the Factor Theorem to determine if (x - 3) is a factor of P(x) = x³ - 3x² - 4x + 12. Enter the remainder:",
    correctRemainder: 0,
    isFactor: true,
  },
  {
    id: 3,
    polyStr: "x^4 - 16",
    divisorStr: "x + 2",
    questionText: "Calculate the remainder of P(x) = x⁴ - 16 divided by (x + 2):",
    correctRemainder: 0,
    isFactor: true,
  },
  {
    id: 4,
    polyStr: "3x^3 + 5x^2 - 11x + 3",
    divisorStr: "2x - 1",
    questionText: "Find the remainder when P(x) = 3x³ + 5x² - 11x + 3 is divided by (2x - 1). (c = 1/2 = 0.5):",
    correctRemainder: -0.875,
    isFactor: false,
  },
  {
    id: 5,
    polyStr: "x^3 + 2x^2 - 5x - 6",
    divisorStr: "x + 1",
    questionText: "Is (x + 1) an exact factor of P(x) = x³ + 2x² - 5x - 6? Enter remainder R:",
    correctRemainder: 0,
    isFactor: true,
  },
];

interface PracticeQuizSectionProps {
  t: Translations;
}

export const PracticeQuizSection: React.FC<PracticeQuizSectionProps> = ({ t }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false);

  const currentProblem = practiceSet[problemIndex];

  const handleCheck = () => {
    const val = parseFloat(userAnswer.trim());
    if (isNaN(val)) return;

    const correct = Math.abs(val - currentProblem.correctRemainder) < 1e-4;
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleNext = () => {
    setProblemIndex((prev) => (prev + 1) % practiceSet.length);
    setUserAnswer("");
    setSubmitted(false);
    setIsCorrect(null);
    setShowFullSolution(false);
  };

  // Compute solution for display
  const polyParsed = parsePolynomial(currentProblem.polyStr).poly;
  const divisorParsed = parseDivisor(currentProblem.divisorStr).divisor;
  const remResult = polyParsed && divisorParsed ? evaluateRemainderTheorem(polyParsed, divisorParsed) : null;
  const synthResult = polyParsed && divisorParsed ? performSyntheticDivision(polyParsed, divisorParsed) : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      <div className="max-w-3xl mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.practiceHeading}</h2>
        <p className="text-base text-slate-600 mt-1">{t.practiceSubheading}</p>
      </div>

      {/* Progress pill */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 text-xs font-semibold text-slate-500">
        <span>Problem {problemIndex + 1} of {practiceSet.length}</span>
        <span>High School Algebra 2 Exam Prep</span>
      </div>

      {/* Question Card */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 mb-6">
        <p className="text-base sm:text-lg font-medium text-slate-900 mb-3 leading-relaxed">
          {currentProblem.questionText}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-indigo-900 bg-white p-3 rounded-lg border border-indigo-100">
          <div><span className="font-sans text-xs text-slate-500 block">Polynomial P(x):</span> {currentProblem.polyStr}</div>
          <div className="border-l border-slate-200 pl-4"><span className="font-sans text-xs text-slate-500 block">Divisor D(x):</span> {currentProblem.divisorStr}</div>
        </div>
      </div>

      {/* Input & Check */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <label className="text-xs font-semibold text-slate-700 block mb-1">{t.practiceYourAnswer}</label>
          <input
            type="number"
            step="any"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={submitted && isCorrect === true}
            className="w-48 px-4 py-2.5 text-base font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 0 or 1"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={!userAnswer.trim()}
          className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors shadow-2xs"
        >
          {t.practiceSubmit}
        </button>

        <button
          onClick={handleNext}
          className="mt-5 flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <span>{t.practiceNext}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feedback Alert */}
      {submitted && (
        <div
          className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div className="grow">
            <h4 className="text-sm font-bold">
              {isCorrect ? t.practiceCorrect : t.practiceIncorrect}
            </h4>
            <p className="text-xs mt-1">
              Correct Remainder R = {currentProblem.correctRemainder}.{' '}
              {currentProblem.isFactor ? 'By the Factor Theorem, it is an exact factor!' : 'It does not divide evenly.'}
            </p>
          </div>
          <button
            onClick={() => setShowFullSolution(!showFullSolution)}
            className="text-xs font-semibold underline underline-offset-2 hover:opacity-80 shrink-0"
          >
            {showFullSolution ? 'Hide Solution' : t.practiceShowSolution}
          </button>
        </div>
      )}

      {/* Full Solution Breakdown (if toggled) */}
      {showFullSolution && remResult && synthResult && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h4 className="text-base font-bold text-slate-900 mb-2">Step-by-Step Proof</h4>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Direct Evaluation P({remResult.c}):
              </span>
              <MathView
                math={`P(${remResult.c}) = ${remResult.directSubstitutionLatex} = ${remResult.expandedCalculationLatex} = ${remResult.remainder}`}
                block={true}
                className="text-base text-slate-900"
              />
            </div>

            <SyntheticDivisionTable result={synthResult} t={t} />
          </div>
        </div>
      )}
    </div>
  );
};
