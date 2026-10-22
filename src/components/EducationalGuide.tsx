import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { ChevronDown, BookOpen, AlertTriangle, Layers, HelpCircle, CheckCircle2, BookmarkCheck } from 'lucide-react';

interface EducationalGuideProps {
  t: Translations;
}

export const EducationalGuide: React.FC<EducationalGuideProps> = ({ t }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase mb-1 block">
            {t.eduStudyGuideBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.eduTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl mx-auto">
            {t.eduSub}
          </p>
        </div>

        {/* 2-Column Educational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: What is Remainder Theorem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold">
              <BookOpen className="w-5 h-5 shrink-0" />
              <h3 className="text-xl text-slate-900">{t.eduWhatIsRemainderTitle}</h3>
            </div>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {t.eduWhatIsRemainderContent}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 font-semibold block mb-1">{t.eduFormulaLabel}</span>
              <MathView math="P(x) = (x - c)Q(x) + R \implies P(c) = R" block={true} className="text-lg font-bold text-slate-900" />
            </div>
          </div>

          {/* Card 2: What is Factor Theorem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold">
              <Layers className="w-5 h-5 shrink-0" />
              <h3 className="text-xl text-slate-900">{t.eduWhatIsFactorTitle}</h3>
            </div>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {t.eduWhatIsFactorContent}
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-center">
              <span className="text-xs text-emerald-800 font-semibold block mb-1">{t.eduIdentityLabel}</span>
              <MathView math="(x - c) \text{ divides } P(x) \iff P(c) = 0" block={true} className="text-lg font-bold text-emerald-950" />
            </div>
          </div>
        </div>

        {/* Worked Textbook Examples Section for Google Ranking */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <BookmarkCheck className="w-6 h-6" />
            <h3 className="text-2xl font-extrabold text-slate-900">
              {t.workedExHeading}
            </h3>
          </div>
          <p className="text-base text-slate-600 mb-6">
            {t.workedExSub}
          </p>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="font-bold text-indigo-900 text-base mb-1">
                {t.ex1Heading}
              </div>
              <p className="text-sm text-slate-700 mb-2">
                <strong>{t.eduProblemLabel}</strong> {t.ex1Problem}
              </p>
              <div className="text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 font-sans space-y-1">
                <p><strong>{t.eduStep1Label}</strong> {t.ex1Step1}</p>
                <p><strong>{t.eduStep2Label}</strong> {t.ex1Step2}</p>
                <div className="pl-4 font-mono text-slate-900">
                  <MathView math="P(3) = 2(3)^3 - 5(3)^2 + 4(3) - 6 = 2(27) - 5(9) + 12 - 6 = 54 - 45 + 12 - 6 = 15" block={true} />
                </div>
                <p><strong>{t.eduConclusionLabel}</strong> {t.ex1Conc}</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="font-bold text-indigo-900 text-base mb-1">
                {t.ex2Heading}
              </div>
              <p className="text-sm text-slate-700 mb-2">
                <strong>{t.eduProblemLabel}</strong> {t.ex2Problem}
              </p>
              <div className="text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 font-sans space-y-1">
                <p><strong>{t.eduStep1Label}</strong> {t.ex2Step1}</p>
                <p><strong>{t.eduStep2Label}</strong> {t.ex2Step2}</p>
                <p><strong>{t.eduStep3Label}</strong> {t.ex2Step3}</p>
                <p><strong>{t.eduStep4Label}</strong> {t.ex2Step4}</p>
                <p><strong>{t.ex2Final}</strong> <MathView math="P(x) = (x - 2)(x - 3)(x + 1)" /></p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="font-bold text-indigo-900 text-base mb-1">
                {t.ex3Heading}
              </div>
              <p className="text-sm text-slate-700 mb-2">
                <strong>{t.eduProblemLabel}</strong> {t.ex3Problem}
              </p>
              <div className="text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 font-sans space-y-1">
                <p><strong>{t.eduStep1Label}</strong> {t.ex3Step1}</p>
                <p><strong>{t.eduStep2Label}</strong> {t.ex3Step2}</p>
                <p><strong>{t.eduStep3Label}</strong> {t.ex3Step3}</p>
                <p><strong>{t.eduStep4Label}</strong> {t.ex3Step4}</p>
                <p><strong>{t.eduStep5Label}</strong> {t.ex3Step5}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.eduSyntheticVsLongTitle}</h3>
          <p className="text-base text-slate-600 mb-5 leading-relaxed">{t.eduSyntheticVsLongContent}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTableMethod}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTablePros}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTableBestFor}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">{t.eduTableMethod1Name}</td>
                  <td className="py-3.5 px-4">{t.eduTableMethod1Pros}</td>
                  <td className="py-3.5 px-4">{t.eduTableMethod1Best}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">{t.eduTableMethod2Name}</td>
                  <td className="py-3.5 px-4">{t.eduTableMethod2Pros}</td>
                  <td className="py-3.5 px-4">{t.eduTableMethod2Best}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">{t.eduTableMethod3Name}</td>
                  <td className="py-3.5 px-4">{t.eduTableMethod3Pros}</td>
                  <td className="py-3.5 px-4">{t.eduTableMethod3Best}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Student Mistakes Card */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2.5 mb-3 text-amber-900 font-bold">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <h3 className="text-xl sm:text-2xl text-amber-950">{t.eduCommonMistakesTitle}</h3>
          </div>
          <p className="text-base text-amber-900 leading-relaxed mb-4">
            {t.eduCommonMistakesContent}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium text-amber-950">
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold block mb-1 text-red-600">{t.eduMistake1Title}</span>
              <span>{t.eduMistake1Desc}</span>
            </div>
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold block mb-1 text-red-600">{t.eduMistake2Title}</span>
              <span>{t.eduMistake2Desc}</span>
            </div>
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold block mb-1 text-red-600">{t.eduMistake3Title}</span>
              <span>{t.eduMistake3Desc}</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <HelpCircle className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-slate-900">{t.faqTitle}</h3>
          </div>
          <p className="text-base text-slate-600 mb-6">{t.faqSub}</p>

          <div className="divide-y divide-slate-200">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left text-base sm:text-lg font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 ml-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-base text-slate-600 leading-relaxed pr-6">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
