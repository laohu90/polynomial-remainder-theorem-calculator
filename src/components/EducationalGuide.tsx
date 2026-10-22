import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { ChevronDown, BookOpen, AlertTriangle, Check, Layers, HelpCircle } from 'lucide-react';

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
            Algebra 2 & Precalculus Study Guide
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.eduTitle}
          </h2>
          <p className="text-base text-slate-600 mt-2 max-w-2xl mx-auto">
            Everything high school and college students need to master polynomial factoring, rapid root verification, and quadratic decomposition.
          </p>
        </div>

        {/* 2-Column Educational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: What is Remainder Theorem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold">
              <BookOpen className="w-5 h-5 shrink-0" />
              <h3 className="text-lg text-slate-900">{t.eduWhatIsRemainderTitle}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {t.eduWhatIsRemainderContent}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
              <span className="text-xs text-slate-500 block mb-1">Mathematical Formula:</span>
              <MathView math="P(x) = (x - c)Q(x) + R \implies P(c) = R" block={true} className="text-base font-semibold text-slate-900" />
            </div>
          </div>

          {/* Card 2: What is Factor Theorem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold">
              <Layers className="w-5 h-5 shrink-0" />
              <h3 className="text-lg text-slate-900">{t.eduWhatIsFactorTitle}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {t.eduWhatIsFactorContent}
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-center">
              <span className="text-xs text-emerald-800 font-semibold block mb-1">Core Identity:</span>
              <MathView math="(x - c) \text{ divides } P(x) \iff P(c) = 0" block={true} className="text-base font-semibold text-emerald-950" />
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t.eduSyntheticVsLongTitle}</h3>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">{t.eduSyntheticVsLongContent}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTableMethod}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTablePros}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTableBestFor}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">Remainder Theorem Direct Evaluation</td>
                  <td className="py-3.5 px-4">Instant numerical remainder in ~10 seconds. No division table required.</td>
                  <td className="py-3.5 px-4">SAT / ACT exam questions asking only for the remainder or testing if c is a root.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">Synthetic Division (Ruffini Scheme)</td>
                  <td className="py-3.5 px-4">Computes both quotient Q(x) and remainder R. 3x faster than long division using additions.</td>
                  <td className="py-3.5 px-4">Factoring higher-degree polynomials when divisor is linear (x - c).</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">Polynomial Long Division</td>
                  <td className="py-3.5 px-4">Universal method. Works for divisors of ANY degree (quadratic, cubic, etc.).</td>
                  <td className="py-3.5 px-4">Non-linear divisors such as x² + 2x + 5 where synthetic division cannot be applied directly.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Student Mistakes Card */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2.5 mb-3 text-amber-900 font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-xl text-amber-950">{t.eduCommonMistakesTitle}</h3>
          </div>
          <p className="text-sm sm:text-base text-amber-900 leading-relaxed">
            {t.eduCommonMistakesContent}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-medium text-amber-950">
            <div className="bg-white/80 p-3 rounded-lg border border-amber-200/60">
              <span className="font-bold block mb-1 text-red-600">❌ Error: x³ - 1</span>
              <span>Writing coefficients as [1, -1] instead of [1, 0, 0, -1].</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-amber-200/60">
              <span className="font-bold block mb-1 text-red-600">❌ Error: Divisor (x + 4)</span>
              <span>Using c = 4 instead of solving x + 4 = 0 ⇒ c = -4.</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-amber-200/60">
              <span className="font-bold block mb-1 text-red-600">❌ Error: Divisor (3x - 6)</span>
              <span>Forgetting to divide quotient coefficients by leading coefficient 3.</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-xl font-bold text-slate-900">{t.faqTitle}</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">{t.faqSub}</p>

          <div className="divide-y divide-slate-200">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 ml-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-sm text-slate-600 leading-relaxed pr-6">
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
