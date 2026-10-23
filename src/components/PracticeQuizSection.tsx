import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface PracticeQuizSectionProps {
  t: Translations;
  onApplyProblemToCalculator: (poly: string, divisor: string) => void;
}

interface QuizItem {
  id: number;
  question: string;
  poly: string;
  divisor: string;
  mathDisplay: string;
  options: { label: string; value: string; isCorrect: boolean }[];
  explanation: string;
}

export const PracticeQuizSection: React.FC<PracticeQuizSectionProps> = ({
  t,
  onApplyProblemToCalculator,
}) => {
  const quizList: QuizItem[] = [
    {
      id: 1,
      question: "计算多项式 P(x) = 2x³ - 5x² + x - 2 除以 (x - 2) 的余数 R 是多少？",
      poly: "2x^3 - 5x^2 + x - 2",
      divisor: "x - 2",
      mathDisplay: "P(x) = 2x^3 - 5x^2 + x - 2, \\quad D(x) = x - 2",
      options: [
        { label: "R = -4", value: "-4", isCorrect: true },
        { label: "R = 0", value: "0", isCorrect: false },
        { label: "R = 2", value: "2", isCorrect: false },
        { label: "R = 4", value: "4", isCorrect: false },
      ],
      explanation: "代入余数定理：c = 2，P(2) = 2(2)³ - 5(2)² + (2) - 2 = 16 - 20 + 2 - 2 = -4。",
    },
    {
      id: 2,
      question: "已知多项式 P(x) = x³ - 4x² + kx - 6 能被 (x - 3) 整除，则常数 k 的值为？",
      poly: "x^3 - 4x^2 + 5x - 6",
      divisor: "x - 3",
      mathDisplay: "P(3) = 0 \\implies 3^3 - 4(3)^2 + 3k - 6 = 0",
      options: [
        { label: "k = 5", value: "5", isCorrect: true },
        { label: "k = -5", value: "-5", isCorrect: false },
        { label: "k = 3", value: "3", isCorrect: false },
        { label: "k = 15", value: "15", isCorrect: false },
      ],
      explanation: "由因式定理，P(3) = 0：27 - 36 + 3k - 6 = 0 => 3k - 15 = 0 => k = 5。",
    },
    {
      id: 3,
      question: "对多项式 P(x) = 3x³ + 2x² - 7x + 2 使用有理根定理，下列哪个数值不可能是其有理根？",
      poly: "3x^3 + 2x^2 - 7x + 2",
      divisor: "x - 1",
      mathDisplay: "a_0 = 2, \\quad a_n = 3",
      options: [
        { label: "x = 4", value: "4", isCorrect: true },
        { label: "x = 1/3", value: "1/3", isCorrect: false },
        { label: "x = -2", value: "-2", isCorrect: false },
        { label: "x = 2/3", value: "2/3", isCorrect: false },
      ],
      explanation: "常数项因数 p ∈ {1, 2}，首项因数 q ∈ {1, 3}。候选根 ±(p/q) 包含 ±1, ±2, ±1/3, ±2/3。4 的分子为 4，不是常数项 2 的因数，因此绝不可能是有理根。",
    },
    {
      id: 4,
      question: "多项式 P(x) = x⁴ - 16 除以 (x + 2) 的余数是多少？",
      poly: "x^4 - 16",
      divisor: "x + 2",
      mathDisplay: "P(x) = x^4 - 16, \\quad c = -2",
      options: [
        { label: "R = 0 (整除，是因式)", value: "0", isCorrect: true },
        { label: "R = -32", value: "-32", isCorrect: false },
        { label: "R = 16", value: "16", isCorrect: false },
        { label: "R = -16", value: "-16", isCorrect: false },
      ],
      explanation: "注意除式是 (x + 2)，其根为 c = -2！P(-2) = (-2)⁴ - 16 = 16 - 16 = 0。余数为 0，说明 (x + 2) 是因式。",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = quizList[currentIndex];

  const handleSelectOption = (val: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(val);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswerSubmitted(true);
    const chosen = currentQ.options.find(o => o.value === selectedOption);
    if (chosen?.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
  };

  const chosenOption = currentQ.options.find(o => o.value === selectedOption);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t.quizTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.quizDesc}
          </p>
        </div>

        {/* Progress & Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.quizScore} {score} / {quizList.length}</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            第 {currentIndex + 1} / {quizList.length} 题
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
        <div className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
          {currentQ.question}
        </div>
        <div className="bg-white border border-slate-200/80 rounded-lg p-3 text-center font-mono text-base text-indigo-700">
          <MathView math={currentQ.mathDisplay} />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === opt.value;
          let btnStyle = "bg-white border-slate-200 text-slate-800 hover:bg-slate-50";

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-500/30";
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = "bg-rose-50 border-rose-400 text-rose-950 font-bold";
            } else {
              btnStyle = "bg-white border-slate-200 text-slate-400 opacity-60";
            }
          } else if (isSelected) {
            btnStyle = "bg-indigo-50 border-indigo-400 text-indigo-950 ring-2 ring-indigo-500/30 font-semibold";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt.value)}
              className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span className="font-mono">{opt.label}</span>
              {isAnswerSubmitted && opt.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Controls & Feedback */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            {t.quizSubmit}
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {currentIndex < quizList.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>{t.quizNext}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>重新测试</span>
              </button>
            )}

            <button
              onClick={() => onApplyProblemToCalculator(currentQ.poly, currentQ.divisor)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-all border border-slate-200 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>载入计算器验证</span>
            </button>
          </div>
        )}

        {isAnswerSubmitted && (
          <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
            {chosenOption?.isCorrect ? (
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {t.quizCorrect}
              </span>
            ) : (
              <span className="text-rose-700 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                {t.quizIncorrect}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Explanation Box */}
      {isAnswerSubmitted && (
        <div className="mt-5 p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-xs sm:text-sm text-indigo-950 leading-relaxed">
          <div className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
            <span>{t.quizExplanation}</span>
          </div>
          <p>{currentQ.explanation}</p>
        </div>
      )}
    </div>
  );
};
